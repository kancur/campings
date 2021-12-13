import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import ButtonAdmin from '../general/ButtonAdmin';
import ConfirmationDialog from '../general/ConfirmationDialog';

const myRef = React.createRef();

export default function DeleteButtonWithConfirm({ onConfirm, confirmationMsg }) {
  const [isOpen, setIsOpen] = useState(false);
  const getConfirmation = async () => {
    const modal = myRef.current;
    return modal.show();
  };

  const handleClick = async () => {
    setIsOpen(true);
  };

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  }

  const handleCancel = () => {
    setIsOpen(false);
  }

  return (
    <>
      <ConfirmationDialog show={isOpen} onConfirm={handleConfirm} onCancel={handleCancel} ref={myRef} confirmationMsg={confirmationMsg} confirmationHeading="Confirm removal" actionBtnName="Delete" actionBtnClassName="bg-red-500"/>
      <ButtonAdmin onClick={handleClick} className="bg-red-500">
        <FaTrashAlt className="text-white w-4 h-4" />
      </ButtonAdmin>
    </>
  );
}
