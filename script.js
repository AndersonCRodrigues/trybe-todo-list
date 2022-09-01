function criaElemento(elemento, texto, atributo, valor) {
  const novoElemento = document.createElement(elemento);
  novoElemento.innerText = texto;
  novoElemento.setAttribute(atributo, valor);
  return novoElemento;
}

function addTarefa() {
  const input = document.querySelector('#texto-tarefa');
  if (input.value !== '') {
    const tarefa = criaElemento('li', '', 'id', '');
    const lista = document.querySelector('#lista-tarefas');
    tarefa.innerText = input.value;
    lista.appendChild(tarefa);
    input.value = null;
  }
}

function removeBG() {
  listTask = document.querySelectorAll('li');
  for (item of listTask) item.style.backgroundColor = '';
}

function selectItem(event) {
  const selected = event.target;
  if (selected.style.backgroundColor === 'grey') selected.style.backgroundColor = '';
  else {
    removeBG();
    selected.style.backgroundColor = 'grey';
  }
}

function complete(event) {
  const done = event.target;
  if (done.classList.contains('completed')) done.classList.toggle('completed');
  else done.classList.toggle('completed');
}

function limpaLista() {
  listTask = document.querySelector('#lista-tarefas');
  let child = listTask.lastElementChild;
  while (child) {
    listTask.removeChild(child);
    child = listTask.lastElementChild;
  }
}

function removeFinalizado() {
  listTask = document.querySelector('#lista-tarefas');
  const complete = document.querySelectorAll('.completed');
  for (let i = 0; i < complete.length; i += 1) {
    listTask.removeChild(complete[i]);
  }
}

function salvaTarefas() {
  listTask = document.querySelectorAll('li');
  const array = [];
  for (const info of listTask) {
    const value = {
      class: '',
      text: '',
    };
    value.class = info.className;
    value.text = info.innerText;
    array.push(value);
  }
  localStorage.setItem('tasks', JSON.stringify(array));
}

function loadTasks() {
  listTask = document.querySelector('#lista-tarefas');
  const arrayTasks = JSON.parse(localStorage.getItem('tasks'));
  listTask = document.querySelector('#lista-tarefas');
  if (localStorage.tasks) {
    for (const value of arrayTasks) {
      console.log(value.text);
    listTask.appendChild(criaElemento('li', `${value.text}`, 'class', `${value.class}`));
    console.log(value.class);
    }
  }
}

const body = document.getElementsByTagName('body')[0];
body.appendChild(criaElemento('header', 'Minha Lista de Tarefas', 'class', 'header'));
const textP = 'Clique duas vezes em um item para marcá-lo como completo';
body.appendChild(criaElemento('p', textP, 'id', 'funcionamento'));
body.appendChild(criaElemento('input', '', 'id', 'texto-tarefa'));
body.appendChild(criaElemento('ol', '', 'id', 'lista-tarefas'));
body.appendChild(criaElemento('button', 'criar-tarefa', 'id', 'criar-tarefa'));
body.appendChild(criaElemento('button', 'Apaga Tudo', 'id', 'apaga-tudo'));
body.appendChild(criaElemento('button', 'Remove Finalizado', 'id', 'remover-finalizados'));
body.appendChild(criaElemento('button', 'Salva Tarefas', 'id', 'salvar-tarefas'));

btnTarefas = document.querySelector('#criar-tarefa');
btnTarefas.addEventListener('click', addTarefa);

listTask = document.querySelectorAll('#lista-tarefas');
for (const item of listTask) {
  item.addEventListener('click', selectItem);
  item.addEventListener('dblclick', complete);
}

btnApagaTudo = document.querySelector('#apaga-tudo');
btnApagaTudo.addEventListener('click', limpaLista);

btnRemoveFinalizado = document.querySelector('#remover-finalizados');
btnRemoveFinalizado.addEventListener('click', removeFinalizado);

btnSalvatarefas = document.querySelector('#salvar-tarefas');
btnSalvatarefas.addEventListener('click', salvaTarefas);

loadTasks();
