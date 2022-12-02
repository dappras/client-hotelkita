import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Home from './screens/home/Home';

function App() {
  return (
    <Router>
      <div className="home">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
