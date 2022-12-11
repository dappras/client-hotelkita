import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Booking from './screens/admin/booking';
import ConfirmBooking from './screens/admin/booking/confirmBooking';
import Category from './screens/admin/category';
import AddCategory from './screens/admin/category/addCategory';
import Dashboard from './screens/admin/dashboardHome';
import HotelConfirm from './screens/admin/hotelConfirm';
import ConfirmHotel from './screens/admin/hotelConfirm/confirmHotel';
import MyHotel from './screens/admin/myHotel';
import AddHotel from './screens/admin/myHotel/addHotel';
import EditHotel from './screens/admin/myHotel/editHotel';
import Profile from './screens/admin/profile';
import DetailProduct from './screens/detail-product/detailProduct';
import Home from './screens/home/Home';
import Login from './screens/login';
import Product from './screens/product/product';
import SignUp from './screens/signup';

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
      <div className="login">
        <Switch>
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
      <div className="signup">
        <Switch>
          <Route exact path="/signup" component={SignUp} />
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
      <div className="booking">
        <Switch>
          <div className='wrapper'>
            <Route exact path="/dashboard/booking" component={Booking}>
            </Route>
          </div>
        </Switch>
      </div>
      <div className="confirm-booking">
        <Switch>
          <div className='wrapper'>
            <Route exact path="/dashboard/booking/confirm-booking/:id" component={ConfirmBooking}>
            </Route>
          </div>
        </Switch>
      </div>
      <div className="hotel">
        <Switch>
          <div className='wrapper'>
            <Route exact path="/dashboard/hotel" component={HotelConfirm}>
            </Route>
          </div>
        </Switch>
      </div>
      <div className="confirm-hotel">
        <Switch>
          <div className='wrapper'>
            <Route exact path="/dashboard/hotel/confirm-hotel/:id" component={ConfirmHotel}>
            </Route>
          </div>
        </Switch>
      </div>
      <div className="category">
        <Switch>
          <div className='wrapper'>
            <Route exact path="/dashboard/category-city" component={Category}>
            </Route>
          </div>
        </Switch>
      </div>
      <div className="add-category">
        <Switch>
          <div className='wrapper'>
            <Route exact path="/dashboard/category-city/add-category" component={AddCategory}>
            </Route>
          </div>
        </Switch>
      </div>
      <div className="profile">
        <Switch>
          <div className='wrapper'>
            <Route exact path="/dashboard/profile" component={Profile}>
            </Route>
          </div>
        </Switch>
      </div>
      <div className="product">
        <Switch>
          <div className='wrapper'>
            <Route exact path="/product" component={Product}>
            </Route>
          </div>
        </Switch>
      </div>
      <div className="detail-product">
        <Switch>
          <div className='wrapper'>
            <Route exact path="/product/:id" component={DetailProduct}>
            </Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
