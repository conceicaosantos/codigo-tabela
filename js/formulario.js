var botaoAdicionar = document.querySelector('#adicionar-paciente');

botaoAdicionar.addEventListener('click', criarPaciente);

function criarPaciente(evento) {
  evento.preventDefault();

  var formulario = document.querySelector('#formulario');

  var paciente = pagarForm(formulario);
  var pacienteTr = montaTr(paciente);
  pacienteTr.classList.add('paciente');
  var erros = validaPaciente(paciente);

  if (erros.length) {
    exibeMesagemErro(erros);
    return;
  }

  var table = document.querySelector('#tabela-pacientes');
  table.appendChild(pacienteTr);

  formulario.reset();
}

function exibeMesagemErro(erros) {
  var ul = document.querySelector('#mesagem-erro');

  erros.forEach(function(erro) {
    var li = document.createElement('li');
    li.textContent = erro;
    ul.appendChild(li);
  });
}

function pagarForm(formulario) {
  var paciente = {
    nome: formulario.nome.value,
    peso: formulario.peso.value,
    altura: formulario.altura.value,
    gordura: formulario.gordura.value,
    imc: calculaImc(formulario.peso.value, formulario.altura.value),
  };

  return paciente;
}

function montaTr(paciente) {
  var pacienteTr = document.createElement('tr');
  pacienteTr.classList.add('paciente');

  pacienteTr.appendChild(montaTd(paciente.nome, 'info-nome'));
  pacienteTr.appendChild(montaTd(paciente.peso, 'info-peso'));
  pacienteTr.appendChild(montaTd(paciente.altura, 'info-altura'));
  pacienteTr.appendChild(montaTd(paciente.gordura, 'info-gordura'));
  pacienteTr.appendChild(montaTd(paciente.imc, 'info-imc'));

  return pacienteTr;
}

function montaTd(dado, classe) {
  var td = document.createElement('td');
  td.textContent = dado;
  td.classList.add(classe);
  return td;
}

function validaPaciente(paciente) {
  var erros = [];

  if (!validaPeso(paciente.peso)) {
    erros.push('Peso Inválido');
  }

  if (!validaAltura(paciente.altura)) {
    erros.push('Altura Inválida');
  }

  return erros;
}
