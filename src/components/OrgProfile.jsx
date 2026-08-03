export default function OrgProfile({
  avatar_url,
  name,
  description,
  html_url,
  blog,
}) {
  return (
    <div className="max-w-2xl mx-4 sm:mx-auto mt-8 flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
      <img
        src={avatar_url}
        alt="Avatar image"
        className="h-16 w-16 rounded-full"
      />
      <div>
        <h1 className="text-lg font-semibold text-slate-900">{name}</h1>
        <p className="text-sm text-slate-500">
          {description || "No description provided."}
        </p>
        <div className="mt-1 flex gap-3 text-sm">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={html_url}
            className="text-indigo-600 hover:underline"
          >
            Github Profile
          </a>
          {blog && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={blog}
              className="text-indigo-600 hover:underline"
            >
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
