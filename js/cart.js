let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    document.getElementById("cartCount").textContent = cart.length;
}

updateCartCount();