import logo from './logo.svg';
import './App.css';
import { Decompression } from './components/Decompression';
import { useState } from 'react';

function App() {
  const [origString, setOrigString] = useState('');
  return (
    <div className="App">
      <div>
        <h2>
          Compressed String
        </h2>
        <Decompression setOrigString={setOrigString} />
      </div>
      <div>
        <h2>
          Tutorials
        </h2>
        <span>
          Your input is a compressed string of the format number[string] and the decompressed output form should be the string written number times. For example:
        </span>
        <span>
          input
        </span>
        <span>
          3[abc]4[ab]c
        </span>
        <span>
          Would be output as
        </span>
        <span>
          abcabcabcababababc
        </span>
        <h2>
          Other rules
        </h2>
        <span>
          Number can have more than one digit. For example, 10[a] is allowed, and just means aaaaaaaaaa
        </span>
        <span>
          One repetition can occur inside another. For example, 2[3[a]b] decompresses into aaabaaab
        </span>
        <span>
          Characters allowed as input include digits, small English letters and brackets [ ].
        </span>
        <span>
          Digits are only to represent amount of repetitions.
        </span>
        <span>
          Letters are just letters.
        </span>
        <span>
          Brackets are only part of syntax of writing repeated substring.
        </span>
        <span>
          Input is always valid, so no need to check its validity.
        </span>
      </div>
      <div>
        <h2>
          Un-compressed String
        </h2>
        <p style={{ wordBreak: 'break-all' }}>{origString}</p>
      </div>
    </div>
  );
}

export default App;
