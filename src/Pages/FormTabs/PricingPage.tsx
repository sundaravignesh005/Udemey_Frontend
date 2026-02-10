import "../../styles/Components/Instructor/_pricepage.scss";
function PricingPage() {
  return (
    <section>
      <div className="price-container">
        <div className="Course-price-title">
          <h1>Pricing</h1>
        </div>
        <div className="price-content">
          <h3>Set a price for your course</h3>
          <p>
            Please select the currency and the price tier for your course. If
            you’d like to offer your <br /> course for free, it must have a
            total video length of less than 2 hours. Also, courses <br /> with
            practice tests can not be free.
          </p>
          <div className="basic-info">
            <form action="">
              <div className="price-select">
                <div className="info-block">
                  <form action=""></form>
                  <h3>Currency</h3>
                  <select name="currency">
                    <option value="">-- Select Currency --</option>
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
                <div className="info-block">
                  <h3>Price Tier</h3>
                  <select name="priceTier">
                    <option value="">-- Select Tier --</option>
                    <option value="Tier 1">Tier 1</option>
                    <option value="Tier 2">Tier 2</option>
                  </select>
                </div>
              </div>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingPage;
