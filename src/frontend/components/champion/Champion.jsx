import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { main } from "../champions/ch";
import("./champion.css");

export default function Champion() {
    const [champsArray, setChampsArray] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        main().then((v) => {
            setChampsArray(v);
            setLoading(false);
        });

        console.log(params.id);
    }, []);

    return (
        <div>
            {champsArray !== null ? (
                <>
                    {champsArray.map((champ) =>
                        champ.name.toLowerCase() === params.id ? (
                            <>
                                <div className="champion-section">
                                    <div className="champion-title">
                                        <h1 className="champion-title-header">
                                            {champ.name}
                                        </h1>
                                        <h2 className="champion-title-desc">
                                            {champ.title}
                                        </h2>
                                    </div>

                                    <div className="champion-description">
                                        <img
                                            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${
                                                champ.name === "Nunu & Willump"
                                                    ? "Nunu"
                                                    : champ.name
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                      champ.name
                                                          .slice(1)
                                                          .toLowerCase()
                                                          .replace(/[^\w]/g, "")
                                                          .replace(/\s/g, "")
                                            }_0.jpg`}
                                            alt=""
                                        />
                                        <div className="champion-desc-blurb">
                                            {champ.blurb}
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <></>
                        )
                    )}
                </>
            ) : (
                <></>
            )}
        </div>
    );
}
