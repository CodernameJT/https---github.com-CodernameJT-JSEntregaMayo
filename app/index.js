// Galeria comida App 
import {myData} from './data.js';
const mySection = document.getElementById("articles-container");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const closeCartButton = document.getElementById("closeCart");
const toggleCartButton = document.getElementById("toggleCart");

let cart = []; //aca guardo todos los platos que elegí todos los platos. 

//agrega al carrito, primero verifica que no haya elegido el plato antes.
function addToCart(item) {
  // Verificando si el plato ya está en el carrito
  const alreadyInCart = cart.some((cartItem) => cartItem.title === item.title);

  if (alreadyInCart) {
    alert("Ya elegiste esta receta!");
  } else {
    cart.push(item);
    renderCart();
  }
}

//veo lo que contiene el carrito de comidas seleccionado 
function updateCartInLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

function createCartItem(item, index) {
  const cartItem = document.createElement('div');
  cartItem.className = 'cart-item';

  const img = document.createElement('img');
  img.src = item.imageUrl;
  img.style.width = '400px';
  img.style.height = '200px';

  const button = document.createElement('button');
  button.dataset.index = index;
  button.className = 'remove-btn';
  button.textContent = 'Eliminar';
  button.addEventListener('click', () => removeFromCart(index));

  cartItem.appendChild(img);
  cartItem.appendChild(button);

  return cartItem;
}

// Eliminar todo del carrito
function removeAllFromCart() {
  cart.length = 0; 
  renderCart();
}


function renderCart() {
  cartItems.textContent = ''; // Clear the cart items

  // agrego  "Remove All" button si hay mas de uno 
  if (cart.length > 2) {
    const removeAllButton = document.createElement('button');
    removeAllButton.textContent = 'Eliminar todo';
    removeAllButton.addEventListener('click', removeAllFromCart);
    cartItems.appendChild(removeAllButton);
  }

  if (cart.length === 0) {
    cartItems.textContent = "No has elegido ninguna receta!";
  } else {
    cart.forEach((item, index) => {
      const cartItem = createCartItem(item, index);
      cartItems.appendChild(cartItem);
    });
  }

  updateCartInLocalStorage();
}

//elimino el item que hay en el carrito cuando doy al botón eliminar
function removeFromCart(index) {
  cart.splice(index, 1); // splice(elimina el que quiero, cantidad a eliminar)
  renderCart();
}

//genero en la página principal los platos con su información
myData.forEach((x) => {
  const article = document.createElement('article');
  article.className = 'px-8 py-2 text-center border-b-4 border-cyan-800';

  const h2 = document.createElement('h2');
  h2.className = 'text-4xl font-mono';
  h2.textContent = x.title;

  const p = document.createElement('p');
  p.className = 'text-sm mb-2';
  p.textContent = x.content;

  const img = document.createElement('img');
  img.src = x.imageUrl;
  img.className = 'mb-2 rounded-lg border-2 border-cyan-800';

  const button = document.createElement('button');
  button.className = 'py-2 px-6 font-bold rounded hover:bg-gray-800 like-btn';
  button.textContent = 'Preparar';
  button.addEventListener('click', () => addToCart(x));

  article.appendChild(h2);
  article.appendChild(p);
  article.appendChild(img);
  article.appendChild(button);

  mySection.appendChild(article);
});

closeCartButton.addEventListener('click', () => cartModal.classList.add('hidden'));
toggleCartButton.addEventListener('click', () => cartModal.classList.remove('hidden'));

// **onload or event load**
window.addEventListener('load', () => {
  const savedCart = localStorage.getItem('cartItems');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    renderCart();
  }
});

