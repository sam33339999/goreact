//go:build production

package main

import (
	"embed"
	"encoding/json"
	"io/fs"
	"log"
	"net/http"

	"github.com/petaki/inertia-go"
)

//go:embed dist/*
var distFS embed.FS
var inertiaManager *inertia.Inertia = nil

type ManifestEntry struct {
	File string `json:"file"`
}

var manifest map[string]ManifestEntry

// 自動讀取 - golang 自動加載
func init() {
	log.Printf("[Initialize] Read manifest.json")
	// 讀取 Vite manifest.json
	manifestData, err := distFS.ReadFile("dist/.vite/manifest.json")
	inertiaManager = inertia.NewWithFS(url, "dist/app.prod.gohtml", version, distFS)

	if err != nil {
		log.Printf("Warning: failed to read manifest.json: %v", err)
		manifest = make(map[string]ManifestEntry)
		return
	}

	if err := json.Unmarshal(manifestData, &manifest); err != nil {
		log.Printf("Warning: failed to parse manifest.json: %v", err)
		manifest = make(map[string]ManifestEntry)
	}
}

func main() {
	inertiaManager.ShareFunc("asset", asset)

	log.Println("[Bootstrap] Production mode")
	mux := register()

	distSubFS, _ := fs.Sub(distFS, "dist") // 去除一層。避免 /dist/dist/assets/... .js
	mux.Handle("/dist/", http.StripPrefix("/dist/", http.FileServer(http.FS(distSubFS))))

	log.Println("[Start] service on http://localhost:8090")
	http.ListenAndServe("0.0.0.0:8090", mux)
}

func asset(path string) string {
	// fmt.Printf("asset: %+v\n", manifest)
	// fmt.Println("asset: ", path)

	// 從 manifest 中查找真正的文件路徑
	if entry, ok := manifest[path]; ok {
		return "/dist/" + entry.File
	}
	// fallback: 如果 manifest 中找不到，使用原始路徑
	return "/dist/assets/" + path
}
