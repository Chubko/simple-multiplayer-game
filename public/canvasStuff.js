// player.locX = Math.floor(500 * Math.random()+ 10); //horizontal axis
// player.locY = Math.floor(500 * Math.random()+ 10); //vertical axis

const draw = () => {
    //reset the context translate back to default
    context.setTransform(1, 0, 0, 1, 0, 0);

    //clearRect clears out the canvas, so we cam draw on a clean canvas next frame/draw()
    context.clearRect(0, 0, canvas.width, canvas.height);

    //clamp the screen/vp to the player's location (x,y)
    const camX = -player.locX + canvas.width / 2;
    const camY = -player.locY + canvas.height / 2;
    //translate moves the canvas/context to where player is at
    context.translate(camX, camY);

    //draw all the players
    players.forEach(p => {
        if (!p.playerData) {
            //if the playerData doesn't exist, this is an absorbed player and we don't draw
            return;
        }
        context.beginPath();
        context.fillStyle = p.playerData.color;
        context.arc(p.playerData.locX, p.playerData.locY, p.playerData.radius, 0, Math.PI * 2); //draw an arc/circle
        // context.arc(200, 200, 10, 0, Math.PI * 2); //draw an arc/circle
        //arg1 and arc2 are center x and center y of the arc
        //arg3 = radius of he circle
        //arg4 = where to start drawing in radians (0 = 3:00)
        //arg5 = where to stop drawing in radians (PI = 90deg)
        context.fill();
        context.lineWidth = 3; //how wide to draw a line in px
        context.strokeStyle = ("rgb(0, 255, 0)"); //draw a green line
        context.stroke(); //draw the line border
    });

    //draw all the orbs
    orbs.forEach(orb => {
        context.beginPath();//this will start a new path
        context.fillStyle = orb.color;
        context.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI * 2);
        context.fill();
    });
    //requestAnimationFrame is like a controled loop that runs recursively every paint/frame if the framerate is 35fps
    requestAnimationFrame(draw);
};


canvas.addEventListener("mousemove", (event) => {
    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    const angleDeg = Math.atan2(mousePosition.y - (canvas.height / 2), mousePosition.x - (canvas.width / 2)) * 180 / Math.PI;
    if (angleDeg >= 0 && angleDeg < 90) {
        xVector = 1 - (angleDeg / 90);
        yVector = -(angleDeg / 90);
    } else if (angleDeg >= 90 && angleDeg <= 180) {
        xVector = -(angleDeg - 90) / 90;
        yVector = -(1 - ((angleDeg - 90) / 90));
    } else if (angleDeg >= -180 && angleDeg < -90) {
        xVector = (angleDeg + 90) / 90;
        yVector = (1 + ((angleDeg + 90) / 90));
    } else if (angleDeg < 0 && angleDeg >= -90) {
        xVector = (angleDeg + 90) / 90;
        yVector = (1 - ((angleDeg + 90) / 90));
    }

    player.xVector = xVector || .1;
    player.yVector = yVector || .1;
});
