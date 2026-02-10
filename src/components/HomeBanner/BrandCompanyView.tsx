import "../../styles/Components/_brandview.scss";
import { BrandData } from "../../data/course";
import { CardSlider } from "../Features/CardSlider";
function BrandCompanyView() {
  return (
    <section>
      <div className="Brand-container">
        <h2>
          Trusted by over 16,000 companies and millions of learners around the
          world
        </h2>
        <div className="Brand-Partner">
            <ul className="Brand-list">
                {BrandData.map((brand=>(
                    <li key={brand.id}>
                        <img src={brand.img} alt="" />
                    </li>
                )))}
            </ul>
        </div>
      </div>
      <CardSlider/>
    </section>
  );
}

export default BrandCompanyView;
