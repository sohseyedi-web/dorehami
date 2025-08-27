import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'ایمیل و رمز عبور الزامی است' }, { status: 400 });
  }

  let user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'رمز عبور اشتباه است' }, { status: 401 });
    }
  } else {
    const hashed = await bcrypt.hash(password, 10);
    user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        role: email === 'dorehami@gmail.com' ? 'ADMIN' : 'USER',
      },
    });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: '7d',
  });

  const response = NextResponse.json({
    message: 'ورود موفق',
    user: { id: user.id, email: user.email, role: user.role },
  });

  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 روز
  });

  return response;
}
