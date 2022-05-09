import React, { useEffect, useState } from "react";
import {
    Container,
    Button,
    InputGroup,
    Form,
    DropdownButton,
    Dropdown,
    ButtonGroup,
    Row,
    Col,
    Card,
} from "react-bootstrap";
import "./playersearch.css";
import axios from "axios";

const Playersearch = () => {
    const [playerSearched, setPlayerSearched] = useState("");
    const [userData, setUserData] = useState(null);
    const [userDetailedData, setUserDetailedData] = useState(null);
    const [region, setRegion] = useState("Select Region");
    const [matchHistory, setMatchHistory] = useState(null);
    const [matches, setMatches] = useState(null);
    const [loadingMatches, setLoadingMatches] = useState(true);

    const regions = [
        { label: "Brazil", value: "br1" },
        { label: "EuropeNE", value: "eun1" },
        { label: "EuropeWE", value: "euw1" },
        { label: "Japan", value: "jp1" },
        { label: "Korea", value: "kr" },
        { label: "LatinAmerica1", value: "la1" },
        { label: "LatinAmerica2", value: "la2" },
        { label: "NorthAmerica", value: "na1" },
        { label: "Oceania", value: "oc1" },
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
            })
            .catch(function (err) {
                console.log(err);
                setUserData(null);
            });
    };
    let continent;

    if (
        region === "br1" ||
        region === "la1" ||
        region === "na1" ||
        region === "la2"
    )
        continent = "AMERICAS";
    if (
        region === "eun1" ||
        region === "euw1" ||
        region === "oc1" ||
        region === "tr1" ||
        region === "ru"
    )
        continent = "EUROPE";

    if (region === "jp1" || region === "kr") continent = "ASIA";

    const populateMatches = async (res) => {
        setLoadingMatches(true);
        let matchDetails = [];
        let uri = "";
        for (let i = 0; i < res.length; i++) {
            uri = `https://${continent}.api.riotgames.com/lol/match/v5/matches/${res[i]}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`;
            await axios
                .get(uri)
                .then(function (res) {
                    matchDetails.push(res.data);for (let i = 0; i < res.data.metadata.participants.length; i++) {
            const e = res.data.metadata.participants[i];
            if (e === userData.puuid) {
                console.log(i);
            }
        }
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        setMatches(matchDetails);

        
        setLoadingMatches(false);
        console.log(matches);
    };

    const setDetailedDataQuery = async (event) => {
        let summonerD1 = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${userData.id}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`;

        let summonerDMatches = `https://${continent}.api.riotgames.com/lol/match/v5/matches/by-puuid/${userData.puuid}/ids?start=0&count=5&api_key=${process.env.REACT_APP_RIOT_API_KEY}`;

        await axios
            .get(summonerD1)
            .then(function (response) {
                setUserDetailedData(response.data);
                console.log(response.data);
                //BUG First click doesnt get data
            })
            .catch(function (err) {
                console.log(err);
            });
        await axios
            .get(summonerDMatches)
            .then(function (response) {
                setMatchHistory(response.data);
                populateMatches(response.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    return (
        <section id="hero-section">
            <Container className="detailsContainer">
                <Form id="searchForm">
                    <InputGroup>
                        <select onChange={handleRegionChange}>
                            <option value="Select a Region">
                                Select a Region
                            </option>
                            {/* Mapping through each region object in our regions array
                        and returning an option element with the appropriate attributes / values.
                       */}
                            {regions.map((reg) => (
                                <option key={reg.label} value={reg.value}>
                                    {reg.label}
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
                    ></Form.Control>
                    <Button id="btnSearch" onClick={(e) => searchForPlayer(e)}>
                        Search
                    </Button>
                    <Form.Text id="searchHelpBlock" muted>
                        Please input the username of the player for searching.
                    </Form.Text>
                </Form>
                <Container className="resultsArea">
                    {userData ? (
                        <div id="fullResult">
                            <div id="summData">
                                <div>Name: {userData.name}</div>
                                <div>PUUID: {userData.puuid}</div>
                                <div>Level: {userData.summonerLevel}</div>
                                <div id="summIcon">
                                    <img
                                        alt="Summoner Icon"
                                        id="summIconImg"
                                        src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${userData.profileIconId}.png`}
                                    />
                                </div>
                            </div>

                            <Button
                                id="btnDetails"
                                onClick={() =>
                                    setDetailedDataQuery(userData.id)
                                }
                            >
                                More details
                            </Button>
                        </div>
                    ) : (
                        <div id="emptyResult">No user have been found</div>
                    )}
                </Container>
            </Container>
            {userDetailedData && userDetailedData.length > 0 ? (
                <Container className="detailsContainer">
                    <div className="resultsDetailsArea">
                        <Col id="mainDetails">
                            <Row>Name: {userDetailedData[0].summonerName}</Row>
                            <Row>Wins: {userDetailedData[0].wins}</Row>
                            <Row>Losses: {userDetailedData[0].losses}</Row>
                        </Col>
                    </div>
                </Container>
            ) : (
                <></>
            )}
            {loadingMatches ? (
                <></>
            ) : (
                <Container className="detailsContainer">
                    {matches.info}
                    <Container id="mDetails">
                        {matches.map((match) => (
                            <Card
                                key={match.info.gameId}
                                style={{ width: "18rem" }}
                            >
                                <Card.Img
                                    variant="top"
                                    src="holder.js/100px180"
                                />
                                <Card.Body>
                                    <Card.Title>
                                        {match.info.teams[0].win === true
                                            ? "Victory"
                                            : "Defeat"}
                                    </Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </Card.Text>
                                    <Button variant="primary">
                                        Go somewhere
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </Container>
                </Container>
            )}
        </section>
    );
};

export default Playersearch;
