package main

import "net/http"

const url = "http://inertia-app.test"        // Application URL for redirect
const rootDevTemplate = "./app.dev.gohtml"   // Root template, see the example below
const rootProdTemplate = "./app.prod.gohtml" // Root template, see the example below
const version = ""                           // Asset version

func register() *http.ServeMux {
	mux := http.NewServeMux()
	mux.Handle("/", inertiaManager.Middleware(http.HandlerFunc(homeHandler)))
	mux.Handle("/member", inertiaManager.Middleware(http.HandlerFunc(memberHandler)))
	return mux
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	props := map[string]interface{}{
		"name": "GoLang Inertia StartKit !",
	}

	err := inertiaManager.Render(w, r, "Pages/Index", props)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func memberHandler(w http.ResponseWriter, r *http.Request) {
	props := map[string]interface{}{
		"name": "Member",
	}

	err := inertiaManager.Render(w, r, "Pages/Member/Index", props)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
