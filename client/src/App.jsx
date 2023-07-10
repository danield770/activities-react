import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Activity from './components/Activity';
import ActivityV2 from './components/ActivityV2';
import ActivityZoom from './components/ActivityZoom';
import ActivityZoomV2 from './components/ActivityZoomV2';

function App() {
  return (
    <BrowserRouter>
      <div className='px-md-5 px-sm-4 py-4 p-3'>
        <Routes>
          <Route path='/' element={<Activity />} />
          <Route path='/activities/v1/:key' element={<ActivityZoom />} />
          <Route path='/v2' element={<ActivityV2 />} />
          <Route path='/activities/v2/:key' element={<ActivityZoomV2 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
