# AON-UI

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/makes-people-smile.svg)](https://forthebadge.com)

本專案為 [AON](https://github.com/RemakeAONTeam/AON) 的 UI 開發，專案需在 Unreal Engine 4 中載入。  

## Installation

```bash
git clone https://github.com/RemakeAONTeam/AON-UI.git
```

```bash
yarn install
```

如果你的 `src` 目錄中沒有 `buff` 以及 `skill`，請建立資料夾。 
```
mkdir src\buff src\skill
```

或者你可以到 [AON/UI](https://github.com/RemakeAONTeam/AON/tree/master/UI) 下載圖片資源.


## Usage

本地環境啟動 [http://localhost:8000](http://localhost:8000).

```bash
yarn start
```

## Build

```bash
yarn build
```

## Design Pattern

- 請勿使用 `button`
- 所有圖片請使用 `backgroundImage`, 避免有拖曳問題

## License

AON-UI is BSD licensed. See [LICENSE](https://github.com/RemakeAONTeam/AON-UI/blob/master/LICENSE).

## Join Us

<a href="https://www.patreon.com/nobu_game/posts">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## Contributing

本專案使用 React.js 框架，非常歡迎任何貢獻，如果您對該遊戲有興趣，也歡迎加入我們。

### Stylelint

本專案語法風格依循 `stylelint`， 請在您 PR 之前，安裝以下相關套件，並且通過語法檢測 😇。

- [stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)
- [vscode-stylefmt](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-stylefmt)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

```bash
nmp run lint
```
