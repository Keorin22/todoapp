import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Tasks from './Tasks';
import CompleteTasks from './CompleteTasks';
import './Router.css';
import LoginPage from './pages/login';

const AppRouter: React.FC = () => {
  return (
    <div className="Navbar">
      <Router>
      <nav>
        <Link to="/" >Tasks</Link>
        <Link to="/completetasks">Completed Tasks</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path='/login' element= {<LoginPage/>} /> 
        <Route path="/completetasks" element={<CompleteTasks />} />
      </Routes>
    </Router>
    </div>
    
  );
};
export default AppRouter;