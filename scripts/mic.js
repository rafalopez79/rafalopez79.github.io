
'use strict';

let app;

function init(document) {
    app = {

    };
};

function fillSources(input, sources) {
    let i = 0;
    while (input.firstChild) {
        input.removeChild(input.lastChild);
    }
    for (const source of sources) {
        if (source.kind === 'audioinput') {
            const option = document.createElement("option");
            option.value = source.id;
            option.text = source.label || 'input ' + (i++);
            input.appendChild(option);
        }
    }
};

function scanDevices(navigator, document) {
    const audioContext = new AudioContext();
    const constraints = {
        audio: {
            optional: [{ echoCancellation: false }]
        }
    };
    app.audioContext = audioContext;
    app.constraints = constraints;
    const input = document.getElementById("audioinput");
    navigator.mediaDevices.enumerateDevices().then(t => fillSources(input, t));
};

function selectSource(document) {
    const input = document.getElementById("audioinput");
    app.audioSource = input.value;
    app.constraints.audio.optional.push({ sourceId: audioSource });
};

function onStart() {
    if (!app.audioContext) {
        initAudio(navigator, document);
    }
};

const browserSupportsMedia = () => {
    return navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.mzGetUserMedia
}

function getStream(stream) {
    const audioContext = app.audioContext;
    const input = audioContext.createMediaStreamSource(stream);
    const outputMix = audioContext.createGain();
    input.connect(outputMix);
    outputMix.connect(audioContext.destination);
};

function play(navigator, document) {
    if (!browserSupportsMedia()) {
        return (alert("Error: getUserMedia not supported!"));
    } else {
        const constraints = app.constraints;
        navigator.mediaDevices.getUserMedia(constraints, s => getStream(s), function (e) {
            alert('Error getting audio');
            console.log(e);
        });
    }
};