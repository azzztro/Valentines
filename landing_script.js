// Tracks whether the "TRY AGAIN WITH MORE PASSION" message has been shown
let triedWithPassion = false;

function checkPassword() {
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (password === 'YESSS!!' || password === 'yesss!!') {
        // Correct password, redirect to planner page
        window.location.href = 'main.html';
    } else if (password === 'yes') {
        if (!triedWithPassion) {
            // First time entering "yes", show passion hint
            errorMessage.textContent = 'INCORRECT PASSWORD. TRY AGAIN WITH MORE PASSION.';
            triedWithPassion = true;
        } else {
            // After the hint, show the secret hint
            errorMessage.textContent = 'INCORRECT PASSWORD. TRY AGAIN. *psst*: it\'s YESSS!!';
        }
    } else {
        // Generic incorrect password message
        if (triedWithPassion) {
            errorMessage.textContent = 'INCORRECT PASSWORD. TRY AGAIN. *psst*: it\'s YESSS!!';
        }
        else{
            errorMessage.textContent = 'INCORRECT PASSWORD. TRY AGAIN.';
        }
    }
}