import { EditFilm } from "./pages/EditFilm/EditFilm.tsx";
import { FilmsList } from "./pages/FilmsList.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import film  from './assets/film.svg';
import { Button } from "antd";

function App() {
  return (
    <>
      <Button href={`/`} style={{width: '80px', height: '80px', backgroundColor: 'red', borderRadius: '50%', margin: '20px auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={film} alt="icon" width={55} />
        </Button>
      <Router>
        <Routes>
          <Route path="/" element={<FilmsList />} />
          <Route path="/edit/:id" element={<EditFilm />} />
        </Routes>
      </Router>
      </>
  )
}

export default App
