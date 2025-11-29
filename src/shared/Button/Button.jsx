import PropTypes from "prop-types";
import styles from "./Button.module.css";

export default function Button({ title, onClick, className }) {
    return (
        <button
            className={`${styles.btn} ${className}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
}

Button.propTypes = {
    title: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
};

