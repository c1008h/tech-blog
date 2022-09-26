const commentFormHandler = async (event) => {
    event.preventDefault();

    const description = document.querySelector('input[name="comment-body"]').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (description) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                description
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
            document.querySelector('#comment-form').style.display = "block";
        }
    }
    console.log(description)
}
const deleteButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            document.location.replace('/comment')
        } else {
            alert('Failed to delete comment')
        }
    }
}
document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);

document
    .querySelector('.delete-comment')
    .addEventListener('submit', deleteButtonHandler)