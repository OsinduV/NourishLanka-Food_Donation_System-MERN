import React, { useContext } from "react";
import { FormDataContext } from "../../pages/FRPage";
import { Label, TextInput } from "flowbite-react";

export default function GoalUpdate() {
  const { formData, setFormData, frp } = useContext(FormDataContext);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <Label className="text-xl" value="Fundraising Goal (Rs.)" />
        <TextInput
          type="number"
          placeholder="Goal"
          required
          id="goal"
          className="flex-1"
          defaultValue={formData.goal || frp.goal}
          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
        />
      </div>
    </div>
  );
}
