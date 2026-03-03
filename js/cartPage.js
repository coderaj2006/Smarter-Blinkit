let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
    const cartDiv = document.getElementById("cartItems");
    const totalPriceEl = document.getElementById("totalPrice");

    cartDiv.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <button onclick="removeItem(${index})">Remove</button>
        `;

        cartDiv.appendChild(div);
    });

    totalPriceEl.textContent = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function checkout() {
    alert("Payment Successful (Dummy Checkout)");
    localStorage.removeItem("cart");
    window.location.href = "buyer.html";
}

displayCart();