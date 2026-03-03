const products = [
    { name: "Honey", shop: "Shop A" },
    { name: "Ginger", shop: "Shop B" },
    { name: "Flour", shop: "Shop A" },
    { name: "Cheese", shop: "Shop C" },
    { name: "Tomato Sauce", shop: "Shop B" }
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