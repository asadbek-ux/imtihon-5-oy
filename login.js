const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();  

    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    try {
       
        const response = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        
        const data = await response.json();

        if (response.ok) {
           
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            
            window.location.href = 'index.html';
        } else {
            throw new Error(data.message || 'Login failed');
        }
    } catch (error) {
    
        alert(error);
    }
});
