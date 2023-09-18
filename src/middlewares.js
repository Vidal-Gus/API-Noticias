
function buscarEndereco(req, res, next) {
    const { cep } = req.query;
    if (!cep) {
        return res.status(400).json({ mensagem: "O CEP precisa ser enviado na URL" })
    }
    if (cep.length !== 8) {
        return res.status(400).json({ mensagem: "O CEP precisa estar no formato correto '12345678' " });
    }

    next();
}

module.exports = buscarEndereco;