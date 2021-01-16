'use strict';


(function() {
    const content = document.getElementById("content");
    if (content != null) {
        const defaultTime = 400;
        const defaultblinktime = 60;
        const data = [
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
            {text: "", time: defaultblinktime},
            {text: "FORMAT", time: defaultTime},
            {text: "", time: defaultblinktime * 2},
        ];
        var index = 0;
        var len = data.length;
        var timer = null;
        const timerHandler = () => {
            let item = data[index];
            content.textContent = item.text;
            index = (index +1) % len;
            timer = setTimeout(timerHandler, item.time);
        };
        timer = setTimeout(timerHandler, defaultTime);
    }
})();