document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login request to the server
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            username: username,
            password: password
        })
    });

    if (response.ok) {
        window.location.href = '/'; // Redirect to the homepage if login is successful
    } else {
        document.getElementById('error-message').innerText = 'Invalid username or password';
    }
});
