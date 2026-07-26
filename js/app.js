import { fetchOrgInfo, fetchOrgsRepo } from "./api.js";
import {
  renderOrgInfo,
  renderOrgsRepo,
  showErrorMessage,
  hideErrorMessage,
} from "./ui.js";

const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userInput = document.getElementById("org-input").value.trim();
  if (userInput.length === 0) {
    showErrorMessage("Search can't be empty!!!");
    return;
  }
  hideErrorMessage();

  try {
    const [orgInfo, repoList] = await Promise.all([
      fetchOrgInfo(userInput),
      fetchOrgsRepo(userInput),
    ]);

    renderOrgInfo(orgInfo);
    const topRepos = getTopRepos(repoList);
    renderOrgsRepo(topRepos);
  } catch (error) {
    if (error.status === 404) {
      showErrorMessage("Organization not found.");
    } else if (error.status === 403) {
      showErrorMessage("Rate limit exceeded. Please try again later.");
    } else {
      console.error(error.message);
      showErrorMessage(
        "Something went wrong. Please check your connection and try again.",
      );
    }
  }
});

function getTopRepos(repos) {
  const unArchived = repos.filter((repo) => !repo.archived);
  unArchived.sort((a, b) => b.stargazers_count - a.stargazers_count);
  const repoList = unArchived.slice(0, 5);
  return repoList;
}
