// contributor.js

const repoOwner = "kvcops";  // Repository owner for KV-Nexus
const repoName = "KV-Nexus"; // Repository name for KV-Nexus

// URLs to fetch data
const contributorsUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;
const repoUrl = `https://api.github.com/repos/${repoOwner}/${repoName}`;

async function fetchContributorData() {
  try {
    // Fetch both contributors and repository data at the same time
    const [contributorsRes, repoRes] = await Promise.all([
      fetch(contributorsUrl),
      fetch(repoUrl)
    ]);

    // Parse the JSON responses
    const contributors = await contributorsRes.json();
    const repoData = await repoRes.json();

    // Display project stats in a grid
    const statsGrid = document.getElementById("statsGrid");

    statsGrid.innerHTML = `
      <div class="contributor-stat-card"><h3>${contributors.length}</h3><p>Contributors</p></div>
      <div class="contributor-stat-card"><h3>${contributors.reduce((sum, { contributions }) => sum + contributions, 0)}</h3><p>Total Contributions</p></div>
      <div class="contributor-stat-card"><h3>${repoData.stargazers_count}</h3><p>GitHub Stars</p></div>
      <div class="contributor-stat-card"><h3>${repoData.forks_count}</h3><p>Forks</p></div>
    `;

    // Display each contributor's data (avatar, username, and contributions)
    const contributorsContainer = document.getElementById("contributors");
    contributorsContainer.innerHTML = contributors.map(({ login, contributions, avatar_url, html_url }) => `
      <div class="contributor-card">
        <img src="${avatar_url}" alt="${login}'s avatar">
        <p><strong>${login}</strong></p>
        <p>Contributions: ${contributions}</p>
        <a href="${html_url}" target="_blank">GitHub Profile</a>
      </div>
    `).join('');
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error fetching data:", error);
  }
}

// Call the function to fetch and display data
fetchContributorData();
