.PHONY: init dev

init:
	@echo "[initialized] init ..."
	@npm i

dev:
	@echo "[development] dev ..."
	@npx concurrently -c "#93c5fd,#fdba74" "go run -tags development ./cmd/web" "npm run dev" --names=server,front 
	
build:
	@echo "[build] build ..."
	@npm run build
	@go build -tags production -o app ./cmd/web
	@echo "[Success] build app: ./app"
