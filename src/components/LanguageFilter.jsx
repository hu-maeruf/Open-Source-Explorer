export default function LanguageFilter(props) {
  const languagesSet = new Set(props.repos.map((r) => r.language));
  const languages = [...languagesSet].filter(Boolean);
  return (
    <>
      <label htmlFor="langFilter"></label>
      <select
        onChange={(e) => {
          props.onLanguageChange(e.target.value);
        }}
        name="programmingLanguage"
        id="langFilter"
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
    </>
  );
}
