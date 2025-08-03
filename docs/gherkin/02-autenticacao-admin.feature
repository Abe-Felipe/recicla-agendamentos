# language: pt
Funcionalidade: Autenticação Administrativa

  Como um usuário administrador
  Eu quero fazer login no sistema
  Para acessar a área administrativa de agendamentos

  Contexto:
    Dado que existe um usuário administrador cadastrado com:
      | email             | senha         |
      | admin@recicla.com | senhaForte123 |

  Cenário: Administrador faz login com sucesso
    Dado que eu estou na página de login
    Quando eu preencho o campo "E-mail" com "admin@recicla.com"
    E eu preencho o campo "Senha" com "senhaForte123"
    E eu clico no botão "Entrar"
    Então eu devo ser redirecionado para a página de listagem de agendamentos
    E eu devo ver o texto de boas-vindas do administrador

  Cenário: Tentativa de login com credenciais inválidas
    Dado que eu estou na página de login
    Quando eu preencho o campo "E-mail" com "admin@recicla.com"
    E eu preencho o campo "Senha" com "senhaErrada"
    E eu clico no botão "Entrar"
    Então eu devo ver a mensagem de erro "Credenciais inválidas"
    E eu devo permanecer na página de login

  Cenário: Tentativa de acesso direto à área administrativa sem autenticação (RN002.2, RN002.3)
    Dado que eu não estou autenticado no sistema
    Quando eu tento acessar a URL "/admin/agendamentos" diretamente
    Então eu devo ser redirecionado para a página de login
    E eu devo ver uma mensagem informando que o acesso é restrito

  Cenário: Tentativa de acesso à API sem token válido
    Dado que eu não possuo um token de autenticação válido
    Quando eu faço uma requisição GET para "/api/agendamentos"
    Então eu devo receber o código de status HTTP 401 (Unauthorized)
    E eu devo receber uma mensagem de erro sobre autenticação

  Cenário: Logout do sistema
    Dado que eu estou autenticado como administrador
    E eu estou na página de listagem de agendamentos
    Quando eu clico no botão "Sair"
    Então eu devo ser redirecionado para a página de login
    E meu token de autenticação deve ser invalidado