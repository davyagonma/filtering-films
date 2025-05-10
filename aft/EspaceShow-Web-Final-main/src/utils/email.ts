import { config, from } from "./constants";

const nodemailer = require('nodemailer');

export const SendEmail = async (email: string, title: string, msg: string) => {
    const transporter = nodemailer.createTransport({ ...config });

    const mailData = {
        from: from,
        to: email,
        subject: title,
        text: 'Ce mail provient de Espace Show +',
        html: msg
    };

    await transporter.sendMail(mailData, (err: any, info: any) => {
        if (err) {
            console.log(`Error sending email: ${err}`);
        }
        // console.log(info)
    });
}