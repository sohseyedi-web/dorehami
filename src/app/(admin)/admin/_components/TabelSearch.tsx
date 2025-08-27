import { useResponsive } from '@/context/ResponsiveProvider';
import { RiArrowRightSLine, RiSearchLine } from 'react-icons/ri';

const TableSearch = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) => {
  const { setActive, active } = useResponsive();

  return (
    <header className="flex items-center gap-x-2 py-4" dir="rtl">
      <span
        className="cursor-pointer lg:hidden block text-zinc-200 text-sm transition-all duration-200"
        onClick={() => setActive(!active)}
      >
        <RiArrowRightSLine size={26} />
      </span>
      <div className="relative w-full max-w-[300px]">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="جستجوی کاربر ..."
          className={`w-full pr-12 placeholder:text-zinc-500 outline-none md:h-[50px] h-[45px] rounded-2xl bg-transparent border border-zinc-700 transition-all duration-300 text-zinc-100`}
        />
        <RiSearchLine
          size={24}
          className="absolute text-zinc-100 top-3 right-2 rotate-90 cursor-pointer"
        />
      </div>
    </header>
  );
};

export default TableSearch;
