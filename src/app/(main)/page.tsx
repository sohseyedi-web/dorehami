'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CommentForm from './_components/CommentForm';
import Button from '@/ui/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LuLogOut } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

export default function CommentSection() {
  const [showPending, setShowPending] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post('/api/auth/logout');
    toast.success('از پنل خارج شدی');
    router.push('/join');
  };

  return (
    <AnimatePresence mode="wait">
      {showPending ? (
        <motion.div
          key="pending"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="w-full h-screen flex items-center justify-center space-y-3.5 flex-col max-w-xl mx-auto text-center"
        >
          <h2 className="text-lg font-bold text-green-400 mb-2">
            نظر شما ثبت شد و در حال بررسی است
          </h2>
          <p className="text-sm text-gray-300">بعد از تأیید، در بخش نظرات نمایش داده خواهد شد.</p>
          <Button
            className="w-[200px] h-[50px] bg-[#333446] text-white hover:bg-emerald-700"
            onClick={() => setShowPending(false)}
          >
            ثبت نظر جدید
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="w-full max-w-xl mx-auto"
        >
          <CommentForm onSuccess={() => setShowPending(true)} />
        </motion.div>
      )}
      <div
        className="absolute p-2 rounded-md left-3 top-3 bg-red-500 cursor-pointer"
        onClick={handleLogout}
      >
        <LuLogOut className="text-white rotate-180" size={22} />
      </div>
    </AnimatePresence>
  );
}
