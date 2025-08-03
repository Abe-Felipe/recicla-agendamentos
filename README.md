# Processo seletivo - QA

Bem vindo, candidato.

Estamos felizes que você esteja participando do processo seletivo para a vaga de QA do Senai - Soluções Digitais.

A prova deverá utilizar as seguintes tecnologias:

- Linguagem de programação orientada a objeto
- Banco de dados PostgreSQL
- GIT

Na etapa da entrevista deverá ser apresentado a aplicação em funcionamento.

## Instruções para a execução da prova

**_O documento com o estudo de caso do que precisa ser desenvolvido será enviado por e-mail no horário previsto em edital._**

A prova será uma aplicação web dividida em backend e frontend. O sistema deve ser desenvolvido utilizando uma das seguintes linguagens orientadas a objeto: Java, PHP ou Javascript. O backend e frontend podem ser de linguagens diferentes. O banco de dados deverá ser o PostgreSQL.

Fica a escolha do candidato quais frameworks e servidores serão utilizados, desde que seja uma aplicação web.

**_O Banco utilizado na prova deverá ser PostgreSQL._**

Esse repositório possui apenas esse Readme com as instruções da prova. No entanto, **todo desenvolvimento deve ser commitado nesse repositório** até a data citada no edital.

Por fim, altere esse arquivo com as instruções de como poderemos testar o seu código (quais libs usar, qual servidor, etc) abaixo.

## Informações extras

- Descreva ao final deste documento (Readme.md) o detalhamento de funcionalidades implementadas, sejam elas já descritas na modelagem e / ou extras.
- Detalhar também as funcionalidades que não conseguiu implementar e o motivo.
- Caso tenha adicionado novas libs ou frameworks, descreva quais foram e porque dessa agregação.

(Escreva aqui as instruções para que possamos corrigir sua prova, bem como qualquer outra observação sobre a prova que achar pertinente compartilhar)

####

🚀 Documentação Processo Seletivo - Felipe Abe QA Júnior
🛠️ Tecnologias Utilizadas
Backend

Node.js — Ambiente de execução JavaScript
Express.js — Framework minimalista para APIs REST
PostgreSQL — Banco de dados relacional
JWT (JSON Web Token) — Autenticação segura
Jest — Testes unitários
Supertest — Testes de integração de API
Docker — Containerização e isolamento do ambiente

Frontend

HTML5, CSS3, JavaScript (Vanilla) — Interface sem frameworks
Nginx — Servidor web para arquivos estáticos
Cypress — Testes End-to-End

Qualidade e Documentação

Gherkin (BDD) — Especificação de funcionalidades
SonarQube — Análise de qualidade estática do código

🏃‍♂️ Como Executar o Projeto Localmente

1. Clone este repositório
   bashgit clone https://github.com/seu-usuario/recicla-agendamentos.git
   cd recicla-agendamentos
2. Configure as variáveis de ambiente
   bashcp .env.example .env
3. Inicie os containers com Docker
   bashdocker-compose up --build
   🌐 Acessos após execução:

Frontend: http://localhost:8080
API (Backend): http://localhost:3000/api
Banco de dados: localhost:5432

🧪 Testes Automatizados
Testes Unitários com Jest
bashdocker exec -it recicla_backend sh
npm run test
Testes de API com Supertest e Jest
bashdocker exec -it recicla_backend sh
npm run test:api
Testes E2E com Cypress
bashnpx cypress open
📊 Cobertura de Testes

✅ Cobertura: Mais de 80% das regras críticas testadas
✅ Testes E2E: Simulam fluxos completos do usuário e administrador
✅ Tratamento: Falhas e exceções são tratadas adequadamente em todos os testes

📈 SonarQube
Execute o SonarQube
bashdocker-compose -f docker-compose.sonar.yml up -d
Execute a análise
bashdocker exec -it recicla_backend sh
npm run sonar
🎯 Dashboard
Após executar, acesse o dashboard SonarQube em: http://localhost:9000
📝 Especificações Gherkin
As funcionalidades foram modeladas em BDD com Gherkin:
docs/gherkin/
├── 01-agendamento-coleta.feature
├── 02-autenticacao-admin.feature
└── 03-gestao-agendamentos.feature

📌 Observação: Cada funcionalidade corresponde a um conjunto de cenários de teste automatizados, garantindo alinhamento entre regras de negócio e execução prática.

📋 Plano de Testes
Plano completo em docs/plano-de-testes.md incluindo:

✅ Estratégia de testes (pirâmide)
✅ Testes unitários, API e E2E detalhados
✅ Cobertura de requisitos funcionais e não funcionais
✅ Dados de teste, ambiente e ferramentas
✅ Relatório de falhas manuais e correções

👨‍💻 Autor
Felipe Abe
Analista de Qualidade de Software - Processo Seletivo FIESC
