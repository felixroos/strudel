import { registerSynthSounds, samples } from '@strudel.cycles/webaudio';
import { registerSoundfonts } from '@strudel.cycles/soundfonts';

export async function prebake() {
  const ds = 'https://raw.githubusercontent.com/felixroos/dough-samples/main/';
  await Promise.all([
    registerSynthSounds(),
    registerSoundfonts(),
    samples(`${ds}/tidal-drum-machines.json`),
    samples(`${ds}/piano.json`),
    samples(`${ds}/Dirt-Samples.json`),
    samples(`${ds}/EmuSP12.json`),
    samples(`${ds}/vcsl.json`),
    /* registerSoundfonts(`./samples/webaudiofontdata/sound/`),
    samples(`./tidal-drum-machines.json`, './samples/tidal-drum-machines/machines/', {
      prebake: true,
      tag: 'drum-machines',
    }) 
    samples('./Dirt-Samples.json', './samples/Dirt-Samples/'), */
  ]);
}
