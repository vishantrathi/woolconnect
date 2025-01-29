document.getElementById('show-signup').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('signup-page').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('signup-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
});

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email && password) {
        alert('Login successful!');
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('chat-page').style.display = 'block';
    } else {
        alert('Please fill in all fields.');
    }
});

document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (email && password && confirmPassword) {
        if (password === confirmPassword) {
            alert('Signup successful!');
            document.getElementById('signup-page').style.display = 'none';
            document.getElementById('chat-page').style.display = 'block';
        } else {
            alert('Passwords do not match.');
        }
    } else {
        alert('Please fill in all fields.');
    }
});

// Login Logic
function login(email, password) {
    window.location.href = 'index.html';
}

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Simple validation
    if (email && password) {
        login(email, password);
    } else {
        alert('Please fill in all fields.');
    }
});