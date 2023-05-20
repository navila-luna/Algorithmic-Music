
const snare = new Tone.Player("audio/bright-punchy-snare-one-shot.wav").toMaster();
const drum = new Tone.Player("audio/drumss.wav").toMaster();
const guitarChords = new Tone.Player("gtchord.wav").toMaster();
const brightSnare = new Tone.Player("brightSnare.wav").toMaster();
document.documentElement.addEventListener('mousedown', () => {
    if (Tone.context.state !== 'running') Tone.context.resume();
  });

function makeBeatSequence(ones, zeroes, beatSequence) {
  for(let i; i < n; i++) {
    if(ones != 0) {
      beatSequence.push(1)
      ones -= 1
    }
    else {
      beatSequence.push(0)
      zeroes -= 1
    }
  }
}
// start array with all n zeros and ones  representing 
function bjorklund1(n, k) {
  let beatSequence = makeBeatSequence(k, n, [])
  let remainder = n

  // Helper function  will keep concatenating 0s to 1s until all 1s have a 0  
  function moveRemainders() {
    let j = 1
    for(let i=0; i < beatSequence.length; i++){
      if(beatSequence[beatSequence.length - j] == 0) {
        stringNumber = beatSequence[i].toString() +  beatSequence[beatSequence.length - j].toString();
        beatSequence[i] = Number(stringNumber)
        remainder -= 1
      }
      j ++;
  }
}
  // While we still have n more 0s then we must keep concatenting 
  while(remainder != 0) {
    moveRemainders()
  }
}

function bjorklund(n, k) {
  let pulseSequence = Array.from({length: n}, (_, i) => i < k? [1] : [0])

  while(n - k > 1) {
    let left = 0;
    k = Math.min(k, n-k)
    while(left < k && left < pulseSequence.length) {
      pulseSequence[left] = pulseSequence[left].concat(pulseSequence.pop());
      left++;
    }
    n = pulseSequence.length;
  }

  const flattened = pulseSequence.flat();
  console.log("flattened", flattened)

  const pulseCounts = [];
  let curCount = 0;
  for (const n of flattened) {
    if (n === 1 && curCount > 0) {
      pulseCounts.push(curCount)
      curCount = 0;
    }
    curCount++;
  }
  pulseCounts.push(curCount);

  return pulseCounts;
  // return flattened
}

console.log({b: bjorklund(13, 5)});
// generate random n and k for a given sound, returns the function makeRhythmPart()
function randomSequence(sound){
  let randomK = Math.floor(Math.random() * 10) + 6;
  let randomN = Math.floor(Math.random() * 18) + 7;
  return makeRhythmPart(randomN, randomK, sound);
}
const drumBeat = randomSequence(drum)
// const snareBeat = randomSequence(snare);
// const guitar = randomSequence(guitarChords);
const brightPitchSnare = randomSequence(brightSnare)

function makeRhythmPart(n, k, player) {
  let euclideanSequence = bjorklund(n, k)
  euclideanSequence = new Array(4).fill(euclideanSequence).flat();
  // 3, 2, 3, 2, 3
  // let testing = euclideanSequence.map((num) => [num + "n",'C4'])
  let startTime = 0;
  let testing = [];
  euclideanSequence.forEach((num) => {
    let endTime = num + startTime;
    testing.push([startTime + ":" + endTime, 'C4']);
    startTime += num;
  });

  console.log("testing", testing);
  // Create a sequence with the pulse sequence and player
  const pulseBeat = new Tone.Part((time, note) => {
    // console.log(time, ":time");
    player.start(time);
  }, testing);
  pulseBeat.playbackRate = 16;
  return pulseBeat;
}

function startBeat() {
  Tone.start()
  drumBeat.start();
  // snareBeat.start();
  // guitar.start();
  brightPitchSnare.start();
  // pulseBeat.start();
  // pulseBeat2.start();
  // bassss.start();
  // guitar.start();
}
startBeat()