import { Button } from 'antd';
import { Link } from 'react-router-dom';

import styles from './LoggedOutHeader.module.scss';

function LoggedOutHeader() {
  return (
    <div className={styles.wrapper}>
      <Link to="/sign-in">
        <Button type="link" className={styles.button}>
          Sign In
        </Button>
      </Link>

      <Link to="/sign-up">
        <Button ghost className={styles['button-green']}>
          Sign Up
        </Button>
      </Link>
    </div>
  );
}

export default LoggedOutHeader;
