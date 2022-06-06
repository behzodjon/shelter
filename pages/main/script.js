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

//   let pets = [];
//   let sliderCount = 3;
//   let gap = 90;


//   function calcGapAndSliderCount() {
//     if (window.innerWidth < 1280 && window.innerWidth >= 821) {
//       gap = 60;
//       sliderCount = 2;
//     }
//     if (window.innerWidth < 821 && window.innerWidth >= 768) {
//       gap = 40;
//       sliderCount = 2;
//     }
//     if (window.innerWidth < 768 && window.innerWidth >= 300) {
//       gap = 0;
//       sliderCount = 1;
//     }
//   }

//   // Carousel
// function slideTo(page) {
//   // window width for carousel
//   calcGapAndSliderCount();

//   document.querySelector(".slider").scrollTo({
//     left: page * sliderCount * (270 + gap),
//     behavior: "smooth",
//   });
// }
// const btnLeftEl = document.querySelector(".prev");
// btnLeftEl.addEventListener("click", function (e) {
//   const pagesCount = Math.ceil(pets.length / sliderCount);
//   if (page === 0) {
//     page = pagesCount - 1;
//   } else {
//     page--;
//   }
//   slideTo(page);
// });

// const btnRightEl = document.querySelector(".next");
// btnRightEl.addEventListener("click", function (e) {
//   const pagesCount = Math.ceil(pets.length / sliderCount);
//   if (page + 1 === pagesCount) {
//     page = 0;
//   } else {
//     page++;
//   }
//   slideTo(page);
// });

// window.onresize = () => {
//   slideTo(page);
// };


// function createSliderCard(pet) {
 
//   const sliderCardEl = document.createElement("div");
//   sliderCardEl.classList.add("slider-card");
//   sliderCardEl.onclick = () => {
//     console.log("open");
//     openModalWindow(pet);
//     showOverlay();
//   };

//   const imgEl = document.createElement("img");
//   imgEl.classList.add("pet-image");
//   imgEl.src = pet.img;

//   const petNameEl = document.createElement("p");
//   petNameEl.classList.add("pet-name");
//   petNameEl.innerText = pet.name;

//   const learnMoreBtnEl = document.createElement("button");
//   learnMoreBtnEl.classList.add("learn-more-btn");
//   learnMoreBtnEl.innerText = "Learn more";

//   sliderCardEl.append(imgEl, petNameEl, learnMoreBtnEl);

//   return sliderCardEl;
// }
//   // Fetch json data

// fetch("../../assets/pets.json")
// .then((response) => response.json())
// .then((items) => {
//   pets = items;
//   console.log(pets)
//   const fragment = new DocumentFragment();

//   items.forEach((pet) => {
//     const sliderCard = createSliderCard(pet);
//     fragment.append(sliderCard);
//   });

//   const sliderEl = document.getElementsByClassName("slider");
//   if (sliderEl.length > 0) {
//     sliderEl[0].append(fragment);
//   }
// });