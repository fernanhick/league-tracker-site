import React, { useState } from "react";
import {
    Container,
    Button,
    InputGroup,
    FormControl,
    Form,
} from "react-bootstrap";
import "./playersearch.css";
import axios from "axios";

const Playersearch = () => {
    const [playerSearched, setPlayerSearched] = useState("");
    const [userData, setUserData] = useState({});
    const searchForPlayer = (event) => {
        let apiString = `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerSearched}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`;
        axios
            .get(apiString)
            .then(function (response) {
                setUserData(response.data);
                console.log(response);
            })
            .catch(function (err) {
                console.log(err);
            });
    };
    return (
        <section id="hero-section">
            <Container className="player-search-container">
                <Form id="searchForm">
                    <Form.Control
                        type="text"
                        id="searchControlForm"
                        placeholder="Username"
                        aria-describedby="searchHelpBlock"
                        onChange={(e) => setPlayerSearched(e.target.value)}
                    />
                    <Button id="btnSearch" onClick={(e) => searchForPlayer(e)}>
                        Search
                    </Button>
                    <Form.Text id="searchHelpBlock" muted>
                        Please input the username of the player for searching.
                    </Form.Text>
                </Form>
                <section id="resultsArea">
                    {JSON.stringify(userData) !== {} ? (
                        <div id="fullResult">{userData.name}</div>
                    ) : (
                        <div id="emptyResult">No user have been found</div>
                    )}
                </section>
            </Container>
        </section>
    );
};

export default Playersearch;
