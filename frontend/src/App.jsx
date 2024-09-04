import PaymentForm from './components/PaymentForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPaymentView from './components/AdminPaymentView';
import Header from './components/header';
import Footer from './components/footer';


function App() {


  return (
    <Router>
      <div className="App flex flex-col min-h-screen" >
        <Header/>
        <div className="flex-grow">

        <Routes>

        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/admin/payments" element={<AdminPaymentView />} />
        </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
