import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomeTask from "./view/HomeTask";
import EditTask from "./view/EditTask";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeTask} />
        <Route exact path="/edit/:id" component={EditTask} />
      </Switch>
    </Router>
  );
}

export default App;
