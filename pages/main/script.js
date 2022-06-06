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

  const getPets = async () => {
    try {
        let res = await fetch('../../assets/pets.json');
        return res.json();
    } catch(err) {
        console.log('Error fetching data: ', err);
    } 
}

/**
 * Cards Display
 */

const displayCards = async () => {
    let pets = await getPets();
    let slider = [];

    let currentSlider = [];
    let cards = document.querySelectorAll('.friend-card');
    cards.forEach(card => {
        currentSlider.push(
            pets.find(pet => pet.name === card.children[1].innerText)
        );
    });
    
    while (slider.length < 3) {
        let random = Math.floor(Math.random() * pets.length);
        if (slider.indexOf(pets[random]) === -1 && currentSlider.indexOf(pets[random]) === -1) {
            slider.push(pets[random]);
        }
    }


    slider.forEach(pet => createCard(pet));
}

const createCard = (pet) => {
    const parent = document.querySelector('.friend-cards');
    const card = document.createElement('div');
    card.classList.add('friend-card');

    const img = document.createElement('img');
    const p = document.createElement('p');
    const btn = document.createElement('button');

    img.setAttribute('src', pet.img);
    img.setAttribute('alt', `${pet.name} (${pet.type})`);
    p.innerText = pet.name;
    p.classList.add('friend-title');
    btn.innerText = 'Learn more';
    btn.classList.add('btn');
    btn.classList.add('friend-btn');

    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(btn);

    // POP-UP event listener
    // card.addEventListener('click', showPopup);

    if (appendState === true) {
        parent.appendChild(card);
    } else {
        parent.prepend(card);
    }
}

displayCards();


/**
 * Carousel
 */

let appendState = true;

const carousel = document.querySelector('.friend-cards');
const leftBtn = document.querySelector('.prev');
const rightBtn = document.querySelector('.next');

const swipeCards = (cssClass) => {
    // Disabling btns during animation
    leftBtn.disabled = true;
    rightBtn.disabled = true;
console.log("dadas")
    // State to append or prepend
    cssClass === 'slide-left' ? appendState = false  : appendState = true;

    // Generate Cards
    displayCards();

    // Add Animation Class
    carousel.classList.add(cssClass);

    // Delete previous cards after delay
    setTimeout(deletePrevCards, 400)
}

const deletePrevCards = () => {
    let cards = document.querySelectorAll('.friend-card');

    if (appendState === true) {
        cards[0].remove();
        cards[1].remove();
        cards[2].remove();
    } else {
        cards[3].remove();
        cards[4].remove();
        cards[5].remove();
    }

    carousel.classList.remove('slide-left');
    carousel.classList.remove('slide-right');

    leftBtn.disabled = false;
    rightBtn.disabled = false;
}

leftBtn.addEventListener('click', () => console.log("dasd"));
rightBtn.addEventListener('click', () => swipeCards('slide-right'));
