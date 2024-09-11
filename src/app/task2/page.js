"use client";
import React, { useState, useEffect } from 'react';

const AlphabetTile = ({ letter, onClick }) => (
    <div
        className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center text-2xl font-bold cursor-pointer hover:bg-blue-600 transition-colors"
        onClick={() => onClick(letter)}
    >
        {letter}
    </div>
);

const AlphabetTileInteraction = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const [outputString, setOutputString] = useState('');

    const handleTileClick = (letter) => {
        setOutputString(prev => prev + letter);
    };

    useEffect(() => {
        const processOutputString = (str) => {
            let processed = str.replace(/(.)\1\1/g, '_');

            let count = 1;
            let result = '';
            for (let i = 0; i < processed.length; i++) {
                if (processed[i] === processed[i + 1]) {
                    count++;
                } else {
                    if (count > 3) {
                        result += '_'.repeat(count);
                    } else {
                        result += processed.substr(i - count + 1, count);
                    }
                    count = 1;
                }
            }
            return result;
        };

        setOutputString(processOutputString(outputString));
    }, [outputString]);

    return (
        <div className="p-4">
            <div className="grid grid-cols-6 gap-2 mb-4">
                {alphabet.map(letter => (
                    <AlphabetTile key={letter} letter={letter} onClick={handleTileClick} />
                ))}
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">Output:</h2>
                <div id="outputString" className="p-4 bg-gray-100 rounded-md text-lg">
                    {outputString || 'Empty'}
                </div>
            </div>
        </div>
    );
};

export default AlphabetTileInteraction;
