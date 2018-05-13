import nodemailer from 'nodemailer';

const sender =   {
          service: 'gmail',
          auth: {
              user: 'hasstrup.ezekiel@gmail.com', // generated ethereal user
              pass:   'Onosetale32'// generated ethereal password
        }
      };

const transporter = nodemailer.createTransport(sender);

module.exports = transporter;
