publish:
	npm publish --dry-run
lint:	
	npx eslint --fix .
test:
	npx jest
test-coverage:
	npx jest --coverage