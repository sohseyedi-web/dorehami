'use client';

import Sidebar from './_components/Sidebar';
import CommentTable from './_components/table/CommentTable';
import { useGetComments } from '@/hooks/useAdmin';

export default function AdminPage() {
  const { isLoading } = useGetComments();

  if (isLoading) {
    return (
      <section className="flex" dir="rtl">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-gray-500 rounded"></div>
              ))}
            </div>
          </div>
        </main>
      </section>
    );
  }

  return (
    <section className="flex" dir="rtl">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-6">
        <CommentTable />
      </main>
    </section>
  );
}
