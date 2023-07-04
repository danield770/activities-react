import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Activity from './components/Activity';
import ActivityZoom from './components/ActivityZoom';

function App() {
  return (
    <BrowserRouter>
      <div className='px-md-5 px-sm-4 py-4 p-3'>
        <Routes>
          <Route path='/' element={<Activity api='v1' />} />
          <Route
            path='/activities/v1/:key'
            element={<ActivityZoom api='v1' />}
          />
          <Route path='/v2' element={<Activity api='v2' />} />
          <Route
            path='/activities/v2/:key'
            element={<ActivityZoom api='v2' />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
