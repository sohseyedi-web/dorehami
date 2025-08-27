import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserFromCookie } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getUserFromCookie();
    if (!user || user.email !== 'dorehami@gmail.com') {
      return NextResponse.json({ error: 'دسترسی غیر مجاز' }, { status: 403 });
    }

    const comments = await prisma.comment.findMany({
      include: {
        user: {
          select: {
            email: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'خطای سرور داخلی' }, { status: 500 });
  }
}
