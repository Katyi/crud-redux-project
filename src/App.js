
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Edit from './pages/Edit';
import Home from './pages/Home';
import AddUser from './pages/AddUser';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
        <Route path='/addUser' element={<AddUser/>}/>
      </Routes>
    </div>
  );
}

export default App;
