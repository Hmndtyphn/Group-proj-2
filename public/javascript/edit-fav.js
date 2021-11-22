async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="favorite-title"]').value.trim();
  const fav_url = document.querySelector('input[name="favorite-url"]').value.trim();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/favorites/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      fav_url
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
}

document.querySelector('.edit-favorite-form').addEventListener('submit', editFormHandler);
