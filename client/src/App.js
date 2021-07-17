import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import RegisterScreen from "./screens/RegistScreen";
import LoginScreen from "./screens/LoginScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen"
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductCreateScreen from "./screens/ProductCreateScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ProductScreen from "./screens/ProductScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/cart" exact component={CartScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/productlist' component={ProductListScreen} exact />
          <Route path='/admin/product/create' component={ProductCreateScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/product/:id' component={ProductScreen} />
        </Container>
      </main>
    </BrowserRouter>
  );
};

export default App;
