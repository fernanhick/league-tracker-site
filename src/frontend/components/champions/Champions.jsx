import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import("./champions.css");

const Champions = () => {
    const [championsData, setChampionsData] = useState([]);
    const [champsFilter, setChampsFilter] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagSelected, setTagSelected] = useState("All");

    const fetchChampions = async function () {
        await axios
            .get(
                "https://ddragon.leagueoflegends.com/cdn/12.9.1/data/en_US/champion.json"
            )
            .then(function (response) {
                console.log(response.data.data);
                setChampionsData(Object.values(response.data.data));
            })
            .catch(function (err) {
                console.log(err);
            });
    };
    useEffect(() => {
        fetchChampions();
        /*         setChampsFilter(filteredChamp());
         */
    }, []);
    useEffect(() => {
        setTags(champTags());
        setChampsFilter(filteredChamp());
    }, [championsData]);

    useEffect(() => {
        setChampsFilter(filteredChamp());
    }, [tagSelected]);

    const champTags = () => {
        let tagsFilter = [];
        let tag = championsData.map((v) => v.tags);
        tag.forEach((element) => {
            element.forEach((e) => {
                tagsFilter.push(e);
            });
        });
        let unique = [...new Set(tagsFilter)];
        unique.push("All");
        return unique;
    };

    const filteredChamp = () => {
        let newListChamps = [];
        //iterate over champions and compare tags
        championsData.forEach((champ) => {
            if (tagSelected === "All") {
                newListChamps.push(champ);
            }
            champ.tags.forEach((champTags) => {
                if (champTags === tagSelected) {
                    newListChamps.push(champ);
                }
            });
        });
        return newListChamps;
    };

    const boxRef = useRef();
    const tagRef = useRef();

    const handleClick = () => {
        boxRef.current.classList.toggle("show");
        console.log(boxRef.current);
    };

    const handleChoice = (e) => {
        /*         tagRef.current.style.backgroundColor = "black";
         */ setTagSelected(e.target.attributes.value.value);
        /* e.target.style.backgroundColor = "black"; */
    };

    const Champs = () => {
        return (
            <div className="champions-section">
                <div className="champ-section-title">
                    <h1>List of Champions</h1>
                </div>
                <div className="tags-section">
                    {tags.map((tag) => (
                        <div
                            style={{
                                backgroundColor:
                                    tagSelected === tag
                                        ? "blueviolet"
                                        : " rgb(190, 153, 224)",
                            }}
                            className="tag-title"
                            key={tag}
                            value={tag}
                            ref={tagRef}
                            onClick={(e) => handleChoice(e)}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
                {champsFilter.map((champion) => (
                    <Link to={`/champion/${champion.name.toLowerCase()}`}>
                        <div
                            className="champ-box"
                            key={champion.name}
                            onClick={handleClick}
                        >
                            <img
                                /*  src={`https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${champion.image.full}`} */
                                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${
                                    champion.name === "Nunu & Willump"
                                        ? "Nunu"
                                        : champion.name
                                              .charAt(0)
                                              .toUpperCase() +
                                          champion.name
                                              .slice(1)
                                              .toLowerCase()
                                              .replace(/[^\w]/g, "")
                                              .replace(/\s/g, "")
                                }_0.jpg`}
                                alt=""
                            />

                            <div ref={boxRef} className={`champ-details `}>
                                <div className="champ-name">
                                    <h1>{champion.name}</h1>
                                </div>
                                {/*   {champion.tags.map((tag) => (
                                <span key={tag}> {tag} </span>
                            ))} */}
                            </div>
                        </div>
                    </Link>
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
