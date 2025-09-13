import React, { useEffect, useState } from "react";

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  };

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-richblack-200">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-3 py-2 text-sm text-white outline-none focus:border-white"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="rounded-lg text-yellow-50 px-4 py-2 text-sm font-semibold text-richblack-900 transition "
        >
          Add
        </button>
      </div>

      {requirementList.length > 0 && (
        <ul className="mt-3 space-y-2">
          {requirementList.map((requirement, index) => (
            <li
              key={index}
              className="flex items-center w-fit gap-16 justify-between rounded-lg border border-richblack-600 bg px-3 py-2 text-sm text-richblack-100">
              <span>{requirement}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-[10px] text-pink-200 hover:text-pink-100  flex">
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && <span className="text-xs text-pink-200">{label} is required</span>}
    </div>
  );
};

export default RequirementField;
