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

    const options = {
      url: mailtrapUrl + 'inboxes/' + inboxId + '/clean',
      headers: {
        'Api-Token': apiToken
      }
    };

    function callback(error, response, body) {
      console.log('callback');
      if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        //console.log(info);
      }
      done();
    }

    api.patch(options, callback);
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

  it('Get User', (done) => {
    const getUser = {
      url: mailtrapUrl + 'user/',
      headers: {
        'Api-Token': apiToken
      }
    };

    let cb = function callback(error, response, body) {
      const info = JSON.parse(body);
      expect(response.statusCode).toBe(200);
      expect(info.api_token).toBe(apiToken);
      done();
    }
    api.get(getUser, cb);
  });

  it('Send mail from app', (done) => {
    let timestamp = new Date();

    //console.log(timestamp.valueOf());
    let subjectText = "PruebaEnvio_" + timestamp.valueOf();
    let body ={
      from: 'TestMail@test.com',
      to: 'fran@test.com',
      subject: subjectText,
      message: 'Send Test'
    };
   

    const getEmails = {
      url: mailtrapUrl + 'inboxes/' + inboxId + '/messages',
      headers: {
        'Api-Token': apiToken
      },
    };

    let cb = function callback(error, response, body) {
      const info = JSON.parse(body);
      expect(response.statusCode).toBe(200);
      expect(info[0].subject).toBe(subjectText);
      done();
    }
   
    request(app.app)
      .post('/')
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(()=>{
        console.log("Email sent");
        api.get(getEmails, cb);
        
      });
      
     
  });

});