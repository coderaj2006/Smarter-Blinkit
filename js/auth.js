function loginUser() {
    const role = document.getElementById("role").value;

    if (role === "buyer") {
        window.location.href = "buyer.html";
    } else if (role === "seller") {
        window.location.href = "seller.html";
    } else {
        alert("Please select a role");
    }
}