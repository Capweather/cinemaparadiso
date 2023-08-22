import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import Categories from './containers/Categories'

const Router = () => {
    return (
    
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
   
        
       
    );
};
export default Router;
