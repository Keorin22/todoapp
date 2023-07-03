import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Tasks from './Tasks';
import CompleteTasks from './CompleteTasks';
import './Router.css';
import LoginPage from './pages/login';
import { RootState } from './store/store';
import { useSelector } from 'react-redux';
import { getAccessToken } from './services/TasksApi';
import { checkToken, logout } from './store/auth';
import { useAppDispatch } from './utils/appDispatch';

const AppRouter: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const token = getAccessToken()
  const dispath = useAppDispatch()
  if (token)
    dispath(checkToken(token))
  
  const logoutHandler = () => {
      dispath(logout())
      window.localStorage.removeItem('token')
      console.log('logout')
      
    }  
  return (
    <div className="Navbar">
      <Router>
       {isAuth ?
      <><nav>
            <Link to="/tasks">Tasks</Link>
            <Link to="/completetasks">Completed Tasks</Link>
          </nav><button onClick={()=> logoutHandler()}> logout</button></>
      : <Navigate to="/" />
        
      }

      
      <Routes>
        <Route path='/' element= {<LoginPage/>} /> 
        <Route path="/tasks" element={<Tasks />} />        
        <Route path="/completetasks" element={<CompleteTasks />} />
        
      </Routes>
    </Router>
    </div>
    
  );
};
export default AppRouter;