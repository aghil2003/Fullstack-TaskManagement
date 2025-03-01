import Header from '../compounds/Header'
import HeroPage from '../compounds/PendingTask'
import { Provider } from "react-redux";
import store from "../redux";

function App() {
 
   return (
    
       <div className='HeroContainer'>
    <Header/> 
    <Provider store={store}>
    <HeroPage/>
    </Provider>
       
    </div>
    
  );
    
}

export default App
