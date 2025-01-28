import PropTypes from "prop-types";

const Input = ({
  label,
  name,
  options,
  type = "text",
  handleChange,
  value,
}) => {
  return (
    <div className="field">
      <label>{label}</label>

      {options ? (
        <select name={name} onChange={handleChange}>
          {options.map((item) => (
            <option key={item.id} value={item} selected={item === value}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          onChange={handleChange}
          defaultValue={value}
        />
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array, 
  type: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.any
};

export default Input;
