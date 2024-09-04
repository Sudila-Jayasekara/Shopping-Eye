import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemForm from './itemForm';
import Inventory from './Inventory';
import HomeShopping from './HomeShopping';
import Header from './Header';
import Footer from './Footer';

function App() {
    return (
      
        <Router>

            <div className="App">
            <Header/>
                <Routes>
                    {/* Route for the form */}
                    <Route path="/create-item" element={<ItemForm />} />

                    <Route path="/" element={<HomeShopping />} />

                    {/* Route for the inventory */}
                    <Route path="/inventory" element={<Inventory />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
