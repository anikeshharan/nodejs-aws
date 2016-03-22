var express = require('express'),
	mongoConfig = require('../config').mongodb,
	dao = require('../dao'), 
	awsdHelper = require('../awsHelper'),
	mongoHost = mongoConfig.host,
	mongoPort = mongoConfig.port;
var router = express.Router();
var assert = require('assert');

router.get('/', function (req, res) {
  res.send('hello jenkins');
});

router.route('/status')
	.get(function(req, res) {
		
		var callback = function(err,db){
			if(err != null){
				res.write("<Error>Not able to connect to mongodb due to : ["+err+"]</Error>");
				res.end();
			}			
			assert.equal(null, err);
  			console.log("Connected correctly to server.");
  			db.close();				
			
			res.write("<Status>Connected correctly to server</Status>");
			res.end();	
		}


		dao.getConnectivityWithMongoDb(mongoHost,mongoPort,callback);
	});


router.route('/s3')
	.post(function(req, res) {
		awsdHelper.doUpload(req,res);
	});

router.route('/emr')
	.post(function(req, res) {
		awsdHelper.lunchEMRCluster(req,res);
	});

module.exports = router;
