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
    list.sort((a, b) => a.distance - b.distance);
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
const categoryMap = {

    fruits: ["apple","banana","mango","orange"],

    vegetables: ["potato","tomato","onion","carrot"],

    dairy: ["milk","cheese","yogurt","butter"],

    bakery: ["flour","bread","cake"]

};

// ---------- Search Logic ----------
function searchProducts(){

    const query = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    console.log("User query:", query);

    let results = [];

    for(const key in intentMap){

    if(query.includes(key)){

        console.log("Intent matched:", key);

        results = products.filter(p =>
            intentMap[key].includes(p.name.toLowerCase().trim())
        );

        console.log("Filtered results:", results);

        break;
        }
    }
    if(results.length === 0){
    results = products.filter(p =>
        p.name.toLowerCase().includes(query)
    );
}

    renderProducts(results);
    showAddAllButton(results);

}
function showAddAllButton(products){

    const container = document.getElementById("assistantResponse");

    if(products.length === 0){
        container.innerHTML = "";
        return;
    }

    container.innerHTML = `
    <p class="assistant-text">
    Assistant Suggestion: These ingredients may help.
    </p>

    <button onclick='addAllToCart(${JSON.stringify(products)})'>
    Add all suggested items to cart
    </button>
    `;
}
function filterCategory(category){

    if(category === "all"){
        renderProducts(products);
        return;
    }

    const items = categoryMap[category];

    const results = products.filter(p =>
        items.includes(p.name.toLowerCase().trim())
    );

    renderProducts(results);

}
function addAllToCart(products){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();
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


// ---------- Initial Page Load ----------
renderProducts(products);