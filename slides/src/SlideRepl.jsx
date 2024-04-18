import { evalScope, controls } from '@strudel/core';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { prebake } from './prebake';
import { atomone } from '@uiw/codemirror-themes-all';
// import blackscreen from '@strudel/codemirror/themes/blackscreen';

if (typeof window !== 'undefined') {
  await evalScope(
    controls,
    import('@strudel/core'),
    import('@strudel/tonal'),
    import('@strudel/mini'),
    import('@strudel/webaudio'),
    import('@strudel/soundfonts'),
    import('@strudel/hydra'),
    import('@strudel/csound'),
  );
}

if (typeof window !== 'undefined') {
  initAudioOnFirstClick();
  prebake();
}

export function SlideRepl({
  tune,
  drawTime,
  punchcard,
  spiral,
  canvasHeight = 100,
  hideHeader = false,
  fontSize = 32,
  disabled = false,
  scope,
  log,
}) {
  return (
    <div className="not-prose rounded-xl overflow-hidden">
      TBD mini repl
      {/* <_MiniRepl
        hideHeader={hideHeader}
        tune={tune}
        hideOutsideView={true}
        drawTime={drawTime}
        punchcard={punchcard}
        canvasHeight={canvasHeight}
        fontSize={fontSize}
        theme={disabled ? blackscreen : atomone}
        log={log}
        scope={scope}
        spiral={spiral}
        // theme={themes[theme]}
      /> */}
    </div>
  );
}
