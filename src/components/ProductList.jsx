import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart, cartItems }) {
  return (
    <div className="product-list">
      {products.map((product) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        const quantityInCart = cartItem ? cartItem.quantity : 0;

        return (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            quantityInCart={quantityInCart}
          />
        );
      })}
    </div>
  );
}

export default ProductList;
