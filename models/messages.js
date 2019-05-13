const sgMail = require('@sendgrid/mail')

const sendGridApi = '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';

sgMail.setApiKey(sendGridApi)

module.exports = {sgMail}
