//import './App.css';
import {Routes, Route} from 'react-router-dom';
import LandingPage from './components/landingPage';
import HomeDogs from './components/homeDogs';
import DogCreate from './components/dogCreate';
import DogDetail from './components/dogDetail';

function App() {
  return (
    
    <div className="App">
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/HomeDogs' element={<HomeDogs />} />
        <Route exact path='/DogCreate' element={<DogCreate />} />
        <Route exact path='/HomeDogs/:id' element={<DogDetail />} />
        <Route path='*' element={<HomeDogs />} />
      </Routes> 
      
    </div>
    
  );
}

export default App;
