document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("mainImage");
  const thumbs = document.querySelectorAll(".thumb");

  if (!mainImage || thumbs.length === 0) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      mainImage.src = thumb.src;

      thumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
});
