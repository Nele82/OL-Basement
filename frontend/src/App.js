import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Layout from './components/Layout'
import Main from './pages/Main'
import StorageList from './pages/StorageList';
import StorageOverview from './pages/StorageOverview';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route 
              path='/'
              element={<Layout />}
            >
              <Route
                index
                element={<Main />}
              />
              <Route
                path='about'
                element={<About />}
              />
              <Route
                path='contact'
                element={<Contact />}
              />
              <Route
                path='storage-list'
                element={<StorageList />}
              />
              <Route
                path='storage-overview'
                element={<StorageOverview />}
              />
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
