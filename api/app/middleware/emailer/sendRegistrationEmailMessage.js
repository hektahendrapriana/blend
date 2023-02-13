const i18n = require('i18n')
const { prepareToSendEmail } = require('./prepareToSendEmail')

/**
 * Sends registration email
 * @param {string} locale - locale
 * @param {Object} user - user object
 */
const sendRegistrationEmailMessage = (locale = '', user = {}) => {
  i18n.setLocale(locale)
  const subject = i18n.__('registration.SUBJECT')
  const htmlMessage = i18n.__(
    'registration.MESSAGE',
    user.first_name + ' ' + user.middle_name + ' ' + user.last_name,
    process.env.BECKEND_URL,
    user.verification
  )
  const info = {
    user: user,
    subject: subject,
    htmlMessage: htmlMessage
  }
  prepareToSendEmail(user, subject, htmlMessage)
}

module.exports = { sendRegistrationEmailMessage }
