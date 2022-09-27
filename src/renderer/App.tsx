import { LocalizationProvider } from '@mui/x-date-pickers';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
  );
}
