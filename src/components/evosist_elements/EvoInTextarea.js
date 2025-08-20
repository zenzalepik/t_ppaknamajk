const EvoInTextarea = ({
    label,
    placeholder,
    value,
    onChange,
    error,
    name,
    className = '',
    rows = 4,
  }) => {
    return (
      <div className={`flex flex-col w-full ${className}`}>
        <label className="text-card mb-1">{label}</label>
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`border rounded-[16px] px-4 py-3 focus:outline-none focus:ring-2 resize-none ${
            error
              ? 'border-danger focus:ring-danger'
              : 'border-black/40 focus:ring-primary'
          }`}
        />
        {error && <p className="text-danger text-sm mt-1">{error}</p>}
      </div>
    );
  };
  
  export default EvoInTextarea;
  