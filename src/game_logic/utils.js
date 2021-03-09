
let C = 0;

const randomGuess = (holes, colors) => {
    const guess = Array(holes).fill(0);
    for (let k = 0; k < holes; k++) {
        guess[k] = Math.floor(Math.random() * (colors)) + 1
    }
    C = 0;
    return (guess)
}


const checkGuess = (guess, toGuess) => {
    const g = [...guess], tg = [...toGuess];
    // console.log(guess)
    // console.log(toGuess)
    let gcgp = 0, gcbp = 0;
    // check good color + good position:
    for (let k = g.length - 1; k >=0 ; k--) {
        if (g[k] === tg[k]) {
            gcgp ++;
            g.splice(k, 1)
            tg.splice(k, 1)
        }
    }
    // console.log("*".repeat(10))
    // console.log(gcgp)
    // console.log(g)
    // console.log(tg)
    // check good color + bad position:
    for (let k = 0; k < g.length; k++) {
        let i = tg.indexOf(g[k])
        if (i != -1) {
            gcbp ++;
            tg.splice(i, 1)
        }
    }
    // console.log(gcbp)
    // console.log(g)
    // console.log(tg)
    return {gcgp:gcgp, gcbp:gcbp}
}


export {randomGuess, checkGuess};