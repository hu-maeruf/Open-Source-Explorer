export default function OrgProfile({
  avatar_url,
  name,
  description,
  html_url,
  blog,
}) {
  return (
    <div>
      <img src={avatar_url} alt={name + " image"} />
      <h1>{name}</h1>
      <p>{description || "No description provided."}</p>
      <a target="_blank" rel="noopener noreferrer" href={html_url}>
        Github Profile
      </a>
      {blog && (
        <a target="_blank" rel="noopener noreferrer" href={blog}>
          Website
        </a>
      )}
    </div>
  );
}
