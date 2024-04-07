import React from 'react';
import { Link } from 'react-router-dom';
import "../style/footer.css"

const Footer = () => {
    return (
        <div className='wrapper'>
        <footer className="footer" >
            <div className='logo'>
                <h2>Con<a href="#home">nect</a></h2>
                <p>Provide in-app communication</p>
                <div className='feature'>
                  <div >
                    <h4>Messaging & chat</h4>
                    <div className='desc'>Flexible, secure, feature-rich and easy-to-manage messaging for your web and mobile apps.</div>
                  </div>
                  <div>
                    <h4>Voice & video calling</h4>
                    <div className='desc'>Enterprise-grade security, robust infrastructure, and a familiar UI from the same vendor as your chat solution.</div>
                  </div>
                </div>
            </div>
            <div className="row">
                <h5 className="row-title">Useful Links</h5>
                <ul className="row-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
        </footer>
        <hr />
        <div className='footer-bottom'>
            <p>© 2024 Connect. All rights reserved.</p>
        </div>
        </div>
    );
};

export default Footer;
