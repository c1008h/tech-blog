const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#signupUser').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    //console.log(password + username)
    
    if (0 < username.length && password.length) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up');
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  