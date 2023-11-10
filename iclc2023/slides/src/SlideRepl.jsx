import { evalScope, controls } from '@strudel.cycles/core';
import { initAudioOnFirstClick } from '@strudel.cycles/webaudio';
import { MiniRepl as _MiniRepl } from '@strudel.cycles/react';
import { prebake } from './prebake';
import { atomone } from '@uiw/codemirror-themes-all';
import blackscreen from '@strudel.cycles/react/src/themes/blackscreen';

if (typeof window !== 'undefined') {
  await evalScope(
    controls,
    import('@strudel.cycles/core'),
    import('@strudel.cycles/tonal'),
    import('@strudel.cycles/mini'),
    import('@strudel.cycles/webaudio'),
    import('@strudel.cycles/soundfonts'),
    import('@strudel/hydra'),
    import('@strudel.cycles/csound'),
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
      <_MiniRepl
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
      />
    </div>
  );
}
