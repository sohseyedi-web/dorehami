'use client';

import { useForm } from 'react-hook-form';
import Button from '@/ui/Button';
import InputField from '@/ui/InputField';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/useAuth';

type FormData = {
  username: string;
  password: string;
};

export default function AuthPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const { mutateAsync, isPending } = useLogin();

  const onSubmit = (data: FormData) => {
    mutateAsync(
      { email: data.username, password: data.password },
      {
        onSuccess: res => {
          console.log(res);
          toast.success('ورود موفق ');
          router.push('/');
        },
        onError: err => {
          console.error(err);
          toast.error(err.response?.data?.error || 'مشکلی پیش آمد');
        },
      }
    );
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#101010] rounded-xl py-6 lg:w-[30%] md:w-[60%] w-[85%] flex items-center justify-center flex-col mx-auto text-center shadow"
      >
        <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold text-zinc-100">پروژه</h3>
        <p className="my-3 md:text-base text-sm font-light text-zinc-500">
          برای ادامه وارد شوید یا ثبت نام کنید
        </p>

        <InputField
          type="text"
          dir="ltr"
          error={errors.username?.message}
          placeholder="نام کاربری یا ایمیل"
          registration={register('username', {
            required: 'نام کاربری یا ایمیل الزامی است',
            minLength: { value: 3, message: 'حداقل ۳ کاراکتر وارد کنید' },
          })}
        />
        <InputField
          type="password"
          dir="ltr"
          error={errors.password?.message}
          placeholder="رمز عبور"
          registration={register('password', {
            required: 'رمز عبور الزامی است',
            minLength: { value: 6, message: 'حداقل ۶ کاراکتر وارد کنید' },
          })}
        />

        <Button
          loading={isPending}
          className="w-[80%] h-[50px] bg-[#333446] my-3 text-zinc-100 hover:bg-[#213448]"
        >
          ورود به حساب
        </Button>

        <p className="pt-5 text-zinc-500 text-xs">
          ورود شما به معنای پذیرش{' '}
          <span className="text-zinc-200 md:font-semibold font-medium">قوانین</span> و{' '}
          <span className="text-zinc-200 md:font-semibold font-medium">مقررات</span> پروژه است
        </p>
      </form>
    </section>
  );
}
