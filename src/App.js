import { Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import Advertisement from "./pages/Advertisement";
import CreateAdvertisement from "./pages/CreateAdvertisemet";
import CreateBlog from "./pages/CreateBlog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from"./pages/Signup";
function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/login' />
        </Route>
        <Route path='/login' exact>
          <Login/>
        </Route>
        <Route path='/signup' exact>
          <Signup/>
        </Route>
        <Route path='/home' exact>
          <Home />
        </Route>
        <Route path='/new-Blog'>
          <CreateBlog />
        </Route>
        <Route path='/new-ad'>
          <CreateAdvertisement />
        </Route>
        <Route path='/advertisement'>
          <Advertisement />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='*'>
          not found
        </Route>
      </Switch>
    </div>
  );
}

export default App;
