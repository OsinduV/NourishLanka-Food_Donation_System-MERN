import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Button
} from "flowbite-react";
import { app } from "../../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FormDataContext } from "../../pages/FRPage";

export default function ImgUpload() {

  const [imageFile, setImageFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  const {formData, setFormData} = useContext(FormDataContext);

  const filePickerRef = useRef();

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    try {
      setImageUploadError(null);
      setImageUploadProgress(null);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, pageImage: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
       <h1 className="mb-2 text-2xl font-medium">Add a Fundraising Page Photo : </h1>
      <p className="mx-auto">
        Adding a Photo of Yourself helps doners to recognize your page
      </p>
      {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
      {formData.pageImage && !imageUploadProgress && (
        <img
          src={formData.pageImage}
          alt="updatedImg"
          className="w-64 h-64 object-cover my-6 mx-auto"
        />
      )}
      {imageUploadProgress && (
        <div className="w-48 h-48 my-10 mx-auto">
          <CircularProgressbar
            value={imageUploadProgress}
            text={`${imageUploadProgress} %` || 0}
          />
        </div>
      )}
      <div className="flex justify-center">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          ref={filePickerRef}
          hidden
        />
        <Button
          type="button"
          gradientDuoTone="purpleToBlue"
          size="sm"
          outline
          onClick={() => filePickerRef.current.click()}
          disabled={imageUploadProgress}
        >
          Upload Image
        </Button>
      </div>
    </div>
  );
}
