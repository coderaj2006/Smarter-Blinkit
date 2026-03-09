let cart = JSON.parse(localStorage.getItem("cart")) || [];
function groupCartByShop(cart) {

    const grouped = {};

    cart.forEach(item => {

        if (!grouped[item.shop]) {
            grouped[item.shop] = [];
        }

        grouped[item.shop].push(item);

    });

    return grouped;
}
function displayCart() {

    const cartDiv = document.getElementById("cartItems");
    const totalPriceEl = document.getElementById("totalPrice");

    cartDiv.innerHTML = "";

    let total = 0;

    const groupedCart = groupCartByShop(cart);

    for (const shop in groupedCart) {

        const shopTitle = document.createElement("h3");
        shopTitle.textContent = shop;
        cartDiv.appendChild(shopTitle);

        groupedCart[shop].forEach((item, index) => {

            total += item.price;

            const div = document.createElement("div");
            div.className = "card";

            div.innerHTML = `
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <button onclick="removeItem(${item.id})">Remove</button>
            `;

            cartDiv.appendChild(div);

        });

    }

    totalPriceEl.textContent = total;
}

function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

function checkout(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

    cart.forEach(item => {

        const product = inventory.find(p =>
            p.name === item.name && p.shop === item.shop
        );

        if(product){
            product.stock -= 1;

            if(product.stock < 0){
                product.stock = 0;
            }
        }

    });

    localStorage.setItem("inventory", JSON.stringify(inventory));

    alert("Payment Successful");

    localStorage.removeItem("cart");

    window.location.href = "buyer.html";

}
function optimizeCart(cart){

    const grouped = {};

    // group items by product name
    cart.forEach(item => {

        if(!grouped[item.name]){
            grouped[item.name] = [];
        }

        grouped[item.name].push(item);

    });

    const optimized = [];

    for(const name in grouped){

        const items = grouped[name];

        // sort by price + distance
        items.sort((a,b) => (a.price + a.distance) - (b.price + b.distance));

        optimized.push(...items);

    }

    return optimized;

}
function optimizeCartUI(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const optimized = optimizeCart(cart);

    localStorage.setItem("cart", JSON.stringify(optimized));

    displayCart();

    alert("Cart optimized using nearest sellers");

}

displayCart();