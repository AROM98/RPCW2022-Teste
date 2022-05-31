const mongoose = require('mongoose')
var Ligacoes = require('../models/ligacoes')
var Cidades = require('../models/cidades')


module.exports.listarCidades = function(){
    return Cidades
        .find({},{_id: 0, id: 1, nome: 1, distrito: 1})
        .exec()
}

module.exports.getCidade = function(idd){
    return Cidades
        .find({id: idd})
        .exec()
}

module.exports.getCidadeNomeOrdenado = function(){
    return Cidades
        .find({},{_id: 0,nome:1}).sort({nome: 1})
        .exec()
}

module.exports.getDistritoCidades = function(cid){
    return Cidades
        .find({distrito: cid},{nome:1})
        .exec()
}

module.exports.getDistritos = function(cid){
    return Cidades
        .find({distrito: cid},{nome:1})
        .exec()
}


module.exports.listarLigacoes = function(){
    return Ligacoes
        .find({},{})
        .exec()
}

module.exports.listarLigacoesOrigem = function(){
    return Ligacoes
        .find({},{})
        .exec()
}

module.exports.listarLigacoesDestino = function(){
    return Ligacoes
        .find({},{ligacoes: 1})
        .exec()
}

