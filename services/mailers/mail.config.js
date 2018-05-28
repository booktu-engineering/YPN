var nodemailer = require('nodemailer');

const sender =   {
          service: 'gmail',
          auth: {
              user: 'hasstrup.ezekiel@gmail.com', // generated ethereal user
              pass:   'Onosetale33'// generated ethereal password
        }
      };

const transporter = nodemailer.createTransport(sender);

module.exports = sender;
