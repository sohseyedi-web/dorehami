import { IComment, STATUS } from '@/types';
import { useUpdateCommentStatus, useDeleteComment } from '@/hooks/useAdmin';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '@/components/ModalWrapper';
import Image from 'next/image';

const CommentTableRow = ({ index, comment }: { index: number; comment: IComment }) => {
  const hasFile = !!comment.fileUrl || !!comment.fileName;
  const isPdf =
    hasFile &&
    (comment.fileName?.toLowerCase().endsWith('.pdf') ||
      comment.fileUrl?.toLowerCase().endsWith('.pdf'));

  const { mutateAsync: updateStatus, isPending: isUpdating } = useUpdateCommentStatus();
  const { mutateAsync: deleteComment, isPending: isDeleting } = useDeleteComment();

  const [status, setStatus] = useState<STATUS>(comment.status);
  const [open, setOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const handleChange = (newStatus: STATUS) => {
    setStatus(newStatus);
    updateStatus({ id: comment.id, status: newStatus });
  };

  const hanldeDelete = async () => {
    await deleteComment({ id: comment.id });
    toast.success('حذف شد');
  };

  const handleDownload = () => {
    if (comment.fileUrl) {
      const link = document.createElement('a');
      link.href = comment.fileUrl;
      link.download = comment.fileName || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePreview = () => {
    if (isPdf) {
      handleDownload();
    } else {
      setImageModalOpen(true);
    }
  };

  return (
    <>
      <tr
        key={comment.id}
        className="hover:bg-slate-950 border-zinc-900 border text-zinc-300 text-center transition-all duration-300 cursor-pointer"
      >
        <td className="border-zinc-900 border text-center p-2 w-12">{index + 1}</td>
        <td className="border-zinc-900 border p-2">{comment.user.email}</td>
        <td className="border-zinc-900 border p-2" onClick={() => setOpen(true)}>
          مشاهده کامل
        </td>
        <td className="border-zinc-900 border p-2">
          {hasFile ? (
            <button onClick={handlePreview} className={`py-1 rounded bg-zinc-800 text-sm w-full`}>
              {isPdf ? ' PDF' : 'عکس'}
            </button>
          ) : (
            'بدون فایل'
          )}
        </td>

        <td className="border-zinc-900 border p-2 gap-x-2.5 flex items-center justify-evenly">
          <select
            value={status}
            onChange={e => handleChange(e.target.value as STATUS)}
            disabled={isUpdating}
            className="bg-[#000] border border-zinc-700 rounded px-2 py-1 text-sm"
          >
            <option value="PENDING">در انتظار</option>
            <option value="APPROVED">تایید شده</option>
            <option value="REJECTED">رد شده</option>
          </select>
          <button
            className="px-2 py-1 text-xs bg-red-500 rounded-md text-white cursor-pointer hover:bg-red-600 transition-colors"
            onClick={hanldeDelete}
            disabled={isDeleting}
          >
            {isDeleting ? '...' : 'حذف'}
          </button>
        </td>

        <td className="border-zinc-900 border p-2">
          {new Date(comment.createdAt).toLocaleDateString('fa-IR', {})}
        </td>
      </tr>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h5 className="text-lg font-semibold text-zinc-100">مشاهده کامل نظر کاربر:</h5>
        <p className="text-white text-sm mt-3 px-1 whitespace-pre-wrap">{comment.content}</p>
        {hasFile && (
          <div className="mt-4">
            <p className="text-zinc-400 mb-2">فایل پیوست شده:</p>
            <button
              onClick={handleDownload}
              className="px-3 py-1 bg-zinc-700 text-white rounded hover:bg-zinc-700 transition-colors"
            >
              {isPdf ? 'دانلود PDF' : 'دانلود تصویر'}
            </button>
          </div>
        )}
      </Modal>

      {hasFile && !isPdf && (
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
      )}
    </>
  );
};

export default CommentTableRow;
