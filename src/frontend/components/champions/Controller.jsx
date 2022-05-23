import axios from "axios";
import React, { useEffect, useState } from "react";

const Controller = () => {
    const [championsData, setChampionsData] = useState([]);

    const fetchChampions = async function () {
        await axios
            .get(
                "https://ddragon.leagueoflegends.com/cdn/12.9.1/data/en_US/champion.json"
            )
            .then(function (response) {
                /*   const result = Object.entries(response.data.data).reduce(
                    (state, [key, value]) => {
                        return [
                            ...state,
                            {
                                name: value.name,
                                title: value.title,
                                tags: value.tags,
                                blurb: value.blurb,
                            },
                        ];
                    },
                    []
                );
                setChampionsData(result); */
                setChampionsData(Object.values(response.data.data));
            })
            .catch(function (err) {
                console.log(err);
            });
        return championsData;
    };

    useEffect(() => {
        fetchChampions();
    }, []);
};
export default Controller;
