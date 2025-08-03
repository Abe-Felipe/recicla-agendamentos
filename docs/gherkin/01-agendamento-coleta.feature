# language: pt
Funcionalidade: Agendamento de Coleta de Recicláveis

  Como um cidadão preocupado com o meio ambiente
  Eu quero agendar a coleta de materiais recicláveis na minha residência
  Para que eles tenham o descarte correto

  Contexto:
    Dado que eu estou na página de agendamento de coleta
    E os tipos de materiais disponíveis são: "Papel", "Plástico", "Vidro", "Metal", "Eletrônicos"

  Cenário: Cidadão agenda coleta com sucesso
    Quando eu preencho o campo "Nome completo" com "João da Silva"
    E eu preencho o campo "Endereço" com "Rua das Flores, 123, Centro, Florianópolis, SC"
    E eu seleciono os materiais "Papel" e "Vidro"
    E eu preencho o campo "Telefone de contato" com "(48) 99999-8888"
    E eu preencho o campo "E-mail" com "joao@email.com"
    E eu seleciono uma data de coleta válida (2 dias úteis a partir de hoje)
    E eu clico no botão "Confirmar Agendamento"
    Então eu devo ver uma mensagem de confirmação
    E eu devo ver um número de protocolo único
    E eu devo ver um resumo dos dados fornecidos
    E eu devo ver a data solicitada confirmada

  Cenário: Validação de todos os campos obrigatórios
    Quando eu clico no botão "Confirmar Agendamento" sem preencher nenhum campo
    Então eu devo ver mensagens de erro para todos os campos obrigatórios:
      | campo                | mensagem                              |
      | Nome completo        | Nome completo é obrigatório           |
      | Endereço             | Endereço é obrigatório                |
      | Tipo de material     | Selecione pelo menos um material      |
      | Data da coleta       | Data da coleta é obrigatória          |
      | Telefone de contato  | Telefone de contato é obrigatório     |
    E o agendamento não deve ser criado

  Cenário: Validação de data inválida - menos de 2 dias úteis
    Dado que eu preencho todos os campos obrigatórios corretamente
    Quando eu seleciono uma data de amanhã
    E eu clico no botão "Confirmar Agendamento"
    Então eu devo ver a mensagem de erro "A data sugerida deve ser pelo menos 2 dias úteis após a data atual"
    E o campo de data deve ser destacado como inválido
    E o agendamento não deve ser criado

  Cenário: Validação de formato de telefone
    Dado que eu preencho todos os campos obrigatórios
    Quando eu preencho o campo "Telefone de contato" com "123"
    E eu clico no botão "Confirmar Agendamento"
    Então eu devo ver a mensagem de erro "Formato de telefone inválido"
    E o agendamento não deve ser criado

  Cenário: Sistema mantém estado do formulário após erro
    Dado que eu preencho o campo "Nome completo" com "Maria Santos"
    E eu preencho o campo "Endereço" com "Rua A, 456"
    E eu seleciono o material "Papel"
    Quando eu seleciono uma data inválida
    E eu clico no botão "Confirmar Agendamento"
    E eu vejo a mensagem de erro de data
    Então os campos "Nome completo", "Endereço" e "Papel" devem manter seus valores preenchidos