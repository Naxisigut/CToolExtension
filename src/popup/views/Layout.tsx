import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import CtIcon from '~components/CtIcon';
import { getFunctionRouting } from '~popup/routes';


export default function Layout() {
  const navigation = useNavigate()
  const location = useLocation()
  const routing = getFunctionRouting(location.pathname)
  return (
    <div className='flex flex-col h-full'>
      <div className='flex items-center' >
        <button className='hover:scale-110 ease-in-out duration-100' onClick={() => navigation(-1)}>
          <CtIcon icon={'undo'} ></CtIcon> 
        </button>
        <h2 className=' flex-1 text-lg ml-4 font-semibold font-sans leading-10'>{ routing && routing.$RouteName }</h2>
      </div>

      <section className='flex-1 h-0'>
        <Outlet></Outlet>
      </section>
    </div>
  )
};
