const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);

function sendEmail(mailOptions) {
  return new Promise((resolve, reject) => {
    sgMail.send(mailOptions, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
}

module.exports = { sendEmail };
