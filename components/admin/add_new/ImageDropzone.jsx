import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const activeClasses = `border-pink-400`;

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

export default function DropZone(props) {
  const [file, setFile] = useState([]);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    },
  });

  const baseClasses = classNames(
    'bg-gray-50',
    'p-4',
    'py-6',
    'border-2',
    'border-dashed',
    'border-gray-300',
    'outline-none',
    'rounded-lg',
    'cursor-pointer',
    'transition-colors duration-200 ease-in-out',
    { 'border-blue-400': isDragActive },
    { 'border-green-400': isDragAccept },
    { 'border-red-400': isDragReject }
  );

  console.log(acceptedFiles[0]);

  const ImageData = () => (
    <div>
      Uploaded file:{' '}
      <span className="font-mono bg-gray-200 p-1">
        {file?.name} ({Math.round((file?.size / 1000_000) * 100) / 100} MB)
      </span>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className={baseClasses} {...getRootProps()}>
        <input {...getInputProps()} />
        {acceptedFiles.length > 0 ? (
          <ImageData />
        ) : (
          <p>Drag 'n' drop an image here, or click to select file</p>
        )}
      </div>
    </div>
  );
}
