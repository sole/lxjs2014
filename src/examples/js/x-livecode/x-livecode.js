(function() {

	var proto = Object.create(HTMLElement.prototype);

	// attributes: src, autoexec, appendcontrols
	proto.createdCallback = function() {

		var attr = this.attributes;
		
		// config
		var src = this.hasAttribute('src') ? attr.src.value : null;
		var showcode = this.hasAttribute('showcode');
		var autoxec = this.hasAttribute('autoexec');
		var appendControlsSelector = this.hasAttribute('appendcontrols') ? attr.appendcontrols.value : null;

		// layout
		var content = document.createElement('div');
		var divLive = document.createElement('div');
		var divEditor = document.createElement('div');

		var editor = document.createElement('x-editor');
		editor.setAttribute('src', src);
		divEditor.appendChild(editor);

		if(appendControlsSelector !== null) {
			var insertionPoint = document.querySelector(appendControlsSelector);
			var btnCode = document.createElement('button');
			var that = this;
			btnCode.innerHTML = 'code';
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

		// Now append the new divs here
		this.appendChild(content);
		content.appendChild(divLive);
		divLive.className = 'live';
		content.appendChild(divEditor);
		divEditor.className = 'editor';

		this._divEditor = divEditor;
	};


	proto.toggleCode = function() {
		this._divEditor.classList.toggle('hidden');
	};


	document.registerElement('x-livecode', {
		prototype: proto
	});

})();
