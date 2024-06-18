const admin = require('firebase-admin');
const serviceAccount = require('./firebase/serviceAccountKey.json');

// Inicialize o Firebase Admin SDK com suas credenciais de serviço
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://reviews-smartplay-br.firebaseio.com"
});

const db = admin.firestore();

exports.handler = async function (event) {
  try {
    const { name, rating, comment } = JSON.parse(event.body);
    
    // Salvar avaliação no Firestore
    await db.collection('avaliacoes').add({
      name,
      rating,
      comment,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Avaliação enviada com sucesso!',
        name,
        rating,
        comment
      })
    };
  } catch (error) {
    console.error('Erro ao salvar avaliação:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Ocorreu um erro ao processar a avaliação.'
      })
    };
  }
};
