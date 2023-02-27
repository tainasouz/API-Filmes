// const express = require('express');
import express, { response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const router = express.Router();
router.use(cors())

const env = process.env

router.get('/carregaSeries', async function (req, res, next) {
    const url = `${env.URL_BASE}tv/popular?${env.API_KEY}&language=pt-BR`

    const response = await fetch(url);
    const responseJson = await response.json();

    const series = responseJson.results.filter(serie => serie.vote_average > 3)


    res.status(200).send(series);
});

router.get('/carregaFilmes', async function (req, res, next) {

    const response = await fetch(`${env.URL_BASE}movie/popular?${env.API_KEY}&language=pt-BR`)
    const responseJson = await response.json()

    const filmes = responseJson.results.filter(filme => filme.vote_average > 5)

    res.status(200).send(filmes);
});

router.get('/carregaGenero/:type/:id', async function (req, res, next,) {

    const type = req.params.type
    const id = req.params.id

    if (type != "movie" && type != "tv") {
        return res.status(400).send()
    }
    
    const response = await fetch(`${env.URL_BASE}${type}/${id}?${env.API_KEY}&language=pt-BR`);

    if (response.hasOwnProperty('success') && response.success == false ) {
        return res.status(404).send()
    }
    
    const responseJson = await response.json();
    const generos = responseJson.genres.map(genero => genero.name)

    res.status(200).send(generos);
});

router.get('/carregaDestaque', async function (req, res, next,) {

    const response = await fetch(`${env.URL_BASE}discover/movie?${env.API_KEY}&language=pt-BR&region=BR&sort_by=popularity.desc&page=1&year=2023&vote_average.lte=8&with_watch_monetization_types=flatrate`)

    const responseJson = await response.json()
    const destaque = responseJson.results[0]

    res.status(200).send(destaque);
});

router.get('/classificacaoSerie/:id', async function (req, res, next,) {

    const id = req.params.id

    const response = await fetch(`${env.URL_BASE}tv/${id}/content_ratings?${env.API_KEY}`)
    const responseJson = await response.json()

    const classificacaoSerie = responseJson.results.filter(e => e.iso_3166_1 == "BR")[0].rating

    res.status(200).send(classificacaoSerie)
});

router.get('/classificacaoFilme/:id', async function (req, res, next,) {

    const id = req.params.id

    const response = await fetch(`${env.URL_BASE}/movie/${id}/release_dates?${env.API_KEY}`)
    const responseJson = await response.json()

    const dadosFilme = responseJson.results.filter(e => e.iso_3166_1 == 'BR')[0].release_dates[0]

    res.status(200).send(dadosFilme);
});

router.get('/detalhes/:type/:id', async function (req, res, next,) {

    const type = req.params.type
    const id = req.params.id

    if (type != "movie" && type != "tv") {
        return res.status(400).send()
    }

    const response = await fetch(`${env.URL_BASE}${type}/${id}?${env.API_KEY}&language=pt-BR`)
    const responseJson = await response.json()

    res.status(200).send(responseJson);
});

router.get('/dadosAtores/:type/:id', async function (req, res, next,) {

    const type = req.params.type
    const id = req.params.id

    const response = await fetch(`${env.URL_BASE}${type}/${id}/credits?${env.API_KEY}&language=pt-BR`)
    const responseJson = await response.json()
    const atores = responseJson.cast

    res.status(200).send(atores);
});

router.get('/pesquisa/:query/:page', async function (req, res, next) {

    const query = req.params.query
    const page = req.params.page


    const response = await fetch(`${env.URL_BASE}search/multi?${env.API_KEY}&language=pt-BR&query=${query}&include_adult=false&page=${page}`)
    const responseJson = await response.json()

    res.status(200).send(responseJson.results)
})

export default router
