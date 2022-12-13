import { Button, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setIsAuthorized } from '../../redux/serverSlice';

import styles from './LoggedInHeader.module.scss';

function LoggedInHeader() {
  const dispatch = useDispatch();

  const [username, image] = useSelector((state) => [state.serverSlice.user.username, state.serverSlice.user.image]);
  const logOut = () => {
    dispatch(setIsAuthorized(false));
    localStorage.clear();
  };
  return (
    <div className={styles.wrapper}>
      <Button ghost className={`${styles['button-green']} ${styles.button}`}>
        <Link to="/new-article">Create article</Link>
      </Button>

      <Link to="/profile">
        <div className={styles['user-info']}>
          <span>{username || ''}</span>
          <Avatar
            size={46}
            src={
              image ||
              'data:image/png;base64,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'
            }
          />
        </div>
      </Link>
      <Button onClick={logOut} ghost className={`${styles['button-black']} ${styles.button}`}>
        Log Out
      </Button>
    </div>
  );
}

export default LoggedInHeader;
