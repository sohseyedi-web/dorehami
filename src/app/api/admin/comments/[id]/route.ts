import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserFromCookie } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromCookie();
    if (!user || user.email !== 'dorehami@gmail.com') {
      return NextResponse.json({ error: 'دسترسی غیر مجاز' }, { status: 403 });
    }

    const { status } = await req.json();

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: 'وضعیت نامعتبر' }, { status: 400 });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: params.id },
      data: { status },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: 'وضعیت نظر با موفقیت به روز شد',
        comment: updatedComment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json({ error: 'خطای سرور داخلی' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromCookie();
    if (!user || user.email !== 'dorehami@gmail.com') {
      return NextResponse.json({ error: 'دسترسی غیر مجاز' }, { status: 403 });
    }

    await prisma.comment.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'نظر با موفقیت حذف شد' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'خطای سرور داخلی' }, { status: 500 });
  }
}
