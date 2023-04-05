const express = require('express');
const app = express();
const port = 3000;

const config =  {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

// Check if table people exists
connection.query('SELECT 1 FROM people LIMIT 1', (err, results) => {
    if (err) {
        console.log('Table people does not exist');
        const sql = `CREATE TABLE people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`;
        connection.query(sql, (err, results) => {
            if (err) throw err;
            console.log('Table people created');
        });
    } else {
        console.log('Table people exists');
    }
});

app.get('/', (req, res) =>
    {
        // Random Names
        const names = ['João', 'Maria', 'José', 'Ana', 'Pedro', 'Paulo', 'Carlos', 'Mariana', 'Rafael', 'Julia', 'Gabriel', 'Isabela', 'Lucas', 'Alice', 'Rodrigo', 'Juliana', 'Gustavo', 'Carolina', 'Thiago', 'Larissa', 'Diego', 'Bianca', 'Guilherme', 'Beatriz', 'Enzo', 'Camila', 'Felipe', 'Valentina', 'Vinicius', 'Isis', 'Arthur', 'Livia', 'Ricardo', 'Miguel', 'Leticia', 'Davi', 'Sophia', 'Daniel', 'Manuela', 'Leonardo', 'Ana Luiza', 'Eduardo', 'Laura', 'Bruno', 'Cecilia', 'Alexandre', 'Fernanda', 'João Pedro', 'Lorena', 'João Paulo', 'Amanda', 'João Gabriel', 'Emanuelly', 'João Victor', 'Aline', 'João Miguel', 'Ariana', 'João Lucas', 'Alessandra', 'João Guilherme', 'Aurora', 'João Vitor', 'Ayla', 'João Rafael', 'Ariane', 'João Luiz', 'Alessandra', 'João Carlos', 'Amanda', 'João Henrique', 'Amanda', 'João Eduardo', 'Amanda', 'João Miguel', 'Amanda', 'João Lucas', 'Amanda', 'João Guilherme', 'Amanda', 'João Vitor', 'Amanda', 'João Rafael', 'Amanda', 'João Luiz', 'Amanda', 'João Carlos', 'Amanda', 'João Henrique', 'Amanda', 'João Eduardo', 'Amanda', 'João Miguel', 'Amanda', 'João Lucas', 'Amanda', 'João Guilherme', 'Amanda', 'João Vitor', 'Amanda', 'João Rafael', 'Amanda', 'João Luiz', 'Amanda', 'João Carlos', 'Amanda', 'João Henrique', 'Amanda', 'João Eduardo'];
        const name = names[Math.floor(Math.random() * names.length)];

        // Insert name into table people
        connection.query(`INSERT INTO people(name) values("${name}")`, (err, results) => {
            // Select all names from table people
            connection.query('SELECT name FROM people', (err, results) => {
                res.send(`<h1>Full Cycle Rocks!</h1><ul>${results.map(r => `<li>${r.name}</li>`).join('')}</ul>`);
            });
        });
    }
);

app.listen(port, () => console.log(`Rodando na porta ${port}!`));
