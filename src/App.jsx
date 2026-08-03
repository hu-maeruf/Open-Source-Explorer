import { useState, useMemo } from "react";
import { fetchOrg, fetchRepos } from "./api";
import { repoRanking } from "./ranking";
import OrgProfile from "./components/OrgProfile";
import RepositoryCard from "./components/RepositoryCard";
import SearchBar from "./components/SearchBar";
import LanguageFilter from "./components/LanguageFilter";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [orgData, setOrgData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState({ org: null, repo: null });
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const rankedRepos = useMemo(() => repoRanking(repos), [repos]);
  const filteredRepos = selectedLanguage
    ? rankedRepos.filter((r) => r.language === selectedLanguage)
    : rankedRepos;

  async function handleSearch(text) {
    setLoading(true);
    setError({ org: null, repo: null });
    setSelectedLanguage("");
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

  function handleLanguage(language) {
    setSelectedLanguage(language);
  }
  const heroMode = !orgData;

  return (
    <div className="min-h-screen bg-slate-50">
      <div
        className={
          heroMode
            ? "flex flex-col items-center justify-center min-h-screen px-4 text-center"
            : "pt-10 px-4"
        }
      >
        {heroMode && (
          <>
            <h1 className="text-2xl font-semibold text-slate-900">
              Open Source Explorer
            </h1>
            <p className="mt-5 text-slate-500">
              Find actively maintained repositories worth contributing to, in
              any GitHub organization.
            </p>
          </>
        )}

        <div className={heroMode ? "mt-8" : ""}>
          <SearchBar onSearch={handleSearch} />
        </div>

        {heroMode && (
          <div className="mt-8 flex justify-center gap-2 text-sm">
            {["github", "python", "npm"].map((org) => (
              <button
                key={org}
                onClick={() => handleSearch(org)}
                className="rounded-full border border-slate-300 px-3 py-1 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
              >
                {org}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading && (
        <p className="mt-6 text-center text-sm text-slate-500">Loading…</p>
      )}
      {error.org && (
        <p className="mt-4 max-w-xl mx-auto text-center text-sm text-red-600">
          {error.org}
        </p>
      )}

      {orgData && (
        <OrgProfile
          avatar_url={orgData.avatar_url}
          name={orgData.name}
          description={orgData.description}
          html_url={orgData.html_url}
          blog={orgData.blog}
        />
      )}

      {error.repo && (
        <p className="mt-4 max-w-xl mx-auto text-center text-sm text-red-600">
          {error.repo}
        </p>
      )}

      {rankedRepos.length > 0 && (
        <LanguageFilter repos={rankedRepos} onLanguageChange={handleLanguage} />
      )}

      <div className="max-w-3xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 px-4">
        {filteredRepos.map((repo) => (
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
      </div>
    </div>
  );
}
