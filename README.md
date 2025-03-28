# Jogo Educacional de Educação Financeira - **Colheita Financeira**

Este projeto faz parte de um projeto de extensão da faculdade chamado **USO DA INTELIGÊNCIA ARTIFICIAL EM APLICAÇÕES COMPUTACIONAIS**. O objetivo do projeto é aplicar técnicas de inteligência artificial em aplicações computacionais para auxiliar estudantes com deficiência intelectual (DI). As aplicações desenvolvidas são testadas e disponibilizadas para uma instituição parceira chamada **ASSARTE**.

<p align="center">
  <img src="https://github.com/user-attachments/assets/140520fd-ec52-46c7-9b73-bc34a29445f7" alt="Tela Principal do Jogo" width="600"/>
</p>

<p align="center">
  <em>Figura 1: Tela principal do jogo</em>
</p>

---

## Artigos Científicos

Este projeto já resultou na publicação de um artigo científico e outros dois estão em desenvolvimento.

- **Publicado**  
  [Jogos Educacionais Relacionados à Educação Financeira que Utilizam Técnicas de Inteligência Artificial Para Pessoas com Deficiência Intelectual: Uma Pesquisa na Literatura](https://www.even3.com.br/anais/seisicite2024/959937-jogos-educacionais-relacionados-a-educacao-financeira-que-utilizam-tecnicas-de-inteligencia-artificial-para-pesso/)  
  Este artigo foi produzido na etapa inicial do projeto, durante o processo de pesquisa e planejamento do jogo. Ele apresenta uma revisão de literatura sobre jogos educacionais voltados para a educação financeira, com o objetivo de identificar se tais jogos fazem uso de técnicas de inteligência artificial. O estudo ajudou a embasar o desenvolvimento da proposta atual do jogo.

- **Em Desenvolvimento**  
  **1.** *Desenvolvimento de um jogo educacional de educação financeira com aplicação de Inteligência Artificial*  
  Este artigo aprofundará as etapas de desenvolvimento do jogo, com foco na integração da aprendizagem por reforço (Q-learning), bem como nas decisões relacionadas ao design acessível para pessoas com deficiência intelectual.

  **2.** *Jogos educacionais para pessoas com deficiência intelectual: estudos de caso, aplicação e resultados*  
  Este artigo trará uma análise dos testes realizados na instituição parceira ASSARTE, com foco na experiência dos alunos, na usabilidade, e nos resultados obtidos com a utilização do jogo como ferramenta de apoio educacional.

---

## Descrição do Jogo

O jogo tem como objetivo ensinar conceitos de educação financeira de forma acessível e divertida para pessoas com deficiência intelectual. A temática do jogo envolve a gestão de recursos, o valor do tempo no dinheiro e a recompensa por acúmulo e poupança. A mecânica do jogo é baseada em simular uma plantação onde o jogador precisa comprar sementes, plantar, regar, cuidar do solo e colher suas plantas.

### Características de Acessibilidade

O jogo foi desenvolvido com foco em tornar a experiência mais acessível para pessoas com deficiência intelectual, utilizando as seguintes características:

- **Textos curtos e em caixa alta** para facilitar a leitura.
- **Opção de ouvir todos os textos exibidos no jogo**.
- **Botões grandes**, reduzindo a necessidade de precisão nos comandos.
- **Ausência de opções e eventos que possam desviar a atenção ou confundir o jogador**, proporcionando uma experiência clara e objetiva.

Ao iniciar o jogo, um breve tutorial é apresentado ao usuário, e é possível visualizar as instruções novamente a qualquer momento durante a partida.

## Mecânica do Jogo

O jogo simula uma plantação onde o jogador pode:

- **Comprar sementes**.
- **Plantar** e **regar** as plantas.
- **Cuidar do solo**, removendo **ervas daninhas**.
- **Colher as plantas** e ganhar recompensas.

O jogador começa com R$300 e deve usar esse valor para adquirir as sementes. São 6 tipos de sementes disponíveis: trigo, tomate, cenoura, alface, beterraba e abóbora. A cada planta colhida, o valor da recompensa é somado ao saldo de dinheiro do jogador. Para incentivar o acúmulo de dinheiro, o jogador recebe um bônus de R$50 cada vez que atingir um múltiplo de 500 em seu saldo.

### Fatores que Impactam a Recompensa

- **Tempo de rega**: O tempo em que a planta permanece sem ser regada impacta a recompensa.
- **Controle das ervas daninhas**: O jogador deve remover as ervas daninhas, pois elas afetam a recompensa final.

## Implementação

O jogo foi desenvolvido para ambientes web utilizando as seguintes tecnologias:

- **HTML**
- **CSS** 
- **JavaScript**

A arte do jogo foi criada utilizando ferramentas de pixel art como **TILED** e **PISKEL**, que permitiram o desenvolvimento do cenário, botões, animações e ícones.

---

## Inteligência Artificial e Sistema de Recompensas

O jogo utiliza uma técnica de **Aprendizagem por Reforço**, implementada com o algoritmo **Q-Learning**, para calcular a recompensa que o jogador recebe ao colher cada planta.

### Como funciona o Q-Learning no jogo?

- **Cada área de plantio é tratada como um agente independente**.  
  Isso significa que a **tabela Q** (Q-Table) de uma área não interfere nos resultados das demais. Cada área aprende e calcula sua própria recompensa com base no seu estado individual.

- **Definição do estado de cada área de plantio**:  
  O estado de uma área é determinado por:
  - O **tempo sem regar** (a partir do momento em que a semente foi plantada).
  - O **tempo que uma erva daninha permaneceu** naquela área.

### Fórmula de atualização do Q-Learning

A recompensa recebida na colheita é definida com base no valor atualizado na Q-Table do agente. O algoritmo segue a fórmula padrão de Q-Learning:

*Q(s, a) = Q(s, a) + α [R + γ * maxQ(s', a') - Q(s, a)]*

- `s`: estado atual.  
- `a`: ação realizada (colher a planta).  
- `α`: taxa de aprendizado (learning rate).  
- `γ`: fator de desconto (discount factor).  
- `R`: recompensa imediata recebida pela ação.  
- `maxQ(s', a')`: valor máximo de Q no próximo estado.

> A **recompensa (R)** é calculada considerando o estado da planta no momento da colheita. Quanto melhor o cuidado (regas frequentes e remoção rápida de ervas daninhas), maior a recompensa.

---

### Influência dos Estados no Crescimento de Ervas Daninhas

Além de impactar a recompensa na colheita, o **estado de cada área de plantio** influencia diretamente o surgimento de **ervas daninhas**:

1. Ao ser necessário decidir **onde** uma erva daninha irá crescer:
   - O algoritmo analisa o estado atual de **todas as áreas de plantio**.
   - A **área disponível** (ou seja, sem semente plantada) com o **maior estado** (indicando que é a menos cuidada) será a escolhida para o crescimento da próxima erva daninha.

2. Quando uma área é afetada por uma erva daninha:
   - A **área adjacente** (ao lado) recebe um aumento de **+4** no seu estado.
   - Isso aumenta as chances dessa nova área ser a próxima a ser invadida pela erva daninha, caso o jogador não tome providências.

---

### Objetivo da IA no Ensino de Educação Financeira

A IA com Q-Learning foi implementada com o propósito de tornar o **valor das recompensas dinâmico**, reforçando o aprendizado de conceitos como:

- **Esforço e retorno proporcional**: quanto mais atenção e cuidado o jogador tiver com sua plantação, maior será o retorno financeiro (recompensa).
- **Gestão de recursos e planejamento**: o jogador precisa planejar quando e onde investir seu tempo e dinheiro para maximizar suas colheitas.
- **Impacto de escolhas e ações a longo prazo**: decisões negligentes impactam não apenas a recompensa imediata, mas também as condições futuras da plantação.

---

### Melhorias Futuras

Embora o jogo já esteja em uma versão funcional, ainda há diversas melhorias e ajustes planejados para as próximas versões. Algumas delas incluem:

- **Configurações de Áudio**  
  Adicionar sons e trilhas sonoras para enriquecer a experiência do usuário, incluindo efeitos sonoros para ações como plantar, regar, colher e remover ervas daninhas.

- **Adição de Textos e Feedbacks Visuais**  
  Complementar os textos de instruções e informações no jogo, garantindo clareza nas ações. Também estão previstas notificações para lembrar o usuário de regar as plantas e retirar as ervas daninhas das áreas de plantio.

- **Sistema de Fim de Jogo e Reinício**  
  Implementar uma mensagem de aviso quando o usuário ficar sem dinheiro e sem sementes para plantar, indicando o "fim de jogo". O jogador poderá recomeçar quantas vezes desejar, garantindo a continuidade da experiência de aprendizado.

- **Melhorias Visuais**  
  Apesar do visual atual estar satisfatório, há planos de aprimorar ainda mais a estética do jogo, tornando-o mais atrativo e imersivo para os usuários.

- **Aprimoramento da Interação com Itens**  
  Refinar a interação com os itens como o regador e o herbicida, garantindo que a troca de ícones do cursor seja mais intuitiva e evitando possíveis colisões ou falhas durante a utilização das ferramentas.

- **Testes com Usuários na Instituição Parceira (ASSARTE)**  
  Serão realizados testes práticos com os alunos da instituição para avaliar a funcionalidade do jogo. Esses testes vão ajudar a identificar ajustes necessários, como o tempo de crescimento das sementes, o valor inicial em dinheiro, e outros aspectos da mecânica que possam melhorar a experiência de jogo.

- **Exploração de Novas Tecnologias**  
  No futuro, pretende-se utilizar outras linguagens de programação e ferramentas para aprimorar ainda mais o jogo, tornando-o mais robusto e profissional. Este é um projeto que se pretende levar adiante, sempre buscando melhorias.

- **Aprimoramento da Inteligência Artificial**  
  também está previsto um refinamento na IA de cálculo de recompensas, para que ela considere o tipo específico de semente. Dessa forma, o valor de compra e a recompensa de cada semente poderão ser diferentes, proporcionando uma dinâmica de jogo mais realista e desafiadora. Atualmente, todas as sementes possuem o mesmo valor de compra e base de recompensa.
