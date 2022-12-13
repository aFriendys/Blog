import styles from './Form.module.scss';

function Form({ title, children, onSubmit }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2>{title}</h2>
      {children}
    </form>
  );
}

export default Form;
