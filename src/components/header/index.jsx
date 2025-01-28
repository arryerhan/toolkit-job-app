import { NavLink } from "react-router-dom"
const Header = () => {
  return (
    <header>
      <div className="logo">
      <img src="./logo.png" alt="logo" />
      <h1>Job-App</h1>
      </div>
      <nav>
        <NavLink to="/">Applications</NavLink>
        <NavLink to="/job/create">New Application</NavLink>
      </nav>
    </header>
  )
}

export default Header;