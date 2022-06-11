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
  item.addEventListener('click', showModal);
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


function showModal(e) {
  let currentPet = e.target.parentElement.children[1].innerText;

  fetch('../../assets/pets.json')
  .then(response => {
    return response.json();
  }) .then(data => {

    let petData = data.find(pet => pet.name === currentPet);
    document.body.classList.add('scroll-off');
    createModal(petData);
  })
}

function createModal(pet){
  const modal = document.createElement('div');
  const modalContent = document.createElement('div');
  const btn = document.createElement('button');
  const btnImg = document.createElement('img');
  const img = document.createElement('img');
  const modalText = document.createElement('div');
  const heading = document.createElement('h3');
  const subHeading = document.createElement('h4');
  const description = document.createElement('p');
  const list = document.createElement('ul');
  const age = document.createElement('li');
  const inoculations = document.createElement('li');
  const diseases = document.createElement('li');
  const parasites = document.createElement('li');

  modal.classList.add('modal');
  modalContent.classList.add('modal-content');
  modalContent.addEventListener('mouseenter', () => {
    document.getElementById('modal-btn').style.backgroundColor = 'unset';
  });
  modalContent.addEventListener('mouseleave', () => {
    document.getElementById('modal-btn').style.backgroundColor = '#F1CDB3';
  });

  btn.className = 'modal-btn';
  btn.id = 'modal-btn';
  btn.addEventListener('click', () => {
    document.querySelector('.modal').remove();
  });
  btnImg.setAttribute('src', '../../assets/images/cross.svg');
  img.setAttribute('src', pet.img);
  img.setAttribute('alt', `${pet.name} (${pet.type})`);
  modalText.classList.add('modal-text');
  heading.innerText = pet.name;
  subHeading.innerText = `${pet.type} - ${pet.breed}`;
  description.innerText = pet.description;
  age.innerHTML = `<b>Age:</b> ${pet.age}`;
  inoculations.innerHTML = `<b>Inoculations:</b> ${pet.inoculations}`;
  diseases.innerHTML = `<b>Diseases:</b> ${pet.diseases}`;
  parasites.innerHTML = `<b>Parasites:</b> ${pet.parasites}`;
  list.appendChild(age);
  list.appendChild(inoculations);
  list.appendChild(diseases);
  list.appendChild(parasites);
  modalText.appendChild(heading);
  modalText.appendChild(subHeading);
  modalText.appendChild(description);
  modalText.appendChild(list);
  btn.appendChild(btnImg);
  modalContent.appendChild(btn);
  modalContent.appendChild(img);
  modalContent.appendChild(modalText);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

}