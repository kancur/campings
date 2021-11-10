import { Portal } from 'react-portal';
import LoaderJumpingTents from './LoaderJumpingTents';

const LoaderFullscreen = ({ children }) => (
  <Portal>
    <div className="space-y-2 fixed top-0 right-0 bottom-0 left-0 z-50 backdrop-filter backdrop-blur-md backdrop-brightness-50 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-semibold text-white animate-pulse">
        {children}
      </h2>
      <LoaderJumpingTents className="w-80 text-white" />
    </div>
  </Portal>
);

export default LoaderFullscreen