
const axios = require('axios');

const urlCEP = 'https://brasilapi.com.br/api/cep/v1/'

const apiKey = 'apiKey=59a33bcca8a84ed8aa0c8a22089faa51'
const urlNoticia = `https://newsapi.org/v2/everything?`

async function buscarCep(cep) {
    try {
        const enderecoObj = await axios.get(urlCEP + cep);
        return enderecoObj.data

    } catch (e) {
        const { response } = e;
        if (response.status === 404) {
            return { mensagem: "CEP não encontrado! ", status: response.status }
        }
        return { mensagem: "ocorreu um erro no servidor teste " + ` ${e}` }
    }
}

async function buscarNoticias(regiao, pg) {
    try {
        const noticias = await axios.get(`${urlNoticia}q=${regiao}&sortBy=popularity&language=pt&pageSize=${pg}&${apiKey}`);
        return noticias.data
    } catch (e) {
        return { mensagem: "ocorreu um erro no servidor " + ` ${e}` }
    }
}

const objBusca = {
    noticiasGerais: async function (req, res) {
        try {
            const { cep } = req.query
            const resultadoCep = await buscarCep(cep);
            if (resultadoCep.mensagem) {
                return res.status(resultadoCep.status).json({ mensagem: resultadoCep.mensagem })
            }

            const { city, state, neighborhood, street } = resultadoCep;
            const noticiaEstado = await buscarNoticias(state, 3);
            const noticiaCidade = await buscarNoticias(city, 3);
            const noticiaBairro = await buscarNoticias(neighborhood, 3);
            const noticiaRua = await buscarNoticias(street, 3);


            const objResposta = {
                noticiaEstado: noticiaEstado.articles,
                noticiaCidade: noticiaCidade.articles,
                noticiaBairro: noticiaBairro.articles,
                noticiaRua: noticiaRua.articles
            }

            return res.status(200).json(objResposta);
        } catch (e) {
            return res.status(500).json({ mensagem: "ocorreu um erro no servidor" + ` ${e}` })
        }
    }
}

module.exports = objBusca