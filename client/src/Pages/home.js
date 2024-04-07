import React, {useState} from 'react';
import Header from '../Components/header';
import Footer from '../Components/footer';
import { Link } from 'react-router-dom';
import "../style/home.css"
import Modal from '../Components/popUp';
import dashboard from '../Pages/dashboard'
function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRegisterClick = () => {
      setIsModalOpen(true);
    };

    const handleModalClose = () => {
      setIsModalOpen(false);
    };

    const handleTeacherClick = () => {
      // Navigate to the Teacher registration form
      console.log('Teacher registration');
      handleModalClose();
    };

    const handleStudentClick = () => {
      // Navigate to the Student registration form
      console.log('Student registration');
      handleModalClose();
    };

    return (
        <div className='main'>
            <Header />
            <div className='content'>
            <h1>Welecome, to Con<span className='nect' >nect</span></h1>
            <div className='butts'>
                <button className='butt' onClick={handleRegisterClick} >
                    {/* <Link to="/form">Register/SignUp</Link> */}
                    Register/SignUp
                </button>
                <button className='butt' >
                    <Link to="/login">Login</Link>
                </button>
            </div>
            </div>
            <Modal
              isOpen={isModalOpen}
              onClose={handleModalClose}
              onTeacherClick={handleTeacherClick}
              onStudentClick={handleStudentClick}
            />
            <Footer />
        </div>
    );
}

export default Home;
