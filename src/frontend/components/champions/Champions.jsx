import axios from "axios";
import React, { useEffect, useState } from "react";
import("./champions.css");

const Champions = () => {
    const [championsData, setChampionsData] = useState([]);

    const fetchChampions = async function () {
        await axios
            .get(
                "https://ddragon.leagueoflegends.com/cdn/12.9.1/data/en_US/champion.json"
            )
            .then(function (response) {
                setChampionsData(Object.values(response.data.data));
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchChampions();
    }, []);

    const Champs = () => {
        return (
            <div className="champions-section">
                {championsData.map((champion) => (
                    <div className="champ-box" key={champion.name}>
                        {champion.name}
                        {champion.tags.map((tag) => (
                            <span key={tag}> {tag} </span>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    console.log(championsData);
    return (
        <>
            <Champs />
        </>
    );
};

export default Champions;
