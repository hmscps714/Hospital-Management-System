import { useState } from "react";
import styles from "./FormInput.module.css";

export const FormInput = (props) => {
    const [focused,setFocused] = useState(false);
    
    const {label, onChange, id, errorMessage, ...others} = props;
    
    const handleFocus = (e) => {
        setFocused(true)
    }

    return (
        <div className="formInput">
            <label htmlFor={id}>
                {label}
            </label>
            <input {...others} className={styles.InputBox} onChange={onChange} onBlur={handleFocus} focused={focused.toString()}/>
            <span className={styles.ErrorMessage}>{errorMessage}</span>
        </div>
    )
}

export default FormInput;