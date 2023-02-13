const { emailExists } = require('./emailExists')
const { mobilephoneExists } = require('./mobilephoneExists')
const { nikExists } = require('./nikExists')
const { usernameExists } = require('./usernameExists')
const { emailExistsExcludingMyself } = require('./emailExistsExcludingMyself')
const { prepareToSendEmail } = require('./prepareToSendEmail')
const { sendEmail } = require('./sendEmail')
const {
  sendRegistrationEmailMessage
} = require('./sendRegistrationEmailMessage')
const {
  sendRegistrationPasienMessage
} = require('./sendRegistrationPasienMessage')
const {
  sendResetPasswordEmailMessage
} = require('./sendResetPasswordEmailMessage')

module.exports = {
  emailExists,
  mobilephoneExists,
  nikExists,
  usernameExists,
  emailExistsExcludingMyself,
  prepareToSendEmail,
  sendEmail,
  sendRegistrationEmailMessage,
  sendRegistrationPasienMessage,
  sendResetPasswordEmailMessage
}
