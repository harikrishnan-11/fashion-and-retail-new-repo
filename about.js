/* ================= TAB SECTION ================= */

let buttons = document.querySelectorAll(".tab-btn")

let contents = document.querySelectorAll(".tab-content")

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        // REMOVE ACTIVE BUTTON

        buttons.forEach((btn) => {
            btn.classList.remove("active")
        })

        // REMOVE ACTIVE CONTENT

        contents.forEach((content) => {
            content.classList.remove("active")
        })

        // ADD ACTIVE BUTTON

        button.classList.add("active")

        // SHOW CONTENT

        let target = button.getAttribute("data-tab")

        document.getElementById(target)
        .classList.add("active")

    })

})


// 
let accordion = document.querySelectorAll(".accordion-item")

accordion.forEach((item) => {

    let header = item.querySelector(".accordion-header")

    header.addEventListener("click", () => {

        accordion.forEach((items) => {

            if(items !== item){
                items.classList.remove("active")
            }

        })

        item.classList.toggle("active")

    })

})