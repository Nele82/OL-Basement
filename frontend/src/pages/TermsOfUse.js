import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const TermsOfUse = () => {
    const navigate = useNavigate()
    // Redux
    const theme = useSelector(state => state.theme.value)

  return (
    <div 
        className='display-f fd-c col-11-lg col-7-xl'
        id='tos'
    >
        <h1>Terms of Use</h1>
        <b>Last updated: May 27th, 2024</b>
        <h3>Introduction</h3>
        <p>Welcome to the OL Basement Project! This website is a graduation project developed by students of a coding academy. It is designed to assist 
            you in managing the available space in your storage areas by calculating the remaining space in percentages. By accessing and using 
            our services, you acknowledge that you have read, understood, and agree to comply with these Terms & Conditions. If you have any objection 
            to any of the Terms and Conditions stated on this page, you may not continue to use this website.
        </p>
        <h3>Use of Service</h3>
        <p>The OL Basement Project is intended for personal, non-commercial use. It allows users to input the dimensions of their storage area and items within it to 
            efficiently manage space. The website is not affiliated with any commercial entity and is not considered protected intellectual 
            property.
        </p>
        <h3>Personal Information</h3>
        <p>The website collects non-sensitive personal information such as username, email address, and password to facilitate the management of user accounts. 
            We are committed to protecting your privacy and ensuring the security of your information.
        </p>
        <h3>Intellectual Property</h3>
        <p>The content and services provided by the OL Basement Project are the result of academic effort and are used for educational purposes. Users are granted 
            permission to use the website's features for managing personal storage space only.
        </p>
        <h3>Acceptable Use</h3>
        <p>Users of the OL Basement Project are expected to:</p>
        <ol>
            <li>Use the website for its intended purpose of managing personal storage space.</li>
            <li>Refrain from using the website for any unlawful, unauthorized or commercial activities.</li>
            <li>Protect their account information and not share it with others.</li>
        </ol>
        <h3>Changes to Terms</h3>
        <p>We reserve the right to modify these Terms and Conditions at any time. Continued use of the website after changes indicates acceptance of the 
            new terms.
        </p>
        <h3>Contact Information</h3>
        <p>For any questions or concerns regarding these Terms and Conditions, please contact us at:<br/><b>ol.basement@gmail.com</b>.
        </p>
        <h3>Discontinuation of Service</h3>
        <p>The OL Basement Project is an academic project and, as such, may be subject to discontinuation at any time without prior notice. 
            Users acknowledge that the availability of the website is not guaranteed and that it may cease operation, temporarily or 
            permanently, at the discretion of the project developers or the coding academy. We will not be liable for any 
            loss (including loss of data) or inconvenience resulting from such discontinuation. Users are encouraged to export their data periodically to 
            avoid any potential loss of information.
        </p>
        <p>By using the OL Basement Project, you agree to these Terms and Conditions.</p>
        <button 
            className='display-f col-9-lg col-12-xl jc-c'
            onClick={() => navigate(-1)}
            style={{ 
                backgroundColor: theme ? 'black' : 'rgb(238, 238, 238)',
                color: theme ? 'rgb(238, 238, 238)' : 'black' 
            }}
        >
            Go Back
        </button>
    </div>
  )
}

export default TermsOfUse