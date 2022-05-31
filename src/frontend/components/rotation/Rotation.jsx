import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { main } from "../champions/ch";
import { getRotation } from "./RotationController";
import("./rotation.css");
export const Rotation = () => {
    const [rotation, setRotation] = useState([]);
    const [champsArray, setChampsArray] = useState(null);
    const [champsRotation, setChampsRotation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        main().then((v) => {
            setChampsArray(v);
        });
        getRotation().then((v) => {
            setRotation(v);
        });
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
                if (rotNum[i] == chData[j].key) {
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
    };

    return (
        <div className="rotation-section">
            {!loading ? (
                <>
                    <div className="rot-title">
                        <h1>Free Campions Rotation </h1>
                    </div>
                    {champsRotation.map((champ) => (
                        <Link
                            key={champ.key}
                            to={`/champion/${champ.name.toLowerCase()}`}
                        >
                            <div className="champ">
                                <img
                                    src={`https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${champ.image}`}
                                    alt=""
                                />
                                <div className="champs-name"> {champ.name}</div>
                            </div>
                        </Link>
                    ))}
                </>
            ) : (
                <>Loading</>
            )}
        </div>
    );
};
