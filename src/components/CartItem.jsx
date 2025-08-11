function CartItem({ item, onRemoveFromCart, onAddToCart }) {
  return (
    <li>
      {item.name} - ${item.price} x {item.quantity} = $
      {item.price * item.quantity}
      <button className="minus" onClick={() => onRemoveFromCart(item.id)}>
        -
      </button>
      <button className="plus" onClick={() => onAddToCart(item)}>
        +
      </button>
    </li>
  );
}

export default CartItem;
