import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage'; // Helper function to get the cropped image

const ImageUploadAndCrop = ({ imageSrc, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // This function will be called when the crop is done
  const onCropChange = useCallback((crop) => {
    setCrop(crop);
  }, []);

  const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // This function handles the final crop and returns the cropped image
  const onCropClick = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels); // Get cropped image
      onCropComplete(croppedImage); // Pass cropped image to parent
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="crop-container">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1} // For a square crop
          onCropChange={onCropChange}
          onCropComplete={onCropCompleteHandler}
          onZoomChange={setZoom}
        />
      </div>
      <button onClick={onCropClick}>Crop Image</button>
    </div>
  );
};

export default ImageUploadAndCrop;
