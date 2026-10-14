// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  investorType: z.string().optional(),
  interest: z.string().min(1, "Please select an investment interest"),
  allocation: z.string().optional(),
  country: z.string().optional(),
  callTime: z.string().optional(),
  message: z.string().max(500).optional(),
  consent: z.literal(true),
  website: z.string().max(0).optional(), // Honeypot field
});

const DESTINATION_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || "info@aurixacapital.in";

function buildHtmlEmail(data: z.infer<typeof contactSchema>, dateStr: string) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>New Consultation Enquiry — Aurixia Capital</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #060504; color: #FAF7F2; margin: 0; padding: 24px; }
        .wrapper { max-width: 620px; margin: 0 auto; background-color: #14110C; border: 1px solid #C9A24D; border-radius: 4px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #1C1711 0%, #060504 100%); padding: 32px 28px; border-bottom: 1px solid rgba(201, 162, 77, 0.4); }
        .brand { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #E6C98A; font-weight: 700; margin-bottom: 6px; }
        .title { font-size: 22px; color: #FAF7F2; font-weight: 300; margin: 0; }
        .content { padding: 28px; }
        .field-group { margin-bottom: 18px; }
        .field-label { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: #C9A24D; font-weight: 600; margin-bottom: 4px; }
        .field-value { font-size: 15px; color: #FAF7F2; font-weight: 400; line-height: 1.5; }
        .highlight-box { background: rgba(201, 162, 77, 0.08); border: 1px solid rgba(201, 162, 77, 0.3); border-radius: 4px; padding: 14px 18px; margin: 20px 0; }
        .footer { background-color: #0A0806; padding: 20px 28px; border-top: 1px solid rgba(212, 175, 95, 0.2); font-size: 11px; color: #887E6D; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <div class="brand">AURIXIA CAPITAL · WEALTH &amp; ASSET MANAGEMENT</div>
          <h1 class="title">New Fiduciary Consultation Enquiry</h1>
        </div>
        <div class="content">
          <div class="highlight-box">
            <div class="field-label">Primary Interest / Mandate</div>
            <div class="field-value" style="font-weight: 600; color: #E6C98A; font-size: 17px;">${data.interest}</div>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="width: 50%; padding-bottom: 16px; vertical-align: top;">
                <div class="field-label">Full Name</div>
                <div class="field-value"><strong>${data.fullName}</strong></div>
              </td>
              <td style="width: 50%; padding-bottom: 16px; vertical-align: top;">
                <div class="field-label">Investor Classification</div>
                <div class="field-value">${data.investorType || "Not specified"}</div>
              </td>
            </tr>
            <tr>
              <td style="width: 50%; padding-bottom: 16px; vertical-align: top;">
                <div class="field-label">Email Address</div>
                <div class="field-value"><a href="mailto:${data.email}" style="color: #E6C98A; text-decoration: none;">${data.email}</a></div>
              </td>
              <td style="width: 50%; padding-bottom: 16px; vertical-align: top;">
                <div class="field-label">Direct Phone</div>
                <div class="field-value"><a href="tel:${data.phone}" style="color: #E6C98A; text-decoration: none;">${data.phone}</a></div>
              </td>
            </tr>
            <tr>
              <td style="width: 50%; padding-bottom: 16px; vertical-align: top;">
                <div class="field-label">Capital Horizon</div>
                <div class="field-value">${data.allocation || "Flexible / Discussion"}</div>
              </td>
              <td style="width: 50%; padding-bottom: 16px; vertical-align: top;">
                <div class="field-label">Country of Residence</div>
                <div class="field-value">${data.country || "India"}</div>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding-bottom: 16px; vertical-align: top;">
                <div class="field-label">Preferred Advisory Window</div>
                <div class="field-value">${data.callTime || "Standard Business Hours"}</div>
              </td>
            </tr>
          </table>

          ${
            data.message
              ? `
            <div class="field-group" style="margin-top: 12px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08);">
              <div class="field-label">Client Notes &amp; Specific Requirements</div>
              <div class="field-value" style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 4px; font-style: italic;">
                "${data.message}"
              </div>
            </div>
            `
              : ""
          }
        </div>
        <div class="footer">
          Received on <strong>${dateStr}</strong> via Aurixia Capital Official Portal.<br>
          Recipient: <strong style="color: #FAF7F2;">${DESTINATION_EMAIL}</strong> · Fiduciary Confidentiality Protected.
        </div>
      </div>
    </body>
  </html>
  `;
}

export async function POST(req: Request) {
  try {
    const json = await req.json();

    // 1. Zod Validation
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 2. Anti-spam check (honeypot field)
    if (data.website) {
      return NextResponse.json({ success: true, message: "Registered" });
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const subject = `[New Enquiry] ${data.fullName} — ${data.interest}`;
    const html = buildHtmlEmail(data, timestamp);

    // 3. Attempt Resend Delivery if configured
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM_EMAIL || "Aurixia Capital <enquiries@aurixacapital.in>";

      const resendResponse = await resend.emails.send({
        from: fromEmail,
        to: [DESTINATION_EMAIL],
        replyTo: data.email,
        subject,
        html,
      });

      if (resendResponse.error) {
        console.error("Resend delivery error:", resendResponse.error);
        throw new Error(resendResponse.error.message);
      }

      return NextResponse.json({
        success: true,
        provider: "resend",
        recipient: DESTINATION_EMAIL,
      });
    }

    // 4. Attempt Nodemailer / SMTP Delivery if configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: process.env.SMTP_SECURE === "true" || Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Aurixia Capital Portal" <${process.env.SMTP_USER}>`,
        to: DESTINATION_EMAIL,
        replyTo: data.email,
        subject,
        html,
      });

      return NextResponse.json({
        success: true,
        provider: "smtp",
        recipient: DESTINATION_EMAIL,
      });
    }

    // 5. Development Fallback / Staging logger (when credentials not yet entered in .env)
    console.log("──────────────────────────────────────────────────────────");
    console.log("📬 NEW AURIXIA CAPITAL ENQUIRY (DESTINATION:", DESTINATION_EMAIL, ")");
    console.log("Client:", data.fullName, "| Phone:", data.phone, "| Email:", data.email);
    console.log("Mandate:", data.interest, "| Type:", data.investorType);
    console.log("Allocation:", data.allocation, "| Country:", data.country);
    if (data.message) console.log("Message:", data.message);
    console.log("ℹ️ To enable live email dispatch to info@aurixacapital.in,");
    console.log("   configure RESEND_API_KEY or SMTP credentials in .env.local.");
    console.log("──────────────────────────────────────────────────────────");

    return NextResponse.json({
      success: true,
      provider: "dev_logged",
      recipient: DESTINATION_EMAIL,
      note: "Enquiry logged. Configure RESEND_API_KEY or SMTP_* in .env.local for live dispatch.",
    });
  } catch (err: unknown) {
    console.error("Contact API Exception:", err);
    return NextResponse.json(
      {
        error: "Failed to process consultation enquiry. Please contact us directly.",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
