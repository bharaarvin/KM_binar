import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import AllCar from './component/pages/all-car';
import RentCar from './component/pages/rent-car';

function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
              <Route path="/" element={<AllCar />} />
              <Route path="/sewa" element={<RentCar />} />
            </Routes>
          </Router>
    </div>
  );
}

export default App;
