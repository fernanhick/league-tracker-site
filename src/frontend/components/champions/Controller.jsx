import axios from "axios";
import React, { useEffect, useState } from "react";

const Controller = () => {
    const [championsData, setChampionsData] = useState([]);
    const [rotationChamps, setRotationChamps] = useState([]);
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
        /*         fetchRotation(); */
    }, []);
};
export default Controller;
