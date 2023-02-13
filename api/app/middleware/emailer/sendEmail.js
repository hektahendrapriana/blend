const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')
const emailjs = require('@emailjs/nodejs');

/**
 * Sends email
 * @param {Object} data - data
 * @param {boolean} callback - callback
 */
const sendEmail = async (data = {}, callback) => {

  var templateParams = {
    "to_email": data.user.email,
    "to_name": data.user.first_name + ' ' + data.user.middle_name + ' ' + data.user.last_name,
    "from_name": process.env.EMAIL_FROM_NAME,
    "subject": data.subject,
    "message": data.htmlMessage
  };
  
  emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_VERIFY_TEMPLATE_ID, templateParams, {
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
  })
  .then(
    function (response) {
      console.log('SUCCESS!', response.status, response.text);
      callback(true)
    },
    function (err) {
      console.log('FAILED...', err);
      return callback(false)
    },
  );
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //       user: "hekta3103@gmail.com",
  //       pass: "hlsuxtqwlwncrrau"
  //   }
  // });
  // const mailOptions = {
  //   from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
  //   to: `${data.user.first_name + ' ' + data.user.middle_name + ' ' + data.user.last_name } <${data.user.email}>`,
  //   subject: data.subject,
  //   html: data.htmlMessage
  // }
  // transporter.sendMail(mailOptions, (err) => {
  //   if (err) {
  //     return callback(false)
  //   }
  //   return callback(true)
  // })
  // // transporter.sendMail(mailOptions).then(info => {
  // //   console.log({info});
  // // }).catch(console.error);
}

module.exports = { sendEmail }
