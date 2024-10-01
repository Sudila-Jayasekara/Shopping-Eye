import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemForm from './ItemForm'; // Correct path
import Inventory from './Inventory'; // Correct path
import Header from './Header'; // Correct path
import Footer from './Footer'; // Correct path
import HomeShopping from './HomeShopping';
import ItemDetails from './ItemDetails';
import { QuantityProvider } from './QuantityContext';

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
          <Route path="/home" element={<HomeShopping/>} />
          <Route path="/item/:id" element={<ItemDetails />} />

        </Routes>
        <Footer />
      
      </div>
    </Router>
    </QuantityProvider> 
  );
}

export default App;
