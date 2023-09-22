// Sample product image URLs
const productImages = [
];

// Function to create product listings with images
function createProductListings() {
    const productContainer = document.querySelector(".product-list");

    productImages.forEach((imageUrl) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const productImage = document.createElement("img");
        productImage.src = imageUrl;
        productImage.alt = "Product Image";

        productCard.appendChild(productImage);
        productContainer.appendChild(productCard);
    });
}

// Call the function to create product listings when the page loads
window.addEventListener("load", createProductListings);
