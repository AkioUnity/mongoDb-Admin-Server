module.exports = {

  // Secret key for JWT signing and encryption
  secret: 'super secret passphrase',

  // database: 'mongodb://ggconnect:connect123@ds157475.mlab.com:57475/ggconnectdevelopment',  //dev server
    database: 'mongodb://ggconnect:l8k3rs@ds247839-a0.mlab.com:47839,ds247839-a1.mlab.com:47839/ggconnect?replicaSet=rs-ds247839',  //Prod

   // database: 'mongodb://localhost:27017/scdev',
    // Setting port for server
  port: 9001,

    // Configuring Mailgun API for sending transactional email
  mailgun_priv_key: 'mailgun private key here',

    // Configuring Mailgun domain for sending transactional email
  mailgun_domain: 'mailgun domain here',

    // Mailchimp API key
    mailchimpApiKey: 'mailchimp api key here',

    // SendGrid API key
    sendgridApiKey: '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',

  // necessary in order to run tests in parallel of the main app
  test_port: 9002,
  test_db: 'mern-starter-test',
  test_env: 'test'
};
