import nodemailer from 'nodemailer'
import logging from './logging';

const NAMESPACE = "email"

const transporter = nodemailer.createTransport({
    service: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_SECRET,
    }
})

const sendMail = (email: string) => {
    const mailOptions = {
        from: 'Elkhoudiry Chat App',
        to: email,
        subject: 'Chat join confirmation',
        text: "this mail to inform you, you have joined chat"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        logging.info(NAMESPACE, `send mail to ${email} info:`, info)
        logging.error(NAMESPACE, `send mail to ${email} error:`, error)
    })
}

export {
    sendMail
}