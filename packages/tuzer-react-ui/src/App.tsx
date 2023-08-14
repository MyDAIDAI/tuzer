import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Editor from "./pages/Editor";

const App: React.FC = () => (
  <BrowserRouter>
    <Route path="/tuzer/:page">
      <Editor />
    </Route>
    {/* <Route path="/preview/:page">
      <Preview />
    </Route>
    <Route path="/codeless/:page">
      <Codeless />
    </Route>
    <Route path="/faas/:page">
      <FaaS />
    </Route> */}

    <Route path="/">
      <Editor />
    </Route>
  </BrowserRouter>
);

export default App;
