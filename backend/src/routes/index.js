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

router.get('/carregaSeries', async function (req, res, next) {

    const url = `${env.URL_BASE}tv/popular?${env.API_KEY}&language=pt-BR`

    const response = await fetch(url);
    const responseJson = await response.json();

    if (!response.ok) {

        return res.status(response.status).send(responseJson.status_message)
    }

    const series = responseJson.results.filter(serie => serie.vote_average > 3)


        const seriesGeneros =  await Promise.all(series.map(async serie => {
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

        const filmesGeneros =  await Promise.all(filmes.map(async filme => {
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

router.get('/carregaGenero/:type/:id', async function (req, res, next,) {

    const type = req.params.type
    const id = req.params.id

    if (type != "movie" && type != "tv") {
        const erro = [{
            "code": 1,
            "mensagem": "oii"
        }]

        return res.status(400).send(erro)
    }

    const URL = `${env.URL_BASE}${type}/${id}?${env.API_KEY}&language=pt-BR`

    const response = await fetch(URL);
    const responseJson = await response.json();

    if (response.ok) {

        const generos = responseJson.genres.map(genero => genero.name)
        return res.status(200).send(generos);

    }

    if (responseJson.status_code == 34) {
        return res.status(400).send("O recurso solicitado não foi encontrado.")
    }

    return res.status(response.status).send(responseJson.status_message)

});

router.get('/classificacaoSerie/:id', async function (req, res, next,) {

    const id = req.params.id

    const URL = `${env.URL_BASE}tv/${id}/content_ratings?${env.API_KEY}`


    const response = await fetch(URL)
    const responseJson = await response.json()

    if (response.ok) {



        if (responseJson.results.length == 0) {
            return res.status(200).send([])
        }
        const classificacaoSerie = responseJson.results.filter(e => e.iso_3166_1 == "BR")

        if (classificacaoSerie.length == 0) {
            return res.status(200).send([])
        }


        return res.status(200).send(classificacaoSerie[0].rating)
    }

    if (responseJson.status_code == 34) {

        return res.status(400).send("O recurso solicitado não foi encontrado.")

    }
    return res.status(response.status).send(responseJson.status_message)
});

router.get('/classificacaoFilme/:id', async function (req, res, next,) {

    const id = req.params.id

    const URL = `${env.URL_BASE}/movie/${id}/release_dates?${env.API_KEY}`

    const response = await fetch(URL)
    const responseJson = await response.json()

    if (response.ok) {

        const dadosFilme = carregaIsoFilme(responseJson.results)

        if (dadosFilme.release_dates.length > 0) {

            return res.status(200).send(dadosFilme);
        }

        return res.status(200).send([])
        // Qual seria a mensagem adequada

    }


    if (responseJson.status_code == 34) {

        return res.status(400).send("O recurso solicitado não foi encontrado.")

    }

    return res.status(response.status).send(responseJson.status_message)


});

router.get('/detalhes/:type/:id', async function (req, res, next,) {

    const type = req.params.type
    const id = req.params.id

    const URL = `${env.URL_BASE}${type}/${id}?${env.API_KEY}&language=pt-BR`

    if (type != "movie" && type != "tv") {
        const erro = [{
            "code": 1,
            "mensagem": "oii"
        }]

        return res.status(400).send(erro)
    }

    const response = await fetch(URL)
    const responseJson = await response.json()

    if (response.ok) {


        return res.status(200).send(responseJson);
    }

    if (responseJson.status_code == 34) {



        return res.status(400).send(erro)

    }

    return res.status(response.status).send(responseJson.status_message)

});

router.get('/dadosAtores/:type/:id', async function (req, res, next,) {

    const type = req.params.type
    const id = req.params.id

    const URL = `${env.URL_BASE}${type}/${id}/credits?${env.API_KEY}&language=pt-BR`

    if (type != "movie" && type != "tv") {
        const erro = {
            "code": 1,
            "titulo": "Requisição Ruim",
            "mensagem": "O tipo inserido não é válido"
        }

        return res.status(400).send(erro)
    }

    const response = await fetch(URL)

    if (response.ok) {
        const responseJson = await response.json()
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

    const URL = `${env.URL_BASE}search/multi?${env.API_KEY}&language=pt-BR&query=${query}&include_adult=false&page=${page}`


    const response = await fetch(URL)
    const responseJson = await response.json()


    if (response.ok) {
        return res.status(200).send(responseJson.results)
    }

    return res.status(404).send()
})

export default router
