const Express = require('express');
const router  = Express.Router();



router.get('/', function (request, response) {
  response.render('index');
})

router.post('/', function (request, response) {
  const people = request.body.people;
  let teams = request.cookies.teams;
  if(!teams) { teams = []; };
  let listNames = people.split(", ")

  let shuffle = function(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  response.cookie('teams',shuffle(listNames));

  response.redirect('/results');
})

router.get('/results', function (request, response) {
  const teams = request.cookies.teams;
  response.render('results', {teams: teams });
})

module.exports = router;


// 
// const Express =  require('express');
// const router =  Express.Router();
// const shuffle = require('shuffle-array');
//
// const namePicker = function(names,quantity){
//  teamSize = quantity;
//  namesArray = names.split(', ');
//  shuffled = shuffle(namesArray);
//  newNames = [];
//  while(shuffled.length){
//    innerArray = [];
//    for(let i=0;i<teamSize;i++){
//      if(shuffled[0]!==undefined)
//        innerArray.push(shuffled[0])
//      shuffled.shift();
//    }
//    newNames.push(innerArray);
//  }
//  console.log(newNames);
//  return newNames;
//
// }
//
//
// router.get('/', function (req, res, next) {
//  res.render('index', { pick: '', names: '', method: '' });
// })
//
// router.post('/', function (req, res, next) {
//  const {names} = req.body;
//  const {quantity} = req.body;
//  console.log(req.body);
//  res.render('index', {pick: namePicker(names,quantity), names, newNames: newNames})
// })
//
// module.exports = router;
