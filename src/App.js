import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Dashboard from './screens/dashboard';
import Home from './screens/home/Home';
import NavbarAdmin from './component/admin/navbarAdmin';
import SidebarAdmin from './component/admin/sidebar';

function App() {
  return (
    <Router>
      <div className="home">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
      <div className="dashboard">
        <Switch>
          <div className='wrapper'>
            <Route exact path="/dashboard">
              <NavbarAdmin />
              <SidebarAdmin />
              <Dashboard />
            </Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
