export function renderOrgInfo(orgData) {
  const orgName = document.getElementById("org-name");
  const orgDescription = document.getElementById("org-description");
  const orgProfile = document.getElementById("org-url");
  const orgWebsite = document.getElementById("org-website");

  orgName.textContent = orgData.name;
  orgDescription.textContent = orgData.description
    ? orgData.description
    : "No Description Provided";
  orgProfile.href = orgData.html_url;
  orgWebsite.href = orgData.blog;
}
