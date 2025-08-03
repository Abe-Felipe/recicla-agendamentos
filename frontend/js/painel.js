window.addEventListener('DOMContentLoaded', () => {
  // Referências DOM
  const agendamentosContent = document.getElementById('agendamentos-content');
  const filtrosForm = document.getElementById('filtros-form');
  const filtroDataInput = document.getElementById('filtro-data');
  const filtroStatusInput = document.getElementById('filtro-status');

  const modalContainer = document.getElementById('modal-container');
  const modalContent = document.getElementById('modal-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const statusSelect = document.getElementById('status-select');
  const justificativaGroup = document.getElementById('justificativa-group');
  const justificativaTextarea = document.getElementById('justificativa-textarea');
  const salvarStatusBtn = document.getElementById('salvar-status-btn');

  let currentAgendamentoId = null;

  // Funções utilitárias
  const formatarData = (dataString) => {
    const [ano, mes, dia] = dataString.split('T')[0].split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const toggleJustificativa = () => {
    justificativaGroup.style.display = 'block';
  };

  const fecharModal = () => {
    modalContainer.classList.remove('show');
    currentAgendamentoId = null;
    justificativaTextarea.value = '';
  };

  // Renderiza a tabela de agendamentos
  const renderizarAgendamentos = (agendamentos) => {
    if (agendamentos.length === 0) {
      agendamentosContent.innerHTML = '<p>Nenhum agendamento encontrado para os filtros selecionados.</p>';
      return;
    }

    const tabelaHTML = `
      <table>
        <thead>
          <tr>
            <th>Protocolo</th>
            <th>Nome</th>
            <th>Data da Coleta</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${agendamentos.map(ag => `
            <tr>
              <td>${ag.protocolo}</td>
              <td>${ag.nome_completo}</td>
              <td>${formatarData(ag.data_coleta)}</td>
              <td>${ag.status}</td>
              <td><button class="btn-gerenciar" data-id="${ag.id}">Gerenciar</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    agendamentosContent.innerHTML = tabelaHTML;
  };

  const abrirModal = async (id) => {
    currentAgendamentoId = id;
    modalContainer.classList.add('show');
    modalContent.innerHTML = '<p>Carregando detalhes...</p>';

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/agendamentos/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Falha ao buscar detalhes do agendamento.');

      const agendamento = await response.json();

      modalContent.innerHTML = `
        <div class="modal-detalhes">
          <strong>Protocolo:</strong> <p>${agendamento.protocolo}</p>
          <strong>Nome:</strong> <p>${agendamento.nome_completo}</p>
          <strong>Endereço:</strong> <p>${agendamento.endereco}</p>
          <strong>Telefone:</strong> <p>${agendamento.telefone}</p>
          <strong>E-mail:</strong> <p>${agendamento.email || 'Não informado'}</p>
          <strong>Data da Coleta:</strong> <p>${formatarData(agendamento.data_coleta)}</p>
          <strong>Materiais:</strong> <p>${agendamento.tipo_material.join(', ')}</p>
          <strong>Status Atual:</strong> <p>${agendamento.status}</p>
          <strong>Justificativa:</strong> <p>${agendamento.justificativa || 'Nenhuma'}</p>
        </div>
      `;

      statusSelect.value = agendamento.status;
      justificativaGroup.style.display = 'block';

    } catch (error) {
      modalContent.innerHTML = `<p class="message error">${error.message}</p>`;
    }
  };

  const salvarStatus = async () => {
    if (!currentAgendamentoId) return;

    const status = statusSelect.value;
    const justificativa = justificativaTextarea.value.trim();

    if ((status === 'Concluído' || status === 'Cancelado') && !justificativa) {
      alert('A justificativa é obrigatória para este status.');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/agendamentos/${currentAgendamentoId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status, justificativa }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Falha ao atualizar status.');
      }

      fecharModal();
      buscarErenderizarAgendamentos();

    } catch (error) {
      alert(error.message);
    }
  };

  const buscarErenderizarAgendamentos = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = 'login.html';
      return;
    }

    const status = filtroStatusInput.value;
    const data = filtroDataInput.value;
    const params = new URLSearchParams();

    if (status) params.append('status', status);
    if (data) params.append('data_coleta', data);

    const url = `/api/agendamentos?${params.toString()}`;

    try {
      agendamentosContent.innerHTML = '<p>Carregando agendamentos...</p>';
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('authToken');
          window.location.href = 'login.html';
        }
        throw new Error('Falha ao buscar agendamentos.');
      }

      const agendamentos = await response.json();
      renderizarAgendamentos(agendamentos);

    } catch (error) {
      console.error('Erro:', error);
      agendamentosContent.innerHTML = `<p class="message error">${error.message}</p>`;
    }
  };

  // Eventos
  filtrosForm.addEventListener('submit', e => {
    e.preventDefault();
    buscarErenderizarAgendamentos();
  });

  modalCloseBtn.addEventListener('click', fecharModal);

  modalContainer.addEventListener('click', e => {
    if (e.target === modalContainer) fecharModal();
  });

  statusSelect.addEventListener('change', toggleJustificativa);
  salvarStatusBtn.addEventListener('click', salvarStatus);

  agendamentosContent.addEventListener('click', e => {
    if (e.target.classList.contains('btn-gerenciar')) {
      const id = e.target.dataset.id;
      abrirModal(id);
    }
  });

  // Inicializa
  buscarErenderizarAgendamentos();
});
