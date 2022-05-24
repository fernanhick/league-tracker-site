import { render } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState, useRef, createRef } from "react";
import("./champions.css");

const Champions = () => {
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

    const boxRef = useRef();

    const handleClick = () => {
        boxRef.current.classList.toggle("show");
        console.log(boxRef.current);
    };
    console.log(rotationChamps);
    const Champs = () => {
        return (
            <div className="champions-section">
                {championsData.map((champion) => (
                    <div
                        className="champ-box"
                        key={champion.name}
                        onClick={handleClick}
                    >
                        <div className="champ-thumb">
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${champion.image.full}`}
                                alt=""
                            />
                        </div>

                        <div ref={boxRef} className={`champ-details `}>
                            <h1>Name</h1>
                            <div className="champ-name">{champion.name}</div>
                            <h1>Roles</h1>
                            {champion.tags.map((tag) => (
                                <span key={tag}> {tag} </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <Champs />
        </>
    );
};

export default Champions;
