// Initialize cart and update count on page load
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    setupCartToggle();
});

// Add items to cart
function addToCart(item, kisses) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ item, kisses });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showHeartEffect();
}

// Update cart counter in the header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.length;
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Populate the cart box with items
function populateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartDetails = document.getElementById("cart-details");

    if (cartDetails) {
        cartDetails.innerHTML = ""; // Clear existing items

        // Add each item in the cart
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.item} - ${item.kisses} BXN`;

            // Add a remove button for each item
            const removeButton = document.createElement("button");
            removeButton.textContent = "X";
            removeButton.style.marginLeft = "10px";
            removeButton.addEventListener("click", () => removeFromCart(index));

            li.appendChild(removeButton);
            cartDetails.appendChild(li);
        });

        // Show total kisses
        const total = cart.reduce((sum, item) => sum + item.kisses, 0);
        const totalElement = document.createElement("p");
        totalElement.textContent = `Total: ${total} besos mexicanos`;
        cartDetails.appendChild(totalElement);
    }
}

// Show or hide the cart box
function toggleCartBox() {
    const cartBox = document.getElementById("cart-box");
    if (cartBox) {
        if (cartBox.classList.contains("hidden")) {
            populateCart(); // Populate the cart when opening
            cartBox.classList.remove("hidden");
        } else {
            cartBox.classList.add("hidden");
        }
    }
}

// Set up toggle functionality for "ver carrito"
function setupCartToggle() {
    const cartButton = document.getElementById("view-cart");
    if (cartButton) {
        cartButton.addEventListener("click", (e) => {
            e.preventDefault();
            toggleCartBox();
        });
    }
}

// Remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove the item at the given index
    localStorage.setItem("cart", JSON.stringify(cart));
    populateCart(); // Refresh the cart display
    updateCartCount(); // Update the cart count
}

function showHeartEffect() {
    const numberOfHearts = 10; // Number of hearts to create
    const heartSymbols = ["🩷", "❤️", "🩵", "💙", "🧡", "💜", "💛", "💚", "🤍", "💓", "💗", "💝", "💞", "💕", "💘", "💖"]; // Heart options

    for (let i = 0; i < numberOfHearts; i++) {
        // Create a heart
        const heart = document.createElement("div");
        heart.classList.add("heart");

        // Randomly select a heart symbol
        const randomHeart = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.innerHTML = randomHeart;

        document.body.appendChild(heart);

        // Random horizontal position
        const x = Math.random() * window.innerWidth;

        // Set starting position
        heart.style.left = `${x}px`;
        heart.style.top = `-50px`; // Start slightly above the screen

        // Randomize size of the heart
        const randomSize = Math.random() * 20 + 20; // Size between 20px and 40px
        heart.style.fontSize = `${randomSize}px`;

        // Random falling speed
        const randomSpeed = Math.random() * 1 + 2; // Speed between 2s and 3s
        heart.style.animationDuration = `${randomSpeed}s`; // Set the fall duration

        // Remove the heart after it falls
        setTimeout(() => {
            heart.remove();
        }, randomSpeed * 1000); // Match animation duration
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const orderButton = document.getElementById('order-button');
    const sexyTimeCheckbox = document.getElementById('include-sexy-time');

    if (sexyTimeCheckbox) {
        // Save the checkbox state whenever it's toggled
        sexyTimeCheckbox.addEventListener('change', () => {
            localStorage.setItem('sexyTime', sexyTimeCheckbox.checked ? 'Yes' : 'No');
        });
    }

    if (orderButton) {
        orderButton.addEventListener('click', () => {
            // Redirect to the loading page
            window.location.href = "loading.html";
        });
    }
});

// Load cart details from localStorage and populate receipt
document.addEventListener('DOMContentLoaded', () => {
    const receiptDetails = document.getElementById("receipt-details");
    const totalCostElement = document.getElementById("total-cost");
    const sexyTimeElement = document.getElementById("sexy-time");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const sexyTime = localStorage.getItem("sexyTime") || 'No';
    let totalCost = 0;

    // Populate receipt details
    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.item} - ${item.kisses} BXN`;
        receiptDetails.appendChild(li);
        totalCost += item.kisses;
    });

    // Show total cost
    totalCostElement.textContent = `Total: ${totalCost} BXN`;

    // Display sexy time status
    sexyTimeElement.textContent = `Include sexy time: ${sexyTime}`;

    // Go Back Button
    const goBackButton = document.getElementById('go-back-button');
    goBackButton.addEventListener('click', () => {
        window.location.href = "main.html"; // Redirect to main page
    });

    // Save Receipt as Image
    const saveButton = document.getElementById('save-receipt-button');
    saveButton.addEventListener('click', saveReceiptAsImage);
});

// Function to save receipt as an image
function saveReceiptAsImage() {
    const orderSummary = document.getElementById('order-summary');

    // Use html2canvas to capture the receipt
    html2canvas(orderSummary).then(canvas => {
        const link = document.createElement('a');
        link.download = 'receipt.png'; // Name of the saved image
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}