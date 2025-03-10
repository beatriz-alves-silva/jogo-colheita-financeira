# Jogo Educacional de Educação Financeira - **Colheita Financeira**

Este projeto faz parte de um projeto de extensão da faculdade chamado **USO DA INTELIGÊNCIA ARTIFICIAL EM APLICAÇÕES COMPUTACIONAIS**. O objetivo do projeto é aplicar técnicas de inteligência artificial em aplicações computacionais para auxiliar estudantes com deficiência intelectual (DI). As aplicações desenvolvidas são testadas e disponibilizadas para uma instituição parceira chamada **ASSARTE**.

## Artigo Científico

Um artigo científico sobre o desenvolvimento do jogo foi publicado, e pode ser acessado [aqui]([link_do_artigo](https://www.even3.com.br/anais/seisicite2024/959937-jogos-educacionais-relacionados-a-educacao-financeira-que-utilizam-tecnicas-de-inteligencia-artificial-para-pesso)).

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

- **HTML** (HyperText Markup Language)
- **CSS** (Cascading Style Sheets)
- **JavaScript**

A arte do jogo foi criada utilizando ferramentas de pixel art como **TILED** e **PISKEL**, que permitiram o desenvolvimento do cenário, botões, animações e ícones.

### Inteligência Artificial

A função de cálculo da recompensa do jogador foi implementada utilizando a técnica de **aprendizagem por reforço**, com o algoritmo **Q-learning**. Cada área de plantio opera de forma independente para determinar a recompensa correspondente, levando em consideração o tempo sem regar e a presença de ervas daninhas.

