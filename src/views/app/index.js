import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import 'ckeditor5-build-classic-dna';

import AppLayout from '../../layout/AppLayout';
import { ProtectedRoute, UserRole } from '../../helpers/authHelper';

const Dashboard = React.lazy(() => import('./dashboard'));
const Users = React.lazy(() => import('./user'));
const EditUser = React.lazy(() => import('./user/edit-user'));

const Community = React.lazy(() => import('./community'));

const Investor = React.lazy(() => import('./investor'));

const HubbersTeam = React.lazy(() => import('./hubbers-team'));

const Teams = React.lazy(() => import('./teams'));

const Partner = React.lazy(() => import('./partner'));

const Options = React.lazy(() => import('./options'));
const BlankPage = React.lazy(() => import('./blank-page'));
const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboard`}
            />
            <Route
              path={`${match.url}/dashboard`}
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              exact
              path={`${match.url}/users`}
              render={(props) => <Users {...props} />}
            />
            <Route
              path={`${match.url}/users/:id`}
              render={(props) => <EditUser {...props} />}
            />
            <Route
              path={`${match.url}/community`}
              render={(props) => <Community {...props} />}
            />
            <Route
              exact
              path={`${match.url}/investors`}
              render={(props) => <Investor {...props} />}
            />

            <Route
              exact
              path={`${match.url}/hubbers-team`}
              render={(props) => <HubbersTeam {...props} />}
            />

            <Route
              exact
              path={`${match.url}/teams`}
              render={(props) => <Teams {...props} />}
            />

            <Route
              exact
              path={`${match.url}/partner`}
              render={(props) => <Partner {...props} />}
            />

            <ProtectedRoute
              path={`${match.url}/options`}
              component={Options}
              roles={[UserRole.Admin]}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
