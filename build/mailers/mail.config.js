'use strict';

var nodemailer = require('nodemailer');

var sender = {
  host: 'send.one.com',
  port: 465,
  secure: true,
  auth: {
    user: 'noreply@youthpartyng.com',
    pass: 'noreply123'
  }
};

var smtpConfig = {
  host: 'smtp.booktu.org',
  port: 465,
  secure: true,
  auth: {
    user: 'info@booktu.org',
    pass: 'infobooktu'
  }
};

var transporter = nodemailer.createTransport(smtpConfig);

module.exports = smtpConfig;