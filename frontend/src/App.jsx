import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemForm from './ItemForm';
import Inventory from './Inventory';
import Header from './Header';
import Footer from './Footer';
import HomeShopping from './HomeShopping';
import ItemDetails from './ItemDetails';
import { QuantityProvider } from './QuantityContext';
import InventoryReport from './InventoryReport';

import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <QuantityProvider> 
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/create-item" element={<ItemForm />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/home" element={<HomeShopping />} />
            <Route path="/inventory-report" element={<InventoryReport />} />
            <Route path="/item/:id" element={<ItemDetails />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </QuantityProvider>
  );
}

export default App;
