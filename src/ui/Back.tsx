import { useResponsive } from '@/context/ResponsiveProvider';

const Back = () => {
  const { active, setActive } = useResponsive();

  return (
    active && (
      <div
        className="lg:hidden fixed block w-full h-full top-0 left-0 bg-[rgba(0,0,0,.5)] z-30 transition-all duration-300"
        onClick={() => setActive(!active)}
      ></div>
    )
  );
};

export default Back;
