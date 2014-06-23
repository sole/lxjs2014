var audioContext = new AudioContext();
var oscillator = audioContext.createOscillator();
oscillator.connect(audioContext.destination);
oscillator.start();
oscillator.frequency.value = 220;
//oscillator.frequency.linearRampToValueAtTime(440, audioContext.currentTime + 2);

var lfo = audioContext.createOscillator();
var lfoGain = audioContext.createGain();
lfoGain.gain.value = 100;
lfo.connect(lfoGain);
lfoGain.connect(oscillator.frequency);
lfo.frequency.value = 10;
lfo.start();



//oscillator.type = 'sine'
/*setTimeout(function() {
  oscillator.frequency.linearRampToValueAtTime(Math.random() * 100 + 100, audioContext.currentTime + 0.25);
}, 300);
*/
