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

function checkout() {
    alert("Payment Successful (Dummy Checkout)");
    localStorage.removeItem("cart");
    window.location.href = "buyer.html";
}

displayCart();