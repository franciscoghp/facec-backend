const nodemailer = require("nodemailer");

const sendRecoveryToken = async (user, token) => {
    const sender = process.env.SENDER || 'francisco9mil@gmail.com'
    const url = `http://localhost:4200/recovery-password/${token}`;
    // const url = `https://woboxx.com/recovery-password/${token}`;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
        user: sender, // generated ethereal user
        pass: 'rxuudkbuhuajbdhn', // generated ethereal password
        },
    });

    // send mail with defined transport object
    await transporter.sendMail({
        from: `"Forgot Password 👻" <${sender}>`, // sender address
        to: user.email, // list of receivers
        subject: "Forgot Password ✔", // Subject line
        html: `
        <b>Hello world?</b>
        <a href="${url}">Please, click on the link to recorvery your password</a>
        `, // html body
    });
}

  module.exports = {
    sendRecoveryToken
}