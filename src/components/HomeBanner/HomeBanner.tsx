import "../../styles/Components/_homebanner.scss";
import { NavLink } from "react-router-dom";
import { courseCard } from "../../data/course";
import { FaStar } from "react-icons/fa";

function HomeBanner() {
  return (
    <section>
      <div className="Ad-Banner">
        <div className="Ad-Banner-img">
          <img
            src="	https://img-c.udemycdn.com/notices/web_carousel_slide/image/736cd7ed-d5ca-4efe-9e8d-2eb845e414cb.png"
            alt="Udemy-Banner"
          />
          <div className="Banner-box">
            <h1>
              Skills that drive you <br />
              forward
            </h1>
            <p>
              Technology and the world of work change fast — with us, <br />{" "}
             
            </p>
            <div className="View-Plan">
              <p>
        <NavLink to="/view-plan">View Plans</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="Built-Your-Carrier">
        <div className="Built-Your-Carrier-title">
          <h1>Ready to reimagine your career?</h1>
          <p>
            Get the skills and real-world experience employers want with Career
            Accelerators.
          </p>
        </div>
        <div className="Course-Card-item">
          <div className="Course-Card-Grid">
            {courseCard.map((item) => (
              <NavLink to="/" key={item.id}>
                <div className="Course-card" >
                  <img src={item.img} alt="" />
                  <h3>{item.CourseName}</h3>
                  <div className="course-rating">
                    <p>
                      <FaStar /> {item.Rating}
                    </p>
                    <p>{item.TotalRating}</p>
                    <p>{item.TotalHours}</p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <p className="All-carrer"><NavLink to='/'>All Carrer Acclerators</NavLink></p>
      </div>
    </section>
  );
}

export default HomeBanner;
