/* eslint-disable no-unused-vars */
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setIsAuthorized, setUserData } from '../../redux/serverSlice';
import Form from '../../components/Form';
import Input from '../../components/Input';
import api from '../../redux/serverApi';

import styles from './SignIn.module.scss';

function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [authorizeUser] = api.useAuthorizeUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleAuthorizeUser = async (data) => {
    if (!data) return;
    await authorizeUser({ user: data })
      .unwrap()
      .then((response) => {
        const { token, ...user } = response.user;
        dispatch(setUserData(user));
        localStorage.setItem('token', `Token ${token}`);
        dispatch(setIsAuthorized(true));
        history.push('');
      })
      .catch((error) => {
        setError('email', { message: error.data.errors['email or password'] });
        setError('password', { message: error.data.errors['email or password'] });
      });
  };

  const onSubmit = (data) => {
    handleAuthorizeUser(data);
  };

  return (
    <section className={styles.section}>
      <Form title="Sign In" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['input-wrapper']}>
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
            label="Password"
            name="password"
            type="password"
            register={register}
            required="Required"
            errors={errors}
            minLength="6"
            maxLength="40"
          />
        </div>
        <div className={styles['button-wrapper']}>
          <Button type="primary" block size="large" htmlType="submit">
            Login
          </Button>
          <span>
            Don’t have an account? <Link to="sign-up">Sign Up</Link>.
          </span>
        </div>
      </Form>
    </section>
  );
}

export default SignIn;
