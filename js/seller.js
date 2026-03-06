let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

function saveInventory() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

function displayInventory() {
    const container = document.getElementById("inventoryList");
    container.innerHTML = "";

    inventory.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>
            <p>Stock: ${item.stock}</p>
            <button onclick="changeStock(${index}, 1)">+</button>
            <button onclick="changeStock(${index}, -1)">-</button>
        `;

        container.appendChild(div);
    });
}

function changeStock(index, value) {
    inventory[index].stock += value;
    if (inventory[index].stock < 0) {
        inventory[index].stock = 0;
    }
    saveInventory();
    displayInventory();
}

function addProduct() {
    const name = document.getElementById("newName").value;
    const price = parseInt(document.getElementById("newPrice").value);
    const stock = parseInt(document.getElementById("newStock").value);

    if (!name || !price || !stock) {
        alert("Fill all fields");
        return;
    }

    inventory.push({
    id: Date.now(),
    name,
    price,
    stock,
    shop: "Shop " + Math.floor(Math.random() * 3 + 1),
    distance: Math.floor(Math.random() * 10 + 1)
});

    saveInventory();
    displayInventory();

    document.getElementById("newName").value = "";
    document.getElementById("newPrice").value = "";
    document.getElementById("newStock").value = "";
}

displayInventory(); 