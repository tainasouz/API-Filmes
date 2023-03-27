// const express = require('express');
import express, { response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const router = express.Router();
router.use(cors())

const env = process.env

function carregaIsoFilme(results) {
    let dados = results.filter(e => e.iso_3166_1 == 'BR')

    if (dados.length > 0) {
        return dados[0]
    }

    dados = results.filter(e => e.iso_3166_1 == 'US')

    if (dados.length > 0) {
        return dados[0]
    }

    return results[0]

}


function validarTipo(type) {

    if (type !== "movie" && type !== "tv") {

        const erro = {
            "code": 1,
            "mensagem": "O tipo inserido não é válido"
        };

        return { status: 404, erro }

    }
}

async function carregaClassificacao(type, id) {

    let urlClassificacao

    if (type == 'movie') {

        urlClassificacao = `http://localhost:3000/classificacaoFilme/${id}`

    }
    else {

        urlClassificacao = `http://localhost:3000/classificacaoSerie/${id}`
    }

    const responseClassificacao = await fetch(urlClassificacao)
    const classificacao = await responseClassificacao.json()

    if (!responseClassificacao.ok) {
        throw (classificacao.status_message)
    }

    return classificacao

}

async function carregaGenero(type, id) {


    const URL = `${env.URL_BASE}${type}/${id}?${env.API_KEY}&language=pt-BR`

    const response = await fetch(URL);
    const responseJson = await response.json();

    let erro

    if (response.ok) {



        const generos = responseJson.genres.map(genero => genero.name)
        return generos.join(", ")
    }

    if (responseJson.status_code == 34) {
        erro = [{
            "code": 1,
            "mensagem": "O recurso solicitado não foi encontrado."
        }]
        return erro
    }

    erro = [{
        "code": 2,
        "mensagen": "Algo deu errado"
    }]

    return erro
}

function defineMesagemErro(statusCode) {
    let mensagemErro


    if (statusCode.status_code == 34) {
        mensagemErro = {
            "code": 2,
            "mensagem": "O recurso solicitado não foi encontrado."
        }
        return { status: 400, mensagemErro }
    }

    mensagemErro = {
        "code": 5,
        "mensagem": "Algo deu errado"
    }
    return { status: 404, mensagemErro }
}

function carregaTodosOsDados(
    url,
    page = 1,
    Response = []
) {
    return fetch(`${url}${page}`)
        .then(response => response.json())
        .then(responseJson => {


            const response = [...Response, ...responseJson.results.filter(e => e.media_type != "person")];


           

            if (responseJson.results.length !== 0 && page < 10) {
              page++;

              return carregaTodosOsDados(url, page, response);
            }

            return response;
        })
}

router.get('/carregaSeries', async function (req, res, next) {

    const url = `${env.URL_BASE}tv/popular?${env.API_KEY}&language=pt-BR`

    const response = await fetch(url);
    const responseJson = await response.json();

    if (!response.ok) {

        return res.status(response.status).send(responseJson.status_message)
    }

    const series = responseJson.results.filter(serie => serie.vote_average > 3)


    const seriesGeneros = await Promise.all(series.map(async serie => {
        const generos = await carregaGenero('tv', serie.id)
        serie.genres = generos
        return serie
    }))


    return res.status(200).send(seriesGeneros.slice(0, 12));


});

router.get('/carregaFilmes', async function (req, res, next) {

    const URL = `${env.URL_BASE}movie/popular?${env.API_KEY}&language=pt-BR`

    const response = await fetch(URL)
    const responseJson = await response.json()

    if (response.ok) {

        const filmes = responseJson.results.filter(filme => filme.vote_average > 5)

        const filmesGeneros = await Promise.all(filmes.map(async filme => {
            const generos = await carregaGenero('movie', filme.id)
            filme.genres = generos
            return filme
        }))



        res.status(200).send(filmesGeneros.slice(0, 12));

    }

    return res.status(404).send()

});

router.get('/carregaDestaque', async function (req, res, next,) {

    const response = await fetch(`${env.URL_BASE}discover/movie?${env.API_KEY}&language=pt-BR&region=BR&sort_by=popularity.desc&page=1&year=2023&vote_average.lte=8&with_watch_monetization_types=flatrate`)


    if (response.ok) {
        const responseJson = await response.json()
        const destaque = responseJson.results[0]

        return res.status(200).send(destaque);
    }

    return res.status(response.status).send(responseJson.status_message)
});
// Quais seriam os erros dessas requisição?


router.get('/classificacaoSerie/:id', async function (req, res, next,) {

    const id = req.params.id
    const URL = `${env.URL_BASE}tv/${id}/content_ratings?${env.API_KEY}`

    const response = await fetch(URL)
    const responseJson = await response.json()

    if (!response.ok) {

        const erro = defineMesagemErro(responseJson)

        return res.status(erro.status).send(erro.mensagemErro)

    }


    const classificacaoSerie = carregaIsoFilme(responseJson.results)




    const resultClassificacao = {
        "iso_3166_1": classificacaoSerie.iso_3166_1,
        "certification": classificacaoSerie.rating || ""
    }

    return res.status(200).send(resultClassificacao);



});

router.get('/classificacaoFilme/:id', async function (req, res, next,) {

    const id = req.params.id
    const URL = `${env.URL_BASE}/movie/${id}/release_dates?${env.API_KEY}`

    const response = await fetch(URL)
    const responseJson = await response.json()

    if (!response.ok) {

        const erro = defineMesagemErro(responseJson)

        return res.status(erro.status).send(erro.mensagemErro)

    }

    const dadosFilme = carregaIsoFilme(responseJson.results)

    if (dadosFilme.release_dates.length > 0) {

        const DataClassificacaoFilme = {
            "iso_3166_1": dadosFilme.iso_3166_1,
            "certification": dadosFilme.release_dates[0].certification,
        }
        return res.status(200).send(DataClassificacaoFilme);
    }

    return res.status(200).send([])
    // Qual seria a mensagem adequada

});


router.get('/detalhes/:type/:id', async function (req, res, next,) {

    try {
        const { type, id } = req.params

        validarTipo(type)
        const URLDetalhes = `${env.URL_BASE}${type}/${id}?${env.API_KEY}&language=pt-BR`
        const URLAtores = `http://localhost:3000/dadosAtores/${type}/${id}`
        let URLClassificacao

        if (type == "movie") {
            URLClassificacao = `http://localhost:3000/classificacaoFilme/${id}`
        }
        else {
            URLClassificacao = `http://localhost:3000/classificacaoSerie/${id}`
        }



        const [responseDetalhes, responseClassificacao, responseAtores] = await Promise.all([
            fetch(URLDetalhes),
            fetch(URLClassificacao),
            fetch(URLAtores)
        ])

        const detalhes = await responseDetalhes.json()
        const classificacao = await responseClassificacao.json()
        const atores = await responseAtores.json()


        if (!responseDetalhes.ok) {

            defineMesagemErro(detalhes)
        }
        if (!responseClassificacao.ok) {

            defineMesagemErro(classificacao)
        }
        if (!responseAtores.ok) {

            defineMesagemErro(atores)
        }

        detalhes.genres = detalhes.genres.map(genero => genero.name)


        const certification = classificacao


        detalhes.cast = atores

        const dados = {
            "backdrop_path": detalhes.backdrop_path,
            "cast": detalhes.cast,
            "certification": certification,
            "genres": detalhes.genres,
            "id": detalhes.id,
            "original_title": type === 'movie' ? detalhes.original_title : detalhes.original_name,
            "overview": detalhes.overview,
            "poster_path": detalhes.poster_path,
            "release_date": type === 'movie' ? detalhes.release_date : detalhes.first_air_date,
            "title": type === 'movie' ? detalhes.title : detalhes.name,
            "vote_average": detalhes.vote_average,
        }

        return res.status(200).send(dados);
    }
    catch (error) {
        console.error(error)
        return res.status(500).send('Erro ao obter detalhes do filme')
    }
});

router.get('/dadosAtores/:type/:id', async function (req, res, next,) {

    const type = req.params.type
    const id = req.params.id

    const URL = `${env.URL_BASE}${type}/${id}/credits?${env.API_KEY}&language=pt-BR`

    validarTipo(type)

    const response = await fetch(URL)
    const responseJson = await response.json()
    if (response.ok) {

        const atores = responseJson.cast
        return res.status(200).send(atores);
    }


    if (responseJson.status_code == 34) {

        const erro = {
            "code": 2,
            "titulo": "Conteúdo não encontrado",
            "mensagem": "O recurso solicitado não pôde ser encontrado."
        }

        return res.status(400).send(erro)

    }

    return res.status(400).send("deu ruim")

});

router.get('/pesquisa/:query/:page', async function (req, res, next) {

    const query = req.params.query
    const page = req.params.page

    const URL = `${env.URL_BASE}search/multi?${env.API_KEY}&language=pt-BR&query=${query}&include_adult=false&page=`


    const response = await carregaTodosOsDados(URL)
   


    return res.status(200).send(response)


    // return res.status(404).send()
})

export default router
