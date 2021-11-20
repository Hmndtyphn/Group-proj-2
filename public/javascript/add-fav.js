async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="favorite-title"]').value;
    const fav_url = document.querySelector('input[name="fav-url"]').value;
  
    const response = await fetch(`/api/favorites`, {
      method: 'POST',
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
  
  document.querySelector('.new-favorite-form').addEventListener('submit', newFormHandler);