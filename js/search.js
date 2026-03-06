// Load products from seller inventory
let products = JSON.parse(localStorage.getItem("inventory")) || [];
const imageMap = {
    apple: "apple.jpg",
    banana: "banana.jpg",
    cheese: "cheese.jpg",
    flour: "flour.jpg",
    ginger: "ginger.jpg",
    honey: "honey.jpg",
    milk: "milk.jpg",
    potato: "potato.jpg",
    rice: "rice.jpg",
    tomato: "tomato.jpg"
};
// ---------- Product Renderer ----------
function renderProducts(list) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    if (list.length === 0) {
        grid.innerHTML = "<p>No products found</p>";
        return;
    }

    list.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="assets/products/${imageMap[product.name.toLowerCase()] || 'apple.jpg'}"
     class="product-img">

            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <p>Seller: ${product.shop}</p>
            <p>Distance: ${product.distance} km</p>

            <button onclick="addToCart(${product.id})">Add to Cart</button>
`;

        grid.appendChild(card);
    });
}

// ---------- Intent Map ----------
const intentMap = {
    cold: ["honey", "ginger", "lemon"],
    cough: ["honey", "ginger"],
    breakfast: ["milk", "banana", "apple"],
    salad: ["tomato", "carrot"],
    baking: ["flour", "sugar", "butter"],
    energy: ["banana", "milk"],
    pizza: ["flour", "cheese", "tomato"]
};

// ---------- Search Logic ----------
function searchProducts() {

    const query = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let results = [];

    // Intent-based search
    for (const key in intentMap) {
        if (query.includes(key)) {

            results = products.filter(p =>
                intentMap[key].includes(p.name.toLowerCase())
            );

            break;
        }
    }

    // fallback: normal product name search
    if (results.length === 0) {
        results = products.filter(p =>
            p.name.toLowerCase().includes(query)
        );
    }

    renderProducts(results);
}

// ---------- Initial Page Load ----------
renderProducts(products);