var express = require('express');
var router = express.Router();
const Mapas = require('../controllers/mapas')

/* GET home page. */
router.get('/cidades', function(req, res, next) {
  if (req.query['distrito'] != undefined) {
    console.log("QUERIE == ",req.query)
    Mapas.getDistritoCidades(req.query['distrito'])
      .then(dados => {
        res.status(200).jsonp(dados)
      })
      .catch(error => {
        res.status(506).jsonp({ error: error })
      })
  }
  else {
    Mapas.listarCidades()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(501).jsonp({error: e}))
  }
});

router.get('/cidades/:id', function(req, res) {
  console.log("ID == ", req.params.id)
  id = req.params.id.replace(":", "")
  Mapas.getCidade(id)
  .then(dados => res.status(200).jsonp(dados) )
  .catch(e => res.status(507).jsonp({error: e}))
});

router.get('/cidades/nomes', function(req, res, next) {
  Mapas.getCidadeNomeOrdenado()
  .then(dados => res.status(200).jsonp(dados) )
  .catch(e => res.status(508).jsonp({error: e}))
});


router.get('/distritos', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ligacoes', function(req, res, next) {
  if (req.query['origem'] != undefined) {
    console.log("QUERIE == ",req.query)
    Mapas.listarLigacoesOrigem(req.query['origem'])
      .then(dados => {
        res.status(200).jsonp(dados)
      })
      .catch(error => {
        res.status(509).jsonp({ error: error })
      })
  }
  else if(req.query['dist'] != undefined){
    console.log("QUERIE == ",req.query)
    Mapas.listarLigacoesDestino(req.query['dist'])
      .then(dados => {
        res.status(200).jsonp(dados)
      })
      .catch(error => {
        res.status(503).jsonp({ error: error })
      })
  }
    else{
    Mapas.listarLigacoes()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(501).jsonp({error: e}))
  }
});



router.get('/ligacoes?dist=XX', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
