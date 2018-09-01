'use strict';

var nodemailer = require('nodemailer');
var senderConfigs = require('./mail.config.js');
var templates = require('./templates/temps');

var transporter = nodemailer.createTransport(senderConfigs);

var Mailer = {

  dispatch: function dispatch(body, key) {
    var message = fetchStructure(body, key);
    var destination = body.destination,
        subject = body.subject;

    var mailOptions = {
      from: '"Youth Party" <noreply@youthpartyng.com>', // sender address
      to: destination, // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
      html: message // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error.message);
        return false;
      }
      console.log('message sent');
      return true;
    });
  }
};

var fetchStructure = function fetchStructure(body, key) {
  switch (key) {
    case 1:
      return templates.LoginTemplates(body);

    case 2:
      return templates.ForgotTemplates(body);

    case 3:
      return templates.newFollower(body);

    case 4:
      return templates.newMessage(body);

    case 5:
      return templates.newLikeOrMention(body);

    default:
      return null;

  }
};

module.exports = Mailer;