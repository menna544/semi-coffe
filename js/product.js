let openshop = document.querySelector('.shopping');
let closeshop = document.querySelector('.closeshopping');
let list = document.querySelector('.list');
let listcard = document.querySelector('.listcard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openshop.addEventListener('click', () => {
  body.classList.add('active');
});

closeshop.addEventListener('click', () => {
  body.classList.remove('active');
});

let products = [
  {
    id: 1,
    name: 'Latte',
    image: 'pro1.png',
    price: 35
  },
  {
    id: 2,
    name: 'Caramel Ice Coffee',
    image: 'bg-preview.png',
    price: 10
  },
  {
    id: 3,
    name: 'Milk or Milk Substitute',
    image: 'images__4_-removebg-preview.png',
    price: 15
  },
  {
    id: 4,
    name: 'Espresso',
    image: 'avvv-removebg-preview.png',
    price: 10
  },
  {
    id: 5,
    name: 'Green Coffee',
    image: 'pro4-removebg-preview.png',
    price: 30
  },
  {
    id: 6,
    name: 'Hot Chocolate',
    image: 'pro2-removebg-preview.png',
    price: 15
  },
  {
    id: 7,
    name: 'Oleato™ Caffé Latte with Oatmilk',
    image: 'pro3-removebg-preview.png',
    price: 10
  },
  {
    id: 8,
    name: 'Espresso Costa Coffee',
    image: '1505317-removebg-preview.png',
    price: 30
  },
  {
    id: 9,
    name: 'Flat White',
    image: '67728-removebg-preview.png',
    price: 30
  }
];

let listcards = {};

function initapp() {
  products.forEach((value, key) => {
    let newdiv = document.createElement('div');
    newdiv.classList.add('item');
    newdiv.innerHTML = `
      <img src="../images/${value.image}"/>
      <div class="name">${value.name}</div>
      <div class="price">${value.price.toLocaleString()} $</div>
      <button onclick="addtocart(${value.id})">Add to cart</button>
    `;
    list.appendChild(newdiv);
  });
}

initapp();

function addtocart(productId) {
  Swal.fire({
    title: "Good job!",
    text: "added successfully!",
    icon: "success",
  });
  if (listcards[productId] == null) {
    listcards[productId] = products.find((product) => product.id === productId);
    listcards[productId].quantity = 1;
  } else {
    listcards[productId].quantity++;
    
  }
  reloadcard();
}

function reloadcard() {
  listcard.innerHTML = '';
  let count = 0;
  let totalprice = 0;

  for (const productId in listcards) {
    const value = listcards[productId];
    totalprice += value.price * value.quantity;
    count += value.quantity;

    let newdiv = document.createElement('li');
    newdiv.innerHTML = `
      <div><img src="../images/${value.image}"/></div>
      <div>${value.name}</div>
      <div>${(value.price * value.quantity).toLocaleString()} $</div>
      <div>${value.quantity}</div>
      <div>
        <button onclick="changequantity(${productId}, ${value.quantity - 1})">-</button>
        <div class="count">${value.quantity}</div>
        <button onclick="changequantity(${productId}, ${value.quantity + 1})">+</button>
      </div>
    `;
    listcard.appendChild(newdiv);
  }

  total.innerText = totalprice.toLocaleString();
  quantity.innerText = count;
}

function changequantity(productId, quantity) {
  if (listcards[productId]) {
    if (quantity === 0) {
      delete listcards[productId];
    } else {
      listcards[productId].quantity = quantity;
    }
    reloadcard();
  }
}
function sendProductsToWhatsApp() {
  if (Object.keys(listcards).length === 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Your cart is empty!",
    });
    return;
  }

  // Retrieve the user's email from local storage
  const userEmail = localStorage.getItem("userEmail");

  if (!userEmail) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "User email not found in local storage!",
    });
    return;
  }

  let whatsappMessage = `My Shopping Cart for ${userEmail}:\n`;

  for (const productId in listcards) {
    const product = listcards[productId];
    whatsappMessage += `${product.name}\nPrice: $${product.price}\nQuantity: ${product.quantity}\n\n`;
  }

  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappLink = `https://wa.me/+201097315496?text=${encodedMessage}`;

  window.open(whatsappLink);
}


function goback() {
  location.replace("index.html");
}
function logout(){
  localStorage.removeItem("userEmail"); 
  location.replace("signinup.html");
}
