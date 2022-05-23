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
import Header from "../header/Header";

const Playersearch = () => {
    const [playerSearched, setPlayerSearched] = useState("");
    const [userData, setUserData] = useState(null);
    const [userDetailedData, setUserDetailedData] = useState(null);
    const [region, setRegion] = useState("Select Region");
    const [matchHistory, setMatchHistory] = useState(null);
    const [matches, setMatches] = useState(null);
    const [loadingMatches, setLoadingMatches] = useState(true);
    const imgSite = "http://ddragon.leagueoflegends.com/cdn/12.8.1/img/item/";
    const champPage =
        "https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/";
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
        setLoadingMatches(true);

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
                        content="agentfercho"
                        aria-describedby="searchHelpBlock"
                        onChange={(e) => setPlayerSearched(e.target.value)}
                    ></Form.Control>
                    <Button id="btnSearch" onClick={(e) => searchForPlayer(e)}>
                        Search
                    </Button>
                    <Form.Text id="searchHelpBlock" muted>
                        Please input the username of the player for searching.
                    </Form.Text>
                    <div className="tool-tip">
                        <div>
                            Example: Region EuropeWE, Username agentfercho
                        </div>
                    </div>
                </Form>
                <Container className="resultsArea">
                    {userData ? (
                        <div id="fullResult">
                            <div id="summData">
                                <div>
                                    <h1>Username:</h1> {userData.name}
                                </div>
                                <div>
                                    <h1>ID:</h1>
                                    {userData.id}
                                </div>
                                <div>
                                    <h1>Level:</h1> {userData.summonerLevel}
                                </div>
                                <div id="summIcon">
                                    <img
                                        alt="Summoner Icon"
                                        id="summIconImg"
                                        src={`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${userData.profileIconId}.png`}
                                    />
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
                        </div>
                    ) : (
                        <div id="emptyResult">No user have been found</div>
                    )}
                </Container>
            </Container>

            {loadingMatches ? (
                <></>
            ) : (
                <>
                    <div className="summonerBuilds">
                        <h1>BUILDS</h1>

                        {matches.map((match) => (
                            <div className="builds" key={match.info.id}>
                                {match.info.participants.map((part) =>
                                    userData.name === part.summonerName ? (
                                        <div
                                            className="champion"
                                            key={match.info.id}
                                        >
                                            <div className="img-section">
                                                <img
                                                    src={`${champPage}${part.championName}.png`}
                                                />
                                                {match.info.teams[0].win ===
                                                    true &&
                                                part.participantId < 6 ? (
                                                    <div
                                                        className="victory-label"
                                                        style={{
                                                            color: "green",
                                                        }}
                                                    >
                                                        Victory
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="victory-label"
                                                        style={{ color: "red" }}
                                                    >
                                                        Defeat
                                                    </div>
                                                )}
                                            </div>

                                            <div className="stats-build">
                                                <h1>Champion</h1>
                                                <div className="champ-name">
                                                    {part.championName}
                                                </div>
                                                <div className="champ-stats">
                                                    {" "}
                                                    K:
                                                    {part.kills} D:
                                                    {part.deaths} A:
                                                    {part.assists}{" "}
                                                </div>
                                                <div className="position">
                                                    {part.teamPosition}
                                                </div>
                                            </div>
                                            <div className="damage-stats">
                                                <h1>Damage</h1>
                                                <div className="total-dmg">
                                                    Total:{" "}
                                                    {part.totalDamageDealt}
                                                </div>
                                                <div className="champ-dmg">
                                                    Champions:{" "}
                                                    {
                                                        part.totalDamageDealtToChampions
                                                    }
                                                </div>
                                                <div className="taken-dmg">
                                                    Taken:{" "}
                                                    {part.totalDamageTaken}
                                                </div>
                                            </div>
                                            <div className="kills-streak">
                                                <h1>Kill streak</h1>
                                                {part.doubleKills > 0 ? (
                                                    <div>
                                                        Double Kills:{" "}
                                                        {part.doubleKills}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {part.tripleKills > 0 ? (
                                                    <div>
                                                        Triple Kills:{" "}
                                                        {part.tripleKills}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {part.quadraKills > 0 ? (
                                                    <div>
                                                        Quadra Kills:{" "}
                                                        {part.quadraKills}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                {part.pentaKills > 0 ? (
                                                    <div>
                                                        Penta Kills:{" "}
                                                        {part.pentaKills}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="build-items">
                                                <h1>Items</h1>
                                                {part.item0 !== 0 ? (
                                                    <img
                                                        src={`${imgSite}${part.item0}.png`}
                                                    />
                                                ) : (
                                                    ""
                                                )}{" "}
                                                {part.item1 !== 0 ? (
                                                    <img
                                                        src={`${imgSite}${part.item1}.png`}
                                                    />
                                                ) : (
                                                    ""
                                                )}{" "}
                                                {part.item2 !== 0 ? (
                                                    <img
                                                        src={`${imgSite}${part.item2}.png`}
                                                    />
                                                ) : (
                                                    ""
                                                )}{" "}
                                                {part.item3 !== 0 ? (
                                                    <img
                                                        src={`${imgSite}${part.item3}.png`}
                                                    />
                                                ) : (
                                                    ""
                                                )}{" "}
                                                {part.item4 !== 0 ? (
                                                    <img
                                                        src={`${imgSite}${part.item4}.png`}
                                                    />
                                                ) : (
                                                    ""
                                                )}{" "}
                                                {part.item5 !== 0 ? (
                                                    <img
                                                        src={`${imgSite}${part.item5}.png`}
                                                    />
                                                ) : (
                                                    ""
                                                )}{" "}
                                                {part.item6 !== 0 ? (
                                                    <img
                                                        src={`${imgSite}${part.item6}.png`}
                                                    />
                                                ) : (
                                                    ""
                                                )}{" "}
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                    {/* DETAILS IF PLAYED RANKED GAMES */}

                    {userDetailedData && userDetailedData.length > 0 ? (
                        <div className="detailsContainer">
                            <h1>Ranked Games</h1>
                            <div className="resultsDetailsArea">
                                <Col id="mainDetails">
                                    <Row>
                                        Name: {userDetailedData[0].summonerName}
                                    </Row>
                                    <Row>Wins: {userDetailedData[0].wins}</Row>
                                    <Row>
                                        Losses: {userDetailedData[0].losses}
                                    </Row>
                                </Col>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* DETAILS OF THE LAST 5 GAMES PLAYED */}
                    <div className="detailsContainer">
                        <h1>LAST 5 GAMES PLAYED</h1>
                        <div id="mDetails">
                            {matches.map((match) => (
                                <Card
                                    key={match.info.gameId}
                                    /*                                 style={{ width: "100%" }}
                                     */ id="cardTeams"
                                >
                                    <Card.Header>
                                        {" "}
                                        ID:{match.info.gameId}{" "}
                                        {match.info.gameMode}
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
                                                className={
                                                    part.participantId < 6
                                                        ? "team-one"
                                                        : "team-two"
                                                }
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
                                                    Name: {part.summonerName} ||
                                                    K:
                                                    {part.kills} D:
                                                    {part.deaths} A:
                                                    {part.assists}{" "}
                                                    {part.championName}{" "}
                                                    <img
                                                        style={{
                                                            width: "2rem",
                                                        }}
                                                        src={`${champPage}${part.championName}.png`}
                                                    />
                                                </ListGroup.Item>
                                                <ListGroup.Item className="items-team">
                                                    Items:
                                                    {part.item0 !== 0 ? (
                                                        <img
                                                            src={`${imgSite}${part.item0}.png`}
                                                        />
                                                    ) : (
                                                        ""
                                                    )}{" "}
                                                    {part.item1 !== 0 ? (
                                                        <img
                                                            src={`${imgSite}${part.item1}.png`}
                                                        />
                                                    ) : (
                                                        ""
                                                    )}{" "}
                                                    {part.item2 !== 0 ? (
                                                        <img
                                                            src={`${imgSite}${part.item2}.png`}
                                                        />
                                                    ) : (
                                                        ""
                                                    )}{" "}
                                                    {part.item3 !== 0 ? (
                                                        <img
                                                            src={`${imgSite}${part.item3}.png`}
                                                        />
                                                    ) : (
                                                        ""
                                                    )}{" "}
                                                    {part.item4 !== 0 ? (
                                                        <img
                                                            src={`${imgSite}${part.item4}.png`}
                                                        />
                                                    ) : (
                                                        ""
                                                    )}{" "}
                                                    {part.item5 !== 0 ? (
                                                        <img
                                                            src={`${imgSite}${part.item5}.png`}
                                                        />
                                                    ) : (
                                                        ""
                                                    )}{" "}
                                                    {part.item6 !== 0 ? (
                                                        <img
                                                            src={`${imgSite}${part.item6}.png`}
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
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default Playersearch;
