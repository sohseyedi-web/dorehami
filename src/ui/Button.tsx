import cn from '@/utils/cn';
import { ClassValue } from 'clsx';
import { ReactNode } from 'react';
import Loading from './Loading';

type ButtonTypes = {
  children: ReactNode;
  loading?: boolean;
  className?: ClassValue;
  onClick?: () => void;
};

const Button = ({ children, loading = false, className, onClick }: ButtonTypes) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={cn(
        '  md:text-base text-sm cursor-pointer rounded-2xl  transition-all duration-300 flex items-center font-semibold justify-center gap-x-2.5',
        className
      )}
    >
      {loading ? <Loading /> : children}
    </button>
  );
};

export default Button;
