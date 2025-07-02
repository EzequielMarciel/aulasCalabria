const passwordResultEl = document.getElementById('passwordResult');
const lengthEl = document.getElementById('length');
const includeUppercaseEl = document.getElementById('includeUppercase');
const includeLowercaseEl = document.getElementById('includeLowercase');
const includeNumbersEl = document.getElementById('includeNumbers');
const includeSymbolsEl = document.getElementById('includeSymbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};
generateBtn.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = includeLowercaseEl.checked;
    const hasUpper = includeUppercaseEl.checked;
    const hasNumber = includeNumbersEl.checked;
    const hasSymbol = includeSymbolsEl.checked;

    passwordResultEl.value = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );
});
copyBtn.addEventListener('click', () => {
    const password = passwordResultEl.values;
    if (!password) {
        return;
    }
    navigator.clipboard.writeText(password);
    // Poderia adicionar um feedback visual de "Copiado!" aqui
    alert('Senha copiada para a área de transferência!');
});
function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typecount = lower + upper + number + symbol;
    const typesArr = [{ lower }, {upper},
        { number }, { symbol }].filter(item => Object.values(item)[0]);

        if (typecount === 0 ) {
            return '';
        }
        for (let i = 0; i < length; i += typecount) {
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                generatedPassword += randomFunc[funcName]();
            });
        }
        const finalPassword = generatedPassword.slice(0, length);
        return finalPassword;
}
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 48);
}
function getRandomSymbol() {
    const Symbols = '!@#$%¨&&*(☺)[]{}°|<>/§,.';
    return Symbols[Math.floor(Math.random() * Symbols.length)];
}