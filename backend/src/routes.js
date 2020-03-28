//#region NOTES
/*
    Métodos HTTP:

    GET : Buscar/listar uma informação do backend
    POST : Criar uma informação no backend
    PUT : Alterar uma informação no backend
    DELETE : Deletar uma informação no backend
*/

/*
    Tipos de parâmetros:

    Query : Parâmetros nomeados e enviados na rota após "?" (filtros, paginação)
    Route : Parâmetros utilizados para identificar recursos
    Request Body : Corpo da requisição utilizado para criar ou alterar recursos
*/
//#endregion
const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required() 
    }).unknown()
}), ProfileController.index)

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index)

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),

    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required().min(15),
        value: Joi.number().required().min(0)
    })
}), IncidentController.create)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete)

module.exports = routes