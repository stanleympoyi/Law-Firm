const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const courtsController = require('../controllers/courtsController');
const clientsController = require('../controllers/clientsController');
const casesController = require('../controllers/casesController');
const judgesController = require('../controllers/judgesController')


// Home Router
router.get('/', homeController.view);



//Client router
router.get('/clients', clientsController.view);

// client filter route
router.post('/clients', clientsController.find);

 // client add/ create routes
router.get('/addclient', clientsController.form);
router.post('/addclient', clientsController.create);

// client edit route
router.get('/editclient/:id', clientsController.edit);
router.post('/editclient/:id', clientsController.update);

//Client delete route
router.get('/clients/:id', clientsController.delete);



//Court routers
router.get('/courts', courtsController.view);

// court filter route
router.post('/courts', courtsController.find);

 // court add/ create routes
router.get('/addcourt', courtsController.form);
router.post('/addcourt', courtsController.create);

// court edit route
router.get('/editcourt/:id', courtsController.edit);
router.post('/editcourt/:id', courtsController.update);

//Court delet routes
router.get('/courts/:id', courtsController.delete);



// Cases router
router.get('/cases', casesController.view);

// court filter route
router.post('/cases', casesController.find);

 // court add/ create routes
router.get('/addcase', casesController.form);
router.post('/addcase', casesController.create);

// court edit route
router.get('/editcase/:id', casesController.edit);
router.post('/editcase/:id', casesController.update);

//Cases delete routes
router.get('/cases/:id', casesController.delete);



// Judges Router
router.get('/judges', judgesController.view);

// Judges filter route
router.post('/judges', judgesController.find);

// court edit route
router.get('/editjudge/:id', judgesController.edit);
router.post('/editjudge/:id', judgesController.update);

 // Judges add/ create routes
router.get('/addjudge', judgesController.form);
router.post('/addjudge', judgesController.create);

//Cases delete routes
router.get('/judges/:id', judgesController.delete);



module.exports = router;