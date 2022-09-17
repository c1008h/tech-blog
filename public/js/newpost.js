const addBtn = document.querySelector('#addBtn')

async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;

    const response = await fetch(`/api/blog`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };
  
addBtn.addEventListener('click', newFormHandler);