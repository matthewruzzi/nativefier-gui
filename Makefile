.PHONY: start clean

node_modules: package.json
	npm install

start: node_modules
	npm start

package-mac: node_modules
	npm run package-mac

clean: 
	npm run clean