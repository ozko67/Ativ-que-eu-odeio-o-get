// server.js - Servidor Express Completo Adaptado (Cafés & Produtores)
require('dotenv').config();
const express = require('express');
const supabase = require('./config/supabaseClient');


const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3000;


// 1. Rota GET Global: Listar todos os sushis
app.get('/sushis', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cardapio_sushi')
      .select('*');


    if (error) {
      return res.status(500).json({ erro: 'Erro no banco de dados', detalhe: error.message });
    }


    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ erro: 'Falha interna no servidor' });
  }
});


// 2. Rota GET por ID com tratamento 404 (Traz também os dados do produtor vinculado)
app.get('/sushis/:id', async (req, res) => {
  try {
    const { id } = req.params;


    const { data, error } = await supabase
      .from('cardapio_sushi')
      .select('*, produtor:produtores(*)')
      .eq('id', id)
      .single();


    if (error || !data) {
      return res.status(404).json({ erro: 'Sushi não foi encontrado' });
    }


    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ erro: 'Falha na busca do recurso' });
  }
});


// 3. Rota GET com Ordenação Decrescente por Pontuação SCA (Score)
app.get('/sushis-ordenados', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cardapio_sushi')
      .select('*')
      .order('score_sca', { ascending: false });


    if (error) throw error;


    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao ordenar catálogo de sushis' });
  }
});


// Inicialização da escuta do servidor HTTP
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando com sucesso na porta ${PORT}`);
  console.log(`📡 Endpoints disponíveis: http://localhost:${PORT}/sushis`);
  console.log(`📡 Endpoints disponíveis: http://localhost:${PORT}/sushis/:id`);
  console.log(`📡 Endpoints disponíveis: http://localhost:${PORT}/sushis-ordenados`);
});