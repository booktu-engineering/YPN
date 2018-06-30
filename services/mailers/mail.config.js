var nodemailer = require('nodemailer');

const sender =   {
          service: 'gmail',
          auth: {
              user: 'hasstrup.ezekiel@gmail.com', // generated ethereal user
              pass:   'Onosetale33'// generated ethereal password
        }
      };

const smtpConfig = {
  host: 'smtp.booktu.org',
  port: 465,
  secure: true,
  auth: {
    user: 'info@booktu.org',
    pass: 'infobooktu'
  }
}

const transporter = nodemailer.createTransport(smtpConfig);

module.exports = smtpConfig;
