import { Link } from "react-router-dom"
import { askdeskLogo, navLists } from "../../constants"
import { useAuth } from "../../context/AuthContext"
import Dropdown from "../Dropdown/Dropdown"
import './Navbar.css'

const Navbar = () => {

  const { user } = useAuth();

  return (
    <header className="navbar-wrapper">
      <img src={askdeskLogo} alt='askdesk_logo' width={'120'} height={'40'} />
      <nav className={"menu-desktop"}>
        {navLists.map((item) => (
          <Link key={item.id} to={item.to} className="navlink">{item.label}</Link>
        ))}
      </nav>
      {user ? (
        <Dropdown />
      ) : (
        <>
        <div className="authlinks-wrapper">
          <Link to='/signin' className="auth-links">Login</Link>
          <span> or </span>
          <Link to='/signup' className="auth-links">Register</Link>
        </div>
        <div className="dropdown-mobile">
          <Dropdown />
        </div>
        </>
      )}
    </header>
  )
}

export default Navbar