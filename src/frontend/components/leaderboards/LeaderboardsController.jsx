import axios from "axios";

export const getEWleaders = async () => {
    const str = `https://euw1.api.riotgames.com/lol/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5?api_key=${process.env.REACT_APP_RIOT_API}`;

    const { data } = await axios.get(str).catch((err) => {
        console.log(err);
    });
    const result = Object.values(data.entries);
    //  result.sort();
    return result;
};

export const getNAleaders = async () => {
    const str = `https://na1.api.riotgames.com/lol/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5?api_key=${process.env.REACT_APP_RIOT_API}`;

    const { data } = await axios.get(str).catch((err) => {
        console.log(err);
    });
    const result = Object.values(data.entries);
    //  result.sort();
    return result;
};
export const getENleaders = async () => {
    const str = `https://eun1.api.riotgames.com/lol/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5?api_key=${process.env.REACT_APP_RIOT_API}`;

    const { data } = await axios.get(str).catch((err) => {
        console.log(err);
    });
    const result = Object.values(data.entries);
    //  result.sort();
    return result;
};
