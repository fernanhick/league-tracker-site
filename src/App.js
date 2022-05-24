import "./App.css";
import Header from "./frontend/components/header/Header";
import { Navigation } from "./frontend/components/navigation/Navigation";
import Playersearch from "./frontend/components/playersearch/Playersearch";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Champions from "./frontend/components/champions/Champions";
import Home from "./frontend/components/home/Home";
import { Rotation } from "./frontend/components/rotation/Rotation";
function App() {
    return (
        <div className="App">
            <Router>
                <Navigation />
                <Rotation />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/champions" element={<Champions />} />
                    <Route path="/summoner" element={<Playersearch />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
