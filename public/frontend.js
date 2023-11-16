//backend connect with apiUrl
const apiUrl = "http://localhost:3000";

// required element to start work for webpage function
const form = document.getElementById("candyShopForm");
const itemList = document.getElementById("itemList");
const cartList = document.getElementById("cartList");

//added eventListener for submit button (add item)
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    //retrievong data from form
    const formData = new FormData(form);
    const data = {
        itemName:    formData.get("name"),
        description: formData.get("description"),
        price:       formData.get("price"),
        quantity:    formData.get("quantity"),
    };
    //using post method to retrieve data from form
    try {
        const res = await fetch(`${apiUrl}/data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            console.log("data retrieved successfully");
            //after retrieving data form got reset 
            form.reset();
            //fetch itemlist got called to retrieve data from database
            fetchItemList();
        } else {
            console.log("error occurred while submitting data");
        }
    } catch (err) {
        console.log("error occurred", err);
    }
});

// Function to fetch item list from the server
async function fetchItemList(){
    itemList.innerHTML = "";
    cartList.innerHTML = "";
    try{
        await fetch(`${apiUrl}/data`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((datas) => {
                datas.forEach((data) => {
                    const itemElement = document.createElement("div");
                    itemElement.innerHTML = `
                        <p>Name: ${data.itemName} --- Description: ${data.description} --- Price: ${data.price} --- Quantity : ${data.quantity} </p>
                        <button onclick="updateQuantity(${data.id},1)">Buy 1</button>
                        <button onclick="updateQuantity(${data.id},2)">Buy 2</button>
                        <button onclick="updateQuantity(${data.id},3)">Buy 3</button>
                        `;
                    itemList.appendChild(itemElement);
                        
                    //if cartItem quantituy is greater than zero, its html part
                    if(data.quantity > 0){
                        const cartItemElement = document.createElement("div");
                        cartItemElement.innerHTML= `
                        <p>${data.itemName} -- ${data.description} -- ${data.price} -- ${data.quantity} </p>
                        <button onclick="updateQuantity(${data.id},-1)">Delete 1</button>`;
                        cartList.appendChild(cartItemElement);
                    } 
                });
            })  
        }catch(err){
            console.log("error while fetching data",err);
        }
}
// Function to update server quantity and fetch item list
async function updateQuantity(itemId, newQuantity){
    
    await fetch(`${apiUrl}/data/${itemId}`,{
        method:"Put",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({ quantity : newQuantity}),
    })
    try{
        (res)=>{
            if(!res.ok){
                console.log("error updating server")
            }
        fetchItemList(); // Fetch the updated item list immediately after an update
        }
    }catch(err){
        console.log("error updating quantity on the server", err)
    }
}
fetchItemList();

// setInterval(fetchItemList, 5000);
