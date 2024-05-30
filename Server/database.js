const mysql = require('mysql');
const db = mysql.createConnection({
    user: 'admin',
    host: 'database-2.crvnabj3woti.us-east-1.rds.amazonaws.com',
    database: 'resultsdb',
    password: 'database',
    port: 3306,
})


  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS GameResults (
    Player1 VARCHAR(50) NOT NULL,
    Result VARCHAR(50) NOT NULL
  );
`;

db.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating table:', err.stack);
      return;
    }
    console.log('Table created successfully');
  });

const saveGameResult = ( result) => {
    const insertQuery = `
      INSERT INTO GameResults (Player1, Result)
      VALUES (?, ? )`;
    const values = [result.result.playerName, result.result.result];

    db.query(insertQuery, values, (err, results) => {
      if (err) {
        console.error('Error saving game result:', err.stack);
        return;
      }
      console.log('Game result saved successfully');
    });
  };

module.exports = {
    saveGameResult
}