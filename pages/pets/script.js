  document.querySelector(".hamburger").addEventListener("click", function (e) {
    this.classList.toggle("open");
    e.stopPropagation();
  });
  
  document.querySelector(".hamburger").addEventListener("click", function (e) {
    document.querySelector(".sidebar-menu").classList.toggle("open-menu");
    e.stopPropagation();
  });
  
  document.addEventListener("click", function () {
    document.querySelector(".hamburger").classList.remove("open");
    document.querySelector(".sidebar-menu").classList.remove("open-menu");
  });