"use client"

import Image from 'next/image'
// import styles from "./Homepage.module.css"
import React, { useState } from 'react';

const OldUserForm = () => {
  const [applicantInfo, setApplicantInfo] = useState({
    christianName: '',
    firstName: '',
    familyName: '',
    address: '',
    town: '',
    countryOfResidence: '',
    phone: '',
    currentGradeLevel: '',
  });

  const [schoolInfo, setSchoolInfo] = useState({
    schoolName: '',
    schoolGradeLevel: '',
    schoolAddress: '',
    schoolTownAndCountry: '',
    schoolPhone: '',
    schoolEmail: '',
    schoolWebsite: '',
    schoolFacebook: '',
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

  const handleSchoolInfoChange = (e) => {
    setSchoolInfo({
      ...schoolInfo,
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
        <legend>Another Applicant Information</legend>

        {/* Fields for Another Applicant Information */}
        <label htmlFor="christianName">Christian Name:</label>
        <input type="text" id="christianName" name="christianName" onChange={handleApplicantInfoChange} />

        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" onChange={handleApplicantInfoChange} />

        <label htmlFor="familyName">Family Name:</label>
        <input type="text" id="familyName" name="familyName" onChange={handleApplicantInfoChange} />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" onChange={handleApplicantInfoChange} />

        <label htmlFor="town">Town:</label>
        <input type="text" id="town" name="town" onChange={handleApplicantInfoChange} />

        <label htmlFor="countryOfResidence">Country of Residence:</label>
        <input type="text" id="countryOfResidence" name="countryOfResidence" onChange={handleApplicantInfoChange} />

        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone" onChange={handleApplicantInfoChange} />

        <label htmlFor="currentGradeLevel">Current Grade Level:</label>
        <input type="text" id="currentGradeLevel" name="currentGradeLevel" onChange={handleApplicantInfoChange} />

      </fieldset>

      <fieldset>
        <legend>School Information</legend>

        {/* Fields for School Information */}
        <label htmlFor="schoolName">School Name:</label>
        <input type="text" id="schoolName" name="schoolName" onChange={handleSchoolInfoChange} />

        <label htmlFor="schoolGradeLevel">School Grade Level:</label>
        <input type="text" id="schoolGradeLevel" name="schoolGradeLevel" onChange={handleSchoolInfoChange} />

        <label htmlFor="schoolAddress">School Address:</label>
        <input type="text" id="schoolAddress" name="schoolAddress" onChange={handleSchoolInfoChange} />

        <label htmlFor="schoolTownAndCountry">Town and Country of School:</label>
        <input type="text" id="schoolTownAndCountry" name="schoolTownAndCountry" onChange={handleSchoolInfoChange} />

        <label htmlFor="schoolPhone">School Phone:</label>
        <input type="tel" id="schoolPhone" name="schoolPhone" onChange={handleSchoolInfoChange} />

        <label htmlFor="schoolEmail">School Email:</label>
        <input type="email" id="schoolEmail" name="schoolEmail" onChange={handleSchoolInfoChange} />

        <label htmlFor="schoolWebsite">School Website:</label>
        <input type="url" id="schoolWebsite" name="schoolWebsite" onChange={handleSchoolInfoChange} />

        <label htmlFor="schoolFacebook">School Facebook:</label>
        <input type="text" id="schoolFacebook" name="schoolFacebook" onChange={handleSchoolInfoChange} />

      </fieldset>

      <fieldset>
        <legend>Scholarship Requested</legend>

        {/* Fields for Scholarship Requested */}
        <label htmlFor="tuitionFees">Tuition & Fees:</label>
        <input type="text" id="tuitionFees" name="tuitionFees" onChange={handleScholarshipRequestedChange} />

        <label htmlFor="schoolSupplies">School Supplies:</label>
        <input type="text" id="schoolSupplies" name="schoolSupplies" onChange={handleScholarshipRequestedChange} />

        <label htmlFor="suppliesExpenseList">Supplies Expense List:</label>
        <textarea id="suppliesExpenseList" name="suppliesExpenseList" onChange={handleScholarshipRequestedChange}></textarea>

        <label htmlFor="scholarshipDonatee">Scholarship Donatee:</label>
        <input type="text" id="scholarshipDonatee" name="scholarshipDonatee" onChange={handleScholarshipRequestedChange} />

        <label htmlFor="transferFundsUsing">Transfer Funds Using:</label>
        <input type="text" id="transferFundsUsing" name="transferFundsUsing" onChange={handleScholarshipRequestedChange} />

        <label htmlFor="bankAddress">Bank Address:</label>
        <input type="text" id="bankAddress" name="bankAddress" onChange={handleScholarshipRequestedChange} />

        <label htmlFor="country">Country:</label>
        <input type="text" id="country" name="country" onChange={handleScholarshipRequestedChange} />

        <label htmlFor="bankRoutingNumber">Bank Routing Number:</label>
        <input type="text" id="bankRoutingNumber" name="bankRoutingNumber" onChange={handleScholarshipRequestedChange} />

        <label htmlFor="accountNumber">Account Number:</label>
        <input type="text" id="accountNumber" name="accountNumber" onChange={handleScholarshipRequestedChange} />

        <label htmlFor="swiftCode">Swift Code:</label>
        <input type="text" id="swiftCode" name="swiftCode" onChange={handleScholarshipRequestedChange} />

      </fieldset>


      {/* Add submit button or other form elements as needed */}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default OldUserForm;
