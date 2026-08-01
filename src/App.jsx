import OrgProfile from "./components/OrgProfile";
import RepositoryCard from "./components/RepositoryCard";
import SearchBar from "./components/SearchBar";
import { useState, useMemo } from "react";
import { fetchOrg, fetchRepos } from "./api";
import { repoRanking } from "./ranking";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [orgData, setOrgData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState({ org: null, repo: null });
  const rankedRepos = useMemo(() => repoRanking(repos), [repos]);

  async function handleSearch(text) {
    setLoading(true);
    setError({ org: null, repo: null });
    try {
      const result = await Promise.allSettled([
        fetchOrg(text),
        fetchRepos(text),
      ]);
      const orgResult = result[0];
      const repoResult = result[1];
      if (orgResult.status === "fulfilled") {
        setOrgData(orgResult.value);
      } else {
        if (orgResult.reason.status) {
          setError((prev) => ({ ...prev, org: orgResult.reason.message }));
        } else {
          setError((prev) => ({
            ...prev,
            org: "Something went wrong. Please check your connection and try again",
          }));
        }
      }
      if (repoResult.status === "fulfilled") {
        setRepos(repoResult.value);
      } else {
        if (repoResult.reason.status) {
          setError((prev) => ({ ...prev, repo: repoResult.reason.message }));
        } else {
          setError((prev) => ({
            ...prev,
            repo: "Something went wrong. Please check your connection and try again",
          }));
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading ...</p>}
      {error.org && <p>{error.org}</p>}
      {orgData && (
        <OrgProfile
          avatar_url={orgData.avatar_url}
          name={orgData.name}
          description={orgData.description}
          html_url={orgData.html_url}
          blog={orgData.blog}
        />
      )}
      {error.repo && <p>{error.repo}</p>}
      {rankedRepos.map((repo) => (
        <RepositoryCard
          key={repo.name}
          name={repo.name}
          description={repo.description}
          stargazers_count={repo.stargazers_count}
          updated_at={repo.updated_at}
          language={repo.language}
          html_url={repo.html_url}
        />
      ))}
    </>
  );
}
