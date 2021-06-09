import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const InnovationType = React.lazy(() =>
  import('./innovation-type')
);

const ProductType = React.lazy(() =>
  import('./product-type')
);

const TechType = React.lazy(() =>
  import('./tech-type')
);

const ContestType = React.lazy(() =>
  import('./contest-type')
);

const ExpertiseCategory = React.lazy(() =>
  import('./expertise-category')
);

const Skills = React.lazy(() =>
  import('./skills')
);


const Options = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      
      <Redirect exact from={`${match.url}/`} to={`${match.url}/innovation-type`} />
      
      <Route
        path={`${match.url}/innovation-type`}
        render={(props) => <InnovationType {...props} />}
      />
      
      <Route
        path={`${match.url}/product-type`}
        render={(props) => <ProductType {...props} />}
      />

      <Route
        path={`${match.url}/tech-type`}
        render={(props) => <TechType {...props} />}
      />

      <Route
        path={`${match.url}/contest-type`}
        render={(props) => <ContestType {...props} />}
      />

      <Route
        path={`${match.url}/expertise-category`}
        render={(props) => <ExpertiseCategory {...props} />}
      />

      <Route
        path={`${match.url}/skills`}
        render={(props) => <Skills {...props} />}
      />

      <Redirect to="/error" />

    </Switch>
  </Suspense>
);
export default Options;
