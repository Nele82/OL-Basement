import React from 'react'

const About = () => {

  return (
      <div 
        className='app-about display-f fd-c'
      >
        <h1>About</h1>
        <p className='mt-2 mb-2'>
          I am Nebojša Pavlović, currently a student at the ‘CODE’ by Comtrade Coding Academy in Belgrade. This project represents the culmination 
          of my academic journey – my graduation piece. It is the product of numerous tutorials and hands-on experience with MERN applications. 
          I’ve distilled the essence of these learnings into a practical application designed to manage storage facilities. It not only tracks and 
          categorizes items but also monitors available space, ensuring efficient utilization of the facility.
        </p>
        <h2>The App</h2>
        <p className='mt-2 mb-2'>
          The App allows you to enter the dimensions of your storage area and each item you store, automatically calculating the total and available space. 
          It’s like having a smart inventory system where every item has its place, categorized for easy retrieval. With the added convenience of filtering 
          items by category, this app not only helps you maximize your storage efficiency but also makes finding and managing your stored items a breeze, 
          all from the comfort of your device.
        </p>
        <p className='mt-2 mb-2'>
          <b>Additional perk:</b> Users can effortlessly download the complete list of stored items as a .csv file (compatible with MS Excel) by clicking a single button.
        </p>
        <p className='mt-2 mb-2'>
          It's called OL Basement where 'OL', unsurprisingly, stands for 'Online'. This a full-stack application designed using a well-known MERN stack. The MERN stack is 
          a popular set of technology used to build modern web applications. It is an acronym that stands for MongoDB, Express.js, React, and Node.js where:
        </p>
        <ul className='ml-4 mr-2 mt-2 mb-2'>
            <li><b>MongoDB:</b> is a document-based, NoSQL database used to store application data in a flexible, JSON-like format.</li>
            <li><b>Express.js:</b> is a lightweight web application framework for Node.js, designed for building web applications and APIs.</li>
            <li><b>React:</b> is a JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience.</li>
            <li><b>Node.js:</b> is a JavaScript runtime built on Chrome’s V8 JavaScript engine, used to build scalable network applications.</li>
          </ul>
        <p className='mt-2 mb-2'>
          It’s the modern solution to an age-old problem of space management, ensuring that you can always make the most of your storage areas without 
          the guesswork. It’s a handy tool for maximizing space efficiency and staying organized.
        </p>
      </div>
  )
}

export default About