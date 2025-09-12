import { askdeskLogo, navLists } from "../../constants"
import { useAuth } from "../../context/AuthContext"
import Dropdown from "../Dropdown/Dropdown";
import './Navbar.css'

const Navbar = () => {

  const { user, logout } = useAuth();

  return (
    <header className="navbar-wrapper">
      <img src={askdeskLogo} alt='askdesk_logo' width={'120'} height={'40'} />
      <nav className="nav">
        <div className="navLinks">
          {navLists.map((item) => (
            <div key={item.id} className="navLink">
              {item}
            </div>
          ))}
        </div>
      </nav>
      {!user ? (
        <Dropdown user={user} logout={logout} />
      ) : (
        <div className="auth-links">
          <p>Login</p>
          <p>or</p>
          <p>Sign Up</p>
        </div>
      )}
    </header>
  )
}

export default Navbar