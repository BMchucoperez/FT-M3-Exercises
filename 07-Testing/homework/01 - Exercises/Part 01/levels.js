const levelOne = (a, b) => {
    return a + b
};

const levelTwo = (letras) => {
    if(letras.length < 2){
        return letras
    }
    if(letras.length === 2){
        return letras[0]
    }
    if(letras.length > 2){
        let result = [];

        for(let i = 0; i < letras.length; i++){
            if(i % 2 === 0) result.push(letras[i])
        }
        return result.join("")
    }
};

const levelThree = (a, b) => {

   return [...a, ...b].sort()
   
};

const levelFour = (num) => {
    let str = num.toString().split("");

    let numbers = str.map(string => Number(string));

    let result = numbers.reduce((acc, num) => acc + num);

    let resultReverse = result.toString().split("").reverse().join("");

    return result * Number(resultReverse) === num;
};

module.exports = { levelOne, levelTwo, levelThree, levelFour };
