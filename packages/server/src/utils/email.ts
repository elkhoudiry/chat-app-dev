import nodemailer from 'nodemailer'
import logging from './logging';
import dotenv from 'dotenv'

dotenv.config()

const NAMESPACE = "email"

const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_SECRET,
    }
})

logging.info(NAMESPACE, `user: ${process.env.MAIL_USER}, secret: ${process.env.MAIL_SECRET}`)

const sendMail = (email: string) => {
    const mailOptions = {
        from: `Elkhoudiry <${process.env.MAIL_USER}`,
        to: email,
        subject: 'Chat join confirmation',
        text: "this mail to inform you, you have joined chat",
        html: "<body><h1>Hello!</h1><p>this mail to inform you, you have joined chat</p></body>"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (info) logging.info(NAMESPACE, `send mail to ${email} info:`, info)
        if (error) logging.error(NAMESPACE, `send mail to ${email} error:`, error)
    })
}

export {
    sendMail
}