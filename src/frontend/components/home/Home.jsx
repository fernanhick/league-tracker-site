import React from "react";
import { Link } from "react-router-dom";
import LeaderBoards from "../leaderboards/LeaderBoards.jsx";
import("./home.css");
const Home = () => {
    return (
        <div className="home-section">
            <div className="home-header">
                <div className="header-title">
                    <h1>Welcome to League-Tracker</h1>
                </div>
                <div className="header-body">
                    <div className="info-text">
                        <p>
                            This is a League of Legends fans website made for
                            recreational purpose.
                            <br /> Here we can get information of the summoners
                            statistics within the game.
                            <br /> By no means there is any connection or
                            affiliation with the developers or company that
                            created the game <br /> This website is made for the
                            community use and no data copyright is made from any
                            of the data or images used.
                        </p>
                    </div>
                    <div className="quick-links">
                        <div className="link">
                            <Link to="/summoner">summoner</Link>
                            <p>Search for summoners</p>
                        </div>
                        <div className="link">
                            <Link to="/champions">champions</Link>
                            <p>Get a list of all champions in the game</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="leaderboards-section">
                <LeaderBoards />
            </div>
        </div>
    );
};

export default Home;
