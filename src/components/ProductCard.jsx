function ProductCard({ product, onAddToCart, quantityInCart }) {
  const isOutOfStock = product.stock <= quantityInCart;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-content">
        <div className="product-info">
          <div className="product-name">{product.name}</div>
          <div className="product-price">${product.price}</div>
        </div>

        {isOutOfStock ? (
          <p className="out-of-stock-message">Out of stock</p>
        ) : (
          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
