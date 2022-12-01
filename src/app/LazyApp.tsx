import React, { Suspense, lazy } from "react";
import "./i18n";

const App = lazy(() => import("./App"));

export const LazyApp = () => {

  const loading = 
    <div className="text-2xl mt-12 ml-12">
      <h3 className="font-bold"><code>malo_bot</code></h3>
      <p>is loading...</p>
    </div>

  return (
    <Suspense fallback={loading}>
      <App />
    </Suspense>
  );
};
