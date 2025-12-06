/* File: About.jsx
   Student: Adewale Ibrahim
   StudentID: 301515732
   Date: 2025-09-15
*/

/* Import necessary modules and assets */
import React from 'react';
import './About.css';
import profileImage from './assets/images/profilephoto.jpg'; // Import your profile image
import resumeFile from './assets/resume.pdf'; // Import the resume file

export default function About() {
    return (
        <div className="main-container">
            <h1>About Me</h1>
            <img src={profileImage} alt="Adewale Ibrahim" className="profile-image" />
            <h2>Adewale Ibrahim</h2>

            <p>
                I am a motivated student currently studying <strong>Software Engineering Technology – AI</strong>.
                I am passionate about developing innovative software solutions and exploring the possibilities of
                artificial intelligence. I enjoy learning new technologies, building projects, and applying
                practical skills to solve real-world problems.
            </p>

            <a
                href={resumeFile}  // Link to the imported resume file
                target="_blank"
                rel="noopener noreferrer"
                className="resume-link"
            >
                📄 View My Resume
            </a>
        </div>
    );
}
