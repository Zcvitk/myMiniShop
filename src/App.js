import { useEffect, useState } from "react";
import "./index.css";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import products from "./products";

function App() {
  const [user, setUser] = useState(() => localStorage.getItem("user") || "");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

  const getAllUsers = () => {
    return JSON.parse(localStorage.getItem("users") || "[]");
  };

  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const getExistingUser = (name) => {
    return getAllUsers().find((u) => u.name === name);
  };

  const registerNewUser = (name, password) => {
    const newUser = { name, password };
    const users = [...getAllUsers(), newUser];
    saveUsers(users);
  };

  const loginUser = (name) => {
    setUser(name);
    localStorage.setItem("user", name);
    setUsernameInput("");
    setPasswordInput("");
  };

  const handleLoginOrRegister = () => {
    const name = usernameInput.trim();
    const password = passwordInput.trim();

    if (!name || !/^\d{4,8}$/.test(password)) {
      alert("Please enter a valid username and a 4–8 digit numeric password.");
      return;
    }

    const existingUser = getExistingUser(name);

    if (existingUser) {
      if (existingUser.password === password) {
        loginUser(name);
      } else {
        alert("Incorrect password.");
      }
    } else {
      registerNewUser(name, password);
      loginUser(name);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "" ||
        product.category.toLowerCase().trim() ===
          selectedCategory.toLowerCase().trim())
  );

  function addToCart(product) {
    setCartItems((curItems) => {
      const itemInCart = curItems.find((item) => item.id === product.id);
      const curQuantity = itemInCart ? itemInCart.quantity : 0;

      if (curQuantity >= product.stock) return curItems;

      if (itemInCart) {
        return curItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...curItems, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCartItems((curItems) =>
      curItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <div className="App">
      <header className="header">
        <h1 className="shop-heading">🛒 My Mini Shop 🎁</h1>

        {!user ? (
          <div className="login-form">
            <p>User login:</p>
            <input
              type="text"
              placeholder="Enter your name"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter 4-8 digit password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLoginOrRegister();
              }}
            />
          </div>
        ) : (
          <div className="user-info">
            <span className="greeting">Hi, {user}!</span>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("user");
                setUser("");
              }}
            >
              Logout
            </button>
          </div>
        )}
      </header>

      <div className="top-row">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <div className="main-layout">
        <ProductList
          products={filteredProducts}
          onAddToCart={addToCart}
          cartItems={cartItems}
        />
        <Cart
          items={cartItems}
          onRemoveFromCart={removeFromCart}
          onAddToCart={addToCart}
          user={user}
          onClearCart={clearCart}
        />
      </div>
    </div>
  );
}

export default App;
