import { useState } from 'react';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { ButtonAdmin } from '../ButtonAdmin';
import ConfirmationDialog from '../ConfirmationDialog';

const myRef = React.createRef();

export function DeleteButtonWithConfirm({ onConfirm, confirmationMsg }) {
  const getConfirmation = async () => {
    const modal = myRef.current;
    return modal.show();
  };

  const handleClick = async () => {
    getConfirmation()
      .then(onConfirm)
      .catch(() => {});
  };

  return (
    <>
      <ConfirmationDialog ref={myRef} confirmationMsg={confirmationMsg} confirmationHeading="Confirm removal" actionBtnName="Delete" actionBtnClassName="bg-red-500"/>
      <ButtonAdmin onClick={handleClick} className="bg-red-500">
        <FaTrashAlt className="text-white w-4 h-4" />
      </ButtonAdmin>
    </>
  );
}
