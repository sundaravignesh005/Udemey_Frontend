import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import "../../styles/Components/Auth/_cart.scss";
import { IoMdPricetag } from "react-icons/io";
import { MdOutlineVerified } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

function CartPage() {
  const { cartItems, fetchCart } = useCart();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [userId, fetchCart]);

  const totalPrice = cartItems.reduce(
    (sum, course) => sum + Number(course.price),
    0
  );

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <p>{cartItems.length} Course{cartItems.length !== 1 ? "s" : ""} in the Cart</p>
      <hr />
      {cartItems.length === 0 ? (
        <p>No courses in cart</p>
      ) : (
        <>
          <ul className="course-list">
            {cartItems.map((course) => (
              <div className="course-flex-container" key={course._id}>
                <div className="container-1">
                  <div className="course-cart-img">
                    <img
                      src={`http://localhost:8080/${course.path}`}
                      alt={course.title}
                      style={{ width: "130px", height: "auto" }}
                    />
                  </div>
                  <div className="course-cart-detail">
                    <h3>{course.title}</h3>
                    <p>{course.author}</p>
                    <div className="cart-level">
                      <p>{course.level}</p>
                      <p>{course.catogory}</p>
                    </div>
                    <div className="rating">
                      <p className="badge">Bestseller</p>
                      <div className="rating-value">4.7</div>
                      <div className="stars">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span style={{ color: "#ccc" }}>★</span>
                      </div>
                      <div className="rating-count">(3,456 ratings)</div>
                    </div>
                    <p className="Premium">
                      <span>
                        <MdOutlineVerified />
                      </span>
                      Premium
                    </p>
                  </div>
                  <div className="course-cart-operation">
                    <button>Remove</button>
                    <button>Save for later</button>
                    <button>Move to Wishlist</button>
                  </div>
                  <div className="course-price">
                    <p>
                      <span>
                        <IoMdPricetag />
                      </span>
                      {course.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ul>

          {/* Total and Checkout section */}
          <div className="container-2">
            <p>Total :</p>
            <p className="cost-price">
              <span><FaIndianRupeeSign /></span>{totalPrice}
            </p>
            <div className="checkout">
              <button>
                Proceed to Checkout <span><FaArrowRightLong /></span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
