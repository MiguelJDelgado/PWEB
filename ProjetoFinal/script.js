let filmes = JSON.parse(localStorage.getItem('filmes')) || [];
let editandoId = null;

function salvarFilmes() {
  localStorage.setItem('filmes', JSON.stringify(filmes));
}

function renderizarFilmes(lista = filmes) {
  const container = document.getElementById('movies-container');
  container.innerHTML = '';

  lista.forEach((filme, index) => {
    const card = document.createElement('div');
    card.className = 'movie-card';

    const buttonBar = document.createElement('div');
    buttonBar.className = 'button-bar';

    const excluir = document.createElement('button');
    excluir.innerHTML = '🗑️';
    excluir.onclick = () => deletarFilme(index);

    const editar = document.createElement('button');
    editar.innerHTML = '✏️';
    editar.onclick = () => mostrarAtualizar(filme, index);

    buttonBar.appendChild(editar);
    buttonBar.appendChild(excluir);

    const imagem = document.createElement('img');
    imagem.src = filme.imagem || 'https://via.placeholder.com/300x150?text=Sem+Imagem';

    const nome = document.createElement('div');
    nome.className = 'title';
    nome.textContent = filme.titulo || 'Sem título';

    card.appendChild(buttonBar);
    card.appendChild(imagem);
    card.appendChild(nome);

    container.appendChild(card);
  });
}

function deletarFilme(index) {
  if (confirm('Deseja realmente excluir este filme?')) {
    filmes.splice(index, 1);
    salvarFilmes();
    renderizarFilmes();
  }
}

function showCadastro() {
  document.getElementById('main-screen').classList.add('hidden');
  document.getElementById('cadastro-screen').classList.remove('hidden');
  document.getElementById('cadastro-form').reset();
}

function showMain() {
  document.getElementById('main-screen').classList.remove('hidden');
  document.getElementById('cadastro-screen').classList.add('hidden');
  document.getElementById('atualizar-screen').classList.add('hidden');
  renderizarFilmes();
}

document.getElementById('cadastro-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const novoFilme = {
    id: Date.now(),
    titulo: document.getElementById('titulo').value,
    diretor: document.getElementById('diretor').value,
    ano: parseInt(document.getElementById('ano').value),
    genero: document.getElementById('genero').value,
    duracao: parseInt(document.getElementById('duracao').value),
    elenco: document.getElementById('elenco').value,
    classificacao: document.getElementById('classificacao').value,
    sinopse: document.getElementById('sinopse').value,
    notaUsuario: parseFloat(document.getElementById('nota').value),
    dataAdicao: new Date().toISOString().split('T')[0],
    imagem: document.getElementById('imagem').value
  };
  filmes.push(novoFilme);
  salvarFilmes();
  showMain();
});

function mostrarAtualizar(filme, index) {
  editandoId = index;
  document.getElementById('main-screen').classList.add('hidden');
  document.getElementById('atualizar-screen').classList.remove('hidden');

  document.getElementById('edit-titulo').value = filme.titulo;
  document.getElementById('edit-diretor').value = filme.diretor;
  document.getElementById('edit-ano').value = filme.ano;
  document.getElementById('edit-genero').value = filme.genero;
  document.getElementById('edit-duracao').value = filme.duracao;
  document.getElementById('edit-elenco').value = filme.elenco;
  document.getElementById('edit-classificacao').value = filme.classificacao;
  document.getElementById('edit-sinopse').value = filme.sinopse;
  document.getElementById('edit-nota').value = filme.notaUsuario;
  document.getElementById('edit-imagem').value = filme.imagem || '';
}

document.getElementById('atualizar-form').addEventListener('submit', function (e) {
  e.preventDefault();
  if (editandoId !== null) {
    filmes[editandoId] = {
      ...filmes[editandoId],
      titulo: document.getElementById('edit-titulo').value,
      diretor: document.getElementById('edit-diretor').value,
      ano: parseInt(document.getElementById('edit-ano').value),
      genero: document.getElementById('edit-genero').value,
      duracao: parseInt(document.getElementById('edit-duracao').value),
      elenco: document.getElementById('edit-elenco').value,
      classificacao: document.getElementById('edit-classificacao').value,
      sinopse: document.getElementById('edit-sinopse').value,
      notaUsuario: parseFloat(document.getElementById('edit-nota').value),
      imagem: document.getElementById('edit-imagem').value
    };
    salvarFilmes();
    showMain();
  }
});

function searchMovie() {
  const termo = document.getElementById('search').value.toLowerCase();
  const filtrados = filmes.filter(f => f.titulo.toLowerCase().includes(termo));
  renderizarFilmes(filtrados);
}

renderizarFilmes();
