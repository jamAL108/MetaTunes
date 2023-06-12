import './App.css';
import {Routes , Route } from 'react-router-dom';
import Landing from './pages/landing';
import Playlist from './pages/playlist';
import Favourite from './pages/favourites';
import Login from './components/login';
import Register from './components/register';
function App() {
  return (
     <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/playlist' element={<Playlist/>}/>
      <Route path='/favourites' element={<Favourite/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
     </Routes>
  );
}

export default App;
