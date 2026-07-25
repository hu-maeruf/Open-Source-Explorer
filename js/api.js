export async function fetchOrgInfo(orgName) {
  const url = `https://api.github.com/orgs/${orgName}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchOrgsRepo(orgName) {
  const url = `https://api.github.com/orgs/${orgName}/repos`;
  const response = await fetch(url);
  const repoList = await response.json();
  return repoList;
}
