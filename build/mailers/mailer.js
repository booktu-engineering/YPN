var nodemailer = require('nodemailer');
var senderConfigs = require('./mail.config.js');
var templates = require('./templates/temps');

const transporter = nodemailer.createTransport(senderConfigs);

const Mailer = {

  dispatch: (body, key) => {
    let message = fetchStructure(body, key);
    const { destination, subject } = body;
    let mailOptions = {
      from: '"Youth Party" <noreply@youthpartyng.com>', // sender address
      to: destination, // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
      html: message // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error.message);
        return false;
      }
      console.log('message sent');
      return true;
    });
  }
};

const fetchStructure = (body, key) => {
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