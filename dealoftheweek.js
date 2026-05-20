
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