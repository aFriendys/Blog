import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import MinimizedPost from '../MinimizedPost';
import api from '../../redux/serverApi';
import { setPagesCount } from '../../redux/serverSlice';

import styles from './PostsList.module.scss';

function PostsList() {
  const offset = useSelector((state) => state.serverSlice.offset);
  const { data, isLoading } = api.useGetArticlesQuery({ offset, token: localStorage.token });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPagesCount(data?.articlesCount || 0));
  }, [data]);

  return (
    <ul className={styles.list}>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        data.articles.map((article) => {
          const { title, favoritesCount, author, createdAt, description, slug, tagList, favorited } = article;
          return (
            <li key={`${author}${createdAt}`} className={styles.list__item}>
              <MinimizedPost
                favorited={favorited}
                title={title}
                favoritesCount={favoritesCount}
                author={author}
                createdAt={createdAt}
                description={description}
                slug={slug}
                tagList={tagList}
              />
            </li>
          );
        })
      )}
    </ul>
  );
}

export default PostsList;
