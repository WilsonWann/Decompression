import React, { useState } from 'react'

export const Decompression = () => {
    const regex_eng = /^([a-z]+)/i;
    const regex_innermost_brackets = /(\d+\[(?:\[??[^[]*?\]))/i;
    const [code, setCode] = useState('');
    const [origString, setOrigString] = useState([]);
    const handleKeyDown = (event) => {
        event.key === 'Enter' && onDecompStart(code);
    }
    const onDecompStart = (code) => {
        setOrigString('')
        decomp(code);
    }
    const decomp = (code) => {
        if (regex_eng.test(code)) {
            const { decodedStr, remainder } = decode_eng(code);
            setOrigString(origString => [...origString, decodedStr])
            remainder && decomp(remainder);
        } else if (regex_innermost_brackets.test(code)) {
            const { decodedStr } = decode_brackets(code);
            setOrigString(origString => [...origString, decodedStr])
            regex_innermost_brackets.test(decodedStr) && decomp(decodedStr);
        }
    }
    const decode_eng = (input) => {
        const [decodedStr, remainder] = input.indexOf("[") === -1
            ? [input.slice(0, input.length), '']
            : [input.slice(0, input.match(regex_eng)[0].length),
            input.slice(input.match(regex_eng)[0].length, input.length)];

        return { decodedStr, remainder };
    }
    const decode_brackets = (input) => {
        const splits = input.split(regex_innermost_brackets);

        let decodedStr = splits
            .filter(split => split)
            .map(split => {
                const matches = split.match(regex_innermost_brackets);
                if (matches) {
                    const matchPatterns = {
                        times: matches[0].slice(0, matches[0].indexOf("[")),
                        compressedStr: matches[0].slice(matches[0].indexOf("[") + 1, matches[0].indexOf("]")),
                    }
                    return matchPatterns.compressedStr.repeat(matchPatterns.times);
                }
                return split
            })
            .join("")
        if (regex_innermost_brackets.test(decodedStr)) {
            return decode_brackets(decodedStr);
        } else {
            return { decodedStr, remainder: '' };
        }
    }
    return (
        <div>
            <input value={code} onChange={(e) => setCode(e.target.value)} onKeyPress={(e) => handleKeyDown(e)} />
            <button onClick={() => onDecompStart(code)} >click me!</button>
            <p>{origString}</p>
        </div >
    )
}
