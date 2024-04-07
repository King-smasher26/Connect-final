import React, { useState, useEffect } from 'react';
import Header from '../Components/header';
import Footer from '../Components/footer';
import '../style/studentdashboard.css';
import { FaVideo } from 'react-icons/fa';
import axios from 'axios';
import {FaPhone} from 'react-icons/fa'
import Mentorvideocall from '../Pages/mentorvideocall';
function MentorDashboard() {
  const [mentor, setMentor] = useState({
    email:null,
    subjects:null
  });
  const [renderVideoCaller,setrenderVideoCaller]=useState(false)
  const checker=(e)=>{
    console.log(e.target.checked)
    if(e.target.checked==true){
      setrenderVideoCaller(true)
    }
    else{
      setrenderVideoCaller(false)

    }
  }
  // const [conversationHistory, setConversationHistory] = useState([]);
  useEffect(()=>{
    axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/profileMentor').then((res)=>{
          setMentor({
            email:res.data.email,
            subjects:res.data.subjects

          })
          console.log(res.data)
        }).catch(err=>console.log(err))

  },[])
  const [showSubjectInput, setShowSubjectInput] = useState(false);
  const [subject, setSubject] = useState('');

  // const student = {
  //   email: 'john.doe@example.com',
  //   branch: 'Computer Science',
  // };

  const conversationHistory = [
    {
      id: 1,
      teacherEmail: 'alice@yahoo.com',
      subject: 'Data Structures',
      date: '2023-04-25',
    },
    {
      id: 2,
      teacherEmail: 'bruceWayne@mail.com',
      subject: 'Algorithm Design',
      date: '2023-04-20',
    },
    {
      id: 3,
      teacherEmail: 'emilydavis@mail.com',
      subject: 'Database Systems',
      date: '2023-04-15',
    },
  ];

  const handleSubjectSubmit = (e) => {
    e.preventDefault();
    // Here you can implement the logic to search for a teacher based on the subject
    // and connect via video or voice call
  };
  
  if (!mentor || !conversationHistory) {
    return <div className="loader">
    <div></div>
    <div></div>
    <div></div>
    </div>;
  }

  return (
    <div>
      <Header />
      <div className="student-dashboard">
        <div className="student-info">
          <div>
            <h2>Mentor Information</h2>
            <p>{mentor.email}</p>
            <p>{mentor.branch}</p>
          </div>
          Offline/Online
          <label className="switch">
  <input type="checkbox" onClick={checker}/>
  <span className="slider"></span>
</label>

          <div className="connect-button">
            <button onClick={() => setShowSubjectInput(true)}>
              <FaVideo />
            </button>
          </div>
        </div>
        {showSubjectInput && (
          <div className="subject-input">
            <form onSubmit={handleSubjectSubmit}>
              <input
                type="text"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <button type="submit">Connect</button>
            </form>
          </div>
        )}
              {
                renderVideoCaller?<Mentorvideocall/>:<div>yo</div>
              }
        {
          <div className="conversation-history">
          <h2>Conversation History</h2>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Teacher email</th>
                <th>Subject</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {
              conversationHistory.map((conversation) => (
                <tr key={conversation.id}>
                  <td>{conversation.id}</td>
                  <td>{conversation.teacherEmail}</td>
                  <td>{conversation.subject}</td>
                  <td>{conversation.date}</td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
        }
        
      </div>
      <Footer />
    </div>
  );
}

export default MentorDashboard;
