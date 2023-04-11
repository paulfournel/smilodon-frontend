import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./component/Home";
import {Login} from "./component/Login";
import {StartPage} from "./component/StartPage";
import {PrivateRoute} from "./app/PrivateRoute";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<StartPage/>}/>y
                <Route path="login" element={<StartPage/>}/>
                <Route path="dashboard" element={<PrivateRoute/>}>
                    <Route path="" element={<Home/>}/>
                </Route>
            </Routes>

        </div>
    );
}

export default App;
