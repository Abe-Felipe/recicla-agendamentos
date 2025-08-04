# Plano de Testes - Sistema de Agendamento de Coletas

## 1. Objetivo

Validar completamente as funcionalidades, regras de negócio, integrações e experiência do usuário do sistema de agendamento, com foco em qualidade, robustez e cobertura de testes exigidas na vaga de QA Júnior da FIESC.

---

## 2. Escopo dos Testes

## 2.1 Funcionalidades Obrigatórias

- **RF001:** Solicitar Agendamento de Coleta
- **RF002:** Autenticação de Usuários (Admin)
- **RF003:** Armazenar e Listar Agendamentos
- **RF004:** Detalhar Agendamento em Modal
- **RF005:** Atualizar Status da Coleta

## 2.2 Regras de Negócio Críticas

- **RN001.2:** Data mínima de 2 dias úteis para coleta
- **RN001.4:** Campos obrigatórios validados no frontend e backend
- **RN002.2:** Endpoints protegidos com JWT
- **RN005.3:** Justificativa obrigatória para "Concluído" e "Cancelado"

## 2.3 Requisitos Não Funcionais

- **RQNF2:** 10 testes unitários implementados com Jest
- **RQNF5:** 1+ teste de API com Cypress (incluindo autenticação, criação, listagem, atualização)
- **RQNF6:** Testes E2E automatizados com Cypress cobrindo fluxos principais

---

## 3. Estratégia de Testes

## 3.1 Pirâmide de Testes Aplicada

- **Topo:** Testes E2E com Cypress cobrindo o fluxo completo do usuário
- **Meio:** Testes de API com Cypress
- **Base:** Testes Unitários com Jest

## 3.2 Tipos de Teste

## 3.2.1 Testes Unitários (Jest)

Regras de negócio isoladas e validadas com cobertura:

- Validação de datas com dias úteis
- Geração e formato de protocolo único
- Obrigatoriedade de justificativa
- Casos de borda de status inválidos

**Cobertura funcional e lógica crítica**

### 3.2.2 Testes de API (Cypress via backend isolado)

Testes diretos aos endpoints REST:

- POST /api/agendamentos → valida campos obrigatórios
- POST /api/auth/login → valida token JWT
- GET /api/agendamentos → exige token válido
- PATCH /api/agendamentos/:id/status → valida justificativas

**Todos os endpoints principais validados com códigos HTTP apropriados**

### 3.2.3 Testes E2E (Cypress)

Simulação real dos fluxos principais:

- Login do administrador (válido e inválido)
- Listagem de agendamentos
- Filtragem por data e status
- Abertura da modal de gestão
- Alteração de status com e sem justificativa
- Redirecionamento ao login sem token
- Persistência dos filtros
- Fluxo completo do formulário de agendamento (campo a campo)

**Testes end-to-end robustos com foco em usabilidade e fluxo real do usuário**

---

## 4. Priorização

- Testes de API
- Testes Unitários (regras críticas)
- Testes E2E
- Documentação

---

## 5. Ambiente de Testes

- **Banco:** PostgreSQL (Docker)
- **API:** Node.js + Express
- **Frontend:** HTML/CSS/JS servidos via NGINX (Docker)
- **Auth:** JWT com expiração e proteção
- **Testes Automatizados:** Cypress (E2E/API) + Jest (Unitário)

---

## 6. Ferramentas Utilizadas

- `Jest` → Testes unitários e cobertura
- `Cypress` → E2E e API
- `Supertest` → Apoio nos testes de integração (parcial)
- `Docker` + `Docker Compose` → Isolamento
- `SonarQube` → Análise estática
- `Markdown` → Documentação

---

## 7. Entregáveis e Critérios de Aceitação

- Sistema funcional
- Suite de testes completa (unit, API, E2E)
- Cobertura de testes para regras de negócio
- Documentações: Gherkin, README, Plano de Testes
- Análise SonarQube
- Projeto "Dockerizado"
