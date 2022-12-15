import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';

import Form from '../../components/Form';
import Input from '../../components/Input';
import TagList from '../../components/TagList/TagList';
import TextArea from '../../components/TextArea/TextArea';
import api from '../../redux/serverApi';

import styles from './NewArticle.module.scss';

function NewArticle() {
  const history = useHistory();
  const { slug } = useParams();
  let article;
  if (slug) {
    const { data } = api.useGetArticleQuery({ slug, token: localStorage.token });
    article = data;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      title: article?.article.title,
      description: article?.article.description,
      body: article?.article.body,
      tagList: article?.article.tagList.map((tag) => ({ tagName: tag })),
    },
  });

  const [createArticle] = api.useCreateArticleMutation();
  const handleCreateArticle = async (data) => {
    if (!data) return;
    await createArticle({
      body: { article: { ...data, tagList: data.tagList.map((item) => item.tagName) } },
      token: localStorage.token,
    }).then(() => {
      history.push('/');
    });
  };

  const [updateArticle] = api.useUpdateArticleMutation();
  const handleUpdateArticle = async (data) => {
    if (!data) return;
    await updateArticle({
      slug,
      body: { article: { ...data, tagList: data.tagList.map((item) => item.tagName) } },
      token: localStorage.token,
    }).then(() => {
      history.push('/');
    });
  };

  const onSubmit = (data) => (slug ? handleUpdateArticle(data) : handleCreateArticle(data));
  return (
    <section className={styles.section}>
      <Form title="Create new article" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['input-wrapper']}>
          <Input
            placeholder="Title"
            label="Title"
            name="title"
            register={register}
            required="Required"
            errors={errors}
            minLength="6"
            maxLength="40"
          />
          <Input
            placeholder="Description"
            label="Short description"
            name="description"
            register={register}
            required="Required"
            errors={errors}
            minLength="6"
            maxLength="40"
          />
          <TextArea
            placeholder="Text"
            label="Text"
            name="body"
            register={register}
            required="Required"
            errors={errors}
            minLength="6"
            maxLength="200"
          />
          <TagList label="Tags" name="tagList" register={register} errors={errors} control={control} />
        </div>
        <div className={styles['button-wrapper']}>
          <Button type="primary" block size="large" htmlType="submit">
            Send
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default NewArticle;
