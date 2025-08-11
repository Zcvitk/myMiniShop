import CartItem from "./CartItem";
import React from "react";
import { useState } from "react";

function Cart({ items, onRemoveFromCart, onAddToCart, user, onClearCart }) {
  const [message, setMessage] = useState("");
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleBuy = () => {
    setMessage(`Thank you for your purchase${user ? `, ${user}` : ""}!`);
    onClearCart();
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="cart">
      <h3>Shopping cart: {totalQuantity}</h3>

      {message && <p className="purchase-message">{message}</p>}

      {items.length === 0 ? (
        <p>Empty cart</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemoveFromCart={onRemoveFromCart}
                onAddToCart={onAddToCart}
              />
            ))}
          </ul>

          <p className="cart-total">
            {user
              ? `${user}'s subtotal: ${totalPrice}`
              : `Guest's subtotal: ${totalPrice}`}
          </p>
        </>
      )}

      <button
        className="buy-btn"
        onClick={handleBuy}
        disabled={items.length === 0}
      >
        Buy
      </button>
      <button className="clear-cart-btn" onClick={onClearCart}>
        Clear cart
      </button>
    </div>
  );
}

export default Cart;
