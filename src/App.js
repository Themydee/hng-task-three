import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'; 
import Login from './Login';
import Main from './Main';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<Login />}/>
          </Route>
          <Route path='/main'>
            <Route index element={<Main />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
