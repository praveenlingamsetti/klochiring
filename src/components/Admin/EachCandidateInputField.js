import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import gapi from "gapi-script";
import TextField from "@mui/material/TextField";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import "./index.css";
const EachCandidateInputField = ({ onInputChange }) => {
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    phone: "",
    endDate: "",
  });
  // below function add's the value with respective field of the candidate
  //it puts previous values the same and add's only active field value
  const handleInputChange = (field, value) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [field]: value,
    }));
  };

  useEffect(() => {
    onInputChange(inputValues); // Notify the parent component about the input values
  }, [inputValues]); //  dependency array to run the function when the inputValues changes
  //console.log(inputValues);

  return (
    <div className="bg-each-candidate-field">
      <div className="each-candidate-subContainer1">
        <input
          id="outlined-basic-1"
          placeholder="Name"
          variant="outlined"
          className="input-field m-1 custom-input-field"
          value={inputValues.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          required
        />
        <input
          id="outlined-basic-2"
          placeholder="Email"
          variant="outlined"
          className="input-field m-1 custom-input-field"
          value={inputValues.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
        />
      </div>
      <div className="each-candidate-subContainer2">
        <input
          id="outlined-basic-3"
          placeholder="Phone"
          variant="outlined"
          className="input-field m-1 custom-input-field"
          value={inputValues.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          required
        />
        <input
          id="outlined-basic-4"
          placeholder="Date"
          type="date"
          variant="outlined"
          className="input-field m-1 custom-input-field"
          value={inputValues.endDate}
          onChange={(e) => handleInputChange("endDate", e.target.value)}
          required
        />
      </div>
      {/* <hr /> */}
    </div>
  );
};
export default EachCandidateInputField;
