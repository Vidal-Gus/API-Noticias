
const axios = require('axios');

const urlCEP = 'https://brasilapi.com.br/api/cep/v1/'

const apiKey = 'apiKey=59a33bcca8a84ed8aa0c8a22089faa51'
const urlNoticia = `https://newsapi.org/v2/top-headlines?`
const buscarNoticias = {
    buscarPorCep: async function (req, res) {
        try {
            const { cep } = req.query;
            const enderecoObj = await axios.get(urlCEP + cep);
            const { state, city, neithborhood, street } = enderecoObj.data;
            const palavrasChave = `q=${city}`;

            const noticias = await axios.get(`${urlNoticia}country=br&${palavrasChave}&${apiKey}`);
            return res.status(200).json(noticias.data);

        } catch (e) {
            return res.status(500).json({ mensagem: "ocorreu um erro no servidor" + `${e}` })
        }
    }
}

module.exports = buscarNoticias