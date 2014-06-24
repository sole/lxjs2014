(function() {

	var proto = Object.create(HTMLElement.prototype);

	// attributes: showcode, src, autoexec, appendbutton
	proto.createdCallback = function() {

		var attr = this.attributes;
		
		// config
		var src = this.hasAttribute('src') ? attr.src.value : null;
		var showcode = this.hasAttribute('showcode');
		var autoxec = this.hasAttribute('autoexec');
		var appendButtonSelector = this.hasAttribute('appendbutton') ? attr.appendbutton.value : null;

		// layout
		var divEditor = document.createElement('div');
		var divLive = document.createElement('div');

		var editor = document.createElement('x-editor');
		editor.setAttribute('src', src);
		divEditor.appendChild(editor);

		if(appendButtonSelector !== null) {
			var button = document.createElement('button');
			var insertionPoint = document.querySelector(appendButtonSelector);
			button.innerHTML = 'code';
			insertionPoint.appendChild(button);
		}

		// If we have children bring them to the new divLive layer
		while(this.childElementCount) {
			var child = this.childNodes[0];
			divLive.appendChild(child);
		}

		// Now append the new divs here
		this.appendChild(divEditor);
		this.appendChild(divLive);

	};

	document.registerElement('x-livecode', {
		prototype: proto
	});

})();
