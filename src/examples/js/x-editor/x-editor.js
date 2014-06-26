(function() {

	// MAGIC!
	function trimInitialTabs(str) {
		var tabsRe = /(\t*)/;
		var tabsMatches = tabsRe.exec(str);
		var numInitialTabs = 0;
		if(tabsMatches && tabsMatches[1]) {
			numInitialTabs = tabsMatches[1].length;
		}
		var replacementRe = new RegExp('^\t{' + numInitialTabs + '}');
		var lines = str.split('\n').map(function(line) {
			return line.replace(replacementRe, '');
		});
		return lines.join('\n');
	}

	var execute = (function makeEval() {
		var cheatyEval = eval;
		return function (str) {
			cheatyEval(str);
		};
	})();


	var proto = Object.create(HTMLElement.prototype);

	proto.createdCallback = function() {
		
		this.cm = null;

		this.addEventListener('keydown', function(e) {
			if(e.metaKey && (e.key === 'e' || e.keyCode === 69)) {
				this.runCode();
				e.preventDefault();
			}
		}, false);
	};


	proto.attachedCallback = function() {
		var codeSrc;
		
		if(this.attributes.src) {
			codeSrc = this.attributes.src.value;
		}
		
		if(codeSrc === undefined) {
			this.onCodeLoaded('// No src specified');
		} else {
			this.loadCode(codeSrc);
		}

	};

	proto.loadCode = function(url) {
		var request = new XMLHttpRequest();
		var that = this;
		request.open('get', url, true);
		request.responseType = 'text';
		request.onload = function() {
			that.onCodeLoaded(request.response);
		};
		request.onerror = function() {
			that.onCodeLoaded('// ERROR loading ' + url);
		};
		request.send();
	};

	proto.onCodeLoaded = function(code) {
		var that = this;
		var ta = document.createElement('textarea');
		this.innerHTML = '';
		this.appendChild(ta);
		
		var codeValue = trimInitialTabs(code).trimRight();
		var cm = CodeMirror(function(el) {
				that.replaceChild(el, ta);
			}, {
				value: codeValue,
				lineWrapping: true,
				lineNumbers: true,
				styleActiveLine: true,
				matchBrackets: true,
				showTrailingSpace: true,
			}
		);
		this.cm = cm;

		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent('loaded', false, false, {});
		this.dispatchEvent(evt);

	};

	proto.runCode = function() {

		if(!this.cm) {
			console.log('nothing to run!');
			return;
		}
		var code = this.cm.getSelection().trim();

		// Ah, but nothing's selected, so we'll find where the cursor is
		// and execute that line only
		if(code.length === 0) {
			var cursor = this.cm.getCursor();
			code = this.cm.getLine(cursor.line);
		}

		execute(code);

	};

	proto.runAllCode = function() {
		var code = this.cm.getValue();
		execute(code);
	};

	document.registerElement('x-editor', {
		prototype: proto
	});

})();
