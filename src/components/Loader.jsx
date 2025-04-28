import { ClipLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-8">
      <ClipLoader size={50} color="#3b82f6" />
      <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 font-medium">Loading suggestions...</p>
    </div>
  );
};

export default Loader;
