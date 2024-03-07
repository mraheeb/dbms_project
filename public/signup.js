const loginCard = document.getElementById('login-card');
const signupCard = document.getElementById('signup-card');
const loginLink = document.getElementById('login-link');
const signupLink = document.getElementById('signup-link');

loginLink.addEventListener('click', function(event) {
    event.preventDefault();
    loginCard.style.display = 'block';
    signupCard.style.display = 'none';
});

signupLink.addEventListener('click', function(event) {
    event.preventDefault();
    loginCard.style.display = 'none';
    signupCard.style.display = 'block';
});


document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            alert('User created successfully');
            event.target.reset(); // Reset the form
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create user');
        }
    } catch (error) {
        console.error('Error creating user:', error.message);
        alert('Error: ' + error.message);
    }
});

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const loginData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Login successful');
            window.location.href = responseData.redirectUrl; // Redirect to the appropriate page
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to login');
        }
    } catch (error) {
        console.error('Error logging in:', error.message);
        alert('Error: ' + error.message);
    }
});
