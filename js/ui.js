export function renderOrgInfo(orgData) {
  const orgName = document.getElementById("org-name");
  const orgDescription = document.getElementById("org-description");
  const orgProfile = document.getElementById("org-url");
  const orgWebsite = document.getElementById("org-website");

  orgName.textContent = orgData.name || orgData.login;
  orgDescription.textContent = orgData.description || "No Description Provided";
  orgProfile.href = orgData.html_url;
  orgWebsite.href = orgData.blog;
}

export function renderOrgsRepo(repoList) {
  const unList = document.getElementById("repo-list");
  unList.textContent = "";
  for (let i = 0; i < repoList.length; i++) {
    const card = createCard(repoList[i]);
    unList.appendChild(card);
  }
}

export function showErrorMessage(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = message;
  const parent = document.getElementById("error");
  parent.classList.remove("hidden");
}

export function hideErrorMessage() {
  const parent = document.getElementById("error");
  parent.classList.add("hidden");
}

function createCard(repo) {
  const repoCard = document.createElement("li");
  repoCard.className = "repo-card";

  const repoName = document.createElement("h3");
  repoName.className = "repo-name";
  repoName.textContent = repo.name;

  const repoDescription = document.createElement("p");
  repoDescription.className = "repo-description";
  repoDescription.textContent = repo.description || "No description provided.";

  const repoLanguage = document.createElement("span");
  repoLanguage.className = "repo-language";
  repoLanguage.textContent = repo.language
    ? `Language: ${repo.language}`
    : "Language: Not specified";

  const repoStars = document.createElement("span");
  repoStars.className = "repo-stars";
  repoStars.textContent = `Stars: ${repo.stargazers_count}`;

  const repoForks = document.createElement("span");
  repoForks.className = "repo-forks";
  repoForks.textContent = `Forks: ${repo.forks_count}`;

  const repoLink = document.createElement("a");
  repoLink.className = "repo-link";
  repoLink.href = repo.html_url;
  repoLink.target = "_blank";
  repoLink.rel = "noopener noreferrer";
  repoLink.textContent = "View on Github";

  repoCard.append(
    repoName,
    repoDescription,
    repoLanguage,
    repoStars,
    repoForks,
    repoLink,
  );
  return repoCard;
}
