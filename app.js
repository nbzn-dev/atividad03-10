const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//  config do banco 
const dbConfig = {
    host: 'localhost',
    user: 'seu_usuario',
    password: '123456',
    database: 'amigo_fiel'
};

app.post('/cadastrar', async (req, res) => {
    const { dono, pet } = req.body;

    if (!dono || !pet) {
        return res.status(400).json({ success: false, message: 'Dados do dono e pet são obrigatórios.' });
    }

    const connection = await mysql.createConnection(dbConfig);

    try {
        await connection.beginTransaction();

        // Insere o dono
        const [resultDono] = await connection.execute(
            `INSERT INTO donos (nome_completo, cpf, email, telefone, endereco) VALUES (?, ?, ?, ?, ?)`,
            [dono.nome_completo, dono.cpf, dono.email, dono.telefone, dono.endereco]
        );

        const idDono = resultDono.insertId;

        // Insere o pet com o id_dono
        await connection.execute(
            `INSERT INTO pets (id_dono, nome_pet, especie, raca, data_nascimento, observacoes) VALUES (?, ?, ?, ?, ?, ?)`,
            [idDono, pet.nome_pet, pet.especie, pet.raca, pet.data_nascimento, pet.observacoes || null]
        );

        await connection.commit();

        res.json({ success: true, message: 'Cadastro realizado com sucesso.' });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ success: false, message: 'Erro no servidor.' });
    } finally {
        await connection.end();
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
