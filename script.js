const state = {

};
const body = document.body;


const potfolioNavigation = body.querySelectorAll('.tag')
for (let elem of potfolioNavigation) {
    elem.addEventListener("click", (event) => {
        target = event.target;
        potfolioNavigation.forEach(e => e.classList.remove("tag_selected"));
        target.classList.toggle("tag_selected");  
    });
}


const findPictures = body.querySelectorAll('.layout-4-column > img');
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

findPictures[0].src = "./assets/image/Picture-8.png";
console.log(findPictures[0].src);