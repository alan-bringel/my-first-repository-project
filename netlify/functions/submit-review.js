const admin = require('firebase-admin');

// Chave privada formatada corretamente
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzdT87ONUfejkn
HCzAouAZBUKSTYpDJw4Y///At75V9ShX/IbXMgX31yIERMiVG6XUvVIrzS0zzrmm
OAsWl4MH6jpuYXTAJUU+hugMfF8D+7kJ5bcixl/tWKd8QJ7iOiHX1gee0R2unoKN
ZrFVOu4DA3qyoV9/ImNqpo4n0pFqw2o6Bp63/hmPhyG+3UBxmHib/1eXFY6qIWp+
cyc7Kekm0GDshLcsu4w/x7Nx79RFPROAWDGcRIwIGeuzzhm7UM3aXnqUQT6po83z
fbJWi/7FepFQ/P36ARSGeUScBxKNFctUj+eFDLEVdoI5IFynI/s2mxJyZFw5xNzW
Ww/W8gq1AgMBAAECggEAI++JE29cghqkAjhqn8Kd1HTQsWJUmwDhmlD9IlbJBwZ6
JzBawhHyzv/mAGvTrMQmD3U/1KSX9iVh2K6lTcdWRkn5nGvoiKeN96jlI8bt8erA
0YIOC6kkwW78zu1Tw6J3b3Sc/wkKBBMaun0DarlLuw/BzK5y5I760Hr8wW2xj+qu
UXqRLnipLBvefLjVNnyqoo1l3izxtFKYtLoc+JsZzf6ur7eO+Tq2ebrwH4I6Su9o
7VJ1GHfOePGaVhC7WcntW4UxfayVjqIkbSNuoCcac/gLpQU2dBrM22z5C7MYGaNn
cZLsA51qAUkE++GRUvObmd5dV0Sl2qdhrrtOPyZDcQKBgQDxeNK2lOkjFCn7XhRP
ip6HFWw4nF2bp181QeU87/FzeYsXIcuV6IEu3Hngpuxx4j73oUmLaySAbhTe+V+w
whjSetaj6UXfUkCHFPw63/cJ+5WdlQxuwnpuk7xzvWy5t8K89MaR1uaNq92hbqaq
gOSPK73Pa13pek2CszEMAteq3QKBgQC+QUc0sQSQe/y+lt8fKqYAo6sxtuL76Rdf
+tQ+adhZuLE3hoqcn4RezaNnSAHWX0DJVSyfj5v0c6NkayxNcGGn3+A5eTBZUbeV
uv76r2G6kZFkRMi1COY5NjmuQsJDIJKUPcdVYI+ytPtBoCTqHVWZt/DVP89tJz0i
/SesrpJFuQKBgC7Fblr7IOUwhKkxodF+UhJsLdgRQXhixOg16UcSWrw5MJ28aAiT
TmJbRigjbOzqG7QvQ2WDzUArElPWDZjZH6G1NVnuVyBYeDMx92EX/GuslWA+fHf/
p2M/rmLkr+iRFWEwMD4TV/jc70LTgejIqnyoxk0kyL3ueJD2UGu5KTjpAoGBAJin
tiOwOZJY+eZPFj5isQnoSU+9iAlK8QeBMlXWBdOP3xpHaObdE5Ah/g+79kV07n3d
Ss3IpAET3DGR0N1d4+2YM8jJ1aKFcAHDJh4tJQRXEsraahTgTCHxwXxycn78HsC1
hUCbFxH0J3pzrcrvuKR7s9DXv268wlBVwkTLWfB5AoGAXg/vAprJh4a5d0VvV5La
X/CCq5/QX4dSPPgOPq1jrRccCC/l5hOdV0xi0guueSpumgxp0s2ST1lxdJA4wbmc
QftwrBxItkVLYbRt/1k90d1RfCrbLMrgDo4YEQ8HUDemviUqwhiB5qH4aZBVQ1Nq
sljfGu/INUinIuyXJStoqEQ==
-----END PRIVATE KEY-----`;

// Inicialize o Firebase Admin SDK com suas credenciais de serviço
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "reviews-smartplay-br",
    clientEmail: "firebase-adminsdk-j01n4@reviews-smartplay-br.iam.gserviceaccount.com",
    privateKey: privateKey
  }),
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
