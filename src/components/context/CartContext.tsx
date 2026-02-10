import axios from "axios";
import { useState, useContext, createContext } from "react";


interface Course {
  _id: string;
  title: string;
  author:string;
  price: string;
  level: string;
  catogory: string;
  path: string;
}

interface CartContextType {
  cartItems: Course[];
  fetchCart: (userId: string) => Promise<void>;
  addToCart: (userId: string, courseId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Course[]>([]);

  const fetchCart = async (userId: string) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/courseCreation/get-cart/${userId}`
      );
      setCartItems(res.data.courses || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };
  const addToCart = async (userId: string, courseId: string) => {
    console.log("Sending POST to add to cart:", { userId, courseId });
     if (cartItems.some((c) => c._id === courseId)) {
        console.log("Already in cart");
        return;
      }
    try {
      const response = await axios.post(
        "http://localhost:8080/courseCreation/add-cart",
        {
          userId,
          courseId,
        }
      );
      if (response.status === 200 || response.status === 201) {
        await fetchCart(userId);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  return (
    <CartContext.Provider value={{ cartItems, fetchCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
