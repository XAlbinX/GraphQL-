import {Link,useNavigate,Outlet} from "react-router-dom"

import "./navigation.styles.scss"

const Navigation = () => {

    const navigate = useNavigate();
 
    return(
        <div className="navigation">
        
          <div className="nav-links-container">
            <Link className="nav-link" to={"/metro-lines"}>
               Metro Lines
            </Link>
            <Link className="nav-link" to={"/bus-lines"}>
               Bus Lines
            </Link>
            <Link className="nav-link" to={"/bike-stations"}>
               Bike Stations
            </Link>
          </div>
          <Outlet/>
        </div>
        
    )
  
  }

export default Navigation;  