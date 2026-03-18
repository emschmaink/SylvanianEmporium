function changeImage(element) {
  // change main image
  document.getElementById("mainImage").src = element.src;

  // remove active from all
  document.querySelectorAll(".thumb").forEach(img => {
    img.classList.remove("active");
  });

  // add active to clicked
  element.classList.add("active");
}

window.onload = function () {
  const firstThumb = document.querySelector(".thumb");
  if (firstThumb) {
    changeImage(firstThumb);
  }
};
