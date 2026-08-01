const STAR_WEIGHT = 1;
const RECENCY_WEIGHT = 10;
const MAX_DAYS_SINCE_UPDATE = 730;

function repoFilter(repos) {
  const now = new Date();
  const unArchived = repos.filter((repo) => !repo.archived);
  const recency = unArchived.map((repo) => {
    const updatedDate = new Date(repo.updated_at);
    const daysSinceUpdate = (now - updatedDate) / (1000 * 60 * 60 * 24);
    return { ...repo, daysSinceUpdate };
  });
  const filtered = recency.filter(
    (repo) => repo.daysSinceUpdate <= MAX_DAYS_SINCE_UPDATE,
  );
  return filtered;
}

function trackScore(repos) {
  const scoreTracking = repos.map((repo) => {
    const starScore = Math.log(repo.stargazers_count + 1);
    const recencyScore = 1 / (repo.daysSinceUpdate + 1);
    const finalScore = starScore * STAR_WEIGHT + recencyScore * RECENCY_WEIGHT;
    return { ...repo, finalScore };
  });
  return scoreTracking;
}

export function repoRanking(repos) {
  const filteredRepos = trackScore(repoFilter(repos));
  filteredRepos.sort((a, b) => b.finalScore - a.finalScore);
  return filteredRepos;
}
