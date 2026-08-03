export async function fetchOrg(orgName) {
  const response = await fetch(`https://api.github.com/orgs/${orgName}`);
  checkResponse(response);
  const data = await response.json();
  return data;
}

export async function fetchRepos(orgName) {
  const response = await fetch(
    `https://api.github.com/orgs/${orgName}/repos?per_page=100`,
  );
  checkResponse(response);
  const data = await response.json();
  return data;
}

function checkResponse(response) {
  if (!response.ok) {
    const error = new Error("");
    error.status = response.status;
    if (response.status === 404) {
      error.message = "Organization not found";
    } else if (response.status === 403) {
      error.message = "Rate limit exceeded. Please try again later";
    } else {
      error.message = "GitHub API request failed";
    }
    throw error;
  }
}
