import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Form from '../../components/Form';
import Input from '../../components/Input';
import api from '../../redux/serverApi';
import { setUserData } from '../../redux/serverSlice';

import styles from './Profile.module.scss';

function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { username, email, image } = useSelector((state) => state.serverSlice.user);
  const [updateUser, { isLoading }] = api.useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username,
      email,
      image,
    },
  });

  const handleUpdateUser = async (data) => {
    if (!data) return;
    await updateUser({
      body: data,
      token: localStorage.token,
    })
      .unwrap()
      .then((response) => {
        const { token, ...user } = response.user;
        localStorage.setItem('token', `Token ${token}`);
        dispatch(setUserData(user));
        history.push('/');
      })
      .catch((error) => {
        const { errors: errorData } = error.data;
        Object.keys(errorData).forEach((e) => setError(e, { message: errorData[e] }));
      });
  };

  const onSubmit = (data) => {
    handleUpdateUser(data);
  };
  return (
    <section className={styles.section}>
      <Form title="Edit Profile" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['input-wrapper']}>
          <Input
            placeholder="Username"
            label="Username"
            name="username"
            register={register}
            required="Required"
            errors={errors}
            minLength="3"
            maxLength="20"
          />
          <Input
            placeholder="Email address"
            label="Email address"
            name="email"
            register={register}
            required="Required"
            errors={errors}
            pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
          />
          <Input
            placeholder="Password"
            label="New password"
            name="password"
            type="password"
            required="Required"
            register={register}
            errors={errors}
            minLength="6"
            maxLength="40"
          />
          <Input
            placeholder="Avatar image"
            label="Avatar image (url)"
            name="image"
            register={register}
            errors={errors}
          />
        </div>
        <div className={styles['button-wrapper']}>
          <Button type="primary" block size="large" htmlType="submit" loading={isLoading}>
            Save
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default Profile;
