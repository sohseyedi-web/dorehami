import React from 'react';

const Loading = () => {
  return (
    <div className="flex space-x-2 justify-center items-center ">
      <span className="sr-only">Loading...</span>
      <div className="size-2 bg-zinc-100 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="size-2 bg-zinc-100 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="size-2 bg-zinc-100 rounded-full animate-bounce"></div>
    </div>
  );
};

export default Loading;
