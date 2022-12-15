import { useParams, useHistory, Link } from 'react-router-dom';
import { Spin, Button } from 'antd';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import ArticleHeader from '../../components/ArticleHeader';
import api from '../../redux/serverApi';
import Modal from '../../components/Modal';

import styles from './Article.module.scss';

function Article() {
  const history = useHistory();
  const [deleteArticle] = api.useDeleteArticleMutation();
  const { slug } = useParams();
  const handleDeleteArticle = async () => {
    await deleteArticle({ slug, token: localStorage.token }).then(() => {
      history.push('/articles');
    });
  };

  const username = useSelector((state) => state.serverSlice.user.username);
  const [modal, setModal] = useState(false);

  const { data, isLoading } = api.useGetArticleQuery({ slug, token: localStorage.token });
  if (!isLoading) {
    if (!data) {
      history.push('/404');
    }
  }
  return isLoading ? (
    <Spin size="large" />
  ) : (
    <section className={styles.section}>
      <div className={styles.article}>
        <ArticleHeader
          title={data?.article.title.length > 60 ? `${data?.article.title.slice(0, 60)}...` : data?.article.title}
          slug={data?.article.slug}
          favoritesCount={data?.article.favoritesCount}
          tagList={data?.article.tagList || []}
          favorited={data?.article.favorited}
          image={data?.article.author.image}
          username={data?.article.author.username}
          createdAt={data?.article.createdAt}
        />
        <div className={styles.description__wrapper}>
          <div className={styles.description}>{data?.article.description}</div>
          {data?.article.author.username === username && (
            <div className={styles.buttons}>
              <div className={styles.modalbutton}>
                <Button
                  className={styles.button}
                  ghost
                  danger
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  Delete
                </Button>
                {modal && (
                  <Modal
                    closeModal={() => {
                      setModal(false);
                    }}
                    deleteArticle={handleDeleteArticle}
                  />
                )}
              </div>

              <Button className={`${styles.button} ${styles['button-green']}`} ghost type="primary">
                <Link to={`/articles/${slug}/edit`}>Edit</Link>
              </Button>
            </div>
          )}
        </div>
        <ReactMarkdown className={styles.markdown}>{data?.article.body}</ReactMarkdown>
      </div>
    </section>
  );
}

export default Article;
