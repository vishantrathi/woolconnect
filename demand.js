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
