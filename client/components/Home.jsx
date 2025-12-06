/* File: Home.jsx
   Student: Adewale Ibrahim
   StudentID: 301515732
   Date: 2025-09-15
*/

/* Import necessary modules and assets */
import { Link } from "react-router-dom";
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to My Portfolio</h1>
      <p>"My mission is to design and deliver reliable, user-friendly software that solves real-world problems. I strive to write clean and maintainable code, embrace continuous learning, and contribute to innovative projects that make technology accessible, impactful, and future-ready."</p>
      <Link to="/about">
        <button>Learn More About Me</button>
      </Link>
    </div>
  );
}

