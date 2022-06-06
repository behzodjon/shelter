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


//render items

function renderSlideItems() {
  fetch('../../assets/pets.json')
    .then(response => {
      return response.json();
    }).then(data => {
      data.forEach(pet => createSlideItem(pet));
    })

}

// create item
function createSlideItem(pet) {
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

function carouselItems(classProperty) {

  classProperty === 'navigate-prev' ? isAdd = false : isAdd = true;

  renderSlideItems();

  carousel.classList.add(classProperty);

  setTimeout(hideOtherItems, 400)
}
//navigating
prev.addEventListener('click', () => carouselItems('navigate-prev'));
next.addEventListener('click', () => carouselItems('navigate-next'));

function hideOtherItems() {
  let items = document.querySelectorAll('.friend-card');
  if (isAdd === true) {
    for (let i = 0; i <= 2; i++) {
      items[i].remove();
    }
  } else {
    for (let i = 3; i <= 5; i++) {
      items[i].remove();
    }
  }
  carousel.classList.remove('navigate-prev');
  carousel.classList.remove('navigate-next');

}


