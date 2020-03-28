
const body = document.body;

Array.prototype.shuffle = function() {
    var i = this.length;
	while (i)
	{
		var j = Math.floor(Math.random() * i);
		var t = this[--i];
		this[i] = this[j];
		this[j] = t;
	}
	return this;
  }

  Array.prototype.snake = function() {
      this.unshift(this[this.length - 1]);
      this.pop();
      return this;
  }

let arr = [1,2,3,4,5,6,7,8,9,10,11,12];
const findPictures = body.querySelectorAll('.layout-4-column > img');
const potfolioNavigation = body.querySelectorAll('.tag');
const headerNavigation = body.querySelectorAll('.navigation > li > a');
const firstScreen = body.querySelector(".iphone-slide1-screen_first");
const secondScreen = body.querySelector(".iphone-slide1-screen_second");
const thirdScreen = body.querySelector(".iphone-slide2-screen");
const homeButtons = body.querySelectorAll(".home");
const sliderItems = body.querySelectorAll('.slider-item');
const slideBackground = body.querySelector(".slider");
const arrowLeft = body.querySelector('.arrow.slider_left');
const arrowRight = body.querySelector('.arrow.slider_right');
const navigation = body.querySelector("nav");
let sticky = navigation.offsetTop;
let currentItem = 0;
let isEnabled = true;


let mark = body.querySelectorAll(".mark"),
    marks = {},
    i = 0;
    
Array.prototype.forEach.call(mark, function(e) {
    marks[e.id] = e.offsetTop - 100;
});
    
marks.CONTACT = 2700;
window.addEventListener("scroll", () => {
    let scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
    for (i in marks) {
        if (marks[i] <= scrollPosition) {
            document.querySelector('.active').classList.remove("active");
            document.querySelector(`a[href*= ${i} ]`).classList.add("active");
        }
    }
});




window.addEventListener('scroll', () => {
    if (window.pageYOffset >= sticky) {
        navigation.classList.add("navigation__fixed")
    } else 
        navigation.classList.remove("navigation__fixed");
}); 


for (let elem of headerNavigation) {
    elem.addEventListener("click", (event) => {
        event.preventDefault();
        const sectionId = elem.getAttribute("href");
        document.querySelector(`${sectionId}`).scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    })
}


for(let elem of headerNavigation) {
    elem.addEventListener('click', (event) => {
        target = event.target;
        headerNavigation.forEach(e => e.classList.remove("active"));
        target.classList.toggle("active");
    })
}


for (let elem of potfolioNavigation) {
    elem.addEventListener("click", (event) => {
        target = event.target;
        arr = arr.snake();
        for(let i = 0; i < arr.length; i++) {
            findPictures[i].src = `./assets/image/Picture-${arr[i]}.png`;
        }
        potfolioNavigation.forEach(e => e.classList.remove("tag_selected"));
        target.classList.toggle("tag_selected");

    });
}


for(let elem of findPictures) {
    elem.addEventListener("click", (event) => {
        target = event.target;
        if(target.classList.contains("bordered")){
            findPictures.forEach(e => e.classList.remove("bordered"));  
        }else {
            findPictures.forEach(e => e.classList.remove("bordered"));
            target.classList.toggle("bordered");
        }
    });
}


function changeCurrentItem(n) {
	currentItem = (n + sliderItems.length) % sliderItems.length;
}

function hideItem(direction) {
	isEnabled = false;
	sliderItems[currentItem].classList.add(direction);
	sliderItems[currentItem].addEventListener('animationend', (event) => {
        target = event.target;
        target.classList.remove('active-item', direction);
	});
}

function showItem(direction) {
	sliderItems[currentItem].classList.add('next', direction);
	sliderItems[currentItem].addEventListener('animationend', (event) => {
        target = event.target;
		target.classList.remove('next', direction);
        target.classList.add('active-item');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
    showItem('from-right');
    slideBackground.classList.toggle("slider_blue");
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
    showItem('from-left');
    slideBackground.classList.toggle("slider_blue");
}

arrowLeft.addEventListener('click', () => {
	if (isEnabled) {
		nextItem(currentItem);
	}
});

arrowRight.addEventListener('click', () => {
	if (isEnabled) {
		previousItem(currentItem);
	}
});


for (let elem of homeButtons) {
    elem.addEventListener("click", (event) => {
        target = event.target;
        if (target.alt == "Home1") {
            firstScreen.classList.toggle("disabled");       
        } else if (target.alt == "Home2") {
            secondScreen.classList.toggle("disabled");  
        } else if (target.alt == "Home3") {
            thirdScreen.classList.toggle("disabled");  
        }   
    });
}


const form = document.querySelector(".get-a-quote__form");
const popup = document.querySelector(".pop-up__window");
const closeButton = document.querySelector(".close_button");
const popupCLose = document.querySelector(".pop-up_close");
const inputSubject = document.querySelector(".subject"); 
const textarea = document.querySelector(".textarea");
const popupTopicResult = document.querySelector(".topic_result");
const popupDescriptionResult = document.querySelector(".description-result");

popupCLose.addEventListener("click", closePopup);
closeButton.addEventListener("click", closePopup);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (form.checkValidity()) {
        popupTopicResult.innerHTML = (inputSubject.value) ?  "Тема: " + inputSubject.value : "Без темы";
        popupDescriptionResult.innerHTML = (textarea.value) ? "Описание: " + textarea.value : "Без описания";
        popup.classList.remove("disabled");
    }
    form.reset();
    return false;
});

function closePopup() {
    form.reset()
    popup.classList.add("disabled");
}


const burger = document.querySelector('.burger__menu');



burger.addEventListener('click', (event) => {
    target = event.target;
    console.log(getComputedStyle(navigation).display);
    if(burger.classList.contains("active__menu")){
        burger.classList.remove("active__menu");
        navigation.classList.remove('mobile-active-menu');  
    }else {
        burger.classList.toggle("active__menu");
        navigation.classList.add('mobile-active-menu');
    }
    
});

