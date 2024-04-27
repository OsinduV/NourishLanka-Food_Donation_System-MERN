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
          defaultValue={frp ? frp.content : formData.content || "<p>I've joined NourishLanka to help end hunger in Sri Lanka. No one should go without a meal, yet lot of people in Sri Lanaka face hunger. I created this fundraiser to help provide these much needed meals to our neighbors through the NourishLanka network of food banks and I'm asking you to join my in my cause.</p><br><p>It only takes a little to make a big difference. Will you help in my fight to end hunger?</p><br><p>Click on the Donate button above and let's end hunger together!</p>"}
          onChange={(value) => {
            setFormData({...formData, content: value});
          }}
        />
      </div>
    </div>
  );
}
