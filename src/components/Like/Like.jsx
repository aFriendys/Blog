import { useSelector } from 'react-redux';
import { useState } from 'react';

import api from '../../redux/serverApi';

import styles from './Like.module.scss';

function Like({ children, favorited, slug }) {
  const [like, setLike] = useState(children);
  const id = Math.random(1, 9999999);
  const [favoriteArticle] = api.useFavoriteArticleMutation();
  const handleFavoriteArticle = async (value) => {
    await favoriteArticle({
      value,
      token: localStorage.token,
      slug,
    });
  };

  const isAuthorized = useSelector((state) => state.serverSlice.isAuthorized);
  return (
    <label htmlFor={id} className={styles.label}>
      <input
        defaultChecked={favorited}
        type="checkbox"
        name="like"
        className={styles.realCheckbox}
        id={id}
        disabled={!isAuthorized}
        onChange={(e) => {
          setLike(!favorited ? children + e.target.checked : children + e.target.checked - 1);
          handleFavoriteArticle(e.target.checked);
        }}
      />
      <span className={styles.fakeCheckbox} />
      <span className={styles.likesCount}>{like}</span>
    </label>
  );
}

export default Like;
