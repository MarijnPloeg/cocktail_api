function smoothScroll (target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration)
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }


    function ease (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }

    requestAnimationFrame(animation);
};

let home = document.querySelector('#homeAnchor');
home.addEventListener('click', function () {
    smoothScroll('#mainPage', 1000)
});

let about = document.querySelector('#aboutAnchor');
about.addEventListener('click', function () {
    smoothScroll('#aboutPage', 1500)
});

let recipes = document.querySelector('#recipesAnchor');
recipes.addEventListener('click', function () {
    smoothScroll('#recipesPage', 1500)
});
let contact = document.querySelector('#contactAnchor');
contact.addEventListener('click', function () {
    smoothScroll('#contactPage', 1500)
});


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