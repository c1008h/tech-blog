const deleteFormHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    
    const response = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        blog_id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  console.log(event.target)
      
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);