// submit-review.js
exports.handler = async function (event) {
    const { name, rating, comment } = JSON.parse(event.body);
  
    // Aqui você deve adicionar a lógica para armazenar os dados da avaliação
    // Pode ser um banco de dados, serviço de armazenamento, etc.
  
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Avaliação enviada com sucesso!',
        name,
        rating,
        comment
      })
    };
  };