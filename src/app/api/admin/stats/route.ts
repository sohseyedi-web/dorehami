import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserFromCookie } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getUserFromCookie();
    if (!user || user.email !== 'dorehami@gmail.com') {
      return NextResponse.json({ error: 'دسترسی غیر مجاز' }, { status: 403 });
    }

    const [totalComments, pendingComments, approvedComments, rejectedComments] = await Promise.all([
      prisma.comment.count(),
      prisma.comment.count({ where: { status: 'PENDING' } }),
      prisma.comment.count({ where: { status: 'APPROVED' } }),
      prisma.comment.count({ where: { status: 'REJECTED' } }),
    ]);

    return NextResponse.json(
      {
        stats: {
          total: totalComments,
          pending: pendingComments,
          approved: approvedComments,
          rejected: rejectedComments,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'خطای سرور داخلی' }, { status: 500 });
  }
}
