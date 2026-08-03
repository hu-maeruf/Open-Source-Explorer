export default function RepositoryCard({
  updated_at,
  name,
  stargazers_count,
  description,
  language,
  html_url,
}) {
  const updated = new Date(updated_at).toLocaleDateString();
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-semibold text-slate-900">{name}</h2>
        <span className="font-mono text-xs text-slate-500">
          ⭐ {stargazers_count}
        </span>
      </div>
      <p className="mt-1 text-sm text-slate-600 line-clamp-2">{description}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span className="font-mono text-sm text-slate-500">{language}</span>
        <span className="font-mono">Updated {updated}</span>
      </div>
      <a
        href={html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm text-indigo-600 hover:underline"
      >
        View on GitHub
      </a>
    </div>
  );
}
