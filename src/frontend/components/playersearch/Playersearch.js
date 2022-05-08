import React, { useEffect, useState } from "react";
import {
    Container,
    Button,
    InputGroup,
    FormControl,
    Form,
    DropdownButton,
    Dropdown,
} from "react-bootstrap";
import "./playersearch.css";
import axios from "axios";

const Playersearch = () => {
    const [playerSearched, setPlayerSearched] = useState("");
    const [userData, setUserData] = useState(null);
    const [userDetailedData, setUserDetailedData] = useState(null);
    const [region, setRegion] = useState("Select Region");

    const regions = [
        { label: "Brazil", value: "br1" },
        { label: "EuropeNE", value: "eun1" },
        { label: "EuropeWE", value: "euw1" },
        { label: "Japan", value: "jp1" },
        { label: "Korea", value: "kr" },
        { label: "LatinAmerica1", value: "la1" },
        { label: "LatinAmerica2", value: "la2" },
        { label: "NorthAmerica", value: "na1" },
        { label: "Oeania", value: "oc1" },
        { label: "Turkey", value: "tr1" },
        { label: "Russia", value: "ru" },
    ];
    // Using this function to update the state of region
    // whenever a new option is selected from the dropdown
    let handleRegionChange = (e) => {
        setRegion(e.target.value);
    };

    const searchForPlayer = (event) => {
        let apiString = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerSearched}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`;
        axios
            .get(apiString)
            .then(function (response) {
                setUserData(response.data);
                console.log(response);
            })
            .catch(function (err) {
                console.log(err);
                setUserData(null);
            });
        setPlayerSearched("");
    };

    const setDetailedDataQuery = (event) => {
        let summStrinApi = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${userData.id}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`;
        axios
            .get(summStrinApi)
            .then(function (response) {
                setUserDetailedData(response.data);
                console.log(userDetailedData);
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    return (
        <section id="hero-section">
            <Container>
                This is the are for searching players and get details
            </Container>
            <Container className="player-search-container">
                <Form id="searchForm">
                    <InputGroup>
                        <select onChange={handleRegionChange}>
                            <option value="Select a Region">
                                Select a Region
                            </option>
                            {/* Mapping through each region object in our regions array
                        and returning an option element with the appropriate attributes / values.
                       */}
                            {regions.map((region) => (
                                <option key={region.label} value={region.value}>
                                    {region.label}
                                </option>
                            ))}
                        </select>
                    </InputGroup>
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
                    {userData ? (
                        <div id="fullResult">
                            <div id="summData">
                                <div>Name: {userData.name}</div>
                                <div>PUUID: {userData.puuid}</div>
                                <div>Level: {userData.summonerLevel}</div>
                            </div>
                            <div id="summIcon">
                                <img
                                    id="summIconImg"
                                    src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${userData.profileIconId}.png`}
                                />
                            </div>
                            <Button
                                id="btnDetails"
                                onClick={(e) =>
                                    setDetailedDataQuery(userData.id)
                                }
                            >
                                More details
                            </Button>
                        </div>
                    ) : (
                        <div id="emptyResult">No user have been found</div>
                    )}
                </section>
            </Container>
            {userData ? (
                <Container id="mDetails">More Details</Container>
            ) : (
                <></>
            )}
        </section>
    );
};

export default Playersearch;
