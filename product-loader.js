document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const product = PRODUCTS[id];

  if (!product) {
    console.error("Product not found:", id);
    return;
  }

  // ===== NAME =====
  document.getElementById("product-name").textContent = product.name;

  // ===== PRICE =====
  document.getElementById("product-price").textContent =
    "$" + product.price.toFixed(2);

  // ===== DESCRIPTION =====
  document.getElementById("product-description").textContent =
    product.description;

  // ===== MAIN IMAGE =====
  const mainImage = document.getElementById("mainImage");
  mainImage.src = product.images[0];

  // ===== GALLERY =====
  const thumbRow = document.getElementById("thumbnail-row");
  thumbRow.innerHTML = "";

  product.images.forEach((img, index) => {
    thumbRow.innerHTML += `
      <img src="${img}" 
           class="thumb ${index === 0 ? "active" : ""}"
           onclick="changeImage(this)">
    `;
  });

  // ===== COLORS =====
  const colorContainer = document.getElementById("color-options");
  colorContainer.innerHTML = "";

  product.colors.forEach((color, index) => {
    colorContainer.innerHTML += `
      <label class="color-option">
        <input type="radio" name="color" value="${color.name}" ${index === 0 ? "checked" : ""}>
        <img src="${color.image}">
      </label>
    `;
  });

  // ===== ADD TO CART BUTTON =====
  const btn = document.getElementById("add-to-cart");

  btn.dataset.name = product.name;
  btn.dataset.price = product.price;
  btn.dataset.image = product.images[0];

});
