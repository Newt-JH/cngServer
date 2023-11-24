var express = require('express');
var router = express.Router();
var config = require('../config/database'); // MySQL 연결 설정 파일 불러오기
const mysql = require('mysql2');
const connection = mysql.createConnection(config);
// GET /api/users
router.get('/', (req, res) => {
  connection.query('SELECT * FROM faq', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching data from the database' });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
