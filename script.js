const objetos = [... document.querySelectorAll('.objeto')];
const locais = [... document.querySelectorAll('.local')];
const toggleMenu = document.getElementById('toggleMenu');

const verificaCompatibilidade = (x, y) => {
	for (let i = 0; i < x.length; i++) {
		for (let j = 0; j < y.length; j++) {
			if (x[i] === y[j])
				return true;
		}
	}

	return false;
}

const verificaConjuntoObjetos = () => {
	const conjuntoObjetos = [... document.querySelectorAll('.conjunto-objetos')];
	conjuntoObjetos.forEach(conjunto => {
		if (conjunto.childElementCount === 0)
			conjunto.classList.add('hide');	
	});
}

const arraysIguais = (x, y) => {
	if (x.length !== y.length) return false;
	for (let i = 0; i < x.length; i++) {
		if (x[i] !== y[i])
			return false;
	}

	return true;
}

objetos.forEach(objeto => {
	objeto.addEventListener('dragstart', () => {
		objeto.classList.add('dragging');
	});

	objeto.addEventListener('dragend', () => {
		objeto.classList.remove('dragging');
	});
});

let primeiraFuncao;
locais.forEach(local => {
	local.addEventListener('dragover', (e) => {
		e.preventDefault();
		const objetoAtual = document.querySelector('.dragging');
		objetoAtual.style.border = '1px solid var(--quarta-cor)';
		local.appendChild(objetoAtual);
		const compativel = verificaCompatibilidade([... objetoAtual.classList], [... local.classList]);
		if (compativel && !local.classList.contains('personalidade')) {
			objetoAtual.style.border = '1px solid var(--quinta-cor)';
		}
		verificaConjuntoObjetos();
	});
});

// Menu

let menuAtivo = false;
toggleMenu.addEventListener('click', () => {
	if (!menuAtivo) {
		document.querySelector('nav ul').style.display = 'flex';
		menuAtivo = true;
	} else {
		document.querySelector('nav ul').style.display = 'none';
		menuAtivo = false;
	}
});

let a = document.querySelectorAll('a');
a.forEach(link => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		console.log(link.getAttribute('href'));
		const alvo = document.querySelector(link.getAttribute('href')); // substitua com o id ou seletor do elemento desejado
		const posicaoAlvo = alvo.getBoundingClientRect().top;
		const posicaoAtual = window.scrollY;
		const posicaoScroll = posicaoAtual + posicaoAlvo - 50;
		window.scrollTo({
			top: posicaoScroll,
			behavior: 'smooth'
		});
	});
});

// Pensamento silogístico
const btnConcluir = document.getElementById('btnConcluir');
const premissaMaior = document.getElementById('premissaMaior');
const premissaMenor = document.getElementById('premissaMenor');
const resConclusao = document.getElementById('conclusao');
const resFigura = document.getElementById('figura');
const resModo = document.getElementById('modo');
const quantificadores = ['nem todos', 'nem toda', 'nem todo', 'nem todas', 'todo', 'todos', 'nenhum', 'nenhuma', 'algum', 'alguma', 'algumas', 'alguns', 'um'];

const figuras = [
	{
		modosValidos: ['AAA', 'EAE', 'AII', 'EIO']
	},
	{
		modosValidos: ['EAE', 'AEE', 'EIO', 'AOO']
	},
	{
		modosValidos: ['AAI', 'EAO', 'IAI', 'OAO', 'AII', 'EIO']
	},
	{
		modosValidos: ['AAI', 'AEE', 'IAI', 'EAO', 'EIO']
	}
];

const termosPremissa = (premissa) => {
	let quantificador, premissaSem, nenhumEncontrado = true;
	premissa = premissa.toLowerCase();
	for (let i = 0; i < quantificadores.length; i++) {
		if (premissa.search(`${quantificadores[i]} `) !== -1) {
			quantificador = quantificadores[i];
			premissaSem = premissa.replace(`${quantificadores[i]} `, '');
			nenhumEncontrado = false;
			break;
		}
	}

	if (nenhumEncontrado) {
		quantificador = 'um';
		premissaSem = premissa;
	}

	let termosSeparados, negativo = false;
	if (premissaSem.search('não é') !== -1) {
		termosSeparados = premissaSem.split(' não é ');
		negativo = true;
	} else if (premissaSem.search('não são') !== -1) {
		termosSeparados = premissaSem.split(' não são ');
		negativo = true;
	} else if (premissaSem.search('é') !== -1) {
		termosSeparados = premissaSem.split(' é ');
	} else if (premissaSem.search('são') !== -1) {
		termosSeparados = premissaSem.split(' são ');
	}

	if (negativo)
		return [`${quantificador} não`, termosSeparados];

	return [quantificador, termosSeparados];
}

const obtemTermoMedio = (x, y) => {
	for (let i = 0; i < x.length; i++) {
		for (let j = 0; j < y.length; j++) {
			if (x[i] === y[j])
				return x[i];
		}
	}

	return false;
}

const elementoNaLista = (elemento, lista, obterPosicao = false) => {
       for (let i = 0; i < lista.length; i++) {
              if (elemento === lista[i]) {
                     if (!obterPosicao) {
                            return true;
                     } else {
                            return i;
                     }
              }
       }

       return false;      
}

const distingueValores = (lista) => {
       let distinguidos = [];
       for (let i = 0; i < lista.length; i++) {
              if (!elementoNaLista(lista[i], distinguidos)) {
                     distinguidos.push(lista[i]);
              }
       }

       return distinguidos;
}

function uneListas(listas){
       let resultado = [];
       listas.forEach(subarray => {
              resultado = resultado.concat(subarray);
       });
       return resultado;
}

function removeElementoLista(lista, x) {
	let resultado = [];
	for (let i = 0; i < lista.length; i++) {
		if (lista[i] !== x)
			resultado.push(lista[i]);
	}
	return resultado;
}

function primeiraMaiuscula(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function valorQuantificador(quantificador) {
	switch(quantificador) {
		case 'nenhum':
		case 'nenhuma':
		case 'todo':
		case 'todos':
		case 'todas':
		case 'toda':
			return 1;
			break;
		case 'algum':
		case 'alguns':
		case 'alguma':
		case 'algumas':
		case 'algumas não':
		case 'alguns não':
		case 'algum não':
		case 'alguma não':
		case 'nem todos':
		case 'nem todas':
		case 'nem todo':
		case 'nem toda':
		case 'não todos':
		case 'não todas':
		case 'não todo':
		case 'não toda':
		case 'um':
			return 0;
			break;
		default:
			return -1;
	}
}

function letraQuantificador(quantificador) {
	switch(quantificador) {
		case 'nenhum':
		case 'nenhuma':
			return 'E';
			break;
		case 'todo':
		case 'todos':
		case 'todas':
		case 'toda':
			return 'A';
			break;
		case 'algum':
		case 'alguns':
		case 'alguma':
		case 'algumas':
			return 'I';
			break;
		case 'algumas não':
		case 'alguns não':
		case 'algum não':
		case 'alguma não':
		case 'nem todos':
		case 'nem todas':
		case 'nem todo':
		case 'nem toda':
		case 'não todos':
		case 'não todas':
		case 'não todo':
		case 'não toda':
			return 'O';
			break;
		default:
			return 'A';
	}
}

function modoMaisProximo(figura, modo) {
	let lista = figuras[figura - 1].modosValidos;
	for (let i = 0; i < lista.length; i++) {
		let x = modo.split('');
		let y = lista[i].split('');
		let algumDiferente = false;
		for (let j = 0; j < 2; j++) {
			if (x[j] !== y[j])
				algumDiferente = true;
		}

		if (!algumDiferente)
			return lista[i];
	}

	return false;
}

// Definindo um objeto com as chaves e valores correspondentes
const nomesLatim = {
	'AAA-1': 'Barbara',
	'EAE-1': 'Celarent',
	'AII-1': 'Darii',
	'EIO-1': 'Ferio',

	'EAE-2': 'Cesare',
	'AEE-2': 'Camestres',
	'EIO-2': 'Festino',
	'AOO-2': 'Baroco',

	'AAI-3': 'Darapti',
	'EAO-3': 'Felapton',
	'IAI-3': 'Disamis',
	'OAO-3': 'Bocardo',
	'AII-3': 'Datisi',
	'EIO-3': 'Ferison',

	'AAI-4': 'Bamalip',
	'AEE-4': 'Calemes',
	'IAI-4': 'Dimatis',
	'EAO-4': 'Fesapo',
	'EIO-4': 'Fresison'
};

// Função para receber a string do modo e retornar o nome correspondente
function obtemNomeLatim(modo) {
	return nomesLatim[modo] || 'Modo Inválido';
}

const realizaRaciocinio = () => {
	let termosPremissaMaior = termosPremissa(premissaMaior.value);
	let termosPremissaMenor = termosPremissa(premissaMenor.value);
	let termoMedio = obtemTermoMedio(termosPremissaMaior[1], termosPremissaMenor[1]);

	if (!termoMedio) {
		resConclusao.textContent = 'Modo inválido'
		return false;
	}

	let termoPrimeira, termoSegunda, termoMenor, termoMaior;

	let quantificadorPrimeira = termosPremissaMaior[0];
	let quantificadorSegunda = termosPremissaMenor[0];
	let esquerdaDaPrimeira = termosPremissaMaior[1][0];
	let esquerdaDaSegunda = termosPremissaMenor[1][0];
	let direitaDaPrimeira = termosPremissaMaior[1][1];
	let direitaDaSegunda = termosPremissaMenor[1][1];

	let modo = `${letraQuantificador(quantificadorPrimeira)}${letraQuantificador(quantificadorSegunda)}`;
	let figura;

	if (direitaDaPrimeira !== termoMedio && direitaDaSegunda === termoMedio) {
		// Primeira Figura: M-G. P-M.
		figura = 1;
		console.log('Figura ' + figura);
		termoPrimeira = direitaDaPrimeira;
		termoSegunda = esquerdaDaSegunda;
	} else if (direitaDaPrimeira === termoMedio && direitaDaSegunda === termoMedio) {
		// Segunda Figura: G-M. P-M.
		figura = 2;
		console.log('Figura ' + figura);
		termoPrimeira = esquerdaDaPrimeira;
		termoSegunda = esquerdaDaSegunda;
	} else if (direitaDaPrimeira !== termoMedio && direitaDaSegunda !== termoMedio) {
		// Terceira Figura: M-G. M-P.
		figura = 3;
		console.log('Figura ' + figura);
		termoPrimeira = direitaDaPrimeira;
		termoSegunda = direitaDaSegunda;
	} else if (direitaDaPrimeira === termoMedio && direitaDaSegunda !== termoMedio) {
		// Quarta Figura: G-M. M-P.
		figura = 4;
		console.log('Figura ' + figura);
		termoPrimeira = esquerdaDaPrimeira;
		termoSegunda = direitaDaSegunda;
	}

	if (!modoMaisProximo(figura, modo)) {
		resConclusao.textContent = 'Modo inválido'
		return false;
	}
	
	if (valorQuantificador(quantificadorPrimeira) >= valorQuantificador(quantificadorSegunda)) {
		termoMaior = termoPrimeira;
		termoMenor = termoSegunda;
	} else if (valorQuantificador(quantificadorPrimeira) < valorQuantificador(quantificadorSegunda)) {
		termoMaior = termoSegunda;
		termoMenor = termoPrimeira;
	}

	let tipoConclusao = modoMaisProximo(figura, modo).charAt(2);

	switch(tipoConclusao) {
		case 'A':
			if (quantificadorPrimeira === 'um' || quantificadorSegunda === 'um') {
				resConclusao.textContent = `${primeiraMaiuscula(termoMenor)} é ${termoMaior}`;
			} else {
				resConclusao.textContent = `Todo ${primeiraMaiuscula(termoMenor)} é ${primeiraMaiuscula(termoMaior)}`;
			}
			break;
		case 'E':
			resConclusao.textContent = `Nenhum ${primeiraMaiuscula(termoMenor)} é ${primeiraMaiuscula(termoMaior)}`;
			break;
		case 'I':
			resConclusao.textContent = `Algum ${primeiraMaiuscula(termoMenor)} é ${primeiraMaiuscula(termoMaior)}`;
			break;
		case 'O':
			resConclusao.textContent = `Algum ${primeiraMaiuscula(termoMenor)} não é ${primeiraMaiuscula(termoMaior)}`;
			break;
	}
	let modoFinal = modoMaisProximo(figura, modo);
	let modoFinalParaBusca = `${modoFinal}-${figura}`;
	resFigura.textContent = figura;
	resModo.textContent = `${modoFinal} (${obtemNomeLatim(modoFinalParaBusca)})`;
}

btnConcluir.addEventListener('click', realizaRaciocinio);

let modoExperimentacao = document.getElementById('modoExperimentacao');
modoExperimentacao.addEventListener('click', () => {
	let valor = modoExperimentacao.value;
	switch(valor) {
		case 'Barbara':
			premissaMaior.value = 'Todo M é P';
			premissaMenor.value = 'Todo S é M';
			break;
		case 'Celarent':
			premissaMaior.value = 'Nenhum M é P';
			premissaMenor.value = 'Todo S é M';
			break;
		case 'Darii':
			premissaMaior.value = 'Todo M é P';
			premissaMenor.value = 'Alguns S são M';
			break;
		case 'Ferio':
			premissaMaior.value = 'Nenhum M é P';
			premissaMenor.value = 'Alguns S são M';
			break;
		case 'Cesare':
			premissaMaior.value = 'Nenhum M é P';
			premissaMenor.value = 'Todo S é P';
			break;
		case 'Camestres':
			premissaMaior.value = 'Todo M é P';
			premissaMenor.value = 'Nenhum S é P';
			break;
		case 'Festino':
			premissaMaior.value = 'Nenhum M é P';
			premissaMenor.value = 'Alguns S são P';
			break;
		case 'Baroco':
			premissaMaior.value = 'Todo M é P';
			premissaMenor.value = 'Alguns S não são P';
			break;
		case 'Darapti':
			premissaMaior.value = 'Todo S é P';
			premissaMenor.value = 'Todo S é M';
			break;
		case 'Felapton':
			premissaMaior.value = 'Nenhum M é P';
			premissaMenor.value = 'Todo M é S';
			break;
		case 'Disamis':
			premissaMaior.value = 'Algum M é P';
			premissaMenor.value = 'Todo M é S';
			break;
		case 'Bocardo':
			premissaMaior.value = 'Algum M não é P';
			premissaMenor.value = 'Todo M é S';
			break;
		case 'Datisi':
			premissaMaior.value = 'Todo M é P';
			premissaMenor.value = 'Algum M é S';
			break;
		case 'Ferison':
			premissaMaior.value = 'Nenhum M é P';
			premissaMenor.value = 'Algum M é S';
			break;
		case 'Bamalip':
			premissaMaior.value = 'Todo P é M';
			premissaMenor.value = 'Todo M é S';
			break;
		case 'Calemes':
			premissaMaior.value = 'Todo P é M';
			premissaMenor.value = 'Todo M é S';
			break;
		case 'Dimatis':
			premissaMaior.value = 'Algum M é P';
			premissaMenor.value = 'Todo M é S';
			break;
		case 'Fesapo':
			premissaMaior.value = 'Nenhum P é M';
			premissaMenor.value = 'Todo M é S';
			break;
		case 'Fresison':
			premissaMaior.value = 'Nenhum P é M';
			premissaMenor.value = 'Algum M é S';
			break;
	}
});