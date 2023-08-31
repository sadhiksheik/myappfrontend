import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import MyPosts from "./components/MyPosts";
import Login from "./components/Login";
import ProtectedRoute from "./components/PotectedRoute";
import './App.css';

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/myposts" component={MyPosts} />
  </Switch>
);

export default App;
