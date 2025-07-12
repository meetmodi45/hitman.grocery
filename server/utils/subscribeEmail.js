import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendSubscriptionEmail = async (to) => {
  const subject = "🎉 Thanks for Subscribing to Hitman Grocery!";
  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 40px; text-align: center;">
    <div style="max-width: 500px; margin: auto; background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
      
      <!-- Logo -->
      <img src="https://res.cloudinary.com/dblgvmpxc/image/upload/v1752352945/hitman_grocery_logo_dcm7hj.png" alt="Hitman Grocery" style="width: 100px; height: auto; margin-bottom: 20px;" />
      
      <!-- Main Message -->
      <h2 style="color: #1e293b; font-size: 24px; font-weight: 600; margin: 0 0 15px 0;">
        Thank You for Subscribing! 🎉
      </h2>
      
      <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
        You'll now receive exclusive deals, new arrivals, and special offers directly in your inbox.
      </p>
      
      <!-- CTA Button -->
      <a href="https://hitman-grocery.vercel.app" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px; margin-bottom: 30px;">
        Start Shopping
      </a>
      
      <!-- Footer -->
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;" />
      <p style="font-size: 12px; color: #94a3b8; margin: 0;">
        This email was sent to ${to} by <strong>Hitman Grocery</strong><br>
        <a href="#" style="color: #667eea; text-decoration: none;">Unsubscribe</a> | Please do not reply to this email.
      </p>
      
    </div>
  </div>`;

  try {
    const info = await transporter.sendMail({
      from: `"Hitman Grocery" <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error("❌ Subscription email failed:", err.message);
    throw new Error("Failed to send subscription email.");
  }
};
