// ================= TOGGLE MENU =================

let togglebtn = document.querySelector(".menu-btn")
let closebtn  = document.querySelector(".close-btn")
let togglebtn2 = document.querySelector(".menu-btn2")
let closebtn2  = document.querySelector(".close-btn2")
let menus = document.querySelector(".nav-links")
let nav   = document.querySelector(".right-nav")

togglebtn.addEventListener("click", () => {
    closebtn.style.display  = "block"
    menus.style.display     = "flex"
    togglebtn.style.display = "none"
})

closebtn.addEventListener("click", () => {
    closebtn.style.display  = "none"
    menus.style.display     = "none"
    togglebtn.style.display = "block"
})

togglebtn2.addEventListener("click", () => {
    closebtn2.style.display  = "block"
    nav.style.display        = "flex"
    togglebtn2.style.display = "none"
})

closebtn2.addEventListener("click", () => {
    closebtn2.style.display  = "none"
    nav.style.display        = "none"
    togglebtn2.style.display = "block"
})

window.addEventListener("resize", () => {
    if (innerWidth > 1220) {
        closebtn.style.display   = "none"
        menus.style.display      = "flex"
        togglebtn.style.display  = "none"
        closebtn2.style.display  = "none"
        togglebtn2.style.display = "none"
        nav.style.display        = "flex"
    } else if (innerWidth < 1220 && innerWidth > 640) {
        closebtn.style.display   = "none"
        menus.style.display      = "none"
        togglebtn.style.display  = "block"
        togglebtn2.style.display = "none"
        closebtn2.style.display  = "none"
        nav.style.display        = "flex"
    } else if (innerWidth < 640) {
        closebtn2.style.display  = "none"
        nav.style.display        = "none"
        togglebtn2.style.display = "block"
        closebtn.style.display   = "none"
        menus.style.display      = "flex"
        togglebtn.style.display  = "none"
    }
})


// ================= HERO SLIDER =================
// ✅ FIX: wrap everything in a null check so products.html doesn't crash

let hero = document.querySelector(".hero")

if (hero) {
    let images  = ["./src/home.webp", "./src/home1.png"]
    let clslist = document.querySelectorAll(".hero-content")
    let index   = 0

    setInterval(() => {
        index = (index + 1) % images.length
        hero.style.backgroundImage = `url(${images[index]})`
        clslist.forEach(item => item.classList.remove("active"))
        clslist[index].classList.add("active")
    }, 3000)

    let arrow1 = document.querySelector(".arr1")
    let arrow2 = document.querySelector(".arr2")

    arrow1.addEventListener("click", () => {
        index = (index + 1) % images.length
        hero.style.backgroundImage = `url(${images[index]})`
        clslist.forEach(item => item.classList.remove("active"))
        clslist[index].classList.add("active")
    })

    arrow2.addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length
        hero.style.backgroundImage = `url(${images[index]})`
        clslist.forEach(item => item.classList.remove("active"))
        clslist[index].classList.add("active")
    })
}


// ================= NEWSLETTER VALIDATION =================

const newsletterForm = document.getElementById('newsletterForm')

if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]')
    const checkbox = newsletterForm.closest('.newsletter')?.querySelector('input[type="checkbox"]')
    const checkboxWrapper = newsletterForm.closest('.newsletter')?.querySelector('.newsletter-checkbox') || newsletterForm

    if (emailInput && checkbox) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault()
            removeErrors()

            let isValid = true
            const email = emailInput.value.trim()
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/

            if (email === '') {
                showError(emailInput, 'Please enter your email address')
                isValid = false
            } else if (!emailPattern.test(email)) {
                showError(emailInput, 'Email must end with .com or .in')
                isValid = false
            }

            if (!checkbox.checked) {
                showCheckboxError('Please accept terms and conditions')
                isValid = false
            }

            if (isValid) {
                window.location.href = './404.html'
            }
        })
    }
}

function removeErrors() {
    document.querySelectorAll('.error-message, .checkbox-error-msg')
        .forEach(el => el.remove())
    const emailInput = newsletterForm?.querySelector('input[type="email"]')
    const checkbox = newsletterForm?.closest('.newsletter')?.querySelector('input[type="checkbox"]')
    emailInput?.classList.remove('error')
    checkbox?.classList.remove('checkbox-error')
}

function showError(input, message) {
    input.classList.add('error')
    const err = document.createElement('small')
    err.className = 'error-message'
    err.textContent = message
    input.parentElement.appendChild(err)
}

function showCheckboxError(message) {
    const checkbox = newsletterForm?.closest('.newsletter')?.querySelector('input[type="checkbox"]')
    const checkboxWrapper = newsletterForm?.closest('.newsletter')?.querySelector('.newsletter-checkbox') || newsletterForm
    checkbox?.classList.add('checkbox-error')
    const err = document.createElement('small')
    err.className = 'checkbox-error-msg'
    err.textContent = message
    checkboxWrapper.appendChild(err)
}


// ================= POPULAR PRODUCTS FILTER =================

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".filter-btn")
    const cards   = document.querySelectorAll(".filter-card")

    // ✅ FIX: null check — filter section only exists on index.html
    if (buttons.length && cards.length) {
        function filterProducts(category) {
            cards.forEach(card => {
                if (card.getAttribute("data-category") === category) {
                    card.classList.remove("hidden")
                } else {
                    card.classList.add("hidden")
                }
            })
        }

        filterProducts("new-arrival")

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                buttons.forEach(btn => btn.classList.remove("active"))
                button.classList.add("active")
                filterProducts(button.getAttribute("data-category"))
            })
        })
    }
})


// ================= DEAL COUNTDOWN TIMER =================

document.addEventListener("DOMContentLoaded", () => {
    const daysEl    = document.getElementById("days")
    const hoursEl   = document.getElementById("hours")
    const minutesEl = document.getElementById("minutes")
    const secondsEl = document.getElementById("seconds")

    // ✅ FIX: null check — timer only exists on index.html
    if (daysEl && hoursEl && minutesEl && secondsEl) {
        let countdownTarget = new Date().getTime() + (7 * 24 * 60 * 60 * 1000)

        const timerInterval = setInterval(() => {
            const distance = countdownTarget - new Date().getTime()

            if (distance < 0) {
                clearInterval(timerInterval)
                daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = "00"
                return
            }

            const pad = n => n < 10 ? "0" + n : n

            daysEl.textContent    = pad(Math.floor(distance / (1000 * 60 * 60 * 24)))
            hoursEl.textContent   = pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
            minutesEl.textContent = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
            secondsEl.textContent = pad(Math.floor((distance % (1000 * 60)) / 1000))
        }, 1000)
    }
})

/* filter functions */


        const mobileFilterBtn = document.getElementById("mobileFilterBtn")
        const filterSidebar = document.getElementById("filterSidebar")
        const closeFilter = document.getElementById("closeFilter")

        mobileFilterBtn.addEventListener("click", () => {
            filterSidebar.classList.add("active")
        })

        closeFilter.addEventListener("click", () => {
            filterSidebar.classList.remove("active")
        })

        // ================= FILTER PRODUCTS =================

        const categoryFilters = document.querySelectorAll(".category-filter")
        const brandFilters = document.querySelectorAll(".brand-filter")
        const ratingFilters = document.querySelectorAll(".rating-filter")
        const priceRange = document.getElementById("priceRange")
        const priceValue = document.getElementById("priceValue")

        const products = document.querySelectorAll(".product-card")

        function filterProducts(){

            const selectedCategories = [...categoryFilters]
                .filter(item => item.checked)
                .map(item => item.value)

            const selectedBrands = [...brandFilters]
                .filter(item => item.checked)
                .map(item => item.value)

            const selectedRating =
                document.querySelector(".rating-filter:checked")?.value || 0

            const maxPrice = parseInt(priceRange.value)

            priceValue.textContent = maxPrice

            products.forEach(product => {

                const category = product.dataset.category
                const brand = product.dataset.brand
                const price = parseInt(product.dataset.price)
                const rating = parseInt(product.dataset.rating)

                const categoryMatch =
                    selectedCategories.length === 0 ||
                    selectedCategories.includes(category)

                const brandMatch =
                    selectedBrands.length === 0 ||
                    selectedBrands.includes(brand)

                const ratingMatch =
                    rating >= selectedRating

                const priceMatch =
                    price <= maxPrice

                if(
                    categoryMatch &&
                    brandMatch &&
                    ratingMatch &&
                    priceMatch
                ){
                    product.style.display = "block"
                }
                else{
                    product.style.display = "none"
                }

            })

        }

        categoryFilters.forEach(filter => {
            filter.addEventListener("change", filterProducts)
        })

        brandFilters.forEach(filter => {
            filter.addEventListener("change", filterProducts)
        })

        ratingFilters.forEach(filter => {
            filter.addEventListener("change", filterProducts)
        })

        priceRange.addEventListener("input", filterProducts)

        filterProducts()