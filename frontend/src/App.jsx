import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import WarrentyClame from './componenets/WarrentyClam/WarrentyClame';
import InventryDetails from './componenets/WarrentyClam/InventryDetails';
import WarrentyClamForm from './componenets/WarrentyClam/WarrentyClamForm';
import UpdateWarrentyClaim from './componenets/WarrentyClam/UpdateWarrentyClaim';
import ManageWarrentyClaims from './componenets/WarrentyClam/ManageWarrentyClaims';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/inventry" />} />
        <Route path="/inventry" element={<InventryDetails />} />
        <Route path="/warrenty/:id" element={<WarrentyClame />} />

        <Route path="/warranty-form/:id" element={<WarrentyClamForm />} />
        <Route path="/warranty-claim-form/:id" element={<UpdateWarrentyClaim />} />
        <Route path="/warranty-claim" element={<ManageWarrentyClaims />} />

      </Routes>
    </Router>
  );
}

export default App;
