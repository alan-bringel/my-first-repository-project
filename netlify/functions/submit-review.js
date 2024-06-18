// Função para enviar a avaliação
async function submitReview(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const rating = parseInt(document.getElementById('rating').value);
    const comment = document.getElementById('comment').value;
    const date = new Date().toISOString();
  
    if (rating < 1 || rating > 5) {
      alert('Por favor, insira uma avaliação válida entre 1 e 5.');
      return;
    }
  
    try {
      const response = await fetch('https://my-first-repository-project.netlify.app/.netlify/functions/submit-review', {
        method: 'POST',
        body: JSON.stringify({ name, rating, comment, date }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const result = await response.json();
  
      if (response.ok) {
        const reviewsContainer = document.getElementById('response-output');
  
        const newReview = document.createElement('div');
        newReview.classList.add('review');
        newReview.innerHTML = `
          <div class="stars">
            ${'★'.repeat(result.rating)}${'☆'.repeat(5 - result.rating)}
          </div>
          <p class="name-date">${obfuscateName(result.name)} | ${formatDate(result.date)}</p>
          <p class="comment">${result.comment}</p>
        `;
        reviewsContainer.prepend(newReview);
  
        document.getElementById('review-form').reset();
        document.getElementById('rating').value = ''; // Limpa o campo de avaliação após o envio
      } else {
        throw new Error('Ocorreu um erro ao enviar a avaliação.');
      }
    } catch (error) {
      console.error('Erro no processamento da resposta:', error);
      const reviewsContainer = document.getElementById('response-output');
      reviewsContainer.innerHTML = `<p>Ocorreu um erro ao enviar a avaliação. Por favor, tente novamente mais tarde.</p>`;
    }
  }
  
  // Função para ofuscar o nome
  function obfuscateName(name) {
    if (name.length <= 1) return '*';
    return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
  }
  
  // Função para formatar a data
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  }
  
  // Event listener para o envio do formulário
  document.getElementById('review-form').addEventListener('submit', submitReview);
  