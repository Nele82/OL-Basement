import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Layout from './components/Layout'
import Main from './pages/Main'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route 
              path='/'
              element={<Layout/>}
            >
              <Route
                index
                element={<Main/>}
              />
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
