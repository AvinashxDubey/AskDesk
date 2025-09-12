import { useState } from 'react';
import './Dropdown.css'
import { profileIcon } from '../../constants';
import { useAuth } from '../../context/AuthContext';

const ProfileDropdown = () => {
  const [show, setShow] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className='dropdown'>
      <button className="profile-btn" onClick={() => setShow(!show)}>
        <img src={profileIcon} alt="Profile" width={32} height={32} />
      </button>
      {show && (
        <ul className='dropdown-menu'>
          <li className='profile-info'>
            <img src={profileIcon} className='profile-img' alt="Profile"  />
            <div>
              <p>{user?.name} Avinash</p>
              <p>{user?.email} avinash@example.com</p>
            </div>
          </li>
          <li>
            <button onClick={logout} className='logout-btn'>Logout</button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default ProfileDropdown