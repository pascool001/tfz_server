const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
// const mailjetTransport = require('nodemailer-mailjet-transport');

// let nodemailer_mailhog_config = {
//       port: 1025,
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
// }

// console.log("nodemailer_mailhog_config : ", nodemailer_mailhog_config)

// let nodemailer_mailjet_config = mailjetTransport({
//   auth: {
//     apiKey: "7766ef2151ec2b223f2475976d4426f1",
//     apiSecret: 'c36c2a3a572cb5b6c7c6c34afa77ea68'
//   }
// })


const sendEmail = async (email, subject, payload, template) => {
  let nodemailer_mailhog_config = {
      port: 1025,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
}
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport(nodemailer_mailhog_config);
    console.log("from email : ", process.env.FROM_EMAIL, "  to email: ", email)
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };
    // Send email
    transporter.sendMail(options(), (error, info) => {
      console.log("email infos: ",info)
      if (error) {
        console.log("mail error: ", error)
        return error;
      } else {
        console.log("mail sent successfully...")
        return res.status(200).json({
          success: true,
        });
      }
    });

  } catch (error) {
    console.log("email sending error: ", error)
    return error;
  }
};


module.exports = sendEmail;
