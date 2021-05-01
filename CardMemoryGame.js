$(document).ready(function(){
    $('.whiteHeart').hide();
    $('.whiteHeart2').hide();
    $('.level2-whiteHeart').hide();
    $('.level2-whiteHeart2').hide();
    $('.level2-whiteHeart3').hide();

    $('.reload').on('click', function(){
        location.reload();
    });

    var cards = ["MickeyMouse.png", "MickeyMouse.png","Jerry.jpg","Jerry.jpg","Pikachu.png","Pikachu.png","Doraemon.png","Doraemon.png","Boom.png"];

    
    $(document).ready(function(){
        $('.overlay-text').on('click',function(){
            $(this).removeClass('visible');
            //init();
            shuffle();
            timer();
        });
    });

    function timer(){
        var timer = $('#time').text();

        window.countDown = setInterval(function(){
            timer--;
            $('#time').text(timer);
            if(timer === 0){
                gameOver();
            }
        }, 1000);
    }

    function shuffle() {
        var random = 0;
        var tmp = 0;

        for(i = 1; i < cards.length; i++){
            random = Math.round(Math.random() * i);
            tmp = cards[i];
            cards[i] = cards[random];
            cards[random] = tmp;
        }
        giveCards();
    }

    function giveCards(){
        $('.card').each(function(index){
            $(this).attr('src', cards[index]);
            $(this).attr('data-card-value', cards[index]);
        });
        clickHandle();
    }

    function clickHandle(){
        $('.card').on('click', function() {
            if(!$(this).hasClass('matched')){
                $(this).addClass('selected');
                if($('.selected').length <= 2){
                    $(this).html('<img src="'+$(this).data('cardValue')+'"/>');
                }
                if($('.selected').length === 2){
                    checkMatch();
                    injured();
                }
            }
        });
    }

    function checkMatch(){
        if($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
            $('.selected').each(function(){

                $(this).removeClass('selected');
                $(this).removeClass('unmatched');
                $(this).addClass('matched');
                var flips = $('#flips').text();
                flips = Number(flips) + 0.5;
                $('#flips').text(flips);

                var pairLeft = $('#pairLeft').text();
                pairLeft = Number(pairLeft) - 0.5;
                $('#pairLeft').text(pairLeft);
            });
            checkWin();
        }else {
            setTimeout(function(){
                $('.selected').each(function(){
                    $(this).html('').removeClass('selected');
                });
            }, 5000);
        }
    }

    function checkWin(){
        var flips = $('#flips').text();

        if(flips >= 4){
            victory();
        }
    }

    function victory(){
        $('#victory').addClass('visible');
        clearInterval(window.countDown);
    }

    function gameOver(){
        $('#game-over').addClass('visible');
        clearInterval(window.countDown);
    }

    function injured(){
        if($('.selected').first().data('cardValue') === "Boom.png" || $('.selected').last().data('cardValue') === "Boom.png"){
            $('.selected').each(function(){
                var livesLeft = $('#livesLeft').text();

                livesLeft = Number(livesLeft) - 0.5;

                $('#livesLeft').text(livesLeft);
            });
            checkBoom();
        }
    }

    function checkBoom(){
        var livesLeft = $('#livesLeft').text();

        if(livesLeft == 1){
            $('.heart').hide(2000);
            $('.whiteHeart').fadeIn(3000);
        }else if(livesLeft == 0){
            $('.heart2').hide();
            $('.whiteHeart2').fadeIn();
            gameOver();
        }
    }

});