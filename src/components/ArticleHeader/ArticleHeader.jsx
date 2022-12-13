import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { format } from 'date-fns';

import Like from '../Like';

import styles from './ArticleHeader.module.scss';

function ArticleHeader({ title, slug, favoritesCount, tagList, image, username, createdAt, favorited }) {
  return (
    <header className={styles.header}>
      <div className={styles.header__info}>
        <div className={styles.title}>
          <h2 className={styles.title__header}>
            <Link to={`/articles/${slug}`}>{title}</Link>
          </h2>
          <Like favorited={favorited} slug={slug}>
            {favoritesCount}
          </Like>
        </div>
        {tagList.length !== 0 && (
          <ul className={styles.list}>
            {tagList.map((tag) => (
              <li key={`${tag}${Math.random(0, 999999)}`} className={styles.list__item}>
                {tag && tag.length > 20 ? `${tag.slice(0, 20)}...` : tag}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.header__user}>
        <div className={styles['user-info']}>
          <span className={styles['user-info__name']}>{username}</span>
          <span className={styles['user-info__time']}>{format(new Date(createdAt), 'PP')}</span>
        </div>
        <Avatar size={46} src={image} />
      </div>
    </header>
  );
}

export default ArticleHeader;
