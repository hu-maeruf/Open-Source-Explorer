export default function RepositoryCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <p>{props.stargazers_count}</p>
      <p>{props.updated_at}</p>
      <p>{props.language}</p>
      <a target="_blank" rel="noopener noreferrer" href={props.html_url}>
        View on Github
      </a>
    </div>
  );
}
