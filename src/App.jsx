import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListTodoComponent from './components/ListTodoComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TodoComponent from './components/TodoComponent'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import AuthenticatedRoute from './components/AuthenticatedRoute'

function App() {
  
    return (
        <>
        <BrowserRouter>
            <HeaderComponent />
            <Routes>
                <Route path='/' element={<LoginComponent />}/>
                <Route path='/todos' element={
                    <AuthenticatedRoute>
                        <ListTodoComponent />
                    </AuthenticatedRoute>
                }/>

                <Route path='/add-todo' element={
                    <AuthenticatedRoute>
                        <TodoComponent />
                    </AuthenticatedRoute>
                }/>

                <Route path='/update-todo/:id' element={
                    <AuthenticatedRoute>
                        <TodoComponent />
                    </AuthenticatedRoute>
                }/>
                <Route path='/register' element={<RegisterComponent />}/>
                <Route path='/login' element={<LoginComponent />}/>
            </Routes>
            <FooterComponent />
        </BrowserRouter>
        </>
    )
}

export default App
