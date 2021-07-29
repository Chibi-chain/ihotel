import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "../src/pages/home";
import { SignUp } from "../src/pages/signup";
import { AuthUserProvider } from "./provider/authContext";
import { UploadPost } from "./pages/post";
import { ApproveList } from "./pages/approve";
import { Review } from "./pages/review";
import { Login } from "./pages/login";

function App() {
  return (
    <AuthUserProvider>
      <Router>
        <Switch>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/upload">
            <UploadPost />
          </Route>
          <Route exact path="/approve">
            <ApproveList />
          </Route>
          <Route path="/review/">
            <Review />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </AuthUserProvider>
  );
}

export default App;
