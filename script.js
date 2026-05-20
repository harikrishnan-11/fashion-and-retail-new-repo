//toggle

let togglebtn = document.querySelector(".menu-btn")
let closebtn = document.querySelector(".close-btn")
let togglebtn2 = document.querySelector(".menu-btn2")
let closebtn2 = document.querySelector(".close-btn2")
let menus = document.querySelector(".nav-links")
let nav = document.querySelector(".right-nav")
let navlink = document.querySelector(".nav-links ")
let container = document.querySelector(".container2")

togglebtn.addEventListener("click", () => {
    closebtn.style.display = "block"
    menus.style.display = "flex"
    togglebtn.style.display = "none"

})

closebtn.addEventListener("click", () => {
    closebtn.style.display = "none"
    menus.style.display = "none"
    togglebtn.style.display = "block"

})

togglebtn2.addEventListener("click", () => {
    closebtn2.style.display = "block"
    nav.style.display = "flex"
    togglebtn2.style.display = "none"

})

closebtn2.addEventListener("click", () => {
    closebtn2.style.display = "none"
    nav.style.display = "none"
    togglebtn2.style.display = "block"

})

window.addEventListener("resize", () => {
    if (innerWidth > 1220) {
        closebtn.style.display = "none"
        menus.style.display = "flex"
        togglebtn.style.display = "none"
        closebtn2.style.display = "none"
        togglebtn2.style.display = "none"
         nav.style.display = "flex"

    }

    else if (innerWidth < 1220 && innerWidth > 640) {
        closebtn.style.display = "none"
        menus.style.display = "none"
        togglebtn.style.display = "block"
        togglebtn2.style.display = "none"
        closebtn2.style.display = "none"
         nav.style.display = "flex"

    }

    else if (innerWidth < 640) {
        closebtn2.style.display = "none"
        nav.style.display = "none"
        togglebtn2.style.display = "block"
        closebtn.style.display = "none"
        menus.style.display = "flex"
        togglebtn.style.display = "none"
    }

    else {

        closebtn2.style.display = "none"
        nav.style.display = "none"
        togglebtn2.style.display = "none"
    }

})



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




/* email validation in newsletter */

const form        = document.getElementById('newsletterForm');
const emailInput  = document.getElementById('emailAddress');
const checkbox    = document.getElementById('agree');
const checkboxWrapper = document.getElementById('checkboxWrapper');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  removeErrors();

  let isValid = true;
  const email = emailInput.value.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/;

  /* EMAIL VALIDATION */
  if (email === '') {
    showError(emailInput, 'Please enter your email address');
    isValid = false;
  } else if (!emailPattern.test(email)) {
    showError(emailInput, 'Email must end with .com or .in');
    isValid = false;
  }

  /* CHECKBOX VALIDATION */
  if (!checkbox.checked) {
    showCheckboxError('Please accept terms and conditions');
    isValid = false;
  }

  /* SUCCESS */
  if (isValid) {
    showSuccess();
    form.reset();
  }
});

/* ── REMOVE OLD ERRORS ── */
function removeErrors() {
  document.querySelectorAll('.error-message, .checkbox-error-msg, .success-message')
    .forEach(el => el.remove());
  emailInput.classList.remove('error');
  checkbox.classList.remove('checkbox-error');
}

/* ── EMAIL ERROR ── */
function showError(input, message) {
  input.classList.add('error');
  const err = document.createElement('small');
  err.className = 'error-message';
  err.textContent = message;
  // append inside .input-group (input's parent)
  input.parentElement.appendChild(err);
}

/* ✅ FIX 2: checkbox error goes inside #checkboxWrapper, not section */
function showCheckboxError(message) {
  checkbox.classList.add('checkbox-error');
  const err = document.createElement('small');
  err.className = 'checkbox-error-msg';
  err.textContent = message;
  checkboxWrapper.appendChild(err);
}

/* ── SUCCESS MESSAGE ── */
function showSuccess() {
  const msg = document.createElement('small');
  msg.className = 'success-message';
  msg.textContent = '🎉 You\'ve subscribed successfully!';
  form.appendChild(msg);
}


 /*popular product  */

 document.addEventListener("DOMContentLoaded", () => {
        const buttons = document.querySelectorAll(".filter-btn");
        const cards = document.querySelectorAll(".product-card");

        function filterProducts(category) {
            cards.forEach(card => {
                if (card.getAttribute("data-category") === category) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        }

        // Initialize display to showcase the first category ("new-arrival") on page load
        filterProducts("new-arrival");

        // Click Event Handlers
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                // Remove active class styling from previous button
                buttons.forEach(btn => btn.classList.remove("active"));
                // Add active class styling to the clicked button
                button.classList.add("active");

                // Trigger category filtering execution
                const selectedCategory = button.getAttribute("data-category");
                filterProducts(selectedCategory);
            });
        });
    });


    /* deal of the week */
    document.addEventListener("DOMContentLoaded", () => {
    // 1. Set the target countdown date (e.g., 7 days from now)
    // You can also set a fixed date like: new Date("Dec 31, 2026 23:59:59").getTime();
    let countdownTarget = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); 

    // Cache DOM elements for better performance
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    // 2. Update the countdown every single second
    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownTarget - now;

        // 3. Time calculations for days, hours, minutes, and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // 4. Output the results into the HTML elements (padded with a leading zero if single digit)
        daysEl.textContent = days < 10 ? "0" + days : days;
        hoursEl.textContent = hours < 10 ? "0" + hours : hours;
        minutesEl.textContent = minutes < 10 ? "0" + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;

        // 5. If the countdown finishes, display zeros or loop the deal
        if (distance < 0) {
            clearInterval(timerInterval);
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            
            // Optional: Handle what happens when it ends
            // document.querySelector(".deal-text").innerHTML = "❌ This deal has expired!";
        }
    }, 1000);
});