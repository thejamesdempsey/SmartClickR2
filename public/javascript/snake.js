(function ($) {
    var canvas = document.getElementById('c'),
        c = canvas.getContext('2d'),
        height, width, pixelsize, rate,
        dir, newdir, snake = [], food = [], score,
        gstarted = false, gpaused = false;
    

	window.addEventListener("keydown", function(e) {
	    // space and arrow keys
	    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
	        e.preventDefault();
	    }
	}, false);
	
    function setup(h, w, ps, r) {
        height = h;
        width = w;
        pixelsize = ps;
        rate = r;
        canvas.height = h*ps;
        canvas.width = w*ps;
        $(document).keydown(function (e) {
            switch(e.which) {
                case 38:
                    if(dir != 2) {
                        newdir = 0;
                    }
                    break;
                case 39:
                    if(dir != 3) {
                        newdir = 1;
                    }
                    break;
                case 40:
                    if(dir != 0) {
                        newdir = 2;
                    }
                    break;
                case 37:
                    if(dir != 1) {
                        newdir = 3;
                    }
                    break;
                case 32:
                    if(!gstarted) {
                        startGame();
                    }
                    else {
                        togglePause();
                    }
                    break;
            }
        });
        showIntro();
    }
    
    function showIntro() {
        c.fillStyle = '#fff';
        c.fillRect(0, 0, width*pixelsize, height*pixelsize);
        c.fillStyle = '#3f4b51';
        c.font = '30px sans-serif';
        c.textAlign = 'center';
        c.fillText('Snake', width/2*pixelsize, height/4*pixelsize, width*pixelsize);
        c.font = '16px sans-serif';
        c.fillStyle = '#f07057';

        c.fillText('Arrows = change direction.', width/2*pixelsize, height/2.5*pixelsize);
        c.fillText('Space = start/pause.', width/2*pixelsize, height/2*pixelsize);
    }
    
    function startGame() {
        var x = Math.floor(width/2), y = Math.floor(height/2);
        genFood();
        snake = [
            [x, y],
            [--x, y],
            [--x, y],
            [--x, y]
        ];
        dir = 1;
        newdir = 1;
        score = 0;
        gstarted = true;
        gpaused = false;
        frame();
    }
    
    function endGame() {
        gstarted = false;
        c.fillStyle = '#fff';
        c.fillRect(0, 0, width*pixelsize, height*pixelsize);
        c.fillStyle = '#3f4b51';
        c.font = '26px sans-serif';
        c.textAlign = 'center';
        c.fillText('Game Over',  width/2*pixelsize, height/4*pixelsize);
        c.fillStyle = '#3f4b51';
        c.font = '16px sans-serif';
        c.fillStyle = '#f07057';
        c.fillText('Your Score: ' + score, width/2*pixelsize, height/3*pixelsize);
        c.font = '22px sans-serif';
        c.fillStyle = '#3f4b51';

        c.fillText('High Scores', width/2*pixelsize, height/2.2*pixelsize);
        c.font = '16px sans-serif';
        c.fillStyle = '#f07057';

        c.fillText('Billy: 800', width/2*pixelsize, height/1.9*pixelsize);
        c.fillText('Daniel: 510', width/2*pixelsize, height/1.7*pixelsize);

        c.fillStyle = '#3f4b51';

        c.fillText('Press the spacebar to play again.', width/2*pixelsize, height/1.3*pixelsize);
    }
    
    function togglePause() {
        if(!gpaused) {
            gpaused = true;
	        c.fillStyle = 'rgba(0,0,0,0.8)';
	        c.fillRect(0, 0, width*pixelsize, height*pixelsize);
            c.fillStyle = '#fff';
            c.font = '20px sans-serif';
            c.textAlign = 'center';
            c.fillText('Paused', width/2*pixelsize, height/2*pixelsize);
	        c.font = '16px sans-serif';
	        c.fillText('Score: ' + score, width/2*pixelsize, height/1.7*pixelsize);
        }
        else {
            gpaused = false;
            frame();
        }
    }
    
    function frame() {
        if(!gstarted || gpaused) {
            return;
        }
        var x = snake[0][0], y = snake[0][1];
        switch(newdir) {
            case 0:
                y--;
                break;
            case 1:
                x++;
                break;
            case 2:
                y++;
                break;
            case 3:
                x--;
                break;
        }
        if(testCollision(x, y)) {
            endGame();
            return;
        }
        snake.unshift([x, y]);
        if(x == food[0] && y == food[1]) {
            score++;
            genFood();
        }
        else {
            snake.pop();
        }
        dir = newdir;
        c.fillStyle = '#fff';
        c.fillRect(0, 0, width*pixelsize, height*pixelsize);
        c.fillStyle = '#4c8ab0';
		c.strokeRect(0, 0, width, height);

        drawFood();
        drawSnake();
		c.fillStyle = '#3f4b51';
		c.textAlign = 'right';
        c.font = '16px sans-serif';
        c.fillText('Score: ' + score, width/5.6*pixelsize, height/1.01*pixelsize);
        
        setTimeout(frame, rate);
    }
    
    function genFood() {
        var x, y;
        do {
            x = Math.floor(Math.random()*(width-1));
            y = Math.floor(Math.random()*(height-1));
        } while(testCollision(x, y));
        food = [x, y];
    }
    
    function drawFood() {
        c.beginPath();
        c.arc((food[0]*pixelsize)+pixelsize/2, (food[1]*pixelsize)+pixelsize/2, pixelsize/2, 0, Math.PI*2, false);
        c.fill();
    }
    
    function drawSnake() {
        var i, l, x, y;
        for(i = 0, l = snake.length; i < l; i++) {
            x = snake[i][0];
            y = snake[i][1];
            c.fillRect(x*pixelsize, y*pixelsize, pixelsize, pixelsize);
        }
    }
    
    function testCollision(x, y) {
        var i, l;
        if(x < 0 || x > width-1) {
            return true;
        }
        if(y < 0 || y > height-1) {
            return true;
        }
        for(i = 0, l = snake.length; i < l; i++) {
            if(x == snake[i][0] && y == snake[i][1]) {
                return true;
            }
        }
        return false;
    }
    
    setup(35, 35, 10, 80);
}(jQuery));
