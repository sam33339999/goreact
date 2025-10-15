# GoReact - Go + React + Inertia.js 起始專案

一個整合 Go 後端與 React 前端的現代化 Web 應用程式起始模板，使用 Inertia.js 實現 SPA 體驗。

## 技術棧

**後端**
- Go 1.25.1
- [Inertia.js Go Adapter](https://github.com/petaki/inertia-go)
- 原生 `net/http` 路由

**前端**
- React 18.3
- Inertia.js React Adapter
- Vite 7.1 (建置工具)
- TailwindCSS 4.1 (樣式框架)

## 特色

- **SPA 體驗** - 使用 Inertia.js 實現無需 API 的單頁應用
- **熱重載開發** - 前後端同步開發模式
- **現代化工具鏈** - Vite + TailwindCSS 快速建置
- **TypeScript 友善** - 架構支援 TypeScript 擴充
- **開發/生產分離** - 條件編譯支援不同環境

## 前置需求

- Go 1.25+
- Node.js 23
- npm

## 快速開始

### 1. 安裝依賴

```bash
make init
```

### 2. 啟動開發伺服器

```bash
make dev
```

應用程式將在以下位置運行：
- 後端伺服器: `http://localhost:8090`
- Vite 開發伺服器: `http://localhost:5173`

### 3. 生產建置

```bash
make build
```

執行檔案將產生於 `./app`

## 專案結構

```
.
├── cmd/web/              # Go 應用程式進入點
│   ├── main_dev.go       # 開發模式
│   ├── main_prod.go      # 生產模式
│   ├── common.go         # 共用邏輯與路由
│   └── dist/             # 前端建置輸出
├── frontend/             # React 前端原始碼
│   ├── app.jsx           # Inertia 應用程式進入點
│   ├── css/              # 樣式檔案
│   ├── Layouts/          # 共用版型
│   └── Pages/            # 頁面元件
│       ├── Index.jsx     # 首頁
│       └── Member/       # 會員頁面
├── app.dev.gohtml        # 開發模式 HTML 模板
├── app.prod.gohtml       # 生產模式 HTML 模板
├── vite.config.js        # Vite 設定
├── Makefile              # 建置指令
├── go.mod                # Go 依賴管理
└── package.json          # Node 依賴管理
```

## 運作原理

### Inertia.js 工作流程

1. **Go 路由處理請求** - HTTP 請求由 Go 伺服器接收
2. **渲染 Inertia 回應** - 伺服器準備 props 並透過 Inertia 渲染
3. **前端元件接收** - React 元件接收 props 並渲染
4. **SPA 導航** - 後續導航透過 AJAX 更新，無需重新載入頁面

### 開發模式 vs 生產模式

**開發模式** (`make dev`)
- Go 使用 `-tags development` 編譯
- 前端透過 Vite 開發伺服器提供 (HMR)
- 模板引用 `http://localhost:5173` 的資源

**生產模式** (`make build`)
- Go 使用 `-tags production` 編譯
- 前端建置至 `cmd/web/dist/`
- 模板引用靜態資源檔案

## 可用指令

| 指令 | 說明 |
|------|------|
| `make init` | 安裝 Node.js 依賴 |
| `make dev` | 啟動開發伺服器（前後端同時） |
| `make build` | 建置生產版本 |
| `npm run build` | 僅建置前端資源 |

## 新增頁面

### 1. 建立 React 元件

```jsx
// frontend/Pages/About.jsx
export default function About({ name }) {
  return (
    <div>
      <h1>關於 {name}</h1>
    </div>
  );
}
```

### 2. 新增 Go 路由處理器

```go
// cmd/web/common.go
func aboutHandler(w http.ResponseWriter, r *http.Request) {
  props := map[string]interface{}{
    "name": "我的應用程式",
  }

  err := inertiaManager.Render(w, r, "Pages/About", props)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
  }
}

// 在 register() 函式中註冊路由
mux.Handle("/about", inertiaManager.Middleware(http.HandlerFunc(aboutHandler)))
```

## 樣式自訂

專案使用 TailwindCSS 4.1，可在以下位置自訂：

- `frontend/css/app.css` - 全域樣式與 Tailwind 設定
- 元件內使用 Tailwind utility classes

## 授權

ISC

## 貢獻

歡迎提交 Issue 和 Pull Request！

---

**Note**: 記得修改 `cmd/web/common.go` 中的 `url` 常數以符合你的應用程式域名。
