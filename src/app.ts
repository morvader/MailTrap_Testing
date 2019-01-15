import * as bodyParser from 'body-parser';
import express from 'express';
import Mail from './services/mail';

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.routes();
    }
    public routes() {

        this.app.route('/').get((req, res) => {
            res.send({
                result: 'Testing MailTrap: ACK',
            });
        });

        this.app.route('/').post(async (req, res) => {
            const message = Object.assign({}, req.body);
            Mail.from = message.from;
            Mail.to = message.to;
            Mail.subject = message.subject;
            Mail.message = message.message;
            const result = await Mail.sendMail();
            console.log(result);
            res.status(200).json({
                result,
            });

        });

    }
}

export default new App();
