const products = [
    { id: 1, name: "Honey", price: 120 },
    { id: 2, name: "Ginger", price: 40 },
    { id: 3, name: "Flour", price: 60 },
    { id: 4, name: "Cheese", price: 150 },
    { id: 5, name: "Tomato Sauce", price: 90 }
];

const intentMap = {
    cold: ["Honey", "Ginger"],
    pizza: ["Flour", "Cheese", "Tomato Sauce"]
};

function searchItems() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    let matchedProducts = [];

    for (let key in intentMap) {
        if (query.includes(key)) {
            matchedProducts = intentMap[key];
        }
    }

    if (matchedProducts.length === 0) {
        matchedProducts = products
            .filter(p => p.name.toLowerCase().includes(query))
            .map(p => p.name);
    }

    if (matchedProducts.length === 0) {
        resultsDiv.innerHTML = "<p>No items found</p>";
        return;
    }

    matchedProducts.forEach(item => {
        const p = document.createElement("p");
        p.textContent = item;
        resultsDiv.appendChild(p);
    });
}
function displayProducts() {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        grid.appendChild(card);
    });
}

displayProducts();