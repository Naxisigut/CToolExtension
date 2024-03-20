function LocationList({ data }: { data: Location[]}){
  return (
    <ul>
      {
        data.map(item => {
          return <li>{ item.href }</li>
        })
      }
    </ul>
  )
}

export default LocationList