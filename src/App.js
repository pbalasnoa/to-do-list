import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { TaskContextProvider } from "./context/TaskContext";
import { AuthProvider } from "./context/AuthContext";

import HomeTask from "./view/HomeTask";
import EditTask from "./view/EditTask";
import Opening from "./view/Opening";
import Login from "./view/Login";
import SignUp from "./view/SignUp";

import Root from "./components/Root";
import GuardRoute from "./components/GuardRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskContextProvider>
          <Root>
            <Switch>
              <GuardRoute
                type="public"
                exact
                path="/opening"
                component={Opening}
              />
              <GuardRoute type="public" exact path="/login" component={Login} />
              <GuardRoute
                type="public"
                exact
                path="/signUp"
                component={SignUp}
              />
              <GuardRoute type="private" exact path="/" component={HomeTask} />
              <GuardRoute
                type="private"
                exact
                path="/edit/:id"
                component={EditTask}
              />
            </Switch>
          </Root>
        </TaskContextProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
