const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize');
let bitCoinApi = 'https://api.coindesk.com/v1/bpi'
const rp = require('request-promise');
let dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, { dialect: 'postgres', })

router.get('/users', async function (req, res) {
    try {
        let result = await sequelize.query(`SELECT id, name, budget FROM public.users`)
        res.send(result[0])
    }
    catch (e) {
        res.send(e.message)
    }
})
router.get('/movies', async function (req, res) {
    try {
        let result = await sequelize.query(`SELECT * FROM public.movies`)
        res.send(result[0])
    }
    catch (e) {
        res.send(e.message)
    }
})
router.post('/rentMovie', async function (req, res) {
    try {
        let rental = req.body
        let favorites=await sequelize.query(
        `INSERT INTO public.favorites(user_id, movie_id) 
        VALUES ('${rental.userId}', '${rental.movieId}')`)
        await sequelize.query(
        `UPDATE public.users
        SET budget=${rental.budget - 3}
        WHERE id=${rental.userId}`)
        await sequelize.query(
        `UPDATE public.movies
        SET "isRented"=true
        WHERE id = ${rental.movieId}`)
        res.end()
    }
    catch (e) {
        res.send(e.message)
    }
})
router.post('/returnMovie', async function (req, res) {
    try {
        let rental = req.body
        await sequelize.query(
        `DELETE FROM public.favorites 
        WHERE user_id='${rental.userId}' 
        AND movie_id ='${rental.movieId}'`)
        await sequelize.query(
        `UPDATE public.users
        SET budget=${rental.budget + 3}
        WHERE id=${rental.userId}`)
        await sequelize.query(
        `UPDATE public.movies
        SET "isRented"=false
        WHERE id = ${rental.movieId}`)
        res.end()
    }
    catch (e) {
        res.send(e.message)
    }
})
router.get('/favorites/:userID', async function (req, res) {
    try {
        let userId=req.params.userID
        let favorites = await sequelize.query(`SELECT movi.*
        FROM public.movies as movi , public.favorites as fav
        WHERE fav.user_id = ${userId} and movi.id= fav.movie_id
    `)
        res.send(favorites)
    }
    catch (e) {
        res.send(e.message)
    }
})

module.exports = router
