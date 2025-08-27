'use client';

import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { IoLockOpenOutline, IoLockClosedOutline } from 'react-icons/io5';

type InputProps = {
  placeholder?: string;
  error?: string;
  registration: UseFormRegisterReturn;
  dir: 'ltr' | 'rtl';
  type: string;
};

export default function InputField({ ...rest }: InputProps) {
  const { dir, registration, error, placeholder, type } = rest;
  const isPass = type === 'password';
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-[80%] my-3">
      <div className="relative">
        <input
          placeholder={placeholder}
          type={type}
          dir={dir}
          {...registration}
          className={`${
            isPass ? 'pr-8 pl-3' : 'px-3'
          } w-full placeholder:text-right transition-all duration-300 bg-transparent outline-none font-semibold placeholder:text-gray-500 border-2 border-[#333446] focus:border-zinc-800 rounded-2xl h-[50px] text-zinc-100`}
        />
        {isPass && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200 cursor-pointer"
          >
            {showPassword ? <IoLockOpenOutline size={18} /> : <IoLockClosedOutline size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1 text-right">{error}</p>}
    </div>
  );
}
