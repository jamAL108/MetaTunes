import './App.css';
import {Routes , Route } from 'react-router-dom';
import Landing from './pages/landing';
import Playlist from './pages/playlist';
import Favourite from './pages/favourites';
import Login from './components/login';
import Register from './components/register';
import Allartist from './pages/artist';
import Artist from './pages/artistdetail';
import Addplaylist from './pages/addplaylist';
import Commonplaylist from './pages/commonplaylist';
import Viewplaylist from './pages/viewplaylist';
import Song from './pages/allsongs';
import MusicPlayer from './components/music/index';
import { useSelector } from 'react-redux';
function App() {
const player = useSelector((state) => state.player);
  return (
    <>
     <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/playlist' element={<Playlist/>}/>
      <Route path='/favourites' element={<Favourite/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/artists' element={<Allartist/>}/>
      <Route path='/artist/:id' element={<Artist/>}/>
      <Route path='/addplaylist' element={<Addplaylist/>}/>
      <Route path='/commonplaylist' element={<Commonplaylist/>}/>
      <Route path='/playlist/:id' element={<Viewplaylist/>}/>
      <Route path='Songs' element={<Song/>}/>
     </Routes>
     {player.currentTrack && (
         <MusicPlayer/>
    )}
     </>

  );
}

export default App;
