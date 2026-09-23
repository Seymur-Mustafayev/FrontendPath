interface Props {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label?: string;
}

export function SearchInput({ id, value, onChange, placeholder, label }: Props) {
  return (
    <label className="search" htmlFor={id}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <span className="visually-hidden">{label ?? placeholder}</span>
      <input
        id={id}
        type="search"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
