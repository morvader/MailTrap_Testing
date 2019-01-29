import request from 'supertest';
import app from '../src/app';
import credentials from '../src/configs/credentials';
import api from 'request';
import Mail from '../src/services/mail';


describe('MailTrap Testing Suite', function () {
  let mailtrapUrl = 'https://mailtrap.io/api/v1/';
  let apiToken = credentials.apiToken;
  let inboxId = credentials.inboxId;

  beforeEach((done) => {
    console.log('Clean Inbox');

    const cleanInbox = {
      url: mailtrapUrl + 'inboxes/' + inboxId + '/clean',
      headers: {
        'Api-Token': apiToken
      }
    };

    function callback(error, response, body) {
      console.log('Empty Inbox');
      expect(response.statusCode).toBe(200);
      done();
    }

    api.patch(cleanInbox, callback);
  });

  it('Server is running - ACK', (done) => {
    request(app.app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body.result).toContain('ACK');
        done();
      });
  });

  it('Send mail from app', (done) => {
    let timestamp = new Date();

    //Adjuntamos en TimeStamp en el asunto para tener controlado el email concreto 
    //sobre el que hacemos la pruebas
    let subjectText = "PruebaEnvio_" + timestamp.valueOf();
    let body = {
      from: 'TestMail@test.com',
      to: 'fran@test.com',
      subject: subjectText,
      message: 'Send Test'
    };

    //Pedimos a nuestro servidor que envie el correo
    request(app.app)
      .post('/')
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200) //Comprobamos que nuestro servidor responde correctamente
      .end(() => {
        console.log("Email sent");
        //Una vez finalizada la petición pasamos a comprobar en mailtrap que está el email enviado
        api.get(getEmailsEndPoint, checkMail);
      });

    const getEmailsEndPoint = {
      url: mailtrapUrl + 'inboxes/' + inboxId + '/messages',
      headers: {
        'Api-Token': apiToken
      },
    };

    let checkMail = function callback(error, response, body) {
      const info = JSON.parse(body);
      expect(response.statusCode).toBe(200);
      expect(info[0].subject).toBe(subjectText);
      done();
    }
  });

});