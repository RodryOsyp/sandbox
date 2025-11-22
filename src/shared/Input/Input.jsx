import PropTypes from "prop-types";
import styles from "./Input.module.css";

export default function TextInput({ value, onChange, placeholder, type}) {
    return (
        <input
            className={styles.input}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
        />
    );
}

TextInput.propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
};
