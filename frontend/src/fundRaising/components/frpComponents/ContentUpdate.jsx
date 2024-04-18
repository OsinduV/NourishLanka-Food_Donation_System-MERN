import React, { useContext } from "react";
import { FormDataContext } from "../../pages/FRPage";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ContentUpdate() {
  const { formData, setFormData, frp } = useContext(FormDataContext);

  return (
    <div>
        <h1 className="mb-4 text-2xl font-medium">Tell your Story : </h1>
      <div>
        <ReactQuill
          theme="snow"
          placeholder="write your story"
          className="h-52"
          required
          defaultValue={formData.content || frp.content}
          onChange={(value) => {
            setFormData({...formData, content: value});
          }}
        />
      </div>
    </div>
  );
}
