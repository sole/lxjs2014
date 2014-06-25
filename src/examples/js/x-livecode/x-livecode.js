(function() {

	var proto = Object.create(HTMLElement.prototype);

	proto.createdCallback = function() {

		var that = this;
		var attr = this.attributes;
		
		// config
		var src = this.hasAttribute('src') ? attr.src.value : null;
		var hidecode = this.hasAttribute('hidecode');
		var autoexec = this.hasAttribute('autoexec');
		var appendControlsSelector = this.hasAttribute('appendcontrols') ? attr.appendcontrols.value : null;

		// layout
		var content = document.createElement('div');
		var divLive = document.createElement('div');
		var divEditor = document.createElement('div');

		var editor = document.createElement('x-editor');
		this._editor = editor;
		editor.setAttribute('src', src);
		divEditor.appendChild(editor);

		if(appendControlsSelector !== null) {
			var insertionPoint = document.querySelector(appendControlsSelector);
			
			var btnRun = document.createElement('button');
			btnRun.innerHTML = 'run';
			insertionPoint.appendChild(btnRun);
			btnRun.addEventListener('click', function() {
				that.runAll();
			});

			var btnCode = document.createElement('button');
			btnCode.innerHTML = 'edit';
			insertionPoint.appendChild(btnCode);
			btnCode.addEventListener('click', function() {
				that.toggleCode();
			});

		}

		// If we have children bring them to the new divLive layer
		while(this.firstChild) {
			var child = this.firstChild;
			divLive.appendChild(child);
		}

		
		// Now assemble the tree of divs hanging out of content
		content.appendChild(divLive);
		divLive.className = 'live';
		content.appendChild(divEditor);
		divEditor.className = 'editor';

		this._divEditor = divEditor;

		// Hide the code initially if required so it doesn't flash (?)
		if(hidecode) {
			divEditor.classList.add('hidden');
		}

		// Finally append the whole thing
		this.appendChild(content);

		if(autoexec) {
			// XXX use a real callback instead of... this thing.
			setTimeout(function() {
				that.runAll();
			}, 100);
		}
	};


	proto.toggleCode = function() {
		this._divEditor.classList.toggle('hidden');
	};

	proto.runAll = function() {
		this._editor.runAllCode();
	};


	document.registerElement('x-livecode', {
		prototype: proto
	});

})();
