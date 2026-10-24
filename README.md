# TVmaze Explorer

Aplicativo móvel desenvolvido com React Native e Expo para explorar séries e seus episódios usando a API pública TVmaze. A interface apresenta uma listagem em cartões e uma tela de episódios com temporada, número e título.

## Recursos

- Navegação entre listagem e detalhes com React Navigation Native Stack.
- Séries e episódios obtidos com `fetch`, `async/await` e `useEffect`.
- Estado de carregamento, erros de rede/API e listas vazias tratados nas telas.
- Imagens ausentes tratadas com imagem substituta.
- Layout em português, adaptado a telas móveis.

## Requisitos

- Node.js LTS e npm.
- Expo Go em um celular ou um emulador Android/iOS configurado.

## Como executar

1. Extraia o ZIP e abra um terminal na pasta `tvmaze-expo`.
2. Instale as dependências: `npm install`.
3. Inicie o Expo: `npx expo start`.
4. Leia o QR code com o Expo Go ou pressione `a` para abrir no emulador Android. Para iOS, pressione `i` em um Mac com simulador configurado.

Também é possível executar no navegador com `npm run web`.

## Estrutura

```text
.
├── App.js
├── app.json
├── index.js
├── src/
│   └── screens/
│       ├── EpisodesScreen.js
│       └── ShowsScreen.js
├── package.json
└── README.md
```

## API

- Séries: https://api.tvmaze.com/shows
- Episódios: https://api.tvmaze.com/shows/{id}/episodes

O identificador é encaminhado à tela de episódios por `route.params`.

## Capturas de tela para entrega

As imagens devem ser capturadas com o aplicativo realmente aberto, sem simulações. Com o Expo Go ou emulador rodando:

1. Na listagem, aguarde os cartões aparecerem e faça uma captura de tela do dispositivo.
2. Toque em uma série, aguarde os episódios carregarem e capture a tela de detalhes.
3. Salve as imagens na pasta `screenshots/` (por exemplo, `shows.png` e `episodes.png`) e anexe-as junto ao link do repositório no Teams.

Este pacote não inclui prints de execução. Neste ambiente não foi possível confirmar a execução visual em emulador ou dispositivo.

## GitHub

O `.gitignore` exclui `node_modules`, `.expo`, saídas web e arquivos locais. Para publicar, crie um repositório público, faça o commit dos arquivos deste projeto e envie o link junto das duas capturas reais.
