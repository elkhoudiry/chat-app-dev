import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Join, Chat, NotFound } from "./components";

const App = () => {
    return (
        <Router>
            <Switch>
            <Route path="/" exact component={Join} />
            <Route path="/chat"  component={ Chat }/>
            <Route path="*"  component={ NotFound }/>
            </Switch>
       </Router>
    )
}

export default App;