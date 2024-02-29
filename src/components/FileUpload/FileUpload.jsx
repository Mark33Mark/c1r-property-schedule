import { useState, useRef } from 'react';
import { number, func } from 'prop-types';
import { useDropFile } from '../../hooks';
import { FilePreview } from './FilePreview';
import { ToJson, ToXls } from '../ConvertFile';

export const FileUpload = ({ maxFiles }) => {
  const [over, setOver] = useState(false);
  const [change, setChange] = useState(false);
  const [files, setFiles] = useState(null);
  const inputRef = useRef(null);

  const {
    fileSelected,
    onDrop,
    onDragOver,
    onDragLeave
  } = useDropFile({ maxFiles }, {
    files,
    setFiles,
    setOver
  });

  const deleteFile = (value) => {
    const copyFilesArray = files;
    const findObjectInArray = files.find(x => x.key === value);
    const findOjectIndexInArray = files.indexOf(findObjectInArray);

    copyFilesArray.splice(findOjectIndexInArray, 1);

    // change the files state with the updated array.
    setFiles(copyFilesArray);

    // trigger a render as files state changed.
    setChange(!change);
  };

  const convertFile = (value) => {
    const transformToObject = JSON.parse(value);
    const { url, convert } = transformToObject;

    convert === 'xls' ? ToXls(url) : ToJson(url);
  };

  return (
    <>
      <div
        onClick={() => inputRef.current.click()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={over ? 'upload-container over' : 'upload-container'}
      >
        <h2>drag or click here to upload your files</h2>
        <input
          className='input-files'
          type='file'
          ref={inputRef}
          onChange={fileSelected}
          multiple={maxFiles > 1}
        />
      </div>
      <div className='container-preview'>
        <h2>File Preview - {files ? JSON.stringify(files.length) : 0} files</h2>
        {files ? <FilePreview files={files} deleteFile={deleteFile} convertFile={convertFile} /> : null}
      </div>
    </>
  );
};

FileUpload.propTypes = {
  onDrop: func,
  maxFiles: number
};
