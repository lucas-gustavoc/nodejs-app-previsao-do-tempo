const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Definindo caminhos
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Configurações da aplicação
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Definindo pasta padrão (estática)   
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lucas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Lucas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Here we can really help you!',
        name: 'Lucas'
    })
})

app.get('/weather', (req, res) => {

    const { address } = req.query
    if (!address) {
        return res.send({
            error: 'É necessário providenciar um endereço!'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        
        // const {latitude, longitude, location} = geocodeLocation

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
    
            res.send({
                location,
                forecastData
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Sorry...',
        errorMessage: 'Não há ajuda para este caso.',
        name: 'Lucas'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Sorry...',
        message404: 'Página não encontrada.',
        name: 'Lucas'
    })
})

app.listen(3000, () => console.log('Server listening on port 3000!'))