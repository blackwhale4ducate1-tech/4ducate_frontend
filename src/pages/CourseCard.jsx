import React from 'react';
import '../css/CourseCard.css';


function CourseCard({ title, image }) {
  return (
    <div className="course-card">
      <img src={image} alt={title} />
      <h4>{title}</h4>
      <button className="certificate-btn">Certificate</button>
    </div>
  );
}

export default CourseCard;