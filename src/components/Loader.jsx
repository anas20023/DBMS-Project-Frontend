import {
  HashLoader
} from 'react-spinners';

const Loader = () => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-8">
      <HashLoader
        size={60} color="#3b82f6" />
    </div>
  );
};

export default Loader;
