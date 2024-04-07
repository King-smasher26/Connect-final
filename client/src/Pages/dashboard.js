import React, { useState, useEffect } from 'react';
import Header from '../Components/header';
import Footer from '../Components/footer';
import '../style/studentdashboard.css';
import { FaVideo } from 'react-icons/fa';
import axios from 'axios';
import {FaPhone} from 'react-icons/fa'
function StudentDashboard() {
  const [student, setStudent] = useState({
    email:null,
    branch:null
  });
  const [availableMentors, setAvailableMentors] = useState([]);
  const [searchMentors,setSearchMentors]=useState(false)
  // const [conversationHistory, setConversationHistory] = useState([]);
  useEffect(()=>{
    axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/profileStudent').then((res)=>{
          setStudent({
            email:res.data.email,
            branch:res.data.branch
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
    console.log('Subject:', subject);
    axios.defaults.withCredentials = true;
    const data = {
      subject:subject
    }
        axios.post('http://localhost:5000/getMentor',data).then((res)=>{
          console.log(res.data)
          setAvailableMentors( res.data);
          setSearchMentors(true);
        }).catch(err=>console.log(err))
  };
  
  if (!student || !conversationHistory) {
    return <div class="loader">
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
            <h2>Student Information</h2>
            <p>{student.email}</p>
            <p>{student.branch}</p>
          </div>
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
          searchMentors?availableMentors.map((obj)=>{
            return(
              <div className='conversation-history'>
              <tr>
              <td>{obj}</td>
              <td><button className='call-btn'><FaPhone/></button></td>

            </tr>
                </div>
            )
          }):
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

export default StudentDashboard;
