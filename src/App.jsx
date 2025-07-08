import './App.css'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ManageSkills from './pages/ManageSkills'
import ManageProject from './pages/ManageProject'
import ViewProject from './pages/ViewProject'
import UpdatePorject from './pages/UpdatePorject'
import ResetPassword from './pages/ResetPassword'
import NotFoundPage from './pages/NotFoundPage'
import { ToastContainer } from 'react-toastify';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getUser } from './store/slices/userSlice'
import { getAllSkills } from './store/slices/skillSlice'
import { getAllProject } from './store/slices/projectSlice'
import LoadingScreen from './pages/components/LoadingScreen'
function App() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData =  () => {
      dispatch(getUser());
      dispatch(getAllSkills());
      dispatch(getAllProject());
      setLoading(false);
    }

    fetchData();
  }, [dispatch]);

  if (loading) return <LoadingScreen />;
  return (
     <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/password/forgot" element={<ForgotPassword/>} />
          <Route path="/password/reset/:token" element={<ResetPassword/>} />
          <Route path="/manage/skills" element={<ManageSkills/>} />
          <Route path="/manage/projects" element={<ManageProject/>} />
          <Route path="/view/projects/:id" element={<ViewProject/>} />
          <Route path="/update/projects/:id"element={<UpdatePorject/>}  />
          <Route path="*"element={<NotFoundPage/>}  />


        </Routes>

         <ToastContainer position='bottom-right theme="dark' />
    
    </Router>
  )
}

export default App
