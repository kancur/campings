import { Portal } from 'react-portal';

import { ButtonAdmin } from './ButtonAdmin';

export default function Modal(props) {
  return (
    <Portal>
      <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-md backdrop-brightness-75 z-50 flex items-center justify-center">
        <div className="bg-white shadow-lg border border-gray-100 p-4 flex flex-col gap-2 rounded-md">
          <div className="p-1">Would you like to delete something?</div>
          <div className="flex gap-1 justify-center p-1">
            <ButtonAdmin className="bg-transparent text-gray-600">
              Cancel
            </ButtonAdmin>
            <ButtonAdmin>Delete</ButtonAdmin>
          </div>
        </div>
      </div>
    </Portal>
  );
}
