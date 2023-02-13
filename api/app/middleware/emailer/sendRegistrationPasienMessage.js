const i18n = require('i18n')
const { prepareToSendEmail } = require('./prepareToSendEmail')

/**
 * Sends registration email
 * @param {string} locale - locale
 * @param {Object} user - user object
 */
const sendRegistrationPasienMessage = (locale = '', user = {}) => {
  i18n.setLocale(locale)
  const subject = i18n.__('registration_pasien.SUBJECT')
  const htmlMessage = i18n.__(
    'registration_pasien.MESSAGE',
    user.first_name + ' ' + user.middle_name + ' ' + user.last_name,
    process.env.BECKEND_URL,
    user.verification,
    user.otp.code
  )
  const info = {
    user: user,
    subject: subject,
    htmlMessage: htmlMessage
  }
  prepareToSendEmail(user, subject, htmlMessage)
}

module.exports = { sendRegistrationPasienMessage }
