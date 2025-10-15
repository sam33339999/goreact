//go:build !production

package main

import (
	"log"
	"net/http"

	"github.com/petaki/inertia-go"
)

var inertiaManager = inertia.New(url, rootDevTemplate, version)

func main() {
	log.Println("[Bootstrap] Development mode")
	mux := register()
	log.Println("[Start] service on http://localhost:8090")
	http.ListenAndServe("localhost:8090", mux)
}
