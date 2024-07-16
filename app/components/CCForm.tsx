"use client"

import Image from 'next/image'
// import styles from "./Homepage.module.css"
import React, { useState } from 'react';

const CCForm = () => {
  const [applicantInfo, setApplicantInfo] = useState({
    christianName: '',
    firstName: '',
    familyName: '',
    email: '',
  });

  const [scholarshipRequested, setScholarshipRequested] = useState({
    tuitionFees: '',
    schoolSupplies: '',
    suppliesExpenseList: '',
    scholarshipDonatee: '',
    transferFundsUsing: '',
    bankAddress: '',
    country: '',
    bankRoutingNumber: '',
    accountNumber: '',
    swiftCode: '',
  });

  const handleApplicantInfoChange = (e) => {
    setApplicantInfo({
      ...applicantInfo,
      [e.target.name]: e.target.value,
    });
  };


  const handleScholarshipRequestedChange = (e) => {
    setScholarshipRequested({
      ...scholarshipRequested,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', { applicantInfo, schoolInfo, scholarshipRequested });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Applicant Information</legend>

        {/* Fields for Applicant Information */}
        <label htmlFor="christianName">Christian Name:</label>
        <input type="text" id="christianName" name="christianName" value={applicantInfo.christianName} onChange={handleApplicantInfoChange} />

        {/* Add other fields for Applicant Information */}
        {/* ... */}

      </fieldset>

 
      <fieldset>
        <legend>Scholarship Requested</legend>

        {/* Fields for Scholarship Requested */}
        <label htmlFor="tuitionFees">Tuition & Fees:</label>
        <input type="text" id="tuitionFees" name="tuitionFees" value={scholarshipRequested.tuitionFees} onChange={handleScholarshipRequestedChange} />

        {/* Add other fields for Scholarship Requested */}
        {/* ... */}

      </fieldset>

      {/* Add submit button or other form elements as needed */}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CCForm;
