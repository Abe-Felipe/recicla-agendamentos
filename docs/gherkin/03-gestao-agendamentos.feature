# language: pt
Funcionalidade: Gestão de Agendamentos

  Como um usuário administrador autenticado
  Eu quero gerenciar os agendamentos de coleta
  Para organizar e acompanhar as solicitações dos cidadãos

  Contexto:
    Dado que eu sou um usuário administrador autenticado
    E existem os seguintes agendamentos no sistema:
      | protocolo | nome          | data_coleta | materiais     | status    | telefone       |
      | RC001     | João Silva    | 2024-08-05  | Papel,Vidro   | Pendente  | (48)99999-1111 |
      | RC002     | Maria Santos  | 2024-08-06  | Plástico      | Agendado  | (48)99999-2222 |
      | RC003     | Pedro Costa   | 2024-08-04  | Metal         | Concluído | (48)99999-3333 |
      | RC004     | Ana Oliveira  | 2024-08-07  | Eletrônicos   | Cancelado | (48)99999-4444 |

  Cenário: Visualizar listagem de agendamentos
    Quando eu acesso a página de listagem de agendamentos
    Então eu devo ver uma tabela com os seguintes dados para cada agendamento:
      | campo              | exemplo           |
      | Nome do cidadão    | João Silva        |
      | Data da coleta     | 05/08/2024        |
      | Tipos de materiais | Papel, Vidro      |
      | Status atual       | Pendente          |
    E eu devo ver todos os 4 agendamentos listados

  Cenário: Agendamentos ordenados por data mais próxima
    Quando eu acesso a página de listagem de agendamentos
    Então os agendamentos devem aparecer na seguinte ordem:
      | posição | nome          | data_coleta |
      | 1       | Pedro Costa   | 04/08/2024  |
      | 2       | João Silva    | 05/08/2024  |
      | 3       | Maria Santos  | 06/08/2024  |
      | 4       | Ana Oliveira  | 07/08/2024  |

  Cenário: Filtrar agendamentos por status
    Dado que eu estou na página de listagem de agendamentos
    Quando eu seleciono o filtro de status "Pendente"
    E eu clico no botão "Filtrar"
    Então eu devo ver apenas o agendamento de "João Silva"
    E eu não devo ver os outros agendamentos

  Cenário: Filtrar agendamentos por data
    Dado que eu estou na página de listagem de agendamentos
    Quando eu seleciono o filtro de data "05/08/2024"
    E eu clico no botão "Filtrar"
    Então eu devo ver apenas o agendamento de "João Silva"
    E eu não devo ver os outros agendamentos

  Cenário: Visualizar detalhes completos de um agendamento
    Dado que eu estou na página de listagem de agendamentos
    Quando eu clico no botão "Ver Detalhes" do agendamento "RC001"
    Então eu devo ser redirecionado para a página de detalhes
    E eu devo ver todas as informações do cidadão:
      | campo                | valor                    |
      | Protocolo            | RC001                    |
      | Nome completo        | João Silva               |
      | Endereço completo    | Rua das Flores, 123...   |
      | Telefone de contato  | (48)99999-1111           |
      | E-mail               | joao@email.com           |
      | Materiais            | Papel, Vidro             |
      | Data solicitada      | 05/08/2024               |
      | Status atual         | Pendente                 |

  Cenário: Atualizar status para Agendado
    Dado que eu estou visualizando os detalhes do agendamento "RC001"
    E o status atual é "Pendente"
    Quando eu clico no botão "Alterar Status"
    E eu seleciono o status "Agendado"
    E eu clico em "Confirmar"
    Então eu devo ver a mensagem "Status atualizado com sucesso"
    E o status deve ser exibido como "Agendado"
    E a data/hora de atualização deve ser registrada

  Cenário: Atualizar status para Concluído com justificativa
    Dado que eu estou visualizando os detalhes do agendamento "RC002"
    E o status atual é "Agendado"
    Quando eu clico no botão "Alterar Status"
    E eu seleciono o status "Concluído"
    E eu preencho a justificativa com "Coleta realizada com sucesso na data agendada"
    E eu clico em "Confirmar"
    Então eu devo ver a mensagem "Status atualizado com sucesso"
    E o status deve ser exibido como "Concluído"
    E a justificativa deve ser exibida nos detalhes

  Cenário: Tentativa de atualizar status para Cancelado sem justificativa
    Dado que eu estou visualizando os detalhes do agendamento "RC001"
    Quando eu clico no botão "Alterar Status"
    E eu seleciono o status "Cancelado"
    E eu deixo o campo de justificativa em branco
    E eu clico em "Confirmar"
    Então eu devo ver a mensagem de erro "Justificativa é obrigatória para status Concluído ou Cancelado"
    E o status não deve ser alterado