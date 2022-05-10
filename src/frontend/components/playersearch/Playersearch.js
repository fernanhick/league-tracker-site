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
    ListGroup,
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
        let apiString = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerSearched}?api_key=${process.env.REACT_APP_RIOT_API}`;
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
            uri = `https://${continent}.api.riotgames.com/lol/match/v5/matches/${res[i]}?api_key=${process.env.REACT_APP_RIOT_API}`;
            await axios
                .get(uri)
                .then(function (res) {
                    matchDetails.push(res.data);
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
        let summonerD1 = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${userData.id}?api_key=${process.env.REACT_APP_RIOT_API}`;

        let summonerDMatches = `https://${continent}.api.riotgames.com/lol/match/v5/matches/by-puuid/${userData.puuid}/ids?start=0&count=5&api_key=${process.env.REACT_APP_RIOT_API}`;

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
                    <Container id="mDetails">
                        {matches.map((match) => (
                            <Card
                                key={match.info.gameId}
                                /*                                 style={{ width: "100%" }}
                                 */ id="cardTeams"
                            >
                                <Card.Header>
                                    {" "}
                                    ID:{match.info.gameId} {match.info.gameMode}
                                </Card.Header>
                                <Card.Body style={{ textAlign: "left" }}>
                                    <Card.Text>
                                        {match.info.teams[0].win === true
                                            ? "Team One"
                                            : "Team Two"}{" "}
                                        Winner
                                    </Card.Text>
                                    {match.info.participants.map((part) => (
                                        <ListGroup
                                            id="partDetails"
                                            key={part.summonerId}
                                        >
                                            <ListGroup.Item
                                                style={
                                                    part.participantId < 6
                                                        ? {
                                                              backgroundColor:
                                                                  "rgb(54, 70, 203)",
                                                              color: "white",
                                                          }
                                                        : {
                                                              backgroundColor:
                                                                  "rgb(187, 65, 65)",
                                                              color: "white",
                                                          }
                                                }
                                            >
                                                Name: {part.summonerName} || K:
                                                {part.kills} D:
                                                {part.deaths} A:
                                                {part.assists}{" "}
                                                {part.championName}{" "}
                                                <img
                                                    style={{
                                                        width: "2rem",
                                                    }}
                                                    src={`https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${part.championName}.png`}
                                                />
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                Items:
                                                {part.item0 !== 0 ? (
                                                    <img
                                                        style={{
                                                            width: "2rem",
                                                        }}
                                                        src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${part.item0}.png`}
                                                    />
                                                ) : (
                                                    ""
                                                )}{" "}
                                                {part.item1 !== 0 ? (
                                                    <img
                                                        style={{
                                                            width: "2rem",
                                                        }}
                                                        src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${part.item1}.png`}
                                                    />
                                                ) : (
                                                    ""
                                                )}{" "}
                                                {part.item2 !== 0 ? (
                                                    <img
                                                        style={{
                                                            width: "2rem",
                                                        }}
                                                        src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${part.item2}.png`}
                                                    />
                                                ) : (
                                                    ""
                                                )}{" "}
                                                {part.item3 !== 0 ? (
                                                    <img
                                                        style={{
                                                            width: "2rem",
                                                        }}
                                                        src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${part.item3}.png`}
                                                    />
                                                ) : (
                                                    ""
                                                )}{" "}
                                                {part.item4 !== 0 ? (
                                                    <img
                                                        style={{
                                                            width: "2rem",
                                                        }}
                                                        src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${part.item4}.png`}
                                                    />
                                                ) : (
                                                    ""
                                                )}{" "}
                                                {part.item5 !== 0 ? (
                                                    <img
                                                        style={{
                                                            width: "2rem",
                                                        }}
                                                        src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${part.item5}.png`}
                                                    />
                                                ) : (
                                                    ""
                                                )}{" "}
                                                {part.item6 !== 0 ? (
                                                    <img
                                                        style={{
                                                            width: "2rem",
                                                        }}
                                                        src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/${part.item6}.png`}
                                                    />
                                                ) : (
                                                    ""
                                                )}{" "}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    ))}
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
