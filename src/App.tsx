import { FC } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { List } from "./screens/List";
import { Card } from "./screens/Card";

const App: FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <List />
                </Route>
                <Route path="/products/:id/:name">
                    <Card />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;


export interface RouteParams {
    id: string;
    name?: string;
}