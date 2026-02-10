import { Link } from "react-router-dom";
import "../../styles/Components/Auth/_topcourse.scss";
import Rating from "../Features/Rating";
import { MdOutlineVerified } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
function TopPick() {
  return (
    <section>
      <div className="Top-Pick">
        <h1>Our top pick for you</h1>
        <Link to="/">
          <div className="top-pick-container">
            <div className="top-pick-img">
            </div>
            <div className="top-pick-content">
              <h1>
                MongoDB - The Complete Developer's <br /> Guide 2025
              </h1>
              <p>Master MongoDB Development for Web & Mobile Apps.CRUD</p>
              <p>
                Operations,Indexes,Aggreation FrameWork - All about MongoDB!
           </p>
              <p className="Author">
                {" "} By Academind by Maximilian Schwarzmullar and 1 other </p>
              <p className="updates">
                Updated <span>January 2025</span>17.5 total hours 266 lectures
                All Levels{" "}
              </p>
              <div className="rating">
                <Rating value={4.6} review={26993} />
                <div className="btn">
                  <p className="Premium">
                    <span>
                      <MdOutlineVerified />
                    </span>
                    Premium
                  </p>
                  <p className="badge">Bestseller</p>
                </div>
              </div>
              <div className="Price">
                <h4>
                  <FaIndianRupeeSign />
                   569
                </h4>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
export default TopPick;
