// $(document).ready(function()
// {


    var c_canvas = document.getElementById("ground");
    var context = c_canvas.getContext("2d");
    var width       = window.innerWidth,
        height      = window.innerHeight;
    var 
        start = 0;
        posX = width/2,
        posY = height/2,
        dir         = -3,
        prevdir     = -5,
        cnt         = 0, 
        speed       = 3, 
        size        = 10,
        arrX        = [],
        arrY        = [],
        AppX        = 100,
        AppY        = 100,
        score       = 0,
        highscore   = 0;
        console.log(width, height);
        c_canvas.width = width;
        c_canvas.height = height;
        AppGen();

    $("#btn").hover(function(){
        $(this).css("background-color", "green");
        }, function(){
        $(this).css("background-color", "orangered");
        });

    $("#btn").click(function()
    {
        // $("#menu").css("display", "none");
        $("#menu").fadeOut("slow");
        start = 1;
        dir = 2;
    }); 
    function NewGame()
    {
        start = 1;
        posX = width/2;
        posY = height/2;
        console.log('Hola');
        dir         = 2,
        prevdir     = -5,
        cnt         = 0, 
        speed       = 3, 
        size        = 10,
        arrX        = [],
        arrY        = [],
        highscore   = Math.max(score, highscore),
        score       = 0;
        context.clearRect(0, 0, width, height);
        AppGen();
        document.getElementById("highscore").innerHTML = "highscore:" + highscore;
    }
    // NewGame();
    
    function AppGen()
    {
        context.clearRect(AppX, AppY, 20, 20);
        var flag;
        while(true)
        {
            flag = 0;
            AppX = Math.floor(Math.random() * (width-100));
            AppY = Math.floor(Math.random() * (height-100));
            console.log(AppX + ' ' + AppY);
            for(var i = 0; i < arrX.length; i++)
            {
                if(Math.abs(AppX - arrX[i]) <= 20 && Math.abs(AppY- arrY[i]) <= 20)
                {
                    flag = 1;
                }
            }
    
            // if(AppY > (height - 0.18*width) && AppX > 0.41*width && posX < 0.59*width)
            // {
            //     flag = 1;
            // }
            if(flag == 0)
            {
                break;    
            }

        }
        document.getElementById("counter").textContent= "score:" + score;
        context.fillStyle = "red";
        context.fillRect(AppX, AppY, 20, 20);
        size += 10;
        speed += 0.5;
    }
    
    document.addEventListener('keydown', function(event)
    {
        console.log(event.keyCode);
        if(event.keyCode >= 37 && event.keyCode <= 40 && start == 1)
        {
            dir = event.keyCode - 37;
        }
    });
    
    //The code executed only if start button is pressed
    setInterval(function(){ move(dir) }, 1000/60);
    function move(dir)
    {            
        console.log(posX + ' ' + posY + ' == ' + AppX + ' ' + AppY);
        cnt++;
        if(Math.abs(dir-prevdir) == 2)
        {
            dir = prevdir;
        }
        arrX.push(posX);
        arrY.push(posY);
        // console.log(arrX[0])
        if(arrX.length >= size)
        {
            arrX.shift();
            arrY.shift();
        }
        // if(arrX.length >= 50)
        for(var i = 5; i < arrX.length - 20; i++)
        {
            if(Math.abs(arrX[i] -posX) <= 20 && Math.abs(arrY[i] - posY) <= 20)
            {
                alert('Game Over '+score);
                NewGame();
            }
        }
        context.clearRect(arrX[0] - 1,arrY[0] - 1, 22, 22);
        if(dir == 0)
        {
            posX -= speed;
        }
        if(dir == 1)
        {
            posY -= speed;
        }
        if(dir == 2)
        {
            posX += speed;
        }
        if(dir == 3)
        {
            posY += speed;
        }
        if(posX > width-20)
            posX = 0;
        if(posX < 0)
            posX = width-20 
        if(posY > height)
            posY = 0;
        if(posY < 0)
            posY = height;
        
        
        if(Math.abs(posX - AppX) <= 20  && Math.abs(posY - AppY) <= 20)
        {
            // alert("Eaten");
            score++;
            AppGen();
        }
        prevdir = dir;
        context.fillStyle = "orangered";
        context.fillRect(posX, posY, 20, 20);   
    }

    
// });
function direct(nap)
    {
        dir = nap;
        console.log('hola');
    }
    document.getElementById("highscore").addEventListener("click",function()
    {
        NewGame();
    });