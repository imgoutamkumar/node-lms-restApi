const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./emailTemplates");
const { mailtrapClient, sender } = require("./mailtrap.config");

const sendVerificationEmail = async (email, verificationCode) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify Email!",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationCode
      ),
      //text: "Congrats for sending test email with Mailtrap!",
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(`Error while sending verification email: ${error}`);
    throw new Error(`Error while sending verification email: ${error}`);
  }
};

const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "9d2f924f-3f59-4fcd-b521-88fd7dbd4346",
      template_variables: {
        company_info_name: "LMS Portal",
        name: name,
      },
    });
    console.log("welcome mail sent successfully", response);
  } catch (error) {
    console.log(`Error while sending welcoming email: ${error}`);
    throw new Error(`Error while sending welcoming email: ${error}`);
  }
};

const sendPasswordResetEmail = async (email, resetUrl) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password!",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
    });
  } catch (error) {
    throw new Error(`Error while sending reset email: ${error}`);
  }
};

const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
  } catch (error) {
    throw new Error(`Error while sending reset success email: ${error}`);
  }
};

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
};
