## Histórias Atendidas

### 1. Estatísticas por jogo

**Descrição:**
Implementei o parser de logs que processa eventos do Quake e gera as estatísticas completas de cada partida.

**Como foi feito:**

* Identificação de eventos de início/fim de jogo (`InitGame` / `ShutdownGame`)
* Captura de eventos de kill com identificação do assassino, vítima e causa (`Kill:`)
* Mapeamento de nomes de jogadores via `ClientUserinfoChanged`
* Aplicação das regras de pontuação (1 ponto por kill, -1 ponto por mortes causadas pelo `<world>`)

---

### 2. Ranking dos jogadores por partida

**Descrição:**
Implementei uma API que retorna o ranking final dos jogadores com base nas regras fornecidas.

**Como foi feito:**

* Implementação de um modelo `Game` com gerenciamento de jogadores, kills e pontuações
* Cálculo final da pontuação ao final de cada jogo, ignorando `<world>` e respeitando o nome atual do jogador
* Exposição via endpoint REST `/api/player/rank/games`

---

### 3. Consulta de estatísticas via API

**Descrição:**
Usuários podem consultar as estatísticas de todos os jogos ou um jogo específico via HTTP.

**Como foi feito:**

* Criação de endpoints REST:

  * `GET /api/admin/log/game` → Todos os jogos
  * `GET /api/admin/log/game/:gameId` → Jogo específico
* Implementação do método `parseByID` para carregar apenas um jogo específico
* Documentação interativa via Swagger (`/api-docs`)

---

## O que eu adicionaria com mais tempo

* Testes unitários e de integração com Jest
* Painel Web (Next.js ou Vite + React) para exibir estatísticas em tempo real
* Autenticação básica nos endpoints administrativos
* Geração de gráficos (ex: kills por segundo, ranking dinâmico)

---

## O que eu faria diferente com mais tempo

* Refatoraria o `LogParser` para torná-lo mais orientado a eventos ou streams
* Modularizaria ainda mais as regras de negócio em Services ou UseCases específicos
* Implementaria testes TDD desde o início para garantir cobertura e refatoração segura
* Consideraria usar ferramentas como NestJS ou Zod para validação de dados, caso o escopo fosse maior

---