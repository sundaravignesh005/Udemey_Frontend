import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface Order {
  _id: string;
  status: string;
  amount: number;
  createdAt: string;
  course: {
    _id: string;
    title: string;
    image?: string;
    path?: string;
    instructor?: string;
    videoUrl?: string;
  };
}

function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [needsLogin, setNeedsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAndSavePendingOrder = async () => {
      const paymentIntentId = localStorage.getItem("pendingPaymentIntentId");
      const courseId = localStorage.getItem("pendingCourseId");
      const price = localStorage.getItem("pendingPrice");

      if (paymentIntentId && courseId && price) {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            setNeedsLogin(true);
            return;
          }
          await axios.post(
            "http://localhost:8080/api/orders/verify-and-save",
            {
              paymentIntentId,
              courseId,
              amount: Number(price),
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          // Clear pending payment info
          localStorage.removeItem("pendingPaymentIntentId");
          localStorage.removeItem("pendingCourseId");
          localStorage.removeItem("pendingPrice");
        } catch (error) {
          console.error("Error verifying payment:", error);
        }
      }
    };

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setNeedsLogin(true);
          setLoading(false);
          return;
        }

        // First, verify and save any pending order
        await verifyAndSavePendingOrder();

        // Then fetch all orders
        const res = await axios.get("http://localhost:8080/api/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data.orders || []);
      } catch (error: any) {
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (needsLogin) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p style={{ fontSize: "18px", color: "#6a6f73", marginBottom: "16px" }}>
          Please log in to view your orders.
        </p>
        <Link
          to="/login"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            background: "#a435f0",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: 700,
          }}
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "24px", color: "#1c1d1f" }}>
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div style={{ 
          padding: "60px 20px", 
          textAlign: "center",
          background: "#f7f9fa",
          borderRadius: "8px"
        }}>
          <p style={{ fontSize: "18px", color: "#6a6f73", marginBottom: "16px" }}>
            No purchases yet.
          </p>
          <Link
            to="/courses"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "#a435f0",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: 700,
            }}
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {orders.map((order) => {
            const courseImage = order.course?.image
              ? (order.course.image.startsWith("http")
                  ? order.course.image
                  : `http://localhost:8080/${order.course.image.replace(/\\/g, "/").replace(/^\//, "")}`)
              : order.course?.path
              ? `http://localhost:8080/${order.course.path.replace(/\\/g, "/").replace(/^\//, "")}`
              : "";

            const purchaseDate = new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <div
                key={order._id}
                style={{
                  border: "1px solid #d1d7dc",
                  borderRadius: "8px",
                  padding: "24px",
                  background: "#fff",
                  display: "flex",
                  gap: "20px",
                  alignItems: "flex-start",
                }}
              >
                {courseImage && (
                  <img
                    src={courseImage}
                    alt={order.course?.title || "Course"}
                    style={{
                      width: "200px",
                      height: "112px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      flexShrink: 0,
                    }}
                  />
                )}

                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: "20px", 
                    fontWeight: 700, 
                    marginBottom: "8px",
                    color: "#1c1d1f"
                  }}>
                    {order.course?.title || "Unknown Course"}
                  </h3>

                  {order.course?.instructor && (
                    <p style={{ 
                      fontSize: "14px", 
                      color: "#6a6f73", 
                      marginBottom: "12px" 
                    }}>
                      by {order.course.instructor}
                    </p>
                  )}

                  <div style={{ 
                    display: "flex", 
                    gap: "24px", 
                    alignItems: "center",
                    marginTop: "16px",
                    flexWrap: "wrap"
                  }}>
                    <div>
                      <span style={{ fontSize: "14px", color: "#6a6f73" }}>Price: </span>
                      <span style={{ fontSize: "18px", fontWeight: 700, color: "#1c1d1f" }}>
                        ₹{order.amount}
                      </span>
                    </div>

                    <div>
                      <span style={{ fontSize: "14px", color: "#6a6f73" }}>Purchased: </span>
                      <span style={{ fontSize: "14px", color: "#1c1d1f" }}>{purchaseDate}</span>
                    </div>

                    <div>
                      <span style={{ 
                        padding: "4px 12px",
                        background: "#d1fae5",
                        color: "#065f46",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: 700
                      }}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {order.status === "Paid" && order.course?._id && (
                    <Link
                      to={`/my-learning/${order.course._id}`}
                      style={{
                        display: "inline-block",
                        marginTop: "16px",
                        padding: "12px 24px",
                        background: "#a435f0",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "4px",
                        fontSize: "16px",
                        fontWeight: 700,
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#8710d8";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#a435f0";
                      }}
                    >
                      Continue Learning →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyOrdersPage;

