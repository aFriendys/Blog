import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';

// Pages
import Article from '../../pages/Article';
import Articles from '../../pages/Articles';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import Profile from '../../pages/Profile';
import NotAuthorized from '../../pages/NotAuthorized';
import NewArticle from '../../pages/NewArticle';
import NotFound from '../../pages/NotFound';
// Components
import LoggedInHeader from '../LoggedInHeader';
import LoggedOutHeader from '../LoggedOutHeader';
// Api
import api from '../../redux/serverApi';
// Redux
import { setIsAuthorized, setUserData, setOffset } from '../../redux/serverSlice';

import styles from './App.module.scss';

function App() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.serverSlice.isAuthorized);
  dispatch(setOffset((localStorage.page - 1) * 5));
  const { data } = api.useGetCurrentUserQuery(localStorage.token);

  if (localStorage.token && data) {
    dispatch(setIsAuthorized(true));
    dispatch(setUserData(data.user));
  }

  return (
    <Router>
      <header className={styles.header}>
        <Link to="/">
          <Button type="link">Realworld Blog</Button>
        </Link>
        {isAuthorized ? <LoggedInHeader /> : <LoggedOutHeader />}
      </header>

      <main className={styles.main}>
        <Route path="/" exact component={Articles} />
        <Route path="/articles" exact component={Articles} />
        <Route path="/articles/:slug" exact component={Article} />
        <Route path="/articles/:slug/edit" component={isAuthorized ? NewArticle : NotAuthorized} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/404" component={NotFound} />
        <Route path="/new-article" component={isAuthorized ? NewArticle : NotAuthorized} />
        <Route path="/profile" component={isAuthorized ? Profile : NotAuthorized} />
      </main>
    </Router>
  );
}

export default App;
