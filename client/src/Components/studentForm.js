import React, { useState } from 'react';
import "../style/form.css"
import Header from './header';
import Footer from './footer';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const SForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [branch, setBranch] = useState('Select Branch');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleBranchChange = (e) => {
        setBranch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        if( password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        else{

            const data = {
                email,password,password,branch
            }
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:5000/registerStudent',data).then((res)=>{
                console.log('request sent successfully')
                console.log(res)
                console.log('Form submitted:', { email, password, branch });
                navigate('/Login');
            }).catch((err)=>console.log(err))
        }


    };

    return (
        <div>
        <Header/>
        <div className='card'>
            <form className='form-container' onSubmit={handleSubmit}>
                <h1 className='form-title'>Student Registration</h1>
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
                    Choose Branch:
                    <select className='form-input' value={branch} onChange={handleBranchChange}>
                        <option disabled className='option' value='Select Branch'>Select Branch</option>
                        <option className='option' value='IT'>Information Technology</option>
                        <option className='option' value='CS'>Computer Science</option>
                        <option className='option' value='ME'>Mechanical Engineering</option>
                        <option className='option' value='CE'>Civil Engineering</option>
                        <option className='option' value='EE'>Electrical Engineering</option>
                        <option className='option' value='EC'>Electronics and Communication</option>
                    </select>
                </label>
                <br />
                <button className='form-button' type="submit" onClick={handleSubmit}>Sign Up</button>
            </form>
            <div className='img'>
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default SForm;