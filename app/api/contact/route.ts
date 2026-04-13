import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,   // your Gmail address
        pass: process.env.GMAIL_PASS,   // Gmail App Password (16-char)
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,       // receive in your own inbox
      replyTo: email,
      subject: subject || `Portfolio contact from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0d0d18;color:#e5e5e5;border-radius:12px;overflow:hidden">
          <div style="background:linear-gradient(135deg,#7c3aed,#06b6d4);padding:24px 32px">
            <h2 style="margin:0;color:#fff;font-size:20px">New Portfolio Message</h2>
          </div>
          <div style="padding:32px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#a0a0b0;width:90px">From</td><td style="padding:8px 0;color:#e5e5e5;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#a0a0b0">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#06b6d4">${email}</a></td></tr>
              ${subject ? `<tr><td style="padding:8px 0;color:#a0a0b0">Subject</td><td style="padding:8px 0;color:#e5e5e5">${subject}</td></tr>` : ""}
            </table>
            <hr style="border:none;border-top:1px solid #ffffff18;margin:24px 0"/>
            <p style="color:#a0a0b0;margin:0 0 8px">Message</p>
            <p style="color:#e5e5e5;line-height:1.7;white-space:pre-wrap">${message}</p>
          </div>
          <div style="padding:16px 32px;background:#ffffff08;font-size:12px;color:#606070;text-align:center">
            Sent via your portfolio contact form
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}