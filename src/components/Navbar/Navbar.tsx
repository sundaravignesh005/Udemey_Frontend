import '../../styles/Components/_navbar.scss';
import { NavLink } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { BsGlobe } from "react-icons/bs";


function Navbar() {
  return (
    <header>
        <nav>
            <div className='navbar'>
                <NavLink to='/'><img src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" alt="Udemy-Logo" /></NavLink>
                <div className='nav-list'>
                    <NavLink to='/explore'>Explore</NavLink>
                    <input type="text" placeholder='Search for Anything' className='user-input' />
                    <span><CiSearch/></span>
                </div>
                <div className='nav-list-item'>
                    <ul>
                        <li><NavLink to='/plan-pricing'>Plans & Pricing</NavLink></li>
                        <li><NavLink to='/Udemy Business'>Udemy Business</NavLink></li>
                        <li><NavLink to='/Tech on Udemy'>Tech on Udemy</NavLink></li>
                        <li className='Cart'><NavLink to='/cart'><span><IoCartOutline/></span></NavLink></li>
                    </ul>
                </div>
                <div className='nav-btn'>
                    <button><NavLink to='/login' className={({ isActive }) => (isActive ? 'btn active' : 'btn')}>Login in</NavLink></button>
                    <button ><NavLink to='/signup' className={({ isActive }) => (isActive ? 'btn active' : 'btn')}>Sign Up</NavLink></button>
                    <button><NavLink to='/login'><span><BsGlobe/></span></NavLink></button>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Navbar