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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from './store/slices/userSlice'
import { getAllSkills } from './store/slices/skillSlice'
function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
       dispatch(getUser());
       dispatch(getAllSkills())
  })
 
  return (
     <BrowserRouter>
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
    
    </BrowserRouter>
  )
}

export default App
