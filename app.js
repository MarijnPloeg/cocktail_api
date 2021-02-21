const navbarLinks = document.querySelectorAll("nav a");

for(let i=0; i<navbarLinks.length; i++) {
    navbarLinks[i].addEventListener("click", navbarLinkClick);
}

function navbarLinkClick(event) {
    smoothScroll(event); // Call the "smoothScroll" function
}

function smoothScroll(event) {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute("href");
  window.scrollTo({
    top: targetId==="#" ? 0 : document.querySelector(targetId).offsetTop,
    behavior: "smooth"
  });
}

function parallax(element, distance, speed) {
    const item = document.querySelector(element);

    item.style.transform = `translateY(${distance * speed}px)`;
    item.style.webkitPerspective = '1000';
    item.style.webkitBackfaceVisibility = 'hidden';
    item.style.webkitTransformStyle = 'translate3d(0, 0, 0)';
}

window.addEventListener('scroll', function() {
    parallax('header', window.scrollY, 1);
    parallax('.smallCocktail', window.scrollY, 0.4);
    parallax('.mediumCocktail', window.scrollY, 0.2);
    parallax('.largeCocktail', window.scrollY, 0.8);
});

//Getting API data
async function getRandomCocktail() {
    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    return response;
}

let newRandomCocktail = document.querySelector('.newRandomCocktails');

newRandomCocktail.addEventListener('click', () => {
    for (let i = 0; i < 5; i++) {
        getRandomCocktail().then(fillCards)
    }
})

//Filling card data with API
let cardList = document.querySelector('.cardList');

window.addEventListener('load', (event) => {

    for (let i = 0; i < 5; i++) {
        getRandomCocktail().then(fillCards)
    }
});

function fillCards(response) {

    let data = response.data.drinks[0];

    let emptyCard = createCard();
    let trunc = data.strInstructions.substr(0, 127) + "\u2026";
    emptyCard.category.innerHTML = data.strCategory;

    emptyCard.cocktailName.innerHTML = data.strDrink;

    if (data.strInstructions.length < 150) {
        emptyCard.cocktailInstructions.innerHTML = data.strInstructions;
    } else {
        emptyCard.cocktailInstructions.innerHTML = trunc + `...`
    }
    emptyCard.tag.innerHTML = 'Read more';
    cardList.appendChild(emptyCard.card);

    console.log(cardList);
}

class cardElement {
    constructor(card, category, cocktailName, cocktailInstructions, tag, tags) {
        this.card = card;
        this.category = category;
        this.cocktailName = cocktailName;
        this.cocktailInstructions = cocktailInstructions;
        this.tag = tag;
        this.tags = tags;
    }

    addClasses() {
        this.card.classList.add('card');
        this.category.classList.add('category');
        this.cocktailName.classList.add('cocktailName');
        this.cocktailInstructions.classList.add('cocktailInstructions');
        this.tags.classList.add('tags');
        this.tag.classList.add('tag');
    }

    appendElements(){
        this.tags.appendChild(this.tag);
        this.card.appendChild(this.category);
        this.card.appendChild(this.cocktailName);
        this.card.appendChild(this.cocktailInstructions);
        this.card.appendChild(this.tags);
    }
}

function createCard() {
    let card = document.createElement('article');
    let category = document.createElement('p');
    let cocktailName = document.createElement('h1');
    let cocktailInstructions = document.createElement('p')
    let tags = document.createElement('a');
    let tag = document.createElement('div');

    let randomCard = new cardElement(card, category, cocktailName, cocktailInstructions, tags, tag);
    randomCard.addClasses();
    randomCard.appendElements();
    return randomCard;
}

