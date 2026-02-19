import React, { useState } from "react";

const Uplode = () => {
  const [formDetails, setFormDetails] = useState({
    profilePicture: "",
  });

  const handleFileChange = (value) => {
    const file = value[0];
    const image = URL.createObjectURL(file);
    setFormDetails({
      ...formDetails,
      profilePicture: image,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center gap-6 w-80">
        
        <h1 className="text-xl font-semibold text-gray-700">
          Upload Profile
        </h1>

        <input
          type="file"
          onChange={(e) => handleFileChange(e.target.files)}
          className="block w-full text-sm text-gray-600
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-medium
          file:bg-blue-500 file:text-white
          hover:file:bg-blue-600 cursor-pointer"
        />

        {formDetails.profilePicture && (
          <img
            src={formDetails.profilePicture}
            alt="preview"
            className="w-40 h-40 object-cover rounded-full border-4 border-blue-500 shadow-md"
          />
        )}

      </div>
    </div>
  );
};

export default Uplode;
