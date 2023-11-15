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
import Profile from './pages/newartists/profile'
import Song from './pages/allsongs';
import MusicPlayer from './components/music/index';
import CreateArtist from './pages/newartists/createartist';
import Newartist from './pages/newartist'
import { useSelector } from 'react-redux';
import Categories from './pages/categories';
import {  ToastContainer } from 'react-toastify';
function App() {
const player = useSelector((state) => state.player);
  return (
    <>
    <ToastContainer/>
     <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/playlist' element={<Playlist/>}/>
      <Route path='/favourites' element={<Favourite/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/artists' element={<Allartist/>}/>
      <Route path='/artist/:id' element={<Artist/>}/>
      <Route path='/newartist' element={<Newartist/>}/>
      <Route path='/addplaylist' element={<Addplaylist/>}/>
      <Route path='/commonplaylist' element={<Commonplaylist/>}/>
      <Route path='/playlist/:id' element={<Viewplaylist/>}/>
      <Route path='/categories/:id' element={<Categories/>}/>
      <Route path='Songs' element={<Song/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/createartist' element={<CreateArtist/>}/>
     </Routes>
     {player.currentTrack?._id && (
         <MusicPlayer/>
    )}
     </>

  );
}

export default App;
