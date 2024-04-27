import React, { useContext } from "react";
import { FormDataContext } from "../../pages/FRPage";
import { Label, TextInput } from "flowbite-react";

export default function DisplayNameUpdate() {

  const { formData, setFormData, frp } = useContext(FormDataContext);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <Label className="text-xl" value="Fundraising Page  Display Name" />
        <TextInput
          type="text"
          placeholder="Display Name"
          required
          id="displayName"
          className="flex-1"
          defaultValue={frp ? frp.displayName : formData.displayName || ""}
          onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
        />
      </div>
    </div>
  );
}
