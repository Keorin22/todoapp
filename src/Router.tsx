import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Tasks from './pages/Tasks';
import CompleteTasks from './pages/CompleteTasks';
import LoginPage from './pages/login';
import { RootState } from './store/store';
import { useSelector } from 'react-redux';
import { getAccessToken } from './services/TasksApi';
import { checkToken, logout } from './store/auth';
import { useAppDispatch } from './utils/appDispatch';
import Logout from './pages/logout';
import './Router.css'
import MyProfile from './pages/MyProfile';

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
    <div>
      <Router>
       {isAuth ?
     
            <>
            <Link className='Navbar' to="/tasks">Tasks</Link>
            <Link className='Navbar' to="/completetasks">Completed Tasks</Link>
            <Link className='Navbar' to="/logout">Выход</Link>
            <Link className='Navbar' to="/myprofile">Профиль</Link>
            </>
      : <Navigate to="/" />
        
      }

      
      <Routes>
        <Route path='/' element= {<LoginPage/>} /> 
        <Route path="/tasks" element={<Tasks />} />        
        <Route path="/logout" element={<Logout />} />
        <Route path="/MyProfile" element={<MyProfile />} />        
        <Route path="/completetasks" element={<CompleteTasks />} />
        
      </Routes>
    </Router>
    </div>
    
  );
};
export default AppRouter;