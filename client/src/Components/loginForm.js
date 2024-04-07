import React, {useState} from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
    const navigate =useNavigate();
    const [loginQuestion,setLoginQuestion] = useState('teacher')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const data = {
            email,password
        }
        if(loginQuestion=="student"){
            axios.defaults.withCredentials = true;
          axios.post('http://localhost:5000/loginStudent',data).then((res)=>{
    
            console.log('request sent successfully')
            console.log('Form submitted:', { email, password });
            console.log(res)
            navigate('/dashboard');
          }).catch((err)=>console.log(err))

        }
        if(loginQuestion=="teacher"){
            axios.defaults.withCredentials = true;
          axios.post('http://localhost:5000/loginMentor',data).then((res)=>{
    
            console.log('request sent successfully')
            console.log('Form submitted:', { email, password });
            console.log(res)
            navigate('/Mentordashboard');
          }).catch((err)=>console.log(err))

        }
    };

    return (
        <div>
            <Header />
            <div className='card'>
                <form className='form-container' onSubmit={handleSubmit}>
                    <h1 className='form-title'>Login</h1>
                    <label className='form-input-label' >
                        Email:
                        <input className='form-input' type="email" value={email} onChange={handleEmailChange} />
                    </label>
                    <br />
                    <label className='form-input-label'>
                        Password:
                        <input className='form-input' type="password" value={password} onChange={handlePasswordChange} />
                    </label>
                    <br />
                    <div className="buttons-login">

                    <button className='form-button' type='submit' onClick={()=>setLoginQuestion("student")}>Login As Student</button>
                    <button className='form-button' type='submit' onClick={()=>setLoginQuestion("teacher")}>Login As Mentor</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Login;