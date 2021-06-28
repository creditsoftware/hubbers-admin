import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const CommunityAll = React.lazy(() => import('./all'));
const CommunityEvent = React.lazy(() => import('./event'));
const CommunityMember = React.lazy(() => import('./member'));
const CommunityTopic = React.lazy(() => import('./topic'));
const CommunityPost = React.lazy(() => import('./post'));

const Community = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/all`}
        render={(props) => <CommunityAll {...props} />}
      />
      <Route
        path={`${match.url}/event`}
        render={(props) => <CommunityEvent {...props} />}
      />
      <Route
        path={`${match.url}/member`}
        render={(props) => <CommunityMember {...props} />}
      />
      <Route
        path={`${match.url}/topic`}
        render={(props) => <CommunityTopic {...props} />}
      />
      <Route
        path={`${match.url}/post`}
        render={(props) => <CommunityPost {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Community;
