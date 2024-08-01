import React from 'react';
import "../css/style1.css";
import { Link } from 'react-router-dom';
// ___________________________________________________________

const Navbar = () => {
    return (
        <>
            <nav className='navbar'>
                <ul className='navbar-nav'>
                    <li className='nav-item'><Link to="/" className='nav-link'>Home</Link></li>
                    <li className='nav-item'><Link to="/cart/" className='nav-link'>Cart</Link></li>
                    <li className='nav-item'><Link to="/photo-gallery/" className='nav-link'>Photo Gallery</Link></li>
                    <li className='nav-item'><Link to="/ReactQuiz/" className='nav-link'>React Quiz</Link></li>
                    <li className='nav-item'><Link to="/about-us/" className='nav-link'>About</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar