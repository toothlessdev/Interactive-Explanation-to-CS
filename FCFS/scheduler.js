const colors = ["rgba(0,0,0,0)", "#e77614", "#28a92b", "#8d3dae", "#ff3333", "#6666ff ", "#ff00ff", "#ffffff"];

let tasks = [0, 1, 1, 2, 3, 3];
let task_index = 0;
let color_index = 0;

for (let i = 0; i < tasks.length; i++) {
    console.log(i, tasks[i], colors[tasks[i]]);
    $(".timeslice").eq(i).css("background-color", colors[tasks[i]]);
}

// merge same color
for (let i = 0; i < tasks.length; i++) {
    if (tasks[i] == tasks[i + 1]) {
        console.log(i, i + 1);
        $(".timeslice").eq(i).css("border-top-right-radius", "0px");
        $(".timeslice").eq(i).css("border-bottom-right-radius", "0px");
        $(".timeslice")
            .eq(i + 1)
            .css("border-top-left-radius", "0px");
        $(".timeslice")
            .eq(i + 1)
            .css("border-bottom-left-radius", "0px");
    }
}

let state = "stop";

let tick;
let dx = 0;
let elapsedTime = 0.0;
let tick_precision = 100;
let timeline_timeslice = 7;

let timeline_width = $(".timeline-ui-row").css("width");
let timeslice_width = $(".timeline-ui-row > li").css("width");

$("#play").on("click", function () {
    if (state == "stop") {
        state = "play";
        $(".timeline-ui-cursor").css("transition", "all 0s linear");
        tick = setInterval(function () {
            $(".timeline-ui-cursor").css("transform", "translateX(" + dx + "px)");
            $(".timeline-ui-current-time").text(elapsedTime.toFixed(2));
            if (tasks[parseInt(elapsedTime)] == undefined || tasks[parseInt(elapsedTime)] == 0) {
                $(".timeline-ui-current-process").text("Idle");
            } else {
                $(".timeline-ui-current-process").text("P" + tasks[parseInt(elapsedTime)] + " running");
            }

            elapsedTime += 1 / tick_precision;
            dx += parseInt(timeslice_width) / tick_precision;

            if (parseInt(elapsedTime) >= 7) {
                clearInterval(tick);
            }
        }, 1000 / tick_precision);
    }
});

$("#stop").on("click", function () {
    if (state == "play") {
        state = "stop";
        console.log("stop");
        clearInterval(tick);
    }
});

$("#reset").on("click", function () {
    if (state == "stop") {
        dx = 0;
        elapsedTime = 0.0;
        $(".timeline-ui-cursor").css("transition", "all 1s linear");
        $(".timeline-ui-cursor").css("transform", "translateX(0px)");

        $(".timeline-ui-current-time").text("0.00");
    }
});
