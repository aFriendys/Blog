import { Link } from 'react-router-dom';

import styles from './NotAuthorized.module.scss';

function NotAuthorized() {
  return (
    <section className={styles.section}>
      <header className={styles.header}>NOT AUTHORIZED</header>
      <span>
        <Link to="sign-in">Sign in</Link> or <Link to="sign-up">register new account</Link>.
      </span>
    </section>
  );
}

export default NotAuthorized;
