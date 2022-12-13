import { Typography } from 'antd';

import ArticleHeader from '../ArticleHeader';

import styles from './MinimizedPost.module.scss';

const { Paragraph } = Typography;
function MinimizedPost({ title, favoritesCount, author, createdAt, description, slug, tagList, favorited }) {
  const { username, image } = author;
  return (
    <>
      <ArticleHeader
        title={title.length > 60 ? `${title.slice(0, 60)}...` : title}
        favoritesCount={favoritesCount}
        favorited={favorited}
        createdAt={createdAt}
        slug={slug}
        tagList={tagList}
        username={username}
        image={image}
      />
      <main className={styles.main}>
        <Paragraph ellipsis={{ rows: 2 }}>{description}</Paragraph>
      </main>
    </>
  );
}

export default MinimizedPost;
