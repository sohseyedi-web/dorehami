import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getUserFromCookie } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json({ error: 'لطفاً ابتدا وارد شوید' }, { status: 401 });
    }

    const formData = await req.formData();
    const comment = formData.get('comment') as string;
    const file = formData.get('file') as File | null;

    if (!comment?.trim()) {
      return NextResponse.json({ error: 'متن نظر نمی‌تواند خالی باشد' }, { status: 400 });
    }

    let fileUrl = null;
    let fileName = null;

    if (file && file.size > 0) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: 'فقط فایل‌های تصویر و PDF مجاز هستند' }, { status: 400 });
      }

      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'حجم فایل نمی‌تواند بیشتر از 5 مگابایت باشد' },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadsDir = join(process.cwd(), 'public/uploads');
      try {
        await mkdir(uploadsDir, { recursive: true });
      } catch (error) {
        console.error('Error creating uploads directory:', error);
      }

      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      fileName = `${timestamp}.${fileExtension}`;
      fileUrl = `/uploads/${fileName}`;

      const filePath = join(uploadsDir, fileName);
      await writeFile(filePath, buffer);
    }

    const newComment = await prisma.comment.create({
      data: {
        content: comment.trim(),
        fileUrl,
        fileName: file?.name || null,
        userId: user.id as string,
        status: 'PENDING',
      },
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
        message: 'نظر شما با موفقیت ثبت شد و در انتظار تایید است',
        comment: newComment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in send-comment API:', error);
    return NextResponse.json({ error: 'خطای سرور داخلی' }, { status: 500 });
  }
}
