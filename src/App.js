import "./App.css";
import Header from "./frontend/components/header/Header";
import { Navigation } from "./frontend/components/navigation/Navigation";
import Playersearch from "./frontend/components/playersearch/Playersearch";

function App() {
    return (
        <div className="App">
            <Navigation />
            <Header />
            <Playersearch />
        </div>
    );
}

export default App;
