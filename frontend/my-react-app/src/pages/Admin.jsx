import './Admin.css'
import Header from '../compounds/Header'
import SideBar from '../compounds/SideBar'
import Sidemain from '../compounds/AdminSidemain'


function App() {
 
   return (
    
       <div className='HeroContainer'>
    <Header/> 
    <div className='maindiv'>
      <div className='mainsidebar'><SideBar/></div>
      
      <div className='mainbody'><Sidemain/></div>
    </div >
       
    </div>
    
  );
    
}

export default App
