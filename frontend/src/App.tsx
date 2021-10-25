import * as React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Dashboard from "./pages/dashboard";
import Index from './pages/index';
import Home from './pages/home';
import SignIn from './pages/signin';
import SignUp from "./pages/signup";
import create from "./pages/createStream";
import channel from "./pages/userChannel";
import update from "./pages/updateStream";
import stream from "./pages/playStream";
import Header from "./components/Header";
import AdHeaders from "./components/dashHeader";

function App() {

  return (
    <BrowserRouter>
    {window.location.pathname==="/dashboard"? <AdHeaders/>:<Header/>}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/channel" exact component={channel}/>
          <Route path="/channel/update-stream/:key" component={update}/>
          <Route path="/channel/create-stream" component={create} />
          <Route path="/stream/:key" component={stream}/>
          <Route path="/react" component={Index} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
  </BrowserRouter>
  );
}

export default App;
