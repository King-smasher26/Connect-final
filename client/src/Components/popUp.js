import React from 'react';
import "../style/popUp.css"
import { Link } from 'react-router-dom';

const Modal = ({ isOpen, onClose, onTeacherClick, onStudentClick }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Register as:</h2>
        <button onClick={onTeacherClick}><Link className='link-popup' to="/tform">Teacher</Link></button>
        <button onClick={onStudentClick}><Link className='link-popup' to="/sform">Student</Link></button>
        <button onClick={onClose} className='popup-cancel'>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;