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

//fetch data
async function fetchPets() {
  try {
    let res = await fetch('../../assets/pets.json');
    return res.json();
  } catch (err) {
    console.log(err);
  }
}



//render items
const renderSlideItems = async () => {
  let pets = await fetchPets();
  let carousel = [];

  let currentCarousel = [];

  while (carousel.length < 3) {
    let random = Math.floor(Math.random() * pets.length);
    if (carousel.indexOf(pets[random]) === -1 && currentCarousel.indexOf(pets[random]) === -1) {
      carousel.push(pets[random]);
    }
  }
  carousel.forEach(pet => createSlideItem(pet));
}

// create item
const createSlideItem = (pet) => {
  const parent = document.querySelector('.friend-cards');
  const item = document.createElement('div');
  item.classList.add('friend-card');

  const img = document.createElement('img');
  const title = document.createElement('div');
  const btn = document.createElement('button');

  img.setAttribute('src', pet.img);
  title.innerText = pet.name;
  title.classList.add('friend-title');
  btn.innerText = 'Learn more';
  btn.classList.add('btn');
  btn.classList.add('friend-btn');

  item.appendChild(img);
  item.appendChild(title);
  item.appendChild(btn);
  if (isAdd === true) {
    parent.appendChild(item);
  } else {
    parent.prepend(item);
  }
}

renderSlideItems();



let isAdd = true;

const carousel = document.querySelector('.friend-cards');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const carouselItems = (cssClass) => {
  prev.disabled = true;
  next.disabled = true;
  cssClass === 'navigate-prev' ? isAdd = false : isAdd = true;

  renderSlideItems();

  carousel.classList.add(cssClass);

  setTimeout(hideOtherItems, 400)
}

const hideOtherItems = () => {
  let items = document.querySelectorAll('.friend-card');

  if (isAdd === true) {
    items[0].remove();
    items[1].remove();
    items[2].remove();
  } else {
    items[3].remove();
    items[4].remove();
    items[5].remove();
  }

  carousel.classList.remove('navigate-prev');
  carousel.classList.remove('navigate-next');

  prev.disabled = false;
  next.disabled = false;
}

//navigating
prev.addEventListener('click', () => carouselItems('navigate-prev'));
next.addEventListener('click', () => carouselItems('navigate-next'));
