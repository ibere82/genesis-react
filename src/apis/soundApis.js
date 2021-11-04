import * as Tone from 'tone';

const synth = new Tone.AMSynth().toDestination();

const attackSound = (sound) => {
  synth.triggerAttack(sound);
};

const releaseSound = () => {
  synth.triggerRelease();
};

const playMusic = (music) => {
  return new Promise((resolve) => {
    const now = Tone.now();
    music.forEach((note, index) => synth.triggerAttackRelease(note, '8n', now + (index / 20)));
    setTimeout(() => resolve(), 2500);
  });
};

export { playMusic, attackSound, releaseSound, };