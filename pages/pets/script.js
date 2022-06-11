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


let petsData = [];
let page;
let index;
let size;

//render items

function init() {
  fetch('../../assets/pets.json')
    .then(response => {
      return response.json();
    }).then(data => {
      petsData = [...data];
      while (petsData.length < 48) {
        pets = shuffle(data);
        petsData.push(...data);
      }
      initPagination();
      document.querySelector('.pet-cards').replaceChildren();
      let petsAmount = petsData.slice(index, size);
      petsAmount.forEach(pet => createItem(pet));
    })

}
function createItem(pet) {
  const parent = document.querySelector('.pet-cards');
  const item = document.createElement('div');
  item.classList.add('friend-card');
  const img = document.createElement('img');
  const title = document.createElement('div');
  title.classList.add('friend-title');
  const btn = document.createElement('button');
  btn.classList.add('btn');
  btn.classList.add('friend-btn');
  img.setAttribute('src', pet.img);
  title.innerText = pet.name;
  btn.innerText = 'Learn more';
  item.appendChild(img);
  item.appendChild(title);
  item.appendChild(btn);
  item.addEventListener('click', showModal);
  parent.appendChild(item);

}

//shuffle algorithm
const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


const width768 = window.matchMedia('(max-width: 767px');
const width1280 = window.matchMedia('(max-width: 1280px');
width768.addEventListener('change', init);
width1280.addEventListener('change', init);

const pageBtn = document.getElementById('page-num');
const nextButton = document.getElementById('next');
nextButton.addEventListener('click', () => {
  let maxPage = petsData.length / size;
  if (page < maxPage) {
    index += size;
    page++;
    if (page === maxPage) {
      nextButton.setAttribute('disabled', true);
      nextButton.className = 'icon-nav button-disabled';
      lastButton.setAttribute('disabled', true);
      lastButton.className = 'icon-nav button-disabled';
    } else if (page === 2) {
      prevBtn.removeAttribute('disabled');
      prevBtn.className = 'icon-nav  ';
    }
    previousBtn.removeAttribute('disabled');
    previousBtn.className = 'icon-nav  ';
    document.querySelector('.pet-cards').replaceChildren();
    petsData.slice(index, index + size).forEach(pet => createItem(pet));
    pageBtn.innerText = page;
  }
});

const prevBtn = document.getElementById('previous');
prevBtn.addEventListener('click', () => {
  let maxPage = petsData.length / size;
  if (page > 1) {
    index -= size;
    page--;
    if (page === 1) {
      prevBtn.disabled = true;
      prevBtn.className = 'icon-nav button-disabled';
      previousBtn.disabled = true;
      previousBtn.className = 'icon-nav button-disabled';
    } else if (page === maxPage - 1) {
      nextButton.removeAttribute('disabled');
      nextButton.className = 'icon-nav  ';
    }
    lastButton.removeAttribute('disabled');
    lastButton.className = 'icon-nav  ';
    document.querySelector('.pet-cards').replaceChildren();
    petsData.slice(index, index + size).forEach(pet => createItem(pet));
    pageBtn.innerText = page;
  }
});

const lastButton = document.getElementById('last');
lastButton.addEventListener('click', () => {
  let maxPage = petsData.length / size;
  if (page < maxPage) {
    index = petsData.length - size;
    page = maxPage;
    nextButton.setAttribute('disabled', true);
    nextButton.className = 'icon-nav button-disabled';
    lastButton.setAttribute('disabled', true);
    lastButton.className = 'icon-nav button-disabled';
    prevBtn.removeAttribute('disabled');
    prevBtn.className = 'icon-nav  ';
    previousBtn.removeAttribute('disabled');
    previousBtn.className = 'icon-nav  ';

    document.querySelector('.pet-cards').replaceChildren();
    petsData.slice(index, index + size).forEach(pet => createItem(pet));
    pageBtn.innerText = page;
  }
});

const previousBtn = document.getElementById('backward');
previousBtn.addEventListener('click', () => {
  if (page > 1) {
    index = 0;
    page = 1;
    prevBtn.setAttribute('disabled', true);
    prevBtn.className = 'icon-nav button-disabled';
    previousBtn.setAttribute('disabled', true);
    previousBtn.className = 'icon-nav button-disabled';
    nextButton.removeAttribute('disabled');
    nextButton.className = 'icon-nav  ';
    lastButton.removeAttribute('disabled');
    lastButton.className = 'icon-nav ';
    document.querySelector('.pet-cards').replaceChildren();
    petsData.slice(index, index + size).forEach(pet => createItem(pet));
    pageBtn.innerText = page;
  }
})

function initPagination(){
  page = 1;
  pageBtn.innerText = page;
  index = 0;
  width768.matches ? size = 3 : width1280.matches ? size = 6 : size = 8;
  prevBtn.setAttribute('disabled', true);
  prevBtn.className = 'icon-nav button-disabled';
  previousBtn.setAttribute('disabled', true);
  previousBtn.className = 'icon-nav button-disabled';
  nextButton.removeAttribute('disabled');
  nextButton.className = 'icon-nav  golden-border';
  lastButton.removeAttribute('disabled');
  lastButton.className = 'icon-nav  golden-border';
}



function showModal(e) {
  let currentPet = e.target.parentElement.children[1].innerText;
  fetch('../../assets/pets.json')
  .then(response => {
    return response.json();
  }) .then(data => {
    let petData = data.find(pet => pet.name === currentPet);
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


init();
