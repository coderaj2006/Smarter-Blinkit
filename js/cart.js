let cart = JSON.parse(localStorage.getItem("cart")) || [];
function addToCart(productId) {

    const product = products
        .filter(p => p.name === products.find(x => x.id === productId).name)
        .sort((a, b) => a.distance - b.distance)[0];

    console.log(
        "Order routed to:",
        product.shop,
        "| Distance:",
        product.distance + " km"
    );

    cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    shop: product.shop,
    distance: product.distance
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    document.getElementById("cartCount").textContent = cart.length;
}

updateCartCount();