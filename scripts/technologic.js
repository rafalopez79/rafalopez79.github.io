'use strict';


(function() {
    const content = document.getElementById("content");
    if (content != null) {
        const defaultTime = 420;
        const defaultblinktime = 80;
        const base = [
            {text: "TOUCH", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "BRING", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "PAY", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "WATCH", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "TURN", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "LEAVE", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "START", time: defaultTime},
            {text: "FORMAT", time: defaultTime},
            {text: "", time: defaultblinktime}
        ];
        const fuck = [
            {text: "FUCK", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "FUCK", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "FUCK", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "FUCK", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "FUCK", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "FUCK", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "FUCK", time: defaultTime - defaultblinktime},
            {text: "", time: defaultblinktime},
            {text: "FUCK", time: defaultTime},
            {text: "", time: defaultblinktime}
        ];

        const end = [
            {text: "LOCK", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "FILL", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "CALL", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "FIND", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "VIEW", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "CODE", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "JAM", time: defaultTime},
            {text: "UNLOCK", time: defaultTime},
            {text: "", time: defaultblinktime}
        ];


        const data = [ 
            ...base,
            ...base,
            ...base,
            ...base,
            ...base,
            ...base,
            ...base,
            ...base,

            ...fuck,
            ...fuck,
            ...fuck,

            ...end
        ];

        var index = 0;
        var len = data.length;
        var running = true;
        var timer = null;
        const timerHandler = () => {
            let item = data[index];
            let text =  item.text;
            content.textContent = text;
            index = (index +1) % len;
            timer = setTimeout(timerHandler, item.time);
        };
        timer = setTimeout(timerHandler, defaultTime);

        const onClick = () => {
            running = !running;
            if (!running) {
                clearTimeout(timer);
            } else {
                timer = setTimeout(timerHandler, defaultTime);
            }
        }

        content.addEventListener("click", onClick);
    }
})();