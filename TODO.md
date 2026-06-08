# TODO — Home Widgets Customizáveis

- [ ] Atualizar `UNTR/index.html` para transformar a Home em um layout editável de widgets
- [ ] Criar estrutura de dados em `state` para persistir widgets da Home (lista: id, type, size, ordem)
- [ ] Ajustar `loadUserState()` / `saveAll()` para salvar/carregar o layout dos widgets da Home
- [ ] Refatorar `buildHomeWidgets()` para **renderizar pelo layout do usuário** (não por ordem fixa)
- [ ] Implementar UI do widget: remover, aumentar/diminuir tamanho
- [ ] Implementar drag & drop no grid da Home para reordenar widgets (modo 1: reordenar no grid)
- [ ] Implementar “+ Criar widget” / “+ Widget” (seleção de templates existentes + possibilidade de widget novo simples)
- [ ] Garantir que ações existentes (ex: adicionar hábito) não re-renderizem tudo quebrando layout (apenas atualizar o widget correspondente)
- [ ] Testar: login, salvar, recarregar página, mover widgets, remover/adicionar, ajustar tamanho

