// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form'); // Get the search form element
    form.addEventListener('submit', handleFormSubmit); // Add an event listener for form submission
  });
  
  // Handle form submission
  function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const searchInput = document.getElementById('search').value; // Get the search input value
    searchUsers(searchInput); // Call the searchUsers function with the input value
  }
  
  // Search for users by making a request to the GitHub API
  function searchUsers(query) {
    fetch(`https://api.github.com/search/users?q=${query}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json' // Use the v3 version of the API
      }
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => displayUsers(data.items)) // Pass the user data to the displayUsers function
    .catch(error => console.error('Error:', error)); // Log any errors to the console
  }
  
  // Display the list of users on the page
  function displayUsers(users) {
    const userList = document.getElementById('user-list'); // Get the user list element
    userList.innerHTML = ''; // Clear any previous results
    users.forEach(user => { // Iterate through the list of users
      const li = document.createElement('li'); // Create a new list item
      li.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50"> // Display user avatar
        <a href="${user.html_url}" target="_blank">${user.login}</a> // Display user login as a link
        <button onclick="fetchUserRepos('${user.login}')">View Repos</button> // Button to fetch user repos
      `;
      userList.appendChild(li); // Add the list item to the user list
    });
  }
  
  // Fetch and display the repositories for a selected user
  function fetchUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json' // Use the v3 version of the API
      }
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => displayRepos(data)) // Pass the repo data to the displayRepos function
    .catch(error => console.error('Error:', error)); // Log any errors to the console
  }
  
  // Display the list of repositories on the page
  function displayRepos(repos) {
    const reposList = document.getElementById('repos-list'); // Get the repos list element
    reposList.innerHTML = ''; // Clear any previous results
    repos.forEach(repo => { // Iterate through the list of repos
      const li = document.createElement('li'); // Create a new list item
      li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`; // Display repo name as a link
      reposList.appendChild(li); // Add the list item to the repos list
    });
  }
  