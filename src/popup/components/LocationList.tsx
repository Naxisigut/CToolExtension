import Button from '../components/Button';

function LocationItem({ item }: { item: Location }){
  return (
    <li className=" flex items-center">
      <span className='flex-1 font-medium text-sm'>{ item.href }</span>
      <Button>复制hash</Button>
    </li>
  )
}

function LocationList({ data }: { data: Location[]}){
  return (
    <ul className=" w-80">
      {
        data.map((item, index) => {
          return <LocationItem item={item} key={index}></LocationItem>
        })
      }
    </ul>
  )
}

export default LocationList