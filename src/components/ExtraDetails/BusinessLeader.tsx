import { FaArrowRight } from "react-icons/fa6";
import '../../styles/Components/_subscription.scss'
import { NavLink } from "react-router-dom";

function BusinessLeader() {
  return (
    <section>
        <div className="Business-Container">
            <div className="Business-Grid">
                <div className="Grid1">
                    <h1>AI for Business  Leaders</h1>
                    <p>Build an AI-habit for you and your team that builds hands-on skills to help you lead effectively.</p>
                    <div className="Business-btn">
                        <p><NavLink to='/'>Start Learning <span><FaArrowRight/></span></NavLink></p>
                    </div>
                </div>
                <div className="Grid2">
                    <img src="https://cms-images.udemycdn.com/96883mtakkm8/32egVZ5YRgjxrz5mr45EwO/2328193d64d64dd0ab01b6019791da22/ai_for_business_leaders_photo__1_.png" alt="" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default BusinessLeader