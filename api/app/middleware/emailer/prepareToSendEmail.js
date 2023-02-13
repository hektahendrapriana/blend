const { sendEmail } = require('./sendEmail')

/**
 * Prepares to send email
 * @param {string} user - user object
 * @param {string} subject - subject
 * @param {string} htmlMessage - html message
 */
const prepareToSendEmail = (user = {}, subject = '', htmlMessage = '') => {
  user = {
    first_name: user.first_name,
    middle_name: user.middle_name,
    last_name: user.last_name,
    email: user.email,
    verification: user.verification
  }

  const data = {
    user,
    subject,
    htmlMessage
  }
  sendEmail(data, (messageSent) =>
    messageSent
      ? console.log(`Email SENT to: ${user.email}`)
      : console.log(`Email FAILED to: ${user.email}`)
  )
  // if (process.env.NODE_ENV === 'production') {
  //   sendEmail(data, (messageSent) =>
  //     messageSent
  //       ? console.log(`Email SENT to: ${user.email}`)
  //       : console.log(`Email FAILED to: ${user.email}`)
  //   )
  // } else if (process.env.NODE_ENV === 'development') {
  //   console.log(data)
  // }
}

module.exports = { prepareToSendEmail }
