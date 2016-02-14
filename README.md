# npm-package-modules
Generate list of dependencies for package.json from node_modules folder

## Installation
	npm install -g package-modules

## Usage
To create a default json file with dependencies in current directory using contents of node_modules in current directory:

	$ package-modules
To create a default json file with dependencies in current directory using contents of `<specified-dir>`:

	$ package-modules <specified-dir>
To create `<specified-file>` json file with dependencies using contents of `<specified-dir>`:

	$ package-modules <specified-dir> <specified-file>

## License

MIT