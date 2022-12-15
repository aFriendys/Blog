import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import PostsList from '../../components/PostsList/PostsList';
import { setOffset } from '../../redux/serverSlice';

import styles from './Articles.module.scss';

function Articles() {
  const articlesCount = useSelector((state) => state.serverSlice.articlesCount);
  const dispatch = useDispatch();
  return (
    <section className={styles.section}>
      <PostsList />
      <footer className={styles.footer}>
        <Pagination
          onChange={(value) => {
            dispatch(setOffset((value - 1) * 5));
            localStorage.setItem('page', value);
            window.scrollTo(0, 0);
          }}
          disabled={!articlesCount}
          defaultCurrent={localStorage.page}
          total={(articlesCount && articlesCount - 5) || 25}
          defaultPageSize={5}
          size="small"
          showSizeChanger={false}
        />
      </footer>
    </section>
  );
}

export default Articles;
