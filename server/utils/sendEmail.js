import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      text: text,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; text-align: center;">OTP Verification</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
            <p style="font-size: 16px; color: #666;">Your One-Time Password (OTP) is:</p>
            <h1 style="font-size: 32px; color: #007bff; letter-spacing: 5px; margin: 20px 0;">${text
              .split(" ")
              .pop()}</h1>
            <p style="font-size: 14px; color: #666;">This OTP will expire in 5 minutes.</p>
          </div>
          <p style="font-size: 12px; color: #999; text-align: center; margin-top: 20px;">
            If you didn't request this OTP, please ignore this email.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    //console.log("✅ Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error("Failed to send email: " + error.message);
  }
};
