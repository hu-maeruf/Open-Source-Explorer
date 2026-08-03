export default function LanguageFilter({ repos, onLanguageChange }) {
  const languagesSet = new Set(repos.map((r) => r.language));
  const languages = [...languagesSet].filter(Boolean);
  return (
    <div className="max-w-xl mx-auto mt-6 flex items-center gap-2">
      <label htmlFor="langFilter" className="text-sm text-slate-600 mx-4">
        Language
      </label>
      <select
        onChange={(e) => onLanguageChange(e.target.value)}
        name="programmingLanguage"
        id="langFilter"
        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option key="" value="">
          Show All
        </option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}
