import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendSubscriptionEmail = async (to) => {
  const subject = "🎉 Thanks for Subscribing to Hitman Grocery!";
  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 40px; text-align: center;">
    <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 6px 18px rgba(0,0,0,0.05);">
      <h2 style="color: #2c3e50;">Welcome to <span style="color:#007bff;">Hitman Grocery</span> 🛒</h2>
      <p style="color: #555; font-size: 16px; margin-top: 10px;">
        Thanks for subscribing to our newsletter! 🎉
      </p>
      <p style="color: #777; font-size: 14px;">
        You’ll now be the first to hear about our latest deals, new arrivals, and exclusive discounts.
      </p>
      <a href="https://hitman-grocery.vercel.app" style="display:inline-block; margin-top: 24px; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 6px;">
        Visit Store
      </a>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 12px; color: #aaa;">
        This message was sent to you by <strong>Hitman Grocery</strong><br>
        Please do not reply to this email.
      </p>
    </div>
  </div>`;

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
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
