import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from '../../common/store';
import Landing from '../components/layout/Landing';
import Navbar from '../components/layout/Navbar';
import SignIn from '../components/auth/Login';
import SignUp from '../components/auth/Register';
import HouseProfile from '../components/dashboard/HouseProfile';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/dashboard" component={HouseProfile} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
