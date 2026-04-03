const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const nodemailer = require("nodemailer");

admin.initializeApp();

const runtimeConfig = functions.config ? functions.config() : {};
const smtpHost = process.env.SMTP_HOST || runtimeConfig.smtp?.host;
const smtpPort = Number(process.env.SMTP_PORT || runtimeConfig.smtp?.port || 587);
const smtpUser = process.env.SMTP_USER || runtimeConfig.smtp?.user;
const smtpPass = process.env.SMTP_PASS || runtimeConfig.smtp?.pass;
const orderInbox = process.env.ORDER_EMAIL || runtimeConfig.order?.email || "zerofold91@gmail.com";

function isMissingConfig() {
  return !smtpHost || !smtpUser || !smtpPass;
}

function buildTransporter() {
  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });
}

exports.submitOrder = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const {
      productName,
      productPrice,
      customerEmail,
      customerPhone,
      customerLocation
    } = req.body || {};

    if (!productName || !productPrice || !customerEmail || !customerPhone || !customerLocation) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    if (isMissingConfig()) {
      res.status(500).json({ error: "Email server is not configured on the backend" });
      return;
    }

    const transporter = buildTransporter();

    const textBody = [
      "New Zero Fold Order Request",
      "",
      "Product: " + productName,
      "Price: " + productPrice,
      "",
      "Customer details",
      "Email: " + customerEmail,
      "Phone: " + customerPhone,
      "Location: " + customerLocation,
      "",
      "Submitted from website popup form"
    ].join("\n");

    try {
      await transporter.sendMail({
        from: `Zero Fold Orders <${smtpUser}>`,
        to: orderInbox,
        replyTo: customerEmail,
        subject: "Order Request - " + productName,
        text: textBody
      });

      res.status(200).json({ ok: true, message: "Order sent successfully" });
    } catch (error) {
      console.error("submitOrder failed", error);
      res.status(500).json({ error: "Failed to send order email" });
    }
  });
});
