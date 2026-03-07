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
async function searchProducts() {

    const query = document.getElementById("searchInput").value;

    const response = await fetch("http://localhost:3000/ai-intent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    });

    const data = await response.json();

    const items = data.items
  .toLowerCase()
  .split(",")
  .map(i => i.trim());

    const results = products.filter(p =>
        items.some(item => item.includes(p.name.toLowerCase()))
);

    renderProducts(results);
    showAddAllButton(results);
}
function addAllToCart(products){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    products.forEach(product => {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            shop: product.shop,
            distance: product.distance
        });

    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("All items added to cart");
}
function showAddAllButton(products){

    const container = document.getElementById("assistantResponse");

    if(products.length === 0){
        container.innerHTML = "";
        return;
    }

    container.innerHTML = `
        <button onclick='addAllToCart(${JSON.stringify(products)})'>
        Add all suggested items to cart
        </button>
    `;
}

// ---------- Initial Page Load ----------
renderProducts(products);