import Loading from '@/ui/Loading';
import { commentTHeads } from '@/constants/commentTHeads';
import CommentTableRow from './CommentTableRow';
import { IComment } from '@/types';
import { useGetComments } from '@/hooks/useAdmin';
import TableSearch from '../TabelSearch';
import { useState, useMemo } from 'react';

const TableHeader = () => (
  <thead className="bg-zinc-900 rounded-2xl">
    <tr className="text-zinc-400 rounded-2xl">
      {commentTHeads.map(header => (
        <th className="border border-zinc-800 p-2 text-center" key={header.id}>
          {header.label}
        </th>
      ))}
    </tr>
  </thead>
);

const CommentTable = () => {
  const { data, isLoading } = useGetComments();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComments = useMemo(() => {
    if (!data?.comments) return [];

    return data.comments.filter(
      comment =>
        comment.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (comment.user.email &&
          comment.user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        comment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(comment.createdAt).toLocaleDateString('fa-IR').includes(searchTerm)
    );
  }, [data, searchTerm]);

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="w-full overflow-x-auto">
        <TableSearch search={searchTerm} setSearch={setSearchTerm} />
        <table className="w-full min-w-[800px] border-collapse border border-zinc-700 bg-black text-right">
          <TableHeader />
          <tbody>
            {filteredComments.length > 0 ? (
              filteredComments.map((comment: IComment, index: number) => (
                <CommentTableRow key={comment.id} index={index} comment={comment} />
              ))
            ) : (
              <tr>
                <td colSpan={commentTHeads.length} className="text-center py-8 text-zinc-400">
                  {searchTerm ? 'نتیجه‌ای یافت نشد' : 'هنوز نظری ثبت نشده است'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CommentTable;
