import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DropZone({ fileToUpload, setFileToUpload }) {
  const [error, setError] = useState();

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
      setFileToUpload(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    },
  });

  const removeAll = (e) => {
    e.stopPropagation();
    acceptedFiles.length = 0;
    acceptedFiles.splice(0, acceptedFiles.length);
    setFileToUpload(null);
  };

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

  const ImageData = () => (
    <div>
      File to upload:{' '}
      <span className="font-mono bg-gray-200 p-1">
        {fileToUpload?.name} (
        {Math.round((fileToUpload?.size / 1000_000) * 100) / 100} MB)
      </span>{' '}
      <span onClick={removeAll} className="text-red-500 underline">
        Remove
      </span>
    </div>
  );

  //cleanup to avoid memory leaks
  useEffect(() => {
    if (fileToUpload?.preview) {
      return () => {
        URL.revokeObjectURL(fileToUpload.preview);
      };
    }
  }, [fileToUpload]);

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
      <p>{error}</p>
    </div>
  );
}
