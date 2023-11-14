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
    };

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

async function fetchItemList(){
    itemList.innerHTML = "";
    try{
        await fetch(`${apiUrl}/data`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((datas) => {
                datas.forEach((data) => {
                    const itemElement = document.createElement("div");
    
                    itemElement.innerHTML = `
                        <p>Name: ${data.itemName} --- Description: ${data.description} --- Price: ${data.price} </p>
                        <button onclick="updateServerQuantity(${data.id},1)">Buy 1</button>
                        <button onclick="updateServerQuantity(${data.id},2)">Buy 2</button>
                        <button onclick="updateServerQuantity(${data.id},3)">Buy 3</button>`;
                    itemList.appendChild(itemElement);
                });
            })
    }
     catch(err){
    console.log("error while fetching data",err);
    }
}
async function fetchCartList() {
    cartList.innerHTML="";
    try{
        const res = await fetch(`${apiUrl}/data`,{
            method:'GET',
        })
        if(res.ok){
            const data = await res.json();
            console.log(data);
            data.forEach((cartItem)=>{
                const cartItemElement = document.createElement("div");
                cartItemElement.innerHTML= `
                <p>${cartItem.itemName} -- ${cartItem.description} -- ${cartItem.price} -- ${cartItem.quantity} </p>`;
                cartList.appendChild(cartItemElement);
            })
        }else{
            console.log("error while fetching cartlist");
        }
    } 
    catch(err){
        console.log("Error fetching cart items:", err)
    }
}
function updateServerQuantity(itemId, newQuantity){
    fetch(`${apiUrl}/data/${itemId}`,{
        method:"Put",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({ quantity : newQuantity}),
    }).then((res)=>{
        if(!res.ok){
            console.log("error updating server")
        }
    fetchCartList();
    })
    .catch((err)=>console.log("error updating quantity on the server", err))
}

fetchItemList();
fetchCartList();
