const random = (data) => {
    let array = [];
    let uniqueElements = [];
    let repeteadElements = [];
    let newArray = [];
    let count = 1;
    if (data) {
        for (let i = 0; i < data; i++) {
            let number = parseInt(Math.random() * 1000 + 1);
            array.push(number);
        }
    }
    else {
        for (let i = 0; i < 1e8; i++) {
            let number = parseInt(Math.random() * 1000 + 1);
            array.push(number);
        }
    }
    array.sort();
    for (let j = 0; j < array.length; j++) {
        if (array[j + 1] === array[j]) {
            count++;
        }
        else {
            uniqueElements.push(array[j]);
            repeteadElements.push(count);
            count = 1;
        }
    }
    for (let k = 0; k < uniqueElements.length; k++) {
        newArray.push(`${uniqueElements[k]} se repite: ${repeteadElements[k]} vez/veces`);
    }
    return newArray;
}

process.on("message", (input) => {
    if (input==="Iniciar") {
        const resultado = random();
        process.send(resultado);
    }
    else {
        const resultado = random(input);
        process.send(resultado);
    }
})
