import React, { useContext } from "react";
import { FormDataContext } from "../../pages/FRPCreate";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ContentUpdate() {
  const { formData, setFormData } = useContext(FormDataContext);

  return (
    <div>
        <h1 className="mb-4 text-2xl font-medium">Tell your Story : </h1>
      <div>
        <ReactQuill
          theme="snow"
          placeholder="write your story"
          className="h-72"
          required
        />
      </div>
    </div>
  );
}
