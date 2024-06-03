import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivacyPolicy = () => {
    const navigate = useNavigate()
    // Redux
    const theme = useSelector(state => state.theme.value)
  return (
    <div 
        className='display-f fd-c'
        id='privacy'
    >
        <h1>Privacy Policy</h1>
        <b>Effective Date: May 27th, 2024</b>
        <p>This Privacy Policy outlines the personal data handling practices for our storage space management tool, which is a graduation project 
            developed at a coding academy. This tool is designed to help users efficiently manage the available space in their storage areas by 
            calculating the remaining space in percentages. It is not intended for commercial use and is not operated by any company or organization.
        </p>
        <h3>Information We Collect</h3>
        <h4>Personal Information</h4>
        <p>To create an account and use our services, you will provide us with your username, email address, and password. This information is used 
            solely to support your use of the website.
        </p>
        <h4>Storage Data</h4>
        <p>You will input the dimensions of your storage area and items stored within it. We use this data to calculate and track the cumulative 
            space occupied by your items.
        </p>
        <h3>Use of Your Information</h3>
        <p>We use the information collected to:</p>
        <ul>
            <li>Provide and maintain the functionality of the service.</li>
            <li>Communicate with you about your account or any issues related to the service.</li>
            <li>We may disclose your information if required to do so by law.</li>
        </ul>
        <h3>Data Storage and Security</h3>
        <p>Your personal information and storage data are stored securely on servers provided 
            by 'MongoDB', a third-party service. We implement reasonable security measures to 
            protect against unauthorized access or use of your data.
        </p>
        <p>
        <b>Third-Party Service Providers.</b> We engage certain trusted third parties to perform functions and provide services to us, 
           including database hosting and management. We will share your personal information with these third parties, but only to the 
           extent necessary to perform these services.
        </p>
        <p>
        <b>Legal Compliance.</b> We may disclose your personal information if required to do so by law or in response to valid requests 
           by public authorities (e.g., a court or a government agency).
        </p>
        <p >The integrity and confidentiality of your personal information are important to us. While we strive to use commercially acceptable 
            means to protect your personal information, we cannot guarantee its absolute security.
        </p>
        <h3>Changes to This Policy</h3>
        <p>We may update this Privacy Policy from time to time. We encourage you to review it periodically.</p>
        <h3>Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us at <b>ol.basement@gmail.com.</b></p>
        <button 
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

export default PrivacyPolicy