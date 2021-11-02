
//Dictionary - Morse Code to Characters
const MORSE_CODE_DICT = {  
    "-----":"0",
    ".----":"1",
    "..---":"2",
    "...--":"3",
    "....-":"4",
    ".....":"5",
    "-....":"6",
    "--...":"7",
    "---..":"8",
    "----.":"9",
    ".-":"A",
    "-...":"B",
    "-.-.":"C",
    "-..":"D",
    ".":"E",
    "..-.":"F",
    "--.":"G",
    "....":"H",
    "..":"I",
    ".---":"J",
    "-.-":"K",
    ".-..":"L",
    "--":"M",
    "-.":"N",
    "---":"O",
    ".--.":"P",
    "--.-":"Q",
    ".-.":"R",
    "...":"S",
    "-":"T",
    "..-":"U",
    "...-":"V",
    ".--":"W",
    "-..-":"X",
    "-.--":"Y",
    "--..":"Z",
    "-.-.--":"!",
    ".-.-.-":".",
    "--..--":","
};

const rules = { 'dot': 1, 'dash': 3, 'ddPause': 1, 'charPause': 3, 'wordsPause': 7};

const MORSE_DASH_PAUSE = ' ';
const MORSE_CHAR_PAUSE = '   ';
const MORSE_WORD_PAUSE = '       ';

const MORSE_EMPTY_SPACE = '';
let times;

/** 
 * decodeBits finds out the transmission rate of the message, correctly decode the message to dots, dashes and spaces.
 * @param {bits}  gets a series of bits
 * @returns decoded string
*/
   /*function decodeBits(bits) {
    bits = bits.replace(/(^[0]+)|([0]+)$/g, MORSE_EMPTY_SPACE); //replace all the starting 0's characters to empty space
    const maxTimeUnit = String(Math.max(...bits.match(/[1]+/g))).length; //maximal time unit for a user for transmitting a single character
    const minTimeUnit = String(Math.min(...bits.match(/[1]+/g))).length; //minimal time unit for a user for transmitting a single character
    const zeroSymbols = bits.match(/[0]+/);
    const rate = (len) => time => len * rules[time];

    if(minTimeUnit == maxTimeUnit){
        if(zeroSymbols){
            const len = zeroSymbols[0].length;
            times = Object.values(rules).includes(zeroSymbols[0].length) ? rate(1) : rate(zeroSymbols[0].length);
        } else {
            times = rate(minTimeUnit);
        }
    } else {
        times = rate(minTimeUnit);
    }

    const words = bits.split(printBinary(0, 'wordsPause'));
    return words.map(translationToMorse).join(MORSE_CHAR_PAUSE);
   }

   function printBinary(b, t) {
    return Array.from({length: times(t)}, () => b).join('');
   }

   function binaryRegex(binary, type) {
    return new RegExp(printBinary(binary, type), 'g');
   }

   function translationToMorse(word) {
       return word.replace(binaryRegex(1, 'dash'), '-').replace(binaryRegex(1, 'dot'), '.').replace(binaryRegex(0, 'charPause'), MORSE_DASH_PAUSE).replace(binaryRegex(0, 'ddPause'), MORSE_EMPTY_SPACE);
   }*/

   function unmultiplyString (str, factor) {
	var ret = [];
	str.split('').reduce((prev, current) => {
        if (prev === 0) {
			ret.push(current);
			return factor - 1;
		}
		return prev - 1;
    }, factor - 1)
	return ret.join('');
}

function shortestSequenceLength (str) {
	var ret = str.split('').reduce((prev, current) => {
		if (current === prev.character) {
			prev.length = prev.length + 1;
		} else {
			if (prev.length < prev.shortestLength) {
				prev.shortestLength = prev.length;
			}
			prev.character = current;
			prev.length = 1;
		}
		return prev;
	}, {
		character: null,
		length: Infinity,
		shortestLength: Infinity
	});
	return (ret.length < ret.shortestLength) ?  ret.length : ret.shortestLength;
}

function decodeBits(bits) {
    bits = bits.substring(bits.indexOf('1'), bits.lastIndexOf('1') + 1); // remove leading/trailing 0's
    bits = unmultiplyString(bits, shortestSequenceLength(bits));
    return bits.replace(/0000000/g, '   ')
               .replace(/000/g, ' ')
               .replace(/111/g, '-')
               .replace(/1/g, '.')
               .replace(/0/g, '');
}

/** 
 * @param {morseCode}  output of the previous function 
 * @returns human readable string
*/
function decodeMorse(morseCode){
    return morseCode.split(MORSE_WORD_PAUSE).map((v) => v.split(MORSE_CHAR_PAUSE)).map((v) => v.map((val) => MORSE_CODE_DICT[val.replace(/s/g, '')]).join('')).join(MORSE_DASH_PAUSE);
}

export {decodeBits, decodeMorse};