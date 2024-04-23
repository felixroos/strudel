import { SlideRepl } from './SlideRepl.jsx';
import Highlight from './Highlight.jsx';
import Stepper from './Stepper.jsx';

const snippets = [
  [`sound "bd ~ [sd cp]"`, [`sound("bd ~ [sd cp]")`], 'Mini Notation'], //
  [`sound "bd ~ [sd cp]" # speed "1 2"`, [`sound("bd ~ [sd cp]").speed("1 2")`], 'Composing Patterns'],
  [
    `fast 2 $ sound "bd ~ [sd cp]"`,
    [`fast(2, sound("bd ~ [sd cp]"))`, `sound("bd ~ [sd cp]").fast(2)`],
    'Patterns Transformations',
  ],
  [
    `speed "1 2 3" + "1 2" # s "bd"`,
    ['speed("1 2 3".add("1 2")).s("bd")', '"1 2 3".add("1 2").speed().s("bd")'],
    'Pattern Arithmetic',
  ],
  [
    `jux rev 
  $ every 3 (fast 2) 
  $ sound "bd sd"`,
    [
      `sound("bd sd")
  .every(3, fast("2"))
  .jux(rev)`,
    ],
    'Higher order transformations (with partial application)',
  ],
  [
    `jux rev 
  $ every "<3 5>" (fast "1 2") 
  $ sound "bd sd cp mt"`,
    [
      `sound("bd sd cp mt")
  .every("<3 5>", fast("1 2"))
  .jux(rev)`,
    ],
    'Patterns all the way down',
  ],
  [
    `d1 $ s "bd sd cp mt`,
    [
      `sound("bd sd cp mt").d1`,
      `d1: sound("bd sd cp mt")`,
`$: sound("bd sd cp mt")
$: sound("[- hh]*4")`
    ],
    'outputs',
  ],
];

function SyntaxComparison() {
  return (
    <>
      <h1>comparing tidal &amp; strudel syntax</h1>
      <Stepper
        steps={snippets
          .map(([hs, js, label]) => (
            <div className="py-4 space-y-4">
              <h3>{label}</h3>
              <div className="space-y-2">
                <div className="flex space-x-4">
                  <img src="./img/haskell.png" className="h-10 mt-2" />
                  <Highlight language="haskell" code={hs} />
                </div>
                <div className="space-y-2">
                  {js.map((c, j) => (
                    <div className="flex space-x-4 items-center" key={j}>
                      <img src="./img/js.jpg" className={`h-10`} />
                      <SlideRepl tune={c} hideHeader />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
          .concat([<>TLDR: Just chain all the things! If you know hydra, this will look very familiar.</>])}
      />
    </>
  );
}

export default SyntaxComparison;
