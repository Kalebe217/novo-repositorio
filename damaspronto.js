const tam = 100
const tamanhoTable = 8
let pId = 0
let getId
criaTabuleiro()

//função principal
function criaTabuleiro() {
  let tabela = document.createElement('table');
  tabela.style.border = '5px solid green';
  tabela.style.margin = '0 auto';
  
  for (let i = 0; i < tamanhoTable; i++) {
    const linha = document.createElement('tr');
    
    for (let j = 0; j < tamanhoTable; j++) {
      const casa = document.createElement('td');
      linha.append(casa);
      casa.dataset.lin = i;
      casa.dataset.col = j;
      if (i % 2 == j % 2) {
        casa.style.backgroundColor = 'green';
        casa.addEventListener('dragover', condicoes);
        
        if (i * 8 + j < 24) {
          const imagem = criarPeca('black');
          imagem.setAttribute('draggable', 'False');
          casa.append(imagem);
          
        } else if (i * 8 + j >= 40) {
          
          const imagem = criarPeca('red');
          casa.append(imagem);
        }
      } else {
        casa.style.backgroundColor = 'white';
      }
      casa.style.width = `${tam}px`;
      casa.style.height = `${tam}px`;
      casa.style.textAlign = 'center';
      linha.appendChild(casa);
    }
    tabela.appendChild(linha);
  }
  document.body.appendChild(tabela);
}

function criarPeca(cor) {
  let imagem = document.createElement('img');
  imagem.setAttribute('src', `${cor}.png`);
  imagem.classList.add('peca');
  imagem.setAttribute('widht', `${tam - 10}px`);
  imagem.setAttribute('height', `${tam - 10}px`);
  imagem.id = `${pId++}`;
  imagem.addEventListener('drag', get_id);
  imagem.style.margin = 'auto';
  return imagem;
}

function trocaVez(){
  const allPecas = document.querySelectorAll('img');
  allPecas.forEach((peca) => {
    peca.draggable = !peca.draggable;
  })
}

function get_id(){
  getId = this.getAttribute('id');
}

function condicoes(ev){
  ev.preventDefault();
  const peca = document.getElementById(`${getId}`);
  const colunaO = peca.parentElement.dataset.col ;
  const colunaD = ev.target.dataset.col;
  const linhaO = peca.parentElement.dataset.lin;
  const linhaD = ev.target.dataset.lin ;
  if ((peca.getAttribute('src') == 'red.png' 
    && linhaD == linhaO-1 
    || peca.getAttribute('src') == 'black.png' 
    && linhaD-1 == linhaO) 
    && (colunaO == colunaD-1 || colunaO-1 == colunaD)) {
    ev.target.addEventListener('drop', dropar);
    }
}

function dropar(ev) {
  const peca = document.getElementById(`${getId}`);
  peca.parentElement.addEventListener('dragover', condicoes);
  ev.target.append(peca);
  peca.parentElement.removeEventListener('dragover', condicoes);
  trocaVez();
}
