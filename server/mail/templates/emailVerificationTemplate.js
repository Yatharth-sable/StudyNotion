const otpTemplate = (otp) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your OTP</title>
  </head>
  <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#ffffff; color:#333;">
    <div style="max-width:600px; margin:0 auto; padding:20px; text-align:center;">
      
     

      <h2 style="margin-bottom:10px;">OTP Verification</h2>

      <p style="font-size:16px;">
        Dear User,
      </p>

      <p style="font-size:16px;">
        Thank you for registering with <strong>StudyNotion</strong>.
        Please use the OTP below to verify your account:
      </p>

      <div style="
        font-size:28px;
        font-weight:bold;
        letter-spacing:6px;
        margin:20px 0;
        color:#000;
      ">
        ${otp}
      </div>

      <p style="font-size:14px;">
        This OTP is valid for <strong>5 minutes</strong>.
      </p>

      <p style="font-size:14px; color:#555;">
        Do not share this OTP with anyone, including StudyNotion support.
        If you did not request this, please ignore this email.
      </p>

      <p style="font-size:13px; color:#999; margin-top:30px;">
        Need help? Contact us at 
        <a href="mailto:info@studynotion.com">info@studynotion.com</a>
      </p>

    </div>
  </body>
  </html>
  `;
};

module.exports = otpTemplate;
