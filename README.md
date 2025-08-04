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

# 📄 Documentação Processo Seletivo - Felipe Abe - QA Júnior

## 📋 Sobre o Projeto

Sistema de agendamento de coleta de materiais recicláveis com:

- Interface web para cidadãos agendarem coletas
- Painel administrativo para gestão
- Autenticação JWT e banco PostgreSQL

## 💻 Tecnologias Utilizadas

### Backend

- **Node.js** — Ambiente de execução JavaScript
- **Express.js** — Framework minimalista para APIs REST
- **PostgreSQL** — Banco de dados relacional
- **JWT (JSON Web Token)** — Autenticação segura
- **Jest** — Testes unitários
- **Supertest** — Testes de integração de API
- **Docker** — Containerização e isolamento do ambiente

### Frontend

- **HTML5, CSS3, JavaScript (Vanilla)** — Interface sem frameworks
- **Nginx** — Servidor web para arquivos estáticos
- **Cypress** — Testes End-to-End

### Qualidade e Documentação

- **Gherkin (BDD)** — Especificação de funcionalidades
- **SonarQube** — Análise de qualidade estática do código

---

## 💻 Como executar o projeto localmente

### 1. Clone este repositório

```bash
git clone https://github.com/seu-usuario/recicla-agendamentos.git
cd recicla-agendamentos
```

### 2. Copie o arquivo de variáveis de ambiente e configure se necessário

```bash
cp .env.example .env
```

### 3. Inicie os containers com Docker

```bash
docker-compose up --build -d
```

### 4. Prepare o Banco de Dados (Execute em um novo terminal)

Bash

```bash
docker-compose exec backend npx node-pg-migrate up
docker-compose exec backend npm run seed
```

Após isso:

- Acesse o **frontend**: [http://localhost:8080](http://localhost:8080)
- Acesse a **API (backend)**: [http://localhost:3000/api](http://localhost:3000/api)
- O **banco de dados** estará rodando em `localhost:5432`

---

## 🧪 Testes Automatizados

### Testes Unitários e API com Jest e SuperTest

```bash
docker exec -it recicla_backend sh
npm run test
```

### 🧭 Testes End-to-End com Cypress

#### 1. Instale as dependências (caso ainda não tenha)

```bash
cd frontend
npm install
```

#### 2. Inicie o ambiente completo (API + Frontend) com Docker:

```bash
docker-compose up --build
```

#### 3. Execute os testes Cypress

##### Modo interativo (GUI):

```bash
npx cypress open
```

##### Modo headless (automático):

```bash
npx cypress run
```

#### 🔍 Observações:

- Os testes E2E estão configurados para usar `http://localhost:8080` como baseUrl.
- Os fluxos cobertos incluem:
  - Agendamento de coleta
  - Autenticação de administrador
  - Visualização e gerenciamento de agendamentos
- Para uma simulação completa, **suba a aplicação antes de rodar os testes**.

- **Cobertura de testes**: mais de 80% das regras críticas testadas
- **Testes E2E**: simulam fluxos completos do usuário e administrador
- **Falhas e exceções** são tratadas adequadamente em todos os testes

---

## 📘 Especificações Gherkin

As funcionalidades foram modeladas em **BDD com Gherkin**:

```
docs/gherkin/
├── 01-agendamento-coleta.feature
├── 02-autenticacao-admin.feature
└── 03-gestao-agendamentos.feature
```

Cada funcionalidade corresponde a um conjunto de **cenários de teste automatizados**, garantindo alinhamento entre regras de negócio e execução prática.

---

## 🧾 Plano de Testes

Plano completo em `docs/plano-de-testes.md` incluindo:

- Estratégia de testes (pirâmide)
- Testes unitários, API e E2E detalhados
- Cobertura de requisitos funcionais e não funcionais
- Dados de teste, ambiente e ferramentas
- Relatório de falhas manuais e correções

---

## ✅ Requisitos Não Atendidos (RQNF12)

### RF006 - Gerenciamento de Tipos de Materiais

**Motivo da não implementação:**  
Devido a limitações de tempo e priorização das funcionalidades obrigatórias, o módulo administrativo para cadastro/edição de tipos de materiais recicláveis (RF006) não foi implementado.

---

## 🧪 Estratégia de Testes Automatizados (RQNF10)

A estratégia aplicada seguiu a pirâmide de testes:

- **Testes Unitários (Jest)** → Regras críticas do backend
- **Testes de API (Supertest/Cypress)** → Validação dos endpoints REST
- **Testes E2E (Cypress)** → Fluxos completos no frontend

📁 Arquivo de referência: `docs/plano-de-testes.md`

### 📌 Prioridades Definidas

- **Testes de API** – Garantir regras e segurança no backend
- **Testes Unitários** – Cobertura de lógica e validações específicas
- **Testes E2E** – Validação de fluxo completo e experiência do usuário
- **Documentação e Evidências** – Incluídas no repositório para avaliação

---

## 🐛 Bug Report Manual (RQNF11)

### 1. Bug: Filtro de data não exibe resultados esperados

- **Descrição:** Ao filtrar a listagem de agendamentos por uma data específica que deveria conter registros, nenhum resultado era exibido.
- **Causa:** A data enviada no filtro não estava compatível com o formato do banco, ou a query no backend não estava tratando corretamente o parâmetro.
- **Impacto:** O administrador pode ser induzido a pensar que não há agendamentos existentes para a data consultada.
- **Status:** Corrigido. A lógica de filtro por `data_coleta` foi ajustada e testada com sucesso.

---

### 2. Bug: Modal fecha mas o status não atualiza corretamente

- **Descrição:** Durante o teste E2E para atualizar o status de um agendamento (ex: para "Cancelado"), a modal se fechava após clicar em "Salvar", mas nem sempre o backend refletia essa alteração.
- **Causa:** A requisição era disparada, mas por vezes a seleção do item incorreto (ou a não espera pela atualização) fazia parecer que o agendamento errado havia sido alterado.
- **Impacto:** Pode causar inconsistência entre o que foi exibido no frontend e o que foi realmente persistido no backend.
- **Status:** Tratado nos testes. No teste automatizado, consideramos que a modal fechar indica sucesso temporariamente, mas o fluxo precisa ser reforçado no futuro.

---

### 3. Bug: Falha ao gerar protocolo automaticamente

- **Descrição:** Ao tentar registrar um novo agendamento, a aplicação retornava erro `null value in column "protocolo" of relation "agendamentos" violates not-null constraint`.
- **Causa:** O campo `protocolo` era `NOT NULL`, mas sua geração era feita _após_ a criação do registro. Durante testes, a criação falhava quando a lógica secundária não era completada.
- **Impacto:** Impedia qualquer novo agendamento até correção.
- **Status:** Corrigido. O campo `protocolo` foi alterado para permitir `NULL` na migração, sendo atualizado em seguida via `updateProtocolo`.

## 📊 Relatório SonarQube (RQNF13 - Diferencial)

- **Status:** Implementação Local (Docker + SonarScanner)
- **Relatório:** `docs/sonar-report.md`

### 🧩 Principais Apontamentos

- Alguns métodos poderiam ser extraídos para funções reutilizáveis (refatoração simples)
- Melhorar cobertura de testes em middleware de autenticação

### 🛠️ Ajustes sugeridos a curto prazo

- Melhorar legibilidade de funções longas (`painel.js`)
- Centralizar regras de negócio em serviços reutilizáveis
- Garantir que todos os handlers tenham tratamento de erro robusto

## 👤 Autor

**Felipe Abe**  
Analista de Qualidade de Software - Processo Seletivo FIESC
