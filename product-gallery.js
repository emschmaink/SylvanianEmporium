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
// PRODUCT FORM (optional debug only)
// =========================

const productForm = document.getElementById("productForm");

if (productForm) {
  productForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    console.log(Object.fromEntries(formData.entries()));
  });
}
