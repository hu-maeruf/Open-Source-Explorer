import { fetchOrgInfo, fetchOrgsRepo } from "./api.js";
import { renderOrgInfo, renderOrgsRepo } from "./ui.js";

const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userInput = document.getElementById("org-input").value;
  const [orgInfo, repoList] = await Promise.all([
    fetchOrgInfo(userInput),
    fetchOrgsRepo(userInput),
  ]);
  renderOrgInfo(orgInfo);
  const topRepos = getTopRepos(repoList);
  renderOrgsRepo(topRepos);
});

function getTopRepos(repos) {
  const unArchived = repos.filter((repo) => !repo.archived);
  unArchived.sort((a, b) => b.stargazers_count - a.stargazers_count);
  const repoList = unArchived.slice(0, 5);
  return repoList;
}
