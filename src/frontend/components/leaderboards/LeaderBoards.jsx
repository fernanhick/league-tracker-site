import React, { useEffect, useState } from "react";
import {
    getENleaders,
    getEWleaders,
    getKRleaders,
    getLA1leaders,
    getLA2leaders,
    getNAleaders,
} from "./LeaderboardsController";
import("./leaderboards.css");
const LeaderBoards = () => {
    const [ewLeaders, setEWleaders] = useState(null);
    const [enLeaders, setENleaders] = useState(null);
    const [krLeaders, setKRleaders] = useState(null);
    const [naLeaders, setNAleaders] = useState(null);
    const [la1Leaders, setLA1leaders] = useState(null);
    const [la2Leaders, setLA2leaders] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getEWleaders().then((v) => {
            setEWleaders(v.sort((fi, si) => si.leaguePoints - fi.leaguePoints));
        });
        getLA1leaders().then((v) => {
            setLA1leaders(
                v.sort((fi, si) => si.leaguePoints - fi.leaguePoints)
            );
        });
        getLA2leaders().then((v) => {
            setLA2leaders(
                v.sort((fi, si) => si.leaguePoints - fi.leaguePoints)
            );
        });
        getENleaders().then((v) => {
            setENleaders(v.sort((fi, si) => si.leaguePoints - fi.leaguePoints));
        });
        getNAleaders().then((v) => {
            setNAleaders(v.sort((fi, si) => si.leaguePoints - fi.leaguePoints));
        });
        getKRleaders().then((v) => {
            setKRleaders(v.sort((fi, si) => si.leaguePoints - fi.leaguePoints));
            setLoading(false);
        });
    }, []);
    let ew = 1;
    let en = 1;
    let kr = 1;
    let na = 1;
    let la1 = 1;
    let la2 = 1;
    return (
        <div className="leaders-board">
            <h1>Leaderboards</h1>
            {loading ? (
                <></>
            ) : (
                <div className="leaders-box">
                    <div className="pl-box">
                        <h1>Western Europe</h1>
                        <div className="pl-box-title">
                            <div className="rank-title">Rank</div>
                            <div className="player-title">Player Name</div>{" "}
                            <div className="points-title">Points</div>
                        </div>
                        {ewLeaders.slice(0, 20).map((pl) => (
                            <div className="player" key={pl.summonerId}>
                                <div className="rank">{ew++}</div>{" "}
                                <div className="pl-name">{pl.summonerName}</div>
                                <div className="point"> {pl.leaguePoints}</div>
                            </div>
                        ))}{" "}
                    </div>
                    <div className="pl-box">
                        <h1>North America</h1>
                        <div className="pl-box-title">
                            <div className="rank-title">Rank</div>
                            <div className="player-title">Player Name</div>{" "}
                            <div className="points-title">Points</div>
                        </div>
                        {naLeaders.slice(0, 20).map((pl) => (
                            <div className="player" key={pl.summonerId}>
                                <div className="rank">{na++}</div>{" "}
                                <div className="pl-name">{pl.summonerName}</div>
                                <div className="point"> {pl.leaguePoints}</div>
                            </div>
                        ))}{" "}
                    </div>
                    <div className="pl-box">
                        <h1>Northern Europe</h1>
                        <div className="pl-box-title">
                            <div className="rank-title">Rank</div>
                            <div className="player-title">Player Name</div>{" "}
                            <div className="points-title">Points</div>
                        </div>
                        {enLeaders.slice(0, 20).map((pl) => (
                            <div className="player" key={pl.summonerId}>
                                <div className="rank">{en++}</div>{" "}
                                <div className="pl-name">{pl.summonerName}</div>
                                <div className="point"> {pl.leaguePoints}</div>
                            </div>
                        ))}{" "}
                    </div>
                    <div className="pl-box">
                        <h1>Latin America 1</h1>
                        <div className="pl-box-title">
                            <div className="rank-title">Rank</div>
                            <div className="player-title">Player Name</div>{" "}
                            <div className="points-title">Points</div>
                        </div>
                        {la1Leaders.slice(0, 20).map((pl) => (
                            <div className="player" key={pl.summonerId}>
                                <div className="rank">{la1++}</div>{" "}
                                <div className="pl-name">{pl.summonerName}</div>
                                <div className="point"> {pl.leaguePoints}</div>
                            </div>
                        ))}{" "}
                    </div>
                    <div className="pl-box">
                        <h1>Latin America 2</h1>
                        <div className="pl-box-title">
                            <div className="rank-title">Rank</div>
                            <div className="player-title">Player Name</div>{" "}
                            <div className="points-title">Points</div>
                        </div>
                        {la2Leaders.slice(0, 20).map((pl) => (
                            <div className="player" key={pl.summonerId}>
                                <div className="rank">{la2++}</div>{" "}
                                <div className="pl-name">{pl.summonerName}</div>
                                <div className="point"> {pl.leaguePoints}</div>
                            </div>
                        ))}{" "}
                    </div>{" "}
                    <div className="pl-box">
                        <h1>Korea</h1>
                        <div className="pl-box-title">
                            <div className="rank-title">Rank</div>
                            <div className="player-title">Player Name</div>{" "}
                            <div className="points-title">Points</div>
                        </div>
                        {krLeaders.slice(0, 20).map((pl) => (
                            <div className="player" key={pl.summonerId}>
                                <div className="rank">{kr++}</div>{" "}
                                <div className="pl-name">{pl.summonerName}</div>
                                <div className="point"> {pl.leaguePoints}</div>
                            </div>
                        ))}{" "}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaderBoards;
