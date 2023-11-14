const apiUrl = "http://localhost:3000";

const form = document.getElementById("candyShopForm");
const itemList = document.getElementById("itemList");
const cartList = document.getElementById("cartList");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
        itemName: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        quantity: formData.get("quantity")
    };

    try {
        const res = await fetch(`${apiUrl}/data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Corrected typo here
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            console.log("data retrieved successfully");
            form.reset();
            fetchItemList();
            fetchCartList();
        } else {
            console.log("error occurred while submitting data");
        }
    } catch (err) {
        console.log("error occurred", err);
    }
});

function fetchItemList() {
    itemList.innerHTML = "";

    fetch(`${apiUrl}/data`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then((datas) => {
            datas.forEach((data) => {
                const itemElement = document.createElement("div");

                itemElement.innerHTML = `
                    <p>Name: ${data.itemName} --- Description: ${data.description} --- Price: ${data.price} --- Quantity: ${data.quantity} </p>
                    <button onclick="addToCart(${JSON.stringify(data)}, 1)">Buy 1</button>
                    <button onclick="addToCart(${JSON.stringify(data)}, 2)">Buy 2</button>
                    <button onclick="addToCart(${JSON.stringify(data)}, 3)">Buy 3</button>`;
                itemList.appendChild(itemElement);
            });

            form.reset(); // Moved outside the forEach loop
        });
}

function addToCart(item, quantity = 1) {
    var cartList = document.getElementById('cartList');

    if (item.quantity >= quantity) {
        item.quantity -= quantity;

        var cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = `<p>${item.name} -- ${item.description} --- ${item.price} (Quantity: ${quantity})</p>`; // Corrected innerHtml
        cartList.appendChild(cartItemElement);
    } else {
        alert("Not enough quantity available");
    }
}
