document.addEventListener('DOMContentLoaded', () => {
    // Get references to the form, input, and lists for users and repositories
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    // Add event listener for form submission
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      const query = searchInput.value.trim(); // Get the search input value and trim whitespace
      if (query) {
        searchUsers(query); // Call the searchUsers function if the query is not empty
      }
    });
  
    // Function to search for users by query
    function searchUsers(query) {
      fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json', // Specify the API version
        },
      })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
          userList.innerHTML = ''; // Clear the previous user list
          data.items.forEach(user => {
            // Create a user card for each user in the search results
            const userCard = document.createElement('li');
            userCard.classList.add('user-card');
            userCard.innerHTML = `
              <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
              <h3>${user.login}</h3>
              <a href="${user.html_url}" target="_blank">View Profile</a>
              <button data-username="${user.login}">View Repos</button>
            `;
            userList.appendChild(userCard); // Add the user card to the user list
          });
        })
        .catch(error => console.error('Error:', error)); // Log any errors
    }
  
    // Add event listener for click events on the user list
    userList.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        const username = event.target.getAttribute('data-username'); // Get the username from the button's data attribute
        if (username) {
          fetchRepos(username); // Call the fetchRepos function if the username is valid
        }
      }
    });
  
    // Function to fetch repositories for a specific user
    function fetchRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Accept: 'application/vnd.github.v3+json', // Specify the API version
        },
      })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
          reposList.innerHTML = ''; // Clear the previous repository list
          data.forEach(repo => {
            // Create a repo card for each repository in the response
            const repoCard = document.createElement('li');
            repoCard.classList.add('repo-card');
            repoCard.innerHTML = `
              <h3>${repo.name}</h3>
              <p>${repo.description || 'No description available'}</p>
              <a href="${repo.html_url}" target="_blank">View Repo</a>
            `;
            reposList.appendChild(repoCard); // Add the repo card to the repo list
          });
        })
        .catch(error => console.error('Error:', error)); // Log any errors
    }
  });
  