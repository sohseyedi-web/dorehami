import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { to, subject, text } = await req.json();

  if (!to || !subject || !text) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT!),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Dorehame Exam" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    });

    return NextResponse.json({ message: 'ایمیل ارسال شد' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'خطا در ارسال ایمیل' }, { status: 500 });
  }
}
