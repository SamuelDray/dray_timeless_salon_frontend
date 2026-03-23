import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignupComponent from './components/SignupComponent';
import LoginComponent from './components/LoginComponent';
import MpesaPaymentComponent from './components/MpesaPaymentComponent';
import GetServicesComponent from './components/GetServicesComponent';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import NavbarComponent from './components/NavbarComponent';
import AddServiceComponent from './components/AddServicesComponent';

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="App">
          <NavbarComponent />
          <header className="App-header">
            <h1>Timeless Salon & Nail Spot</h1>
            <h5>For Quality Hair Styling Services and Nail Care</h5>
          </header>
        </div>

        <Routes>
          <Route path='/' element={<GetServicesComponent />} />
          <Route path='/add_service' element={<AddServiceComponent />} />
          <Route path='/signup' element={<SignupComponent />} />
          <Route path='/login' element={<LoginComponent />} />
          <Route path='/makepayment' element={<MpesaPaymentComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
