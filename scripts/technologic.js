'use strict';


(function() {
    const content = document.getElementById("content");
    if (content != null) {
        const defaultTime = 420;
        const defaultblinktime = 80;

        const defaultTimeFast = 420;
        const defaultblinktimeFast = 80;

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
            {text: "FORMAT", time: defaultblinktime}
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
            {text: "UNLOCK", time: defaultblinktime}
        ];
		
		const otro = [
            {text: "NAME", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "READ", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "TUNE", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "PRINT", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "SCAN", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "SEND", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "FAX", time: defaultTime},
            {text: "RENAME", time: defaultTime},
            {text: "RENAME", time: defaultblinktime}
        ];
		
		const main = [
            {text: "BUY", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "USE", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "BREAK", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "FIX", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "TRASH", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "CHANGE", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "MAIL", time: defaultTimeFast},
            {text: "UPGRADE", time: defaultTimeFast},
            {text: "UPGRADE", time: defaultblinktimeFast},
			
			{text: "CHARGE", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "POINT", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "ZOOM", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "PRESS", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "SNAP", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "WORK", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "QUICK", time: defaultTimeFast},
            {text: "ERASE", time: defaultTimeFast},
            {text: "ERASE", time: defaultblinktimeFast},
			
			{text: "WRITE", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "CUT", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "PASTE", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "SAVE", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "LOAD", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "CHECK", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "QUICK", time: defaultTimeFast},
            {text: "REWRITE", time: defaultTimeFast},
            {text: "REWRITE", time: defaultblinktimeFast},
			
			{text: "PLUG", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "PLAY", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "BURN", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "RIP", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "DRAG", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "DROP", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "ZIP", time: defaultTimeFast},
            {text: "UNZIP", time: defaultTimeFast},
            {text: "UNZIP", time: defaultblinktimeFast},
			
			{text: "LOCK", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "FILL", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "CALL", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "FIND", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "VIEW", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "CODE", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "JAM", time: defaultTimeFast},
            {text: "UNLOCK", time: defaultTimeFast},
            {text: "UNLOCK", time: defaultblinktimeFast},
			
			
            {text: "SURF", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "SCROLL", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "PAUSE", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "CLICK", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "CROSS", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "CRACK", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "SWITCH", time: defaultTimeFast},
            {text: "UPDATE", time: defaultTimeFast},
            {text: "UPDATE", time: defaultblinktimeFast},
			
            {text: "NAME", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "READ", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "TUNE", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "PRINT", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "SCAN", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "SEND", time: defaultTimeFast},
            {text: "", time: defaultblinktimeFast},
            {text: "FAX", time: defaultTimeFast},
            {text: "RENAME", time: defaultTimeFast},
            {text: "RENAME", time: defaultblinktimeFast}
        ];

        const tech = [
            {text: "", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "", time: defaultTime},
            {text: "TECHNOLOGIC", time: defaultTime},
            {text: "TECHNOLOGIC", time: defaultblinktime}
        ];

        const next = [
            {text: "BUY", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "USE", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "BREAK", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "FIX", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "TRASH", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "CHANGE", time: defaultTime},
            {text: "", time: defaultblinktime},
            {text: "MAIL", time: defaultTime},
            {text: "UPGRADE", time: defaultTime},
            {text: "UPGRADE", time: defaultblinktime}
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

            ...end,
			...base,
			...base,
			...base,
			...base,
			...base,
			...base,
			...base,
			...base,
			
			...base,
			...base,
			...base,
			
			...otro,
			
			...base,
			...base,
			...base,
			...base,
			...base,
			...base,
			...base,
			...base,
			...base,
			...base,
			...base,
			...base,
			...base,
			...base,
			
			...main,
            ...base,
			
            ...main,
            ...base,

            ...tech,
            ...tech,

            ...main,
            ...base,

            ...base,
            ...next,

            ...base,
            ...next,

            ...main,
            ...base,
            ...base,
            ...next,
            ...base, //tech

            ...main,
            ...base

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