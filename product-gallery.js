// =========================
// GALLERY
// =========================

function changeImage(element) {
  const mainImage = document.getElementById("mainImage");
  if (!mainImage) return;

  mainImage.src = element.src;

  document.querySelectorAll(".thumb").forEach(img => {
    img.classList.remove("active");
  });

  element.classList.add("active");
}

window.addEventListener("DOMContentLoaded", () => {
  const firstThumb = document.querySelector(".thumb");
  if (firstThumb) {
    changeImage(firstThumb);
  }
});


// =========================
// PRODUCT FORM
// =========================

const productForm = document.getElementById("productForm");

if (productForm) {
  productForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    console.log(Object.fromEntries(formData.entries()));
  });
}


// =========================
// CART SYSTEM
// =========================

let cart = [];

const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const item = {
      name: button.dataset.name,
      price: parseFloat(button.dataset.price),
      image: button.dataset.image,
      qty: 1
    };

    addToCart(item);
  });
});

function addToCart(item) {
  const existing = cart.find(i => i.name === item.name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(item);
  }

  updateCartUI();
}


// =========================
// CART UI UPDATE
// =========================

function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartCount || !cartTotal) return;

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" class="cart-img" alt="${item.name}">

        <div class="cart-info">
          <p class="cart-name">${item.name} - x${item.qty}</p>
          <p class="cart-price">$${(item.price * item.qty).toFixed(2)}</p>
        </div>
      </div>
      <hr>
    `;
  });

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty">Your cart is empty</p>`;
  }

  cartCount.textContent = count;
  cartTotal.textContent = total.toFixed(2);
}


// =========================
// CART PANEL TOGGLE
// =========================

window.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cart-btn");
  const cartPanel = document.getElementById("cart-panel");

  if (cartBtn && cartPanel) {
    cartBtn.addEventListener("click", () => {
      cartPanel.classList.toggle("hidden");
    });
  }
});
