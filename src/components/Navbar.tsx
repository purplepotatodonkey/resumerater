import * as React from 'react';
// import { button } from 'react'

const AcceptedFileType = {
  Text: '.txt',
  Gif: '.gif',
  Jpeg: '.jpg',
  Png: '.png',
  Doc: '.doc',
  Pdf: '.pdf',
  AllImages: 'image/*',
  AllVideos: 'video/*',
  AllAudios: 'audio/*',
};

export default function Upload({ fileType }) {
  const fileRef = React.useRef();
  const acceptedFormats =
    typeof fileType === 'string'
      ? fileType
      : Array.isArray(fileType)
      ? fileType?.join(',')
      : AcceptedFileType.Text;

  const [selectedFiles, setSelectedFiles] = React.useState();

  const handleFileSelect = (event) => {
    setSelectedFiles(event?.target?.files?.[0]);
  };

  const onUpload = () => {
    console.log(selectedFiles);
  };

  const onClear = () => {
    setSelectedFiles(undefined);
  };

  const onUpdate = (event) => {
    if (event.target.textContent.trim().toLowerCase() === 'change') {
      onClear();
      fileRef.current.click();
      return;
    }
    if (event.target.textContent.trim().toLowerCase() === 'clear') {
      onClear();
      return;
    }
  };

  return (
    <>
      <input
        ref={fileRef}
        hidden
        type="file"
        accept={acceptedFormats}
        onChange={handleFileSelect}
      />
      {!selectedFiles?.name && (
        <button
          style={{ textTransform: 'none' }}
          onClick={() => fileRef.current?.click()}
        >
          Choose file to upload
        </button>
      )}
      {selectedFiles?.name && (
        <button
          style={{ textTransform: 'none' }}
          onClick={onUpdate}
        >
          <span style={{ float: 'left' }}> {selectedFiles?.name}</span>
          <span style={{ padding: '10px' }}> Change</span>
          <span>Clear</span>
        </button>
      )}
      <button
        color="primary"
        disabled={!selectedFiles}
        style={{ textTransform: 'none' }}
        onClick={onUpload}
      >
        Upload
      </button>
    </>
  );
}