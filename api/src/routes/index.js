const { Router } = require('express');
const axios = require('axios');
const { Temperaments, Dogs } = require('../db');
const {sequelize} = require('sequelize');
const data = require('../database/breeds'); // sacar esta linea
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

var apiKey = '?api_key=b2f9cbcd-0d5e-4bbc-9d66-742e60992ea3';
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const apiDog = async () => {
    //const dogUrl = await axios.get(`https://api.thedogapi.com/v1/breeds${apiKey}`) //descomentar al finalizar
    const dogUrl = data; // sacar esta linea
    //const razaUrl = await dogUrl.data.map(o => { //descomentar al finalizar
    const razaUrl = dogUrl.map(o => { // sacar esta linea
        return {
            id: o.id,
            raza: o.name,
            temperamento: o.temperament ? o.temperament : 'Dont have temperament',
            img: o.image.url,
            peso: o.weight.metric,
            altura: o.height.metric,
            añosVida: o.life_span,
        }
    }) 
    return razaUrl;
}

const dbDog = async () => {
    return await Dogs.findAll({
        include: Temperaments
    })
}

const allDogs = async () => {
    const apiInf = await apiDog();
    const dbInfo = await dbDog();
    const concat = apiInf.concat(dbInfo);
    return concat;
}

router.get('/dogs', async (req, res) => {
    const {name} = req.query;
    const dogsFull = await allDogs();
    if (name) {
        const dogRaza = dogsFull.filter((o) => o.raza.toLowerCase().includes(name.toLowerCase()));
        dogRaza.length ?
            res.status(200).send(dogRaza) :
            res.status(404).send('El perro no existe')
    } else {
        res.status(200).send(dogsFull);
    }
})

    router.get(`/dogs/:idRaza`, async (req, res) => {
        const {idRaza} = req.params;
        const fullDogs = await allDogs();
        const dog = fullDogs.find(o => o.id == idRaza)
        console.log(dog)
            dog ?
             res.status(200).send(dog)
            :
            res.status(404).send('El id no existe')
        
    })

    router.get('/temperament', async (req, res) => {
        const apiTemperament = await apiDog();
        const temperamentMap = apiTemperament.map(o => {
            if(o.temperamento) return o.temperamento
            else{
                return 'Dont have temperament'
            }
        })
        const temp = temperamentMap.join().split(',')
        const tempMap = temp.map(o => o.trim())
        const tempSet = Array.from(new Set(tempMap)).sort();
        
            tempSet.forEach(o => {
                Temperaments.findOrCreate({
                    where: { name: o}
                })
            })
            
        const allTemperaments = await Temperaments.findAll()
        res.send(allTemperaments);    
    
    })

    router.post('/dog', async (req, res) => {
        const {
            raza,
            temperamento,
            img,
            peso,
            altura,
            añosVida
        } = req.body
    
        const newDog = await Dogs.create({
            raza: raza,
            temperamento: temperamento,
            img: img,
            peso: peso,
            altura: altura,
            añosVida: añosVida
        })
        const temperamentdb = await Temperaments.findAll({
            where: {name: temperamento}
        })
        newDog.addTemperaments(temperamentdb);
        res.send('Perro creado')

})


module.exports = router;
