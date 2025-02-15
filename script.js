const products = [
{id: 1,name:"radio",Image:"https://m.media-amazon.com/images/I/710dct68n1L._SX425_.jpg",price:680},
{id: 2,name:"webcam",Image:"https://m.media-amazon.com/images/I/61-K2lXmHQL._SX425_.jpg",price:2000},
{id: 3,name:"laptop",Image:"https://m.media-amazon.com/images/I/510uTHyDqGL._SX569_.jpg",price:20000},
{id: 4,name:"laptop",Image:"https://techterms.com/img/xl/laptop_586.png",price:12000},
{id: 5,name:"smartwatch",Image:"https://m.media-amazon.com/images/I/513N9dw5IZL._AC_SS115_.jpg",price:1300},
{id: 6,name:"cycle",Image:"https://m.media-amazon.com/images/I/513+sf6xkVL._SY300_SX300_.jpg",price:13000},

]

function renderProducts(products,productList){
    const container=document.getElementById(productList);
    container.innerHTML=" ";
    products.forEach(product => {
        const productDiv=document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML= `
        <img src= "${product.Image}"/>
        <h3>${product.name}</h3>
        <h2>${product.price}</h2>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        `
        container.appendChild(productDiv);


    })
}
function sortProducts(criteria){
    if(criteria === "price"){
        return products.sort((a,b) => a.price-b.price);
    }
    return products;
}

document.getElementById("sortOptions")?.addEventListener("change",(Event)=>{
    const sortedProducts = sortProducts(Event.target.value);
    renderProducts(sortedProducts,"productList");
})

function addToCart(productId){
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert(`${product.name} is added to cart`)
    renderCart();
}

function renderCart(){
    const cart=JSON.parse(localStorage.getItem("cart")) || [];
    const container=document.getElementById("cartItems");
    container.innerHTML="";
    if(cart.length == 0){
        container.innerHTML="<h1>Your Cart is Empty</h>"
    }
    cart.forEach(item => {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-item");
        cartDiv.innerHTML=`
        <img src="${item.Image}"/>
        <h3>${item.name}</h3>
        <h2>${item.price}</h2>
        <button onclick="removeFromCart(${item.id})">Remove</button>
        `
        container.appendChild(cartDiv);


    })
}

function removeFromCart(productId){
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("product is removed successfully");
    renderCart();
}

function renderSubtotal(cart){
    const subtotal = cart.reduce((total,item) => total + item.price,0);
    const subtotalContainer = document.getElementById("subtotal");
    if(cart.length > 0){
         subtotalContainer.innerHTML = `Subtotal : Rs. ${subtotal}`
    }else{
        subtotalContainer.innerHTML = `No items in the cart`
    }
   
}
    function searchProducts(query){
        const filterProducts = products.filter(product =>
            product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
)
renderProducts(filterProducts,"productList");
    }

    document.getElementById("searchButton")?.addEventListener("click",() => {
        const query = document.getElementById("productSearch").value;
        searchProducts(query);
    })



if(document.getElementById("productList"))renderProducts(products,"productList");
if(document.getElementById("cartItems"))renderCart();


