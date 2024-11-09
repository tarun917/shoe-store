import React, { useState } from "react";
import "./App.css";

// Mock data for shoes
const shoeData = [
  { id: 1, name: "Ampus A", price: 50, image: "https://th.bing.com/th?id=OIP.uhlH_kKHKAv1YWCelc4icgHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
  { id: 2, name: "Campus B", price: 75, image: "https://th.bing.com/th?id=OIP.mNcR45ZaAuxavw6ptQoJdgHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
  { id: 3, name: "White C", price: 70, image: "https://th.bing.com/th?id=OIP.lk6p0wdggUQItz8QwCHyIQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
  { id: 4, name: "Macr D", price: 90, image: "https://th.bing.com/th?id=OIP.DE9CkHZ9XyiCAMxsi4j9pgAAAA&w=249&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
  { id: 5, name: "Campus 1", price: 60, image: "https://th.bing.com/th/id/OIP.HA7YyyUkGJ_lxsho7UP7ZgHaHa?pid=ImgDet&w=189&h=189&c=7&dpr=1.5"},
  { id: 6, name: "Campus 2", price: 65, image: "https://th.bing.com/th?id=OIP.uhlH_kKHKAv1YWCelc4icgHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
  { id: 7, name: "Campus 3", price: 40, image: "https://th.bing.com/th?id=OIP.uhlH_kKHKAv1YWCelc4icgHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
  { id: 8, name: "Campus 4", price: 30, image: "https://th.bing.com/th?id=OIP.DE9CkHZ9XyiCAMxsi4j9pgAAAA&w=249&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
  { id: 9, name: "Campus 5", price: 60, image: "https://th.bing.com/th?id=OIP.mNcR45ZaAuxavw6ptQoJdgHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
  { id: 10, name: "Campus 6", price: 85, image: "https://th.bing.com/th/id/OIP.HA7YyyUkGJ_lxsho7UP7ZgHaHa?pid=ImgDet&w=189&h=189&c=7&dpr=1.5" },
  { id: 11, name: "Campus 7", price: 90, image: "https://th.bing.com/th?id=OIP.uhlH_kKHKAv1YWCelc4icgHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },
  { id: 12, name: "Campus 8", price: 76, image: "https://th.bing.com/th?id=OIP.uhlH_kKHKAv1YWCelc4icgHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" },

];

// ShoeItem component for displaying individual shoe items
function ShoeItem({ shoe, addToCart }) {
  return (
    <div className="shoe-card">
      <img src={shoe.image} alt={shoe.name} />
      <h3>{shoe.name}</h3>
      <p>${shoe.price}</p>
      <button onClick={() => addToCart(shoe)}>Add to Cart</button>
    </div>
  );
}

// Cart component for displaying the shopping cart
function Cart({ cartItems, updateQuantity, removeFromCart }) {
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <span>{item.name}</span>
          <span>${item.price}</span>
          <div className="quantity-controls">
            <button onClick={() => updateQuantity(item, -1)} disabled={item.quantity === 1}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item, 1)}>+</button>
          </div>
          <button className="remove" onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${calculateTotal().toFixed(2)}</h3>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (shoe) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === shoe.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === shoe.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...shoe, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (item, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + amount }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <nav className="navbar">
        <img className="image" src="https://th.bing.com/th/id/OIP.lSfJgqfW_RqKD5XESTPrIQHaHa?w=187&h=186&c=7&r=0&o=5&dpr=1.5&pid=1.7"></img>
        <a href="#">Home</a>
        <a href="#">Categories</a>
        <a href="#">About Us</a>


      </nav>
      <header className="header">
        <h1>Shoe Store</h1>
      </header>
      <div className="content">
        <div className="shoes-list">
          {shoeData.map((shoe) => (
            <ShoeItem key={shoe.id} shoe={shoe} addToCart={addToCart} />
          ))}
        </div>
        <Cart cartItems={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
      </div>
    </div>
  );
}

export default App;
