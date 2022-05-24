import axios from "axios";
import React, { useEffect, useState } from "react";
import { champData } from "../champions/ch";
import("./rotation.css");
export const Rotation = () => {
    const [rotation, setRotation] = useState([]);
    const [champsArray, setChampsArray] = useState(null);
    const [champsRotation, setChampsRotation] = useState(null);
    const [loading, setLoading] = useState(true);
    const champs = Promise.resolve(champData);
    champs.then(function (v) {
        setChampsArray(v);
    });

    const rotationString =
        "https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-d0d3a210-4f36-4cf7-82de-e052484dd5cf";
    const getRotation = async () => {
        setLoading(true);

        await axios
            .get(rotationString)
            .then(function (res) {
                setRotation(res.data.freeChampionIds);
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    useEffect(() => {
        getRotation();
    }, []);

    useEffect(() => {
        linkRot(rotation, champsArray);
    }, [rotation]);

    /* FUNCTION LINK DATA TO ROTATION */
    let rotationData = [];
    const linkRot = function (rotNum, chData) {
        setLoading(true);
        for (let i = 0; i < rotNum.length; i++) {
            for (let j = 0; j < Object.keys(chData).length; j++) {
                // console.log(chData[j]);
                if (rotNum[i] == chData[j].key) {
                    console.log("found champ", chData[j].key, chData[j].name);
                    rotationData.push({
                        name: chData[j].name,
                        image: chData[j].image,
                        key: chData[j].key,
                    });
                }
            }
        }
        setChampsRotation(rotationData);
        setLoading(false);
        console.log(rotationData);
    };

    return (
        <div className="rotation-section">
            {!loading ? (
                <>
                    <div className="rot-title">
                        <h1>Free Campions Rotation </h1>
                    </div>
                    {champsRotation.map((champ) => (
                        <div className="champ" key={champ.key}>
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${champ.image}`}
                                alt=""
                            />
                            <div className="champ-name"> {champ.name}</div>
                        </div>
                    ))}
                </>
            ) : (
                <>Loading</>
            )}
        </div>
    );
};
