'use strict';

// n temas, m bolas, k temas estudiados
function probability(n,m,k) {
    let prob = 1.0;
    for(let i = 0; i < k; i ++) {
        prob = prob * (n - m - i) / (n - i);
    }
    return 1.0 - prob;
}

function onChange(temas, bolas, estudio, prob) {
    let n = parseInt(temas.value);
    let m = parseInt(bolas.value);
    let k = parseInt(estudio.value);
    let p = probability(n, m, k);
    prob.textContent = p.toFixed(4);
};

(function() {

    const temas = document.getElementById("temas");
    const bolas = document.getElementById("bolas");
    const estudio = document.getElementById("estudio");
    const prob = document.getElementById("probabilidad");

    temas.onchange = () => onChange(temas, bolas, estudio, prob);
    bolas.onchange = () => onChange(temas, bolas, estudio, prob);
    estudio.onchange = () => onChange(temas, bolas, estudio, prob);

    //init:
    onChange(temas, bolas, estudio, prob);
})();