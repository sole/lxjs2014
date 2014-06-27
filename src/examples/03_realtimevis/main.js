navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

// Audio setup
var audioContext = new AudioContext();
var source;
var analyser = audioContext.createAnalyser();
var analyserData;
//analyser.connect(audioContext.destination);
analyser.fftSize = 2048;
analyser.smoothingTimeConstant = 0.5;
analyserData = new Uint8Array(analyser.frequencyBinCount);



// 3D setup
var contentWidth = 320;
var contentHeight = 240;
var range = 250;

var content = document.getElementById('content');
var renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
var scene = new THREE.Scene();

scene.add(new THREE.AmbientLight(0x111111));

var light = new THREE.DirectionalLight(0xdfebff, 1);
//light.position.set(0, 100, 0);
light.position.set(0, 200, 0);
light.position.multiplyScalar(1.3);

light.castShadow = true;
light.shadowMapWidth = 1024;
light.shadowMapHeight = 1024;
var d = 400;
light.shadowCameraLeft = -d;
light.shadowCameraRight = d;
light.shadowCameraTop = d;
light.shadowCameraBottom = -d;

light.shadowCameraFar = 1000;
light.shadowDarkness = 0.5;
scene.add(light);

scene.fog = new THREE.Fog(0xFF0000, 10, 1000);


var planeGeometry = new THREE.PlaneGeometry(5000, 5000, 100, 100);
var planeMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
planeMaterial.shading = THREE.FlatShading;
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -5;
plane.receiveShadow = true;
plane.castShadow = true;
scene.add(plane);

messWithThisObject(plane);

var u = 20;
var geometry = new THREE.BoxGeometry(u, u, u);
var material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
var numBars = 20;
var row = [];
var visualScale = 20;

content.appendChild( renderer.domElement );
renderer.setSize(contentWidth, contentHeight);
renderer.setClearColor( 0xff0000, 1.0 );

var camera = new THREE.PerspectiveCamera( 60, contentWidth / contentHeight, 1, 100000 );
var cameraTarget = new THREE.Vector3( 0, 0, 0 );
camera.position.set(0, 0, range);
camera.lookAt( cameraTarget );

var left = -u * numBars + u;
var x = left;
for(var i = 0; i < numBars; i++) {
  var bar = new THREE.Mesh(geometry, material);
  bar.position.set(x, u * 2, 0);
  bar.castShadow = true;
  //bar.receiveShadow = true;
  scene.add(bar);
  row.push(bar);
  x += u * 2;
}

// Starting the audio stream
navigator.getUserMedia(
		{ audio: true },
		function yay(stream) {
			source = audioContext.createMediaStreamSource(stream);
			source.connect(analyser);
		},
		function nope(err) {
			console.err("oh noes", err);
		}
		);


function messWithThisObject(obj) {
	var geometry = obj.geometry;
	var vertices = geometry.vertices;
	vertices.forEach(function(v) {
		v.z += (Math.random() * 0.5 - 1) * 300;
	});
	
	geometry.verticesNeedUpdate = true;
	geometry.normalsNeedUpdate = true;
	geometry.elementsNeedUpdate = true;

	geometry.computeFaceNormals();
}

function onWindowResize( e ) {
	contentWidth = content.clientWidth;
	contentHeight = content.clientHeight;
	renderer.setSize( contentWidth, contentHeight );
	camera.aspect = contentWidth / contentHeight;
	camera.updateProjectionMatrix();
}

// rendering loop
function render(timestamp) {
	analyser.getByteFrequencyData(analyserData); // 0..255

	updateVisualisation(analyserData);

	var t = timestamp !== null ? timestamp * 0.0001 : 0;
	camera.position.set(range * Math.sin(t), range / 2, range * Math.cos(t));
	camera.lookAt(cameraTarget);

	renderer.render(scene, camera);

}

function animate(timestamp) {
	requestAnimationFrame(animate);
	render(timestamp);
}

function updateVisualisation(data) {

  var dataLength = data.length / 4;
  var dataIndex = 0;
  var skipLength = Math.round(dataLength / numBars);

  for(var j = 0; j < numBars; j++) {
    var v =  data[dataIndex] / 255.0;
    dataIndex += skipLength;
    var bar = row[j];
    bar.scale.set(1, 1, 1 + v * visualScale);
  }

}

// GO GO GO GO
onWindowResize();
window.addEventListener( 'resize', onWindowResize, false );
animate();


