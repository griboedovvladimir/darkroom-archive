import { EditFilm } from './pages/EditFilm/EditFilm.tsx';
import { FilmsList } from './pages/FilmsList/FilmsList.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import film from './assets/film.svg';
import { Button, ConfigProvider } from 'antd';
import { EditFrame } from './pages/EditFrame/EditFrame.tsx';

function App() {
  return (
    <>
      <ConfigProvider theme={{
        token: {
          // Seed Token
          colorPrimary: '#3b3b3b',
          borderRadius: 2,

          // Alias Token
          colorBgContainer: '#ffffff',
        },
      }}>
        <div className="main">
          <Button href={`/`} style={{
            width: '80px',
            height: '80px',
            backgroundColor: 'red',
            borderRadius: '50%',
            margin: '20px auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img src={film} alt="icon" width={55}/>
          </Button>
          <Router>
            <Routes>
              <Route path="/" element={<FilmsList/>}/>
              <Route path="/edit/:id" element={<EditFilm/>}/>
              <Route path=":filmCode/frame/:id" element={<EditFrame/>}/>
            </Routes>
          </Router>
        </div>
      </ConfigProvider>
    </>
  )
}

export default App
