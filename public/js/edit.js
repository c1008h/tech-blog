const editFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const description = document.querySelector('#description').value.trim();
    console.log(title);
    console.log(description);

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
      
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          blog_id: id,
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

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);