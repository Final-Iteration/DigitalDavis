const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'finaliteration@outlook.com',
    pass: '[YkLZMZLW;L2x/m+',
  },
});

const options = {
  from: 'finaliteration@outlook.com',
  to: '',
  subject: 'Nirvana Password Reset',
  text: 'Please use this link to reset your password: ',
};

const sendResetPasswordEmail = async (to, token) => {
  options.to = to;
  options.text =
    'Please use this link to reset your password: http://127.0.0.1:3000/?' +
    token;
  transport.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(info.response);
  });
};

module.exports = {
  sendResetPasswordEmail,
};
