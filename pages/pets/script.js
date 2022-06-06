  document.querySelector(".burger").addEventListener("click", function (e) {
    this.classList.toggle("open");
    e.stopPropagation();
  });
  
  document.querySelector(".burger").addEventListener("click", function (e) {
    document.querySelector(".sidebar-menu").classList.toggle("open-menu");
    e.stopPropagation();
  });
  
  document.addEventListener("click", function () {
    document.querySelector(".burger").classList.remove("open");
    document.querySelector(".sidebar-menu").classList.remove("open-menu");
  });