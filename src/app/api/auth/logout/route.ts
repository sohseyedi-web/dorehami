import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json({ error: ' از قبل خارج شده است' }, { status: 400 });
    }

    const response = NextResponse.json({ message: 'خروج موفقیت‌آمیز بود' }, { status: 200 });

    response.cookies.set({
      name: 'token',
      value: '',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'خطای سرور در هنگام خروج' }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
