import './App.css';
import Navbar from './components/layout/Navbar'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Index from './components/layout/Index'
import Provider from './context'
import Lyrics from './components/tracks/Lyrics'

function App() {
  return (
    <Provider>
      <Router>
        <>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/react-lyric-finder" element={<Index />} />
              <Route exact path="/react-lyric-finder/lyrics/track/:id" element={<Lyrics />} />
            </Routes>
          </div>
        </>
      </Router>
    </Provider>
  );
}

export default App;
