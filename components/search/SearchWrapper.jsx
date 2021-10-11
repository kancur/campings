import Image from 'next/image';
import BackgroundImg from '../../media/camping.jpg';

export default function SearchWrapper(props) {
  return (
    <>
      <div className="bg-gray-300 text-center p-6">
        {props.children}
      </div>
    </>
  );
}
