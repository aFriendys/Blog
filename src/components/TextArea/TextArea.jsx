/* eslint-disable react/jsx-props-no-spreading */
import styles from './TextArea.module.scss';

function TextArea({ placeholder, label, register, required, errors, minLength, maxLength, pattern, name }) {
  return (
    <div className={styles.input}>
      <label>{label}</label>
      <textarea
        className={errors[name] && styles.inputError}
        placeholder={placeholder}
        {...register(name, {
          required: { value: required, message: 'is required.' },
          minLength: { value: minLength, message: `must be at least ${minLength} characters.` },
          maxLength: { value: maxLength, message: `must not exceed ${maxLength} characters.` },
          pattern: { value: pattern, message: 'is invalid email address.' },
        })}
      />
      {errors[name] && <span className={styles.error}>{`${label} ${errors[name].message}`}</span>}
    </div>
  );
}

export default TextArea;
