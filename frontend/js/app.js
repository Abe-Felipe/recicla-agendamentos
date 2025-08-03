const agendamentoForm = document.getElementById('agendamento-form');
const nomeInput = document.getElementById('nome_completo');
const enderecoInput = document.getElementById('endereco');
const telefoneInput = document.getElementById('telefone');
const emailInput = document.getElementById('email');
const dataColetaInput = document.getElementById('data_coleta');
const submitButton = document.getElementById('submit-button');
const formMessage = document.getElementById('form-message');

const modal = document.getElementById('resumo-modal');
const resumoProtocolo = document.getElementById('resumo-protocolo');
const resumoData = document.getElementById('resumo-data');
const resumoHorario = document.getElementById('resumo-horario');
const resumoEndereco = document.getElementById('resumo-endereco');
const resumoMateriais = document.getElementById('resumo-materiais');
const voltarBtn = document.getElementById('voltar-btn');

const materialButtons = document.querySelectorAll('.material-btn');
const tipoMaterialSelecionado = new Set();

materialButtons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (tipoMaterialSelecionado.has(value)) {
      tipoMaterialSelecionado.delete(value);
      button.classList.remove('selected');
    } else {
      tipoMaterialSelecionado.add(value);
      button.classList.add('selected');
    }
  });
});

voltarBtn.addEventListener('click', () => {
  modal.classList.remove('show');
  modal.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => window.location.reload(), 400);
});


function mascaraTelefone(event) {
  const input = event.target;
  let value = input.value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
  value = value.replace(/(\d)(\d{4})$/, '$1-$2');
  input.value = value.slice(0, 15);
}

telefoneInput.addEventListener('input', mascaraTelefone);

function limitarAnoData() {
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  dataColetaInput.max = `${anoAtual}-12-31`;
}

limitarAnoData();

function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  formMessage.textContent = '';
  formMessage.className = '';
}

function showError(element, message) {
  const errorElement = element.nextElementSibling;
  if (errorElement && errorElement.classList.contains('error-message')) {
    errorElement.textContent = message;
  }
}

function isDiaUtil(data) {
  const dia = data.getDay();
  return dia !== 0 && dia !== 6;
}

function adicionarDiasUteis(data, dias) {
  const novaData = new Date(data);
  while (dias > 0) {
    novaData.setDate(novaData.getDate() + 1);
    if (isDiaUtil(novaData)) dias--;
  }
  return novaData;
}

function validarTelefone(valor) {
  const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;
  return regexTelefone.test(valor);
}

function validateForm() {
  let isValid = true;
  clearErrors();

  const regexNome = /^[a-zA-Z\u00C0-\u017F\s]+$/;

  if (nomeInput.value.trim() === '') {
    showError(nomeInput, 'Nome completo é obrigatório');
    isValid = false;
  } else if (!regexNome.test(nomeInput.value)) {
    showError(nomeInput, 'Nome inválido. Evite números, emojis ou caracteres especiais.');
    isValid = false;
  }

  if (enderecoInput.value.trim() === '') {
    showError(enderecoInput, 'Endereço é obrigatório');
    isValid = false;
  }

  if (telefoneInput.value.trim() === '') {
    showError(telefoneInput, 'Telefone de contato é obrigatório');
    isValid = false;
  } else if (!validarTelefone(telefoneInput.value.trim())) {
    showError(telefoneInput, 'Formato de telefone inválido');
    isValid = false;
  }

  if (dataColetaInput.value === '') {
    showError(dataColetaInput, 'Data da coleta é obrigatória');
    isValid = false;
  } else {
    const hoje = new Date();
    const dataSelecionada = new Date(dataColetaInput.value);
    const dataMinima = adicionarDiasUteis(hoje, 2);
    if (dataSelecionada < dataMinima) {
      showError(dataColetaInput, 'A data sugerida deve ser pelo menos 2 dias úteis após a data atual');
      isValid = false;
    }
  }

  if (tipoMaterialSelecionado.size === 0) {
    document.getElementById('materiais-error').textContent = 'Selecione pelo menos um material';
    isValid = false;
  }

  return isValid;
}

agendamentoForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!validateForm()) return;

  submitButton.disabled = true;
  submitButton.textContent = 'Enviando...';

  const tipo_material = [...tipoMaterialSelecionado];

  const formData = {
    nome_completo: nomeInput.value.trim(),
    endereco: enderecoInput.value.trim(),
    telefone: telefoneInput.value.trim(),
    email: emailInput.value.trim(),
    data_coleta: dataColetaInput.value,
    tipo_material: tipo_material,
  };

  try {
    const response = await fetch('/api/agendamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.message || 'Erro ao agendar.');

    const dataFormatada = new Date(formData.data_coleta).toLocaleDateString('pt-BR', {
      weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
    });

resumoProtocolo.textContent = result.protocolo;
resumoData.textContent = dataFormatada;
resumoHorario.textContent = '08:00 às 18:00';
resumoEndereco.textContent = formData.endereco;
resumoMateriais.textContent = formData.tipo_material.join(', ');

    modal.classList.add('show');
    modal.classList.remove('hidden');

  } catch (error) {
    formMessage.textContent = error.message;
    formMessage.className = 'message error';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Confirmar Agendamento';
  }
});
