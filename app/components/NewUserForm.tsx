"use client"

import Image from 'next/image'
// import styles from "./Homepage.module.css"
import React, { useState } from 'react';

const NewUserForm = () => {
  const [applicantInfo, setApplicantInfo] = useState({
    christianName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    familyName: '',
    currentGradeLevel: '',
    gender: '',
    birthDate: '',
    birthPlace: '',
  });

  const [applicantLocInfo, setApplicantLocInfo] = useState({
    streetAddress: '',
    city: '',
    citizenShip: '',
    countryOfResidence: '',
    phone: '',
    
  });

  const [applicantDemInfo, setApplicantDemInfo] = useState({
    fatherName:'',
    motherName: '',
    fatherAge:'',
    motherAge:'',
    guardianName: '',
    guardianRelationship: '',
    referenceName: '',
    referenceEmail: '',
    referenceCountry: '',
  });

  const [schoolInfo, setSchoolInfo] = useState({
    primarySchoolName: '',
    primaryGradeCompleted: '',
    primaryYearCompleted:'',
    primarySchoolLocation:'',
    secondaryGradeCompleted: '',
    secondaryYearCompleted: '',
    secondarySchoolName: '',
    secondarySchoolLocation: '',
    universityCompleted: '',
    universityYearCompleted: '',
    universitySchoolName: '',
    universitySchoolLocation: '',
    universityDegreeEarned: '',
    universityDegreeSought: '',
  });

  const [scholarshipRequested, setScholarshipRequested] = useState({
    gradeLevelAttempted: '',
    schoolAddress: '',
    schoolTownAndCountry: '',
    schoolPhone: '',
    schoolEmail: '',
    schoolWebsite: '',
    schoolFacebook: '',
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

  const handleApplicantLocInfoChange = (e) => {
    setApplicantLocInfo({
      ...applicantLocInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleApplicantDemInfoChange = (e) => {
    setApplicantDemInfo({
      ...applicantDemInfo,
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
        <legend>Applicant Information</legend>

        {/* Fields for Applicant Information */}
        <label htmlFor="christianName">Christian Name:</label>
        <input type="text" id="christianName" name="christianName" onChange={handleApplicantInfoChange} />

        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" onChange={handleApplicantInfoChange} />

        <label htmlFor="middleName">Middle Name:</label>
        <input type="text" id="middleName" name="middleName" onChange={handleApplicantInfoChange} />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" onChange={handleApplicantInfoChange} />

        <label htmlFor="familyName">Family Name:</label>
        <input type="text" id="familyName" name="familyName" onChange={handleApplicantInfoChange} />

        <label htmlFor="currentGradeLevel">Current Grade Level:</label>
        <input type="text" id="currentGradeLevel" name="currentGradeLevel" onChange={handleApplicantInfoChange} />

        <label htmlFor="gender">Gender:</label>
        <input type="text" id="gender" name="gender" onChange={handleApplicantInfoChange} />

        <label htmlFor="birthDate">Birth Date:</label>
        <input type="text" id="birthDate" name="birthDate" onChange={handleApplicantInfoChange} />

        <label htmlFor="birthPlace">Birth Place:</label>
        <input type="text" id="birthPlace" name="birthPlace" onChange={handleApplicantInfoChange} />

      </fieldset>

      <fieldset>
        <legend>Applicant Location Information</legend>

        {/* Fields for Applicant Location Information */}
        <label htmlFor="streetAddress">Street Address:</label>
        <input type="text" id="streetAddress" name="streetAddress" onChange={handleApplicantLocInfoChange} />

        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" onChange={handleApplicantLocInfoChange} />

        <label htmlFor="citizenShip">Citizenship:</label>
        <input type="text" id="citizenShip" name="citizenShip" onChange={handleApplicantLocInfoChange} />

        <label htmlFor="countryOfResidence">Country of Residence:</label>
        <input type="text" id="countryOfResidence" name="countryOfResidence" onChange={handleApplicantLocInfoChange} />

        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone" onChange={handleApplicantLocInfoChange} />

      </fieldset>

      <fieldset>
        <legend>Applicant Demographic Information</legend>

        {/* Fields for Applicant Demographic Information */}
        <label htmlFor="fatherName">Father's Name:</label>
        <input type="text" id="fatherName" name="fatherName" onChange={handleApplicantDemInfoChange} />

        <label htmlFor="motherName">Mother's Name:</label>
        <input type="text" id="motherName" name="motherName" onChange={handleApplicantDemInfoChange} />

        <label htmlFor="fatherAge">Father's Age:</label>
        <input type="text" id="fatherAge" name="fatherAge" onChange={handleApplicantDemInfoChange} />

        <label htmlFor="motherAge">Mother's Age:</label>
        <input type="text" id="motherAge" name="motherAge" onChange={handleApplicantDemInfoChange} />

        <label htmlFor="guardianName">Guardian's Name:</label>
        <input type="text" id="guardianName" name="guardianName" onChange={handleApplicantDemInfoChange} />

        <label htmlFor="guardianRelationship">Guardian's Relationship:</label>
        <input type="text" id="guardianRelationship" name="guardianRelationship" onChange={handleApplicantDemInfoChange} />

        <label htmlFor="referenceName">Reference Name:</label>
        <input type="text" id="referenceName" name="referenceName" onChange={handleApplicantDemInfoChange} />

        <label htmlFor="referenceEmail">Reference Email:</label>
        <input type="text" id="referenceEmail" name="referenceEmail" onChange={handleApplicantDemInfoChange} />

        <label htmlFor="referenceCountry">Reference Country:</label>
        <input type="text" id="referenceCountry" name="referenceCountry" onChange={handleApplicantDemInfoChange} />

      </fieldset>

      <fieldset>
        <legend>Educational History</legend>

        {/* Fields for Educational History */}
        <label htmlFor="primarySchoolName">Primary School Name:</label>
        <input type="text" id="primarySchoolName" name="primarySchoolName" onChange={handleSchoolInfoChange} />

        <label htmlFor="primaryGradeCompleted">Primary Grade Completed:</label>
        <input type="text" id="primaryGradeCompleted" name="primaryGradeCompleted" onChange={handleSchoolInfoChange} />

        <label htmlFor="primaryYearCompleted">Primary Year Completed:</label>
        <input type="text" id="primaryYearCompleted" name="primaryYearCompleted" onChange={handleSchoolInfoChange} />

        <label htmlFor="primarySchoolLocation">Primary School Location:</label>
        <input type="text" id="primarySchoolLocation" name="primarySchoolLocation" onChange={handleSchoolInfoChange} />

        <label htmlFor="secondaryGradeCompleted">Secondary Grade Completed:</label>
        <input type="text" id="secondaryGradeCompleted" name="secondaryGradeCompleted" onChange={handleSchoolInfoChange} />

        <label htmlFor="secondaryYearCompleted">Secondary Year Completed:</label>
        <input type="text" id="secondaryYearCompleted" name="secondaryYearCompleted" onChange={handleSchoolInfoChange} />

        <label htmlFor="secondarySchoolName">Secondary School Name:</label>
        <input type="text" id="secondarySchoolName" name="secondarySchoolName" onChange={handleSchoolInfoChange} />

        <label htmlFor="secondarySchoolLocation">Secondary School Location:</label>
        <input type="text" id="secondarySchoolLocation" name="secondarySchoolLocation" onChange={handleSchoolInfoChange} />

        <label htmlFor="universityCompleted">University Completed:</label>
        <input type="text" id="universityCompleted" name="universityCompleted" onChange={handleSchoolInfoChange} />

        <label htmlFor="universityYearCompleted">University Year Completed:</label>
        <input type="text" id="universityYearCompleted" name="universityYearCompleted" onChange={handleSchoolInfoChange} />

        <label htmlFor="universitySchoolName">University School Name:</label>
        <input type="text" id="universitySchoolName" name="universitySchoolName" onChange={handleSchoolInfoChange} />

        <label htmlFor="universitySchoolLocation">University School Location:</label>
        <input type="text" id="universitySchoolLocation" name="universitySchoolLocation" onChange={handleSchoolInfoChange} />

        <label htmlFor="universityDegreeEarned">University Degree Earned:</label>
        <input type="text" id="universityDegreeEarned" name="universityDegreeEarned" onChange={handleSchoolInfoChange} />

        <label htmlFor="universityDegreeSought">University Degree Sought:</label>
        <input type="text" id="universityDegreeSought" name="universityDegreeSought" onChange={handleSchoolInfoChange} />

      </fieldset>

      <fieldset>
        <legend>Scholarship Requested</legend>

        {/* Fields for Scholarship Requested */}
        <label htmlFor="gradeLevelAttempted">Grade Level Attempted:</label>
        <input type="text" id="gradeLevelAttempted" name="gradeLevelAttempted" onChange={handleScholarshipRequestedChange} />

        <label htmlFor="schoolAddress">School Address:</label>
        <input type="text" id="schoolAddress" name="schoolAddress" onChange={handleScholarshipRequestedChange} />

        <label htmlFor="schoolTownAndCountry">Town and Country of School:</label>
        <input type="text" id="schoolTownAndCountry" name="schoolTownAndCountry" onChange={handleScholarshipRequestedChange} />

        <label htmlFor="schoolPhone">School Phone:</label>
        <input type="tel" id="schoolPhone" name="schoolPhone" onChange={handleScholarshipRequestedChange} />

        <label htmlFor="schoolEmail">School Email:</label>
        <input type="email" id="schoolEmail" name="schoolEmail" onChange={handleScholarshipRequestedChange} />

        <label htmlFor="schoolWebsite">School Website:</label>
        <input type="url" id="schoolWebsite" name="schoolWebsite" onChange={handleScholarshipRequestedChange} />

        <label htmlFor="schoolFacebook">School Facebook:</label>
        <input type="text" id="schoolFacebook" name="schoolFacebook" onChange={handleScholarshipRequestedChange} />

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

export default NewUserForm;
