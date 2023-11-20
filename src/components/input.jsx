

// eslint-disable-next-line react/prop-types
const Input = ({type, name, value, placeholder, required, onChange, minLength }) => {

    return (
        <input type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        minLength={minLength}
        className="outline-none border-none rounded-lg bg-blue-100 p-2 w-full"
        />
    )
}

export default Input