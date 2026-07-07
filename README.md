# 幻兽帕鲁服务器配置生成器（简体中文）

一个纯前端的 `PalWorldSettings.ini` 配置生成器，面向《幻兽帕鲁》专用服务器管理员。页面基于官方 0.7.2 配置参数整理，支持中文说明、推荐模板、配置导入、科技禁用列表选择和 INI 下载。

## 功能

- 按“服务器管理 / 性能与据点 / 游戏倍率 / 玩家与帕鲁 / 玩法功能 / PvP 与死亡 / 高级参数”分组编辑。
- 实时生成完整 `PalWorldSettings.ini`。
- 支持导入已有 `PalWorldSettings.ini` 或 `OptionSettings=(...)`。
- 推荐模板：休闲探索、均衡 PvE、硬核生存、PvP 竞技、繁育、建造、性能优先、大社区、速通、低倍慢服、独狼友好、周末活动。
- 禁用科技列表可从官方 Technology IDs 中搜索并点击选择。
- 修改过的配置项会用醒目的琥珀色背景标出。
- 可复制完整 INI、仅复制 `OptionSettings` 或下载文件。

## 本地运行

项目不需要安装依赖，使用 Node.js 启动内置静态服务器即可：

```bash
npm start
```

默认访问：

```text
http://127.0.0.1:4173/
```

也可以部署到 GitHub Pages、Vercel、Netlify 等静态托管服务。

## 项目结构

```text
palworld-config-cn/
├─ index.html
├─ package.json
├─ README.md
├─ scripts/
│  └─ serve.mjs
└─ src/
   ├─ css/
   │  └─ styles.css
   └─ js/
      ├─ app.js
      └─ data/
         ├─ fields.js
         ├─ technologies.js
         └─ templates.js
```

## 数据来源

- 官方配置参数文档：<https://docs.palworldgame.com/settings-and-operation/configuration/>
- 官方 Technology IDs：<https://docs.palworldgame.com/settings-and-operation/technologyids>
- 推荐模板参考了常见服务器商和社区配置建议，并整理为适合中文使用者的一键预设。

## 注意

- 如果服务器存档目录中存在 `WorldOption.sav`，它可能会覆盖 `PalWorldSettings.ini` 中的世界设置。
- `PublicPort` 是社区服务器对外显示端口，不会改变服务器实际监听端口。
- 提高帕鲁刷新、据点数量、据点工作帕鲁数量、建筑上限等参数会增加服务器负载。

## 许可证

MIT
