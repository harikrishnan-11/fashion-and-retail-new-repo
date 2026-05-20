

// Hero section

let hero = document.querySelector(".hero")
let image = ["./src/home.webp", "src/home1.webp"]
let clslist = document.querySelectorAll(".hero-content")
let index = 0

setInterval(() => {
    index++
    if (index >= image.length) {
        index = 0
    }
    hero.style.backgroundImage = `url(${image[index]})`


    clslist.forEach((item) => {
        item.classList.remove("active")
    })

    clslist[index].classList.add("active")

}, 3000)


let arrow1 = document.querySelector(".arr1")
let arrow2 = document.querySelector(".arr2")

arrow1.addEventListener("click", () => {
    index++
    if (index >= image.length) {
        index = 0
    }
    hero.style.backgroundImage = `url(${image[index]})`


    clslist.forEach((item) => {
        item.classList.remove("active")
    })

    clslist[index].classList.add("active")

})

arrow2.addEventListener("click", () => {
    index--
    if (index < 0) {
        index = image.length - 1
    }
    hero.style.backgroundImage = `url(${image[index]})`


    clslist.forEach((item) => {
        item.classList.remove("active")
    })

    clslist[index].classList.add("active")

})

