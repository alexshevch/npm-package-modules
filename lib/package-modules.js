/**
 * Generate list of dependencies for package.json from node_modules folder
 *
 * @author Oleksii Shevchenko <shevaroller@gmail.com> (http://shevaroller.me)
 * @since  13 February 2016
 */

var fs = require('fs');
var path = require('path');

var packageModules;

packageModules = function() {
	var args = process.argv.slice(2);

	// command line arguments processing
	if (args.length == 0) {
		//run for current folder with default options
		generate('./node_modules/', './package-dependencies.json', []);
	}
	else if (args[0] == "help" || args[0] == "-h" || args[0] == "--help") {
		console.log("Usage:\n" +
			"package-modules <path-to-folder> <path-to-package.json>");
	}

	else if (args.length == 1) {
		generate(args[0], './package-dependencies.json', []);
	}
	else {
		generate(args[0], args[1], args.splice(2));
	}

	/**
	 *	function generate processes all folders inside specified folder 
	 *	and exports names into specified json file that has npm package structure
	 */
	function generate(folderPath, packageFile, options) {
	fs.access(folderPath, fs.F_OK, function(err) {
		if (err) {
			// folder is not accessible
			throw err;
		} else {
			// process folder contents
			modules = getDirs(folderPath);
			/*packageContents = {
				dependencies: {}
			}
			for (var i = 0; i < modules.length; i++) {
				packageContents.dependencies[modules[i]] = "latest";
			}
			console.log(packageContents);*/
			fs.writeFileSync(packageFile,
				'{\n"dependencies": {\n\t"' +
				modules.join('": "latest",\n\t"') +
				'": "latest"\n\t}\n}',
				'utf-8');
			console.log("Your json file with the list of package dependencies was succesfully generated.\n" +
				"File name: " + packageFile);
		}
	});
	}

	/*
	 *	function getDirs takes path to a folder in string format
	 *	returns list of directories in a specified directory
	 */
	function getDirs(folderPath) {
	  return fs.readdirSync(folderPath).filter(function(file) {
	    return fs.statSync(path.join(folderPath, file)).isDirectory();
	  });
	}
};

/**
 * Exports Module packageModules
 */
module.exports = packageModules;