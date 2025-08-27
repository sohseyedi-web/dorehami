import { IComment, STATUS } from '@/types';
import { useUpdateCommentStatus, useDeleteComment } from '@/hooks/useAdmin';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '@/components/ModalWrapper';
import CommentStatusSelect from './CommentStatus';
import FilePreviewCol from './FilePreviewCol';

const CommentTableRow = ({ index, comment }: { index: number; comment: IComment }) => {
  const { mutateAsync: updateStatus, isPending: isUpdating } = useUpdateCommentStatus();
  const { mutateAsync: deleteComment, isPending: isDeleting } = useDeleteComment();

  const [status, setStatus] = useState<STATUS>(comment.status);
  const [open, setOpen] = useState(false);

  const handleChange = async (newStatus: STATUS) => {
    try {
      setStatus(newStatus);
      await updateStatus({ id: comment.id, status: newStatus });
    } catch {
      toast.error('خطا در تغییر وضعیت');
      setStatus(comment.status);
    }
  };

  const hanldeDelete = async () => {
    await deleteComment({ id: comment.id });
    toast.success('حذف شد');
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
        <FilePreviewCol comment={comment} />
        <td className="border-zinc-900 border p-2 gap-x-2.5 flex items-center justify-evenly">
          <CommentStatusSelect value={status} onChange={handleChange} disabled={isUpdating} />
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
      </Modal>
    </>
  );
};

export default CommentTableRow;
