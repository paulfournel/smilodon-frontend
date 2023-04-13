import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./component/Home";
import {StartPage} from "./component/StartPage";
import {PrivateRoute} from "./app/PrivateRoute";
import {Settings} from "./component/Settings";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<StartPage/>}/>y
                <Route path="login" element={<StartPage/>}/>
                <Route path="dashboard" element={<PrivateRoute/>}>
                    <Route path="" element={<Home/>}/>
                </Route>
                <Route path="settings" element={<PrivateRoute/>}>
                    <Route path="" element={<Settings/>}/>
                </Route>
            </Routes>

        </div>
    );
}

export default App;
