'use client';
import { useResponsive } from '@/context/ResponsiveProvider';
import Back from '@/ui/Back';
import { useCommentStats } from '@/hooks/useAdmin';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Button from '@/ui/Button';
import Loading from '@/ui/Loading';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const { active } = useResponsive();
  const { data, isLoading, error } = useCommentStats();
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleLogout = async () => {
    await axios.post('/api/auth/logout');
    router.push('/join');
    toast.success('از پنل خارج شدی');
  };

  return (
    <>
      <Back />
      <aside
        className={`${
          active ? 'min-w-[280px] right-0 top-0' : '-right-28 w-0 top-0'
        } fixed z-40 lg:relative lg:bg-transparent bg-zinc-800 h-screen border-l border-zinc-600 py-4 px-2 space-y-3 transition-all duration-300 overflow-y-auto`}
      >
        <h1 className="text-zinc-300 text-center font-semibold text-2xl">ادمین پروژه</h1>

        <div className="flex flex-col gap-y-4 text-zinc-400">
          {isLoading && <Loading />}

          {error && <div className="text-center py-2 text-red-400">خطا در دریافت اطلاعات</div>}

          {data && (
            <>
              <div
                className="flex  items-center justify-between cursor-pointer p-3 rounded-xl bg-zinc-900 transition-colors"
                onClick={toggleDetails}
              >
                <span className="font-semibold">تعداد نظرات</span>
                <span>{data.stats.total}</span>
              </div>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 space-y-2 border-zinc-600">
                      <div className="flex items-center justify-between">
                        <span className="text-amber-300">در انتظار بررسی</span>
                        <span>{data.stats.pending}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-400">تایید شده</span>
                        <span>{data.stats.approved}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-400">رد شده</span>
                        <span>{data.stats.rejected}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        <Button
          onClick={handleLogout}
          className="bg-red-500 w-[90%] h-[45px] text-white absolute bottom-5 "
        >
          خروج از پنل
        </Button>
      </aside>
    </>
  );
};

export default Sidebar;
