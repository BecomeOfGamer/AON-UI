# AON-UI

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://github.com/GitbookIO/gitbook-cli)
[![forthebadge](https://forthebadge.com/images/badges/makes-people-smile.svg)](https://www.facebook.com/Remake.AON/)

本專案為 [AON](https://github.com/RemakeAONTeam/AON) 的 UI 開發，專案需在 Unreal Engine 4 中載入。  

## Installation

```bash
git clone https://github.com/RemakeAONTeam/AON-UI.git
```

```bash
yarn install
```

## Usage

```bash
yarn start
```

## Build

```bash
yarn build
```

## Log

#### 2018-06-08

- `click event` 會有不明失效問題 ( `lose focus` ) , 似乎是因為 UE4 對於滑鼠座標的轉換異常。

## Design Pattern

- 請勿使用 `button`
- 所有圖片請使用 `backgroundImage`, 避免有拖曳問題

## License

AON-UI is BSD licensed. See [LICENSE](https://github.com/RemakeAONTeam/AON-UI/blob/master/LICENSE).

## Contributing to AON

<a href="https://www.patreon.com/nobu_game/posts">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>
