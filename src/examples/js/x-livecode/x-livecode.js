(function() {

	var proto = Object.create(HTMLElement.prototype);

	// attributes: showcode, src, autoexec, appendbutton
	proto.createdCallback = function() {

		var attr = this.attributes;
		
		// config
		var src = this.hasAttribute('src') ? attr.src.value : null;
		var showcode = this.hasAttribute('showcode');
		var autoxec = this.hasAttribute('autoexec');
		var appendButtonSelector = this.hasAttribute('appendbutton') ? attr.appendbutton : null;

		// layout
		var divEditor = document.createElement('div');
		var divLive = document.createElement('div');

		var editor = document.createElement('x-editor');
		editor.setAttribute('src', src);
		divEditor.appendChild(editor);

		// If we have children bring them to the new divLive layer
		while(this.childElementCount) {
			var child = this.childNodes[0];
			console.log('relocating child', child);
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
