export async function fetchOrgInfo(orgName) {
  const url = `https://api.github.com/orgs/${orgName}`;
  const response = await fetch(url);
  checkResponse(response);
  const data = await response.json();
  return data;
}

export async function fetchOrgsRepo(orgName) {
  const url = `https://api.github.com/orgs/${orgName}/repos`;
  const response = await fetch(url);
  checkResponse(response);
  const repoList = await response.json();
  return repoList;
}

function checkResponse(response) {
  if (!response.ok) {
    const error = new Error("GitHub API request failed");
    error.status = response.status;
    throw error;
  }
}
