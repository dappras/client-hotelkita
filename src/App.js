import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './screens/admin/dashboardHome';
import MyHotel from './screens/admin/myHotel';
import AddHotel from './screens/admin/myHotel/addHotel';
import EditHotel from './screens/admin/myHotel/editHotel';
import Home from './screens/home/Home';

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
            <Route exact path="/dashboard" component={Dashboard}>
            </Route>
          </div>
        </Switch>
      </div>
      <div className="my-hotel">
        <Switch>
          <div className='wrapper'>
            <Route exact path="/dashboard/my-hotel" component={MyHotel}>
            </Route>
          </div>
        </Switch>
      </div>
      <div className="add-hotel">
        <Switch>
          <div className='wrapper'>
            <Route exact path="/dashboard/my-hotel/add-hotel" component={AddHotel}>
            </Route>
          </div>
        </Switch>
      </div>
      <div className="edit-hotel">
        <Switch>
          <div className='wrapper'>
            <Route exact path="/dashboard/my-hotel/edit-hotel/:id" component={EditHotel}>
            </Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
