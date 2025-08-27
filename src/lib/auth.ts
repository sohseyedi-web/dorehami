import { jwtVerify, SignJWT } from 'jose';
import { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function signToken(payload: JwtPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    console.error('JWT Verify Error:', err);
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getUserFromCookie() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;
  return await verifyToken(token);
}

export async function logoutUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (token) {
    cookieStore.delete('token');
  }
}
