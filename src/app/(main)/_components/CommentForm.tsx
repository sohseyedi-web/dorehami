'use client';
import { useSendComment } from '@/hooks/useComments';
import { useMe } from '@/hooks/useAuth';
import { CommentInput } from '@/types';
import Button from '@/ui/Button';
import axios from 'axios';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function CommentForm({ onSuccess }: { onSuccess: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const { data: user } = useMe();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentInput>();

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: { 'image/*': [], 'application/pdf': [] },
    maxFiles: 1,
    onDrop: files => setFile(files[0]),
  });

  const { mutateAsync, isPending } = useSendComment();

  const onSubmit = async (data: CommentInput) => {
    mutateAsync(
      { comment: data.comment, file },
      {
        onSuccess: () => {
          toast.success('نظر شما ثبت شد و در حال بررسی است');
          reset();
          setFile(null);
          onSuccess();
        },
        onError: err => {
          toast.error(err.response?.data.error || 'خطا در ارسال نظر');
        },
      }
    );

    await axios.post('/api/email', {
      to: user?.user.email,
      subject: 'ثبت نظر',
      text: 'نظر شما ثبت شد و در حال بررسی است',
    });
  };

  return (
    <form
      dir="rtl"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xl mx-auto flex justify-center flex-col space-y-6 mt-10 lg:p-0 px-4"
    >
      <p className="text-sm font-semibold text-gray-200">از طریق فرم زیر نظر خودت رو ارسال کن :</p>

      <div className="w-full">
        <textarea
          {...register('comment', { required: 'نظر نمی‌تواند خالی باشد' })}
          rows={4}
          id="comment"
          name="comment"
          className="w-full resize-none h-[135px] rounded-2xl p-4 placeholder:text-gray-500 border-2 border-[#333446] focus:border-[#213448] transition-all duration-300 outline-none text-white bg-transparent"
          placeholder="نظر خود را بنویسید..."
        />
        {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>}
      </div>

      <div className="w-full">
        <div
          {...getRootProps()}
          className="border-2 border-dashed transition-all duration-300 border-[#333446] rounded-xl p-4 cursor-pointer hover:border-[#213448]"
        >
          <input {...getInputProps()} />
          {acceptedFiles[0] ? (
            <p className="text-sm text-zinc-100">{acceptedFiles[0].name}</p>
          ) : (
            <p className="text-sm text-gray-500">عکس یا PDF خود را رها کنید (اختیاری)</p>
          )}
        </div>
      </div>

      <Button
        loading={isPending}
        className="w-full h-[50px] bg-[#333446] text-zinc-100 hover:bg-[#213448]"
      >
        ارسال نظر
      </Button>
    </form>
  );
}
