var express = require('express');
var router = express.Router();
var config = require('../config/database'); // MySQL 연결 설정 파일 불러오기
const mysql = require('mysql2');
const connection = mysql.createConnection(config);
// GET /api/users
router.post('/', (req, res) => {
    const { contactType, productType, contactOption, contents, phone, partnerName, email } = req.body;
    console.log(contactType, productType, contactOption, contents, phone, partnerName, email);
  connection.query(`Insert into contact(contactType, productType, contactOption, contents, phone, partnerName, email,createDateTime,lastUpdateDateTime) values ('${contactType}', '${productType}', '${contactOption}', '${contents}', '${phone}', '${partnerName}', '${email}',now(),now())`, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching data from the database' });
      console.log(err);
      return;
    }
    res.json(results);
  });
});

module.exports = router;
