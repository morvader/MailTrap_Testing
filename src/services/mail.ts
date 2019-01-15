import * as nodemailer from 'nodemailer';
import config from '../configs/config';

class Mail {

    constructor(
        public from?: string,
        public to?: string,
        public subject?: string,
        public message?: string) { }

    public async sendMail(): Promise<string> {

        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: this.subject,
            html: this.message,
        };
        let result = 'enviando...';
        const transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: false,
            auth: {
                user: config.user,
                pass: config.password,
            },
            tls: { rejectUnauthorized: false },
        });

        console.log(mailOptions);

        await transporter.sendMail(mailOptions).then((info) => {
            console.log(info);
            result = 'Envio OK';
        }).catch((err) => {
            console.log(err);
        });
        return result;
        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //        console.log('Error envio: ' + error);
        //     } else {
        //         console.log('Envio OK: ' + info);
        //         result = 'Message delivered';
        //     }
        // });

    }

}

export default new Mail();
