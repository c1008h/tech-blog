const addBtn = document.querySelector('#addBtn')

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.getElementById('blogTitle').value;
  const description = document.getElementById('description').value;

  if (title && description) {
    const response = await fetch(`/api/blog`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description
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
  } 
  
  return;
};
  
addBtn.addEventListener('click', newFormHandler);