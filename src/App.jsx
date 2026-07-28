import OrgProfile from "./components/OrgProfile";
import RepositoryCard from "./components/RepositoryCard";
import SearchBar from "./components/SearchBar";

export default function App() {
  const repos = [
    {
      name: "repo_1",
      stargazers_count: 65862,
      description: "A bundler for javascript.",
      updated_at: "2026-07-28T15:35:19Z",
      language: "JavaScript",
      html_url: "#",
    },
    {
      name: "repo_2",
      stargazers_count: 7851,
      description: "Updates the browser on changes.",
      updated_at: "2026-07-27T07:30:35Z",
      language: "JavaScript",
      html_url: "#",
    },
  ];

  function handleSearch(text) {
    console.log(text);
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <OrgProfile
        avatar_url="#"
        name="webpack"
        description="No description provided."
        html_url="https://github.com/webpack"
        blog="https://webpack.js.org"
      />
      {repos.map((repo) => (
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
