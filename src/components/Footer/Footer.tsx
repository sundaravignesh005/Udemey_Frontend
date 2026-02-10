import '../../styles/Components/_footer.scss'
import { BsGlobe } from "react-icons/bs";

function Footer() {
  return (
    <footer>
        <div className='footer'>
            <div className='footer-title'>
                <h3>Top companies choose Udemy.</h3>
                <div className='Companies'>
                    <img src="https://s.udemycdn.com/partner-logos/v4/nasdaq-light.svg" alt="" />
                
                </div>
            </div>
            <hr />
            <div className='footer-list'>
                <h3>Explore top skills and certifications</h3>
                <div className='footer-content'>
                    <div className='In-demand-Careers'>
                        <h4>In-demand Careers</h4>
                        <ul>
                            <li>Data Scientist</li>
                            <li>Full Stack Web Developer</li>
                        </ul>
                    </div>
                    <div className='In-demand-Careers'>
                        <h4>In-demand Careers</h4>
                        <ul>
                            <li>Data Scientist</li>
                            <li>Full Stack Web Developer</li>
                        </ul>
                    </div>
                    <div className='In-demand-Careers'>
                        <h4>In-demand Careers</h4>
                        <ul>
                            <li>Data Scientist</li>
                            <li>Full Stack Web Developer</li>
                        </ul>
                    </div>
                    <div className='In-demand-Careers'>
                        <h4>In-demand Careers</h4>
                        <ul>
                            <li>Data Scientist</li>
                            <li>Full Stack Web Developer</li>
                        </ul>
                    </div>
                </div>
                <div className='Footer-2-content'>
                    <div className='In-demand-Careers'>
                        <h4>In-demand Careers</h4>
                        <ul>
                            <li>Data Scientist</li>
                            <li>Full Stack Web Developer</li>
                        </ul>
                    </div>
                    <div className='In-demand-Careers'>
                        <h4>In-demand Careers</h4>
                        <ul>
                            <li>Data Scientist</li>
                            <li>Full Stack Web Developer</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='Footer-Details'> 
                <div className='Footer-Grid'>
                    <div className='About'>
                        <h4>About</h4>
                        <ul>
                            <li>About us</li>
                            <li>Careers</li>
                            <li>Contact us</li>
                            <li>Blog</li>
                            <li>Investor</li>
                        </ul>
                    </div>
                    <div className='About'>
                        <h4>Discover Udemy</h4>
                        <ul>
                            <li>About us</li>
                            <li>Careers</li>
                            
                        </ul>
                    </div>
                    <div className='About'>
                        <h4>Udemy for Business</h4>
                        <ul>
                            <li>About us</li>
                            <li>Careers</li>
                            
                        </ul>
                    </div>
                    <div className='About'>
                        <h4>Legal & Accessibility</h4>
                        <ul>
                            <li>About us</li>
                            <li>Careers</li>
                            
                        </ul>
                    </div>
                </div>
                <hr />
                <div className='Footer-copywrite'>
                    <div className='Udemy-Logo'>
                        <img src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy-inverted.svg" alt="" />
                        <p>© 2025 Udemy, Inc.</p>
                    </div>
                    <p>Cookie Setting</p>
                    <p><BsGlobe/> English</p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer