// Get the form and popup elements
const demandForm = document.getElementById("demandForm");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

// Add a submit event listener to the form
demandForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting normally

    // Display the popup
    popup.style.display = "block";

    // Clear the form (optional)
    demandForm.reset();

    // Close the popup when the close button is clicked
    closePopup.addEventListener("click", function () {
        popup.style.display = "none";
    });
});

const toggleButton = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

toggleButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Get the button element
const scrollBtn = document.getElementById('scrollBtn');

// Show the button when the user scrolls down 20px from the top
window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

// Scroll to the top of the page when the button is clicked
scrollBtn.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};