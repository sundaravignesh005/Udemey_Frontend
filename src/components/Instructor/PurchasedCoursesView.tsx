import { useEffect, useState } from "react";
import axios from "axios";

interface Purchase {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  course: {
    _id: string;
    title: string;
    price: number;
  };
  price: number;
  createdAt: string;
}

function PurchasedCoursesView() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const instructorId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        // Fetch all orders for courses created by this instructor
        const res = await axios.get(
          `http://localhost:8080/api/instructor/${instructorId}/purchases`
        );
        setPurchases(res.data.purchases || []);
      } catch (err) {
        console.error("Error fetching purchases:", err);
      } finally {
        setLoading(false);
      }
    };

    if (instructorId) {
      fetchPurchases();
    }
  }, [instructorId]);

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading purchases...</div>;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Course Purchases</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        View all students who purchased your courses
      </p>

      {purchases.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", background: "#f7f9fa", borderRadius: "8px" }}>
          <p>No purchases yet. Students will appear here after they purchase your courses.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {purchases.map((purchase) => (
            <div
              key={purchase._id}
              style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                background: "white",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <h3 style={{ margin: "0 0 10px 0" }}>{purchase.course.title}</h3>
                  <p style={{ margin: "5px 0", color: "#666" }}>
                    <strong>Student:</strong> {purchase.user.name} ({purchase.user.email})
                  </p>
                  <p style={{ margin: "5px 0", color: "#666" }}>
                    <strong>Price:</strong> ₹{purchase.price}
                  </p>
                  <p style={{ margin: "5px 0", color: "#666" }}>
                    <strong>Purchased:</strong>{" "}
                    {new Date(purchase.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div
                  style={{
                    padding: "8px 16px",
                    background: "#A435F0",
                    color: "white",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                >
                  Paid
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {purchases.length > 0 && (
        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            background: "#f7f9fa",
            borderRadius: "8px",
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <strong>Total Purchases:</strong> {purchases.length}
          </div>
          <div>
            <strong>Total Revenue:</strong> ₹
            {purchases.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
          </div>
          <div>
            <strong>Unique Students:</strong>{" "}
            {new Set(purchases.map((p) => p.user._id)).size}
          </div>
        </div>
      )}
    </div>
  );
}

export default PurchasedCoursesView;


