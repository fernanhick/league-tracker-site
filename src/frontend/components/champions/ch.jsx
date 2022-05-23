const { default: axios } = require("axios");

const main = async () => {
    const urlSting =
        "https://ddragon.leagueoflegends.com/cdn/12.9.1/data/en_US/champion.json";
    const { data } = await axios.get(urlSting);

    const result = Object.entries(data.data).reduce((state, [key, value]) => {
        return [
            ...state,
            {
                name: value.name,
                title: value.title,
                image: value.image.full,
            },
        ];
    }, []);

    console.info(result);
};

main().catch((error) => {
    console.error(error);
});
//smerlos here
