var express = require('express');
var router = express.Router();
var config = require('../config/database'); // MySQL 연결 설정 파일 불러오기
const mysql = require('mysql2');
const connection = mysql.createConnection(config);
// GET /api/users
router.post('/', (req, res) => {
    const { name, category, hashtag, titleImage, length, width, depth, description, contents, steelPlate, imageList } = req.body;
    console.log(name, category, hashtag, titleImage, length, width, depth, description, contents, steelPlate, imageList);

  connection.query(`Insert into product(name, category, hashTag, titleImage, length, width, depth, description, contents, steelPlate, createDateTime, lastUpdateDateTime) VALUES 
                                        ('${name}', '${category}', '${hashtag}', '${titleImage}', '${length}', '${width}', '${depth}', '${description}', '${contents}', '${steelPlate}', now(), now())`, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching data from the database' });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
