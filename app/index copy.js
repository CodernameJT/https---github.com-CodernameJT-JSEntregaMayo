// Galeria comida App 🏰 
const mySection = document.getElementById("articles-container");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const closeCartButton = document.getElementById("closeCart");
const toggleCartButton = document.getElementById("toggleCart");

let cart = []; //aca guardo todos los platos que elegí todos los platos

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
  localStorage.setItem("My Favorites", JSON.stringify(cart));
}

function createCartItemHtml(item, index) {
  return `
    <div class="cart-item">
      <img src="${item.imageUrl}" style="width: 400px; height: 200px;">
      <button data-index="${index}" class="remove-btn">
        Eliminar
      </button>
    </div>
  `;
}

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>No has elegido ninguna receta!</p>";
  } else {
    cartItems.innerHTML = cart.map(createCartItemHtml).join("");
    document.querySelectorAll('.remove-btn').forEach((btn, index) => {
      btn.addEventListener('click', () => removeFromCart(index));
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
  const myArticle = `
                      <article class="px-8 py-2 text-center border-b-4 border-cyan-800">
                        <h2 class="text-4xl font-mono">${x.title}</h2>
                        <p class="text-sm mb-2">${x.content}</p>
                        <img src="${x.imageUrl}" class="mb-2 rounded-lg border-2 border-cyan-800" />
                        <button class="py-2 px-6 font-bold rounded hover:bg-gray-800 like-btn">Preparar</button>
                      </article>
                    `;

  mySection.innerHTML += myArticle;
});


// agregas like-btn en su "class" para manipularlo mejor
const likeButtons = document.querySelectorAll(".like-btn");
likeButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    addToCart(myData[index]);
  });
});

closeCartButton.addEventListener("click", function hideCart() {
  cartModal.classList.add("hidden");
});
toggleCartButton.addEventListener("click", function showCart() {
  cartModal.classList.remove("hidden");
});

// **onload or event load**
// Al hacer f5 me guarda todo en el carrito y en el Local
window.addEventListener("load", function () {
  const savedCart = localStorage.getItem("cartItems");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    renderCart();
  }
});
/* 
// Ejemplo SIN addEventListener()
window.onload = function () {
  const savedCart = localStorage.getItem("cartItems");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    renderCart();
  }
}; 
*/
