import {Routes , Route} from 'react-router-dom'

import Navigation from "./routes/navigation/navigation.component"
import MetroLines from "./routes/metro-lines/metro-lines.component"
import BusLines from "./routes/bus-lines/bus-lines.component"
import BikeStations from "./routes/bike-stations/bike-stations.component"

const App = () => {

  return(
    <Routes>
      <Route path="/" element = {<Navigation/>}>
        <Route index path= "/metro-lines" element = {<MetroLines/>}/>
        <Route path= "/bus-lines" element = {<BusLines/>}/>
        <Route path= "/bike-stations" element = {<BikeStations/>}/> 
      </Route>
    </Routes>
    
    
  )

}

export default App;