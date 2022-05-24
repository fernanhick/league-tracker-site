const { default: axios } = require("axios");

export const main = async () => {
    const urlSting =
        "https://ddragon.leagueoflegends.com/cdn/12.9.1/data/en_US/champion.json";
    const { data } = await axios.get(urlSting).catch((err) => {
        console.log(err);
    });

    const result = Object.entries(data.data).reduce((state, [key, value]) => {
        return [
            ...state,
            {
                name: value.name,
                title: value.title,
                image: value.image.full,
                key: value.key,
            },
        ];
    }, []);
    return result;
};

/* main().catch((error) => {
    console.error(error);
}); */

/* export const champData = main().catch((error) => {
    console.error(error);
});
 */
