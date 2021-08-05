import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const CourseStructure = React.lazy(() => import('./structure'));

const CourseRoute = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/structure`}
        render={(props) => <CourseStructure {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default CourseRoute;
