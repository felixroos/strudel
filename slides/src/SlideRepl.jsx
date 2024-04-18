import { StrudelMirror } from '@strudel/codemirror';
import { evalScope, silence } from '@strudel/core';
import { registerSoundfonts } from '@strudel/soundfonts';
import { transpiler } from '@strudel/transpiler';
import {
  initAudioOnFirstClick,
  registerSynthSounds,
  registerZZFXSounds,
  samples,
  tScope,
  webaudioOutput,
} from '@strudel/webaudio';
import React from 'react';
import { pianorollMethod } from '../../packages/draw/pianoroll.mjs';

let prebaked, modulesLoading, audioLoading;
if (typeof window !== 'undefined') {
  prebaked = Promise.all([
    samples('http://localhost:5432'),
    registerSoundfonts(),
    registerSynthSounds(),
    registerZZFXSounds(),
    samples({
      _base: 'http://localhost:5432/_piano/',
      piano: {
        A0: 'A0v8.mp3',
        C1: 'C1v8.mp3',
        Ds1: 'Ds1v8.mp3',
        Fs1: 'Fs1v8.mp3',
        A1: 'A1v8.mp3',
        C2: 'C2v8.mp3',
        Ds2: 'Ds2v8.mp3',
        Fs2: 'Fs2v8.mp3',
        A2: 'A2v8.mp3',
        C3: 'C3v8.mp3',
        Ds3: 'Ds3v8.mp3',
        Fs3: 'Fs3v8.mp3',
        A3: 'A3v8.mp3',
        C4: 'C4v8.mp3',
        Ds4: 'Ds4v8.mp3',
        Fs4: 'Fs4v8.mp3',
        A4: 'A4v8.mp3',
        C5: 'C5v8.mp3',
        Fs5: 'Fs5v8.mp3',
        A5: 'A5v8.mp3',
        C6: 'C6v8.mp3',
        Ds6: 'Ds6v8.mp3',
        Fs6: 'Fs6v8.mp3',
        A6: 'A6v8.mp3',
        C7: 'C7v8.mp3',
        Ds7: 'Ds7v8.mp3',
        Fs7: 'Fs7v8.mp3',
        A7: 'A7v8.mp3',
        C8: 'C8v8.mp3',
      },
    }),
  ]);
  modulesLoading = evalScope(
    import('@strudel/core'),
    import('@strudel/tonal'),
    import('@strudel/mini'),
    import('@strudel/webaudio'),
    import('@strudel/soundfonts'),
    import('@strudel/hydra'),
    import('@strudel/csound'),
  );
  audioLoading = initAudioOnFirstClick();
}

export function SlideRepl({
  tune,
  drawTime,
  punchcard,
  spiral,
  canvasHeight,
  hideHeader = false,
  fontSize = 32,
  disabled = false,
  scope,
  log,
}) {
  const id = React.useMemo(() => s4(), []);
  const canvasId = React.useMemo(() => `canvas-${id}`, [id]);
  const code = tune;
  const editorRef = React.useRef();
  const containerRef = React.useRef();
  const shouldShowCanvas = !!canvasHeight;
  const [replState, setReplState] = React.useState({});
  const { started, isDirty, error } = replState;
  const init = React.useCallback(({ code }) => {
    const drawContext = document.querySelector('#' + canvasId)?.getContext('2d');
    const editor = new StrudelMirror({
      id,
      defaultOutput: webaudioOutput,
      getTime: () => getAudioContext().currentTime,
      transpiler,
      // autodraw: !!shouldShowCanvas,
      root: containerRef.current,
      initialCode: '// LOADING',
      pattern: silence,
      drawTime,
      drawContext,
      beforeEval: () => {
        Pattern.prototype.scope = function (config) {
          return tScope.call(this, { ctx: drawContext, pos: 0.5, scale: 1, ...config });
        };
        Pattern.prototype.pianoroll = function (config) {
          return pianorollMethod.call(this, { ctx: drawContext, fold: 1, ...config });
        };
      },
      prebake: async () => Promise.all([modulesLoading, prebaked, audioLoading]),
      onUpdateState: (state) => {
        setReplState({ ...state });
      },
    });
    // init settings
    editor.setCode(code);
    editor.setTheme('strudelTheme');
    editor.setFontSize(fontSize);
    editorRef.current = editor;
  }, []);

  return (
    <div className="overflow-hidden rounded-t-md bg-background border border-lineHighlight">
      <div className="not-prose rounded-xl overflow-hidden relative flex items-center">
        <div
          className="h-full w-full"
          ref={(el) => {
            if (!editorRef.current && el) {
              containerRef.current = el;
              init({ code, shouldShowCanvas });
            }
          }}
        ></div>
        {error && <div className="text-right p-1 text-md text-red-200">{error.message}</div>}
      </div>
      {shouldShowCanvas && (
        <canvas
          id={canvasId}
          className="w-full pointer-events-none border-t border-lineHighlight"
          height={canvasHeight}
          ref={(el) => {
            if (el && el.width !== el.clientWidth) {
              el.width = el.clientWidth;
            }
          }}
        ></canvas>
      )}
    </div>
  );
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
