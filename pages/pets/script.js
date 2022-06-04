  // Hamburger
  
  document.querySelector(".hamburger").addEventListener("click", function (e) {
    console.log(this);
    this.classList.toggle("open");
    e.stopPropagation();
  });
  
  document.querySelector(".hamburger").addEventListener("click", function (e) {
    console.log(this);
    document.querySelector(".sidebar-menu").classList.toggle("open-menu");
    e.stopPropagation();
  });
  
  // Close sidebar when clicking out of the links
  
  document.addEventListener("click", function () {
    document.querySelector(".hamburger").classList.remove("open");
    document.querySelector(".sidebar-menu").classList.remove("open-menu");
  });