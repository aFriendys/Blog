/* eslint-disable react/jsx-props-no-spreading */
import { Checkbox, Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';

import Form from '../../components/Form';
import Input from '../../components/Input';
import api from '../../redux/serverApi';

import styles from './SignUp.module.scss';

function SignUp() {
  const [registerUser] = api.useRegisterUserMutation();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleRegisterUser = async (data) => {
    if (!data) return;
    await registerUser({ user: { username: data.username, email: data.email, password: data.password } })
      .unwrap()
      .then(() => {
        history.push('sign-in');
      })
      .catch((error) => {
        const { errors: errorData } = error.data;
        Object.keys(errorData).forEach((e) => setError(e, { message: errorData[e] }));
      });
  };

  const onSubmit = (data) => {
    if (data.password !== data['repeat password']) {
      setError('repeat password', { message: 'must match password' });
      return;
    }
    handleRegisterUser(data);
  };

  return (
    <section className={styles.section}>
      <Form title="Create new account" onSubmit={handleSubmit(onSubmit)}>
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
            label="Password"
            name="password"
            type="password"
            register={register}
            required="Required"
            errors={errors}
            minLength="6"
            maxLength="40"
          />
          <Input
            placeholder="Password"
            label="Repeat password"
            name="repeat password"
            type="password"
            register={register}
            required="Required"
            errors={errors}
          />
        </div>
        <Checkbox className={styles.checkbox}>I agree to the processing of my personal information</Checkbox>
        <div className={styles['button-wrapper']}>
          <Button type="primary" block size="large" htmlType="submit">
            Create
          </Button>
          <span>
            Already have an account? <Link to="sign-in">Sign In</Link>.
          </span>
        </div>
      </Form>
    </section>
  );
}

export default SignUp;
