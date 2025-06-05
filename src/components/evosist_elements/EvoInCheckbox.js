const getBgColor = (action, isChecked) => {
  switch (action) {
    case 'create':
      return isChecked ? 'bg-blue-500' : 'bg-white';
    case 'read':
      return isChecked ? 'bg-green-500' : 'bg-white';
    case 'update':
      return isChecked ? 'bg-yellow-500' : 'bg-white';
    case 'delete':
      return isChecked ? 'bg-red-500' : 'bg-white';
    default:
      return isChecked ? 'bg-purple-500' : 'bg-white';
  }
};

const getBorderColor = (action, isChecked) => {
  switch (action) {
    case 'create':
      return isChecked ? 'border-blue-500' : 'border-white';
    case 'read':
      return isChecked ? 'border-green-500' : 'border-white';
    case 'update':
      return isChecked ? 'border-yellow-500' : 'border-white';
    case 'delete':
      return isChecked ? 'border-red-500' : 'border-white';
    default:
      return isChecked ? 'border-purple-500' : 'border-white';
  }
};

const EvoInCheckbox = ({
  label = '',
  answers = [], // ← array of { label, value, checked }
  onChange,
  error,
  name,
  type = '',
  horizontal = false,
  fitContent = false,
  cexboxStyle = '',
}) => {
  return (
    <div className="flex flex-col w-full">
      {label && <label className="text-card mb-1">{label}</label>}

      <div
        className={`flex ${horizontal ? 'flex-row' : 'flex-col '} gap-2 w-full`}
      >
        {answers.map((answer, index) => (
          <div
            key={index}
            className={`${
              type === 'hak akses'
                ? 'px-2 py-1 rounded-[12px] border-2 ' +
                  getBorderColor(answer.value, answer)
                : ''
            } flex items-center mb-1 ${horizontal ? 'w-fit' : 'w-full'} ${
              type === 'hak akses'
                ? answer.checked
                  ? getBgColor(answer.value, answer.checked)
                  : 'bg-transparent'
                : 'bg-transparent'
            }`}
            onClick={() =>
              onChange(
                { target: { checked: !answer.checked, value: answer.value } },
                answer
              )
            }
          >
            <input
              type="checkbox"
              name={name}
              value={answer.value}
              checked={answer.checked}
              onChange={(e) => onChange(e, answer)}
              className={`h-5 w-5 border-2 rounded-lg focus:outline-none  ${
                type === 'hak akses' ? 'accent-white' : 'accent-primary'
              } checked:${getBgColor(
                answer.value,
                answer.checked
              )} checked:${getBorderColor(answer.value, answer)}`}
              style={{ borderRadius: '8px' }}
            />
            <label
              htmlFor={name}
              className={`ml-2 text-sm ${
                type === 'hak akses'
                  ? answer.checked
                    ? 'text-white'
                    : 'text-black'
                  : 'text-black'
              }`}
            >
              {answer.label}
            </label>
          </div>
        ))}
      </div>

      {error && (
        <div className="text-danger text-sm mt-0.5 w-full">{error}</div>
      )}
    </div>
  );
};

export default EvoInCheckbox;
