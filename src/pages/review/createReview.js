import React, { useCallback, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { Button } from '@mui/material';
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

function CreateReview() {
  const [imgUpload, setImgUpload] = useState([]);
  const [imgUrl, setImgUrl] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setImgUpload(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
  }, []);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({ onDrop, accept: { 'image/*': [] } });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const handleUploadImage = async () => {
    if (imgUpload == null) return;
    const imageRef = ref(storage, `image/${imgUpload.name + v4()} `);
    await uploadBytes(imageRef, imgUpload).then(async () => {
      const downloadUrl = await getDownloadURL(imageRef);
      setImgUrl(downloadUrl);
    });
    setImgUpload(null);
  };

  const handleSubmit = () => {
    handleUploadImage();
    console.log(imgUrl);
  };
  return (
    <>
      <div>CreateReview</div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {imgUpload && (
        <div>
          <img src={imgUpload.preview} style={{ width: '200px' }} alt="" />
        </div>
      )}

      <Button type="button" onClick={handleSubmit}>
        Upload
      </Button>
    </>
  );
}

export default CreateReview;
