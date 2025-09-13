import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dropdown.css'
import { profileIcon } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { navLists } from '../../constants';
import { Squash as HamburgerSquash } from 'hamburger-react';

const Dropdown = () => {
  const { user, logout } = useAuth();

  const [show, setShow] = useState(false);
  const [toggleSquash, setSquash] = useState(false);

  return (
    <div className='dropdown'>
      <button className="profile-btn" onClick={() => setShow(!show)}>
        <img src={profileIcon} alt="Profile" width={42} height={42} />
      </button>

      <button className="hamburger-btn" onClick={() => setShow(!show)}>
        <HamburgerSquash toggled={toggleSquash} toggle={setSquash} color='#BED457' />
      </button>

      <ul className={`dropdown-menu${show ? " open" : ""}`}>
        {user ? (
          <>
            <li className='profile-info'>
              <img src={profileIcon} className='profile-img' alt="Profile" />
              <div className='profile-text'>
                <p>{user?.name} Avinash</p>
                <p>{user?.email} avinash@example.com</p>
              </div>
            </li>
          </>
        ) : (
          <li className="authlinks-wrapper">
            <Link to='/signin' className="auth-links">Login</Link>
            <span> or </span>
            <Link to='/signup' className="auth-links">Register</Link>
          </li>
        )}

        {navLists.map((item) => (
          <li key={item.id} className='navlink-li'>
            <Link to={item.to} className="navlink-li">{item.label}</Link>
          </li>
        ))}

        {user && (
          <li>
            <button onClick={logout} className='logout-btn'>Logout</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Dropdown