import Image from 'next/image';
import BackgroundImg from '../media/camping.jpg';

export default function SearchWrapper(props) {
  return (
    <>
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 text-center p-6">
        {props.children}
      </div>
    </>
  );
}
