const { default: axios } = require("axios");

export const getRotation = async () => {
    const rotationString = `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${process.env.REACT_APP_RIOT_API}`;

    const { data } = await axios.get(rotationString); /* .catch((err) => {
        console.log(err);
    }); */
    const result = Object.values(data.freeChampionIds);

    return result;
};
