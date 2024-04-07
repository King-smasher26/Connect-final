import React, { useState } from 'react';
import "../style/form.css"
import Header from './header';
import Footer from './footer';
import axios from 'axios';
import Select from 'react-select';

import { useNavigate } from 'react-router-dom';
const TForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const subjects = [];
    const [subject, setsubject] = useState();
    const navigate = useNavigate();

    const options = [
        { value: 'OS', label: 'Operating Systems' },
        { value: 'CN', label: 'Computer Network' },
        { value: 'Maths', label: 'Discrete Mathematics' },
        { value: 'SD', label: 'System Design' },
        { value: 'DSA', label: 'Data Structure & Algorithms' },
        { value: 'DBMS', label: 'Database Management System' },
        { value: 'DWDM', label: 'Data Warehousing and Data Mining' },
        { value: 'MCA', label: 'Microprocessor & Computer Architecture' },
        { value: 'DAA', label: 'Design & Analysis of Algorithms' },
        { value: 'SE', label: 'Software Engineering' },
        { value: 'AI', label: 'Artificial Intelligence' },
        { value: 'ML', label: 'Machine Learning' },
        { value: 'DL', label: 'Deep Learning' },
        { value: 'CC', label: 'Cloud Computing' },
        { value: 'BD', label: 'Big Data' },
        { value: 'IoT', label: 'Internet of Things' },
        { value: 'BC', label: 'Blockchain' },
        { value: 'Cyber', label: 'Cyber Security' },
        { value: 'VR', label: 'Virtual Reality' },
        { value: 'AR', label: 'Augmented Reality' },
        { value: '5G', label: '5G Technology' },
        { value: 'RF', label: 'Radio Frequency' },
        { value: 'DSP', label: 'Digital Signal Processing' },
        { value: 'VLSI', label: 'VLSI Design' },
        { value: 'ES', label: 'Embedded Systems' },
        { value: 'RT', label: 'Real Time Systems' },
        { value: 'CD', label: 'Compiler Design' },
        { value: 'TOC', label: 'Theory of Computation' }
    ];
    
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    
    const handlesubjectChange = (selectedOption) => {
        setsubject(selectedOption)
    }
    
    // const handleSubjects = ()=>{
    //     e.preventDefault();
    //     setsubjects([subject.map((obj)=>{
    //         return obj
    //     }) ])
    //     console.log(subjects)
    // }

    // const handleSubjects = () => {
    //     if (subject) {
    //         const selectedSubjects = Array.isArray(subject) ? subject.map(obj => obj.value) : [subject.value];
    //         setsubjects(selectedSubjects);
    //     } else {
    //         setsubjects([]);
    //     }
    // };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        if( password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        else{
            
            subject.map((obj)=>{
                return (subjects.push(obj.value))
            })
            console.log("subject array is",subjects)
            // handleSubjects();
            const data = {
                email,password,subjects
            }
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:5000/registerMentor',data).then((res)=>{
                console.log('request sent successfully')
                console.log(res)
                navigate('/Login');
                console.log('Form submitted:', { email, password, subjects });
            }).catch((err)=>console.log(err))            
        }
    };

    return (
        <div>
        <Header/>
        <div className='card'>
            <form className='form-container'>
                <h1 className='form-title'>Teacher Registration</h1>
                <label className='form-input-label' >
                    Email:
                    <input className='form-input' type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label className='form-input-label' >
                    Password:
                    <input className='form-input' type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <label className='form-input-label' >
                    Confirm Password:
                    <input className='form-input' type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </label>
                <br />
                <label className='form-input-label' >
                    Choose subjects:
                    <Select className='form-input-select' options={options} value={subject} onChange={handlesubjectChange} isMulti />
                </label>
                <br />
                {/* <button onClick={handleSubjects}>Checker</button> */}
                <button className='form-button' onClick={handleSubmit}>Sign Up</button>
                {/* <button className='form-button' onClick={handleSubjects}>Checker</button> */}
            </form>
            <div className='img'>
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default TForm;
