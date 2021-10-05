$(document).ready(function () {
    var plane = document.getElementById('element1');
    var rocket = document.getElementById('element2');
    plane.homePos = { x: plane.offsetLeft, y: plane.offsetTop };
    rocket.homePos = { x: rocket.offsetLeft, y: rocket.offsetTop };
    
    $('#wrapper_header').mousemove(function (e) {
        parallax(e, plane, 80);
        parallax(e, rocket, 20);
    });
});

function parallax(e, target, layer) {
    var x = target.homePos.x - (e.pageX - target.homePos.x) / layer;
    var y = target.homePos.y - (e.pageY - target.homePos.y) / layer;
    $(target).offset({ top: y ,left : x });
};