
import { EditFilm } from "./pages/EditFilm.tsx";
import { FilmsList } from "./pages/FilmsList.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<FilmsList />} />
          <Route path="/edit/:id" element={<EditFilm />} />
        </Routes>
      </Router>
  )
}

export default App
