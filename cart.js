function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

window.addToCart = function(item) {
  let cart = getCart();

  const cartPanel = document.getElementById("cart-panel");
  if (cartPanel) {
    cartPanel.classList.remove("hidden");
  }

  const existing = cart.find(
    i => i.name === item.name && i.color === item.color
  );

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(item);
  }

  saveCart(cart);
  renderCart();
}

// CHANGE QUANTITY
window.changeQty = function(index, delta) {
  let cart = getCart();

  cart[index].qty += delta;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderCart();
}

// REMOVE ITEM
window.removeItem = function(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

// CART BADGE (number on icon)
function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  const badge = document.getElementById("cart-count");

  if (badge) {
    badge.textContent = count;
  }
}

// RENDER CART PAGE
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartTotal) return;

  const cart = getCart();

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">

        <img src="${item.image}" class="cart-img">

        <div class="cart-info">
          <p>${item.name} (${item.color || ""})</p>
          <p>$${(item.price * item.qty).toFixed(2)}</p>

          <div>
            <button onclick="changeQty(${index}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>

          <button onclick="removeItem(${index})">
            Remove
          </button>
        </div>

      </div>
      <hr>
    `;
  });

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty</p>";
  }

  cartTotal.textContent = "$" + total.toFixed(2);

  updateCartBadge();
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

// TOGGLE CART PANEL (GLOBAL)
document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cart-btn");
  const cartPanel = document.getElementById("cart-panel");

  if (cartBtn && cartPanel) {
    cartBtn.addEventListener("click", () => {
      cartPanel.classList.toggle("hidden");
      renderCart();
    });
  }
});
