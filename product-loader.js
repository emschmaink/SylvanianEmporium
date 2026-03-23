document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const product = PRODUCTS[productId];
  if (!product) return;

  // NAME + PRICE
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = "$" + product.price;

  // MAIN IMAGE
  const mainImage = document.getElementById("mainImage");
  mainImage.src = product.images[0];

  // THUMBNAILS
  const thumbRow = document.getElementById("thumbnail-row");

  product.images.forEach((img, i) => {
    const el = document.createElement("img");
    el.src = img;
    el.className = "thumb" + (i === 0 ? " active" : "");

    el.addEventListener("click", () => {
      mainImage.src = img;
      document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
      el.classList.add("active");
    });

    thumbRow.appendChild(el);
  });

  // COLORS
  const colorContainer = document.getElementById("color-options");

  product.colors.forEach((c, i) => {
    const label = document.createElement("label");
    label.className = "color-option";

    label.innerHTML = `
      <input type="radio" name="color" value="${c.name}" ${i === 0 ? "checked" : ""}>
      <img src="${c.image}">
    `;

    colorContainer.appendChild(label);
  });

  // DESCRIPTION
  document.getElementById("product-description").textContent = product.description;

  // ADD TO CART
  const btn = document.getElementById("add-to-cart");

  btn.addEventListener("click", () => {
    const selectedColor =
      document.querySelector('input[name="color"]:checked')?.value;

    addToCart({
      name: product.name,
      price: product.price,
      image: mainImage.src,
      color: selectedColor || "",
      qty: 1
    });
  });

});
