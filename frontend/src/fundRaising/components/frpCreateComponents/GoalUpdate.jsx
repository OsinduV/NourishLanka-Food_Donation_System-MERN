import React, { useContext } from "react";
import { FormDataContext } from "../../pages/FRPCreate";
import { Label, TextInput } from "flowbite-react";

export default function GoalUpdate() {
  const { formData, setFormData } = useContext(FormDataContext);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <Label value="Fundraising Goal (Rs.)" />
        <TextInput
          type="text"
          placeholder="Goal"
          required
          id="goal"
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
        />
      </div>
    </div>
  );
}
