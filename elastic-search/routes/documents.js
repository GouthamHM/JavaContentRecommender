var express = require('express');  
var router = express.Router();
var sw = require('stopword');
var elastic = require('../elasticsearch');

/* GET suggestions */
router.get('/suggest/:input', function (req, res, next) {  
  elastic.getSuggestions(req.params.input).then(function (result) { res.json(result) });
});

/* POST document to be indexed */
router.post('/', function (req, res, next) {  
  elastic.addDocument(req.body)
  .then(function (result) { res.json(result) })
  .catch(function(err){
      console.log(err);
      res.json({"msg":"failed"})
  });
});
router.delete('/',function(req,res,next){
  elastic.deleteIndex().then(function(result){
    res.json(result)
  }).catch(function(err){
    console.log(err);
    res.json({"msg":"failed"})
});
  
})

module.exports = router;