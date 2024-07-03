/**
 * POPUP
 */

import './style.css';
import { Suspense } from "react"
import { MemoryRouter } from 'react-router-dom';
import Routing from './routes/index';

function IndexPopup(){
  return (
    <div className='app bg-gray-50 w-[350px] p-3 h-[300px]'>
      <MemoryRouter>
        {/* 
          fix: 
          Error: A component suspended while responding to synchronous input. 
          This will cause the UI to be replaced with a loading indicator. 
          To fix, updates that suspend should be wrapped with startTransition.
          使用Suspense包裹Routing 
        */}
        <Suspense>
          <Routing></Routing>
        </Suspense>
      </MemoryRouter>
    </div>
  )
}

export default IndexPopup
