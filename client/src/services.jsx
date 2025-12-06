/* File: Services.jsx
   Student: Adewale Ibrahim
   StudentID: 301515732
   Date: 2025-09-15
*/

/* Import necessary modules and assets */
import './Services.css';
import webdev from './assets/services/webdev.jpg';
import mobile from './assets/services/mobile.jpg';
import ai from './assets/services/ai.jpg';

/* Services Component */
export default function Services() {
  const services = [
    {
      title: "Web Development",
      image: webdev,
      description: "Building responsive, modern websites using React, HTML, CSS, and JavaScript."
    },
    {
      title: "Mobile App Development",
      image: mobile,
      description: "Designing cross-platform mobile apps with user-friendly interfaces and smooth performance."
    },
    {
      title: "AI & Software Solutions",
      image: ai,
      description: "Creating AI-driven applications, automation tools, and custom software solutions."
    }
  ];

  /* Render the Services component */
  return (
    <div className="main-container">
      <h1>My Services</h1>
      <p className="services-intro">
        Here are some of the services I offer to help clients bring their ideas to life.
      </p>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <img src={service.image} alt={service.title} className="service-image" />
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
