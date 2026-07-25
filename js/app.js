import { fetchOrgInfo } from "./api.js";
import { renderOrgInfo } from "./ui.js";

const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userInput = document.getElementById("org-input").value;
  const orgInfo = await fetchOrgInfo(userInput);
  renderOrgInfo(orgInfo);
});
