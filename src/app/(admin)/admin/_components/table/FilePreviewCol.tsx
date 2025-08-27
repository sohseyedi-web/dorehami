'use client';
import Modal from '@/components/ModalWrapper';
import { IComment } from '@/types';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const FilePreviewCol = ({ comment }: { comment: IComment }) => {
  const hasFile = !!comment.fileUrl || !!comment.fileName;
  const isPdf =
    hasFile &&
    (comment.fileName?.toLowerCase().endsWith('.pdf') ||
      comment.fileUrl?.toLowerCase().endsWith('.pdf'));

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownload = () => {
    try {
      if (!comment.fileUrl) {
        throw new Error('آدرس فایل موجود نیست');
      }

      const link = document.createElement('a');
      link.href = comment.fileUrl;

      const fileName = comment.fileName || `document-${comment.id}.pdf`;
      link.download = fileName;

      link.target = '_blank';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadError(null);
    } catch (error) {
      console.error('خطا در دانلود فایل:', error);
      setDownloadError('خطا در دانلود فایل. لطفاً دوباره تلاش کنید.');
      toast.error('خطا در دانلود فایل');
    }
  };

  const handlePreview = () => {
    if (isPdf) {
      handleDownload();
    } else {
      setImageModalOpen(true);
    }
  };

  console.log(downloadError);

  return (
    <>
      <td className="border-zinc-900 border p-2">
        {hasFile ? (
          <button
            onClick={handlePreview}
            className={`py-1 rounded bg-zinc-800 text-sm w-full hover:bg-zinc-700 transition-colors`}
          >
            {isPdf ? 'PDF' : 'عکس'}
          </button>
        ) : (
          'بدون فایل'
        )}
      </td>
      <Modal isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)}>
        <h5 className="text-lg font-semibold mb-4 text-zinc-100">تصویر پیوست شده</h5>
        <div className="relative w-full h-96">
          <Image
            src={comment.fileUrl || ''}
            alt="تصویر پیوست شده"
            fill
            className="object-contain"
            sizes="(max-width: 100%)"
            onError={e => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            دانلود تصویر
          </button>
        </div>
      </Modal>
    </>
  );
};

export default FilePreviewCol;
