import { useNavigate, redirect } from 'react-router-dom';
import { functionRoutes } from '~popup/routes/index';

export default function Home() {
  const navigation = useNavigate()
  // 不知道为什么，redirect没生效
  // useEffect(() => {
  //   redirect("/functions/getIframes")
  // }, [])
  return (
    <div className="grid grid-cols-3 gap-4">
      {
        functionRoutes.map( route => {
          return route.$HideButton ? null :
          (
            <button
              className=" h-10 border rounded-lg font-bold bg-white hover:scale-105 ease-in-out duration-100"
              key={route.path}
              onClick={() => navigation(route.path)}
            >
              { route.$RouteName }
            </button>
          )
        })
      }
    </div>
  )
};
