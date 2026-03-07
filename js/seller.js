let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
const barcodeMap = {
    "111": "milk",
    "112": "apple",
    "113": "banana",
    "114": "tomato",
    "115": "potato",
    "116": "rice",
    "117": "flour",
    "118": "honey",
    "119": "ginger"
};
function saveInventory() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
}


function changeStock(index, value) {
    inventory[index].stock += value;
    if (inventory[index].stock < 0) {
        inventory[index].stock = 0;
    }
    saveInventory();
    renderInventory();
   
}
function renderInventory(){

    const list = document.getElementById("inventoryList");

    list.innerHTML = "";

    inventory.forEach((product, index) => {

        const row = document.createElement("div");

        row.className = "inventory-row";

        row.innerHTML = `
        <span>${product.name}</span>
        <span>₹${product.price}</span>
        
        <span>
            ${product.stock}
            ${product.stock < 3 ? " ⚠ Low" : ""}
        </span>

        <span class="action-buttons">
            <button onclick="changeStock(${index},1)">+</button>
            <button onclick="changeStock(${index},-1)">-</button>
        </span>
        `;
        
        list.appendChild(row);

    });

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
    localStorage.setItem("inventory", JSON.stringify(inventory));
    renderInventory();
    saveInventory();
    

    document.getElementById("newName").value = "";
    document.getElementById("newPrice").value = "";
    document.getElementById("newStock").value = "";
}

 
function scanBarcode() {

    const code = document
        .getElementById("barcodeInput")
        .value;

    const productName = barcodeMap[code];

    if (!productName) {
        alert("Unknown barcode");
        return;
    }

    const item = inventory.find(
        p => p.name.toLowerCase() === productName
    );

    if (!item) {
        alert("Product not in inventory");
        return;
    }

    item.stock += 1;

    saveInventory();
    renderInventory();
    

    alert(productName + " stock increased");
    document.getElementById("barcodeInput").value="";
}
renderInventory();