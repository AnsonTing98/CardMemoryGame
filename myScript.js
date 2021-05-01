$(document).ready(function(){

    $('.whiteHeart').hide();
    $('.whiteHeart2').hide();
    $('.level2-whiteHeart').hide();
    $('.level2-whiteHeart2').hide();
    $('.level2-whiteHeart3').hide();

    $('.reload').on('click', function(){
        location.reload();
    });

    $('.level2-reload').on('click', function(){
        location.reload();
    });

    var game = {
        cards: ["MickeyMouse.png", "MickeyMouse.png","Goofy.png","Goofy.png","Duck.png","Duck.png","Minnie.png","Minnie.png","Boom.jpeg"],
        init: function() {
            game.randomCards();
            game.timer();
        },
        timer: function() {
            var timer = $('#time').text();

            window.countDown = setInterval(function(){
                timer--;
                $('#time').text(timer);
                if(timer === 0){
                    game.gameOver();
                }
            }, 1000);
        },
        randomCards: function() {
            var random = 0;
            var tmp = 0;

            for(i = 1; i < game.cards.length; i++){
                random = Math.round(Math.random() * i);
                tmp = game.cards[i];
                game.cards[i] = game.cards[random];
                game.cards[random] = tmp;
            }
            game.giveCards();
        },
        giveCards: function() {
            $('.card').each(function(index){
                $(this).attr('src', game.cards[index]);
                $(this).attr('data-card-value', game.cards[index]);
            });
            game.clickHandle();
        },
        clickHandle: function() {
            $('.card').on('click', function() {
                if(!$(this).hasClass('matched')){
                    $(this).addClass('selected');
                    $(this).removeClass('flip-card-back');
                    if($('.selected').length <= 2){
                        $(this).addClass('checkMatch');
                        $(this).addClass('flip-card');
                        $(this).find('.card-back').html('<img src="'+$(this).data('cardValue')+'"/>');
                    }
                    if($('.selected').length == 1){
                        $(this).addClass('first');
                        game.firstBoom();
                    }
                    if($('.selected').length == 2){
                        $(this).addClass('second');
                        game.cardMatch();
                        game.secondBoom();
                        
                    }
                }
            });
        },
        cardMatch: function() {
            if($('.checkMatch').first().data('cardValue') == $('.checkMatch').last().data('cardValue')) {
                $('.checkMatch').each(function(){
                    $(this).removeClass('selected');
                    $(this).removeClass('checkMatch');
                    $(this).addClass('matched');
                    $(this).removeClass('first');
                    $(this).removeClass('second');

                    var flips = $('#flips').text();
                    flips = Number(flips) + 0.5;
                    $('#flips').text(flips);

                    var pairLeft = $('#pairLeft').text();
                    pairLeft = Number(pairLeft) - 0.5;
                    $('#pairLeft').text(pairLeft);
                });
                game.checkWin();
            }else {
                setTimeout(function(){
                    $('.checkMatch').each(function(){
                        $(this).removeClass('selected');
                        $(this).find('card-back').html('');
                        $(this).removeClass('flip-card');
                        $(this).removeClass('checkMatch');
                        $(this).removeClass('first');
                        $(this).removeClass('second');
                        $(this).addClass('flip-card-back');
                    });
                    $('.selected').each(function(){
                        $(this).removeClass('selected');
                    });
                }, 5000);
            }
        },
        checkWin: function() {
            var flips = $('#flips').text();

            if(flips >= 4){
                game.victory();
            }
        },
        firstBoom: function() {
            if($('.first').data("cardValue") === "Boom.jpeg"){
                var livesLeft = $('#livesLeft').text();
                livesLeft = Number(livesLeft) - 1;
                $('#livesLeft').text(livesLeft);

                game.checkBoom(); 
            }
        },
        secondBoom: function() {
            if($('.second').data("cardValue") === "Boom.jpeg"){
                var livesLeft = $('#livesLeft').text();
                livesLeft = Number(livesLeft) - 1;
                $('#livesLeft').text(livesLeft);

                game.checkBoom(); 
            }
        },
        checkBoom: function() {
            var livesLeft = $('#livesLeft').text();

            if(livesLeft == 1){
                $('.heart').hide(2000);
                $('.whiteHeart').fadeIn(3000);
            }else if(livesLeft == 0){
                $('.heart2').hide();
                $('.whiteHeart2').fadeIn();
                game.gameOver();
            }
        },
        gameOver: function() {
            $('#game-over').addClass('visible');
            clearInterval(window.countDown);
        },
        victory: function() {
            $('#victory').addClass('visible');
            clearInterval(window.countDown);
        }
    };

    $('.overlay-text').on('click',function(){
        $(this).removeClass('visible');
        game.init();
    });

    var level2 = {
        cards: ["Tanjirou.jpg","Tanjirou.jpg","Inosuke.jpg","Inosuke.jpg","Kyojuro.jpg","Kyojuro.jpg","Zenitsu.jpg","Zenitsu.jpg","Giyuu.jpg","Giyuu.jpg","Demon.jpg","Demon2.jpg"],
        init:function() {
            level2.randomCards();
            level2.level2Timer();
        },
        level2Timer:function() {
            var level2Timer = $('#level2-time').text();

            window.countDown2 = setInterval(function(){
                level2Timer--;
                $('#level2-time').text(level2Timer);
                if(level2Timer === 0){
                    level2.gameOver();
                }
            }, 1000);
        },
        randomCards:function() {
            var random = 0;
            var tmp = 0;

            for(i = 1; i < level2.cards.length; i++){
                random = Math.round(Math.random() * i);
                tmp = level2.cards[i];
                level2.cards[i] = level2.cards[random];
                level2.cards[random] = tmp;
            }
            level2.giveCards();
        },
        giveCards:function() {
            $('.cards').each(function(index){
                $(this).attr('src', level2.cards[index]);
                $(this).attr('data-card-value', level2.cards[index]);
            });
            level2.clickHandle();
        },
        clickHandle:function() {
            $('.cards').on('click', function() {
                if(!$(this).hasClass('cardMatched')){
                    $(this).addClass('cardSelected');
                    $(this).removeClass('flip-card-back');
                    if($('.cardSelected').length <= 2){
                        $(this).addClass('cardCheckMatch');
                        $(this).addClass('flip-card');
                        $(this).find('.cards-back').html('<img src="'+$(this).data('cardValue')+'"/>');
                    }
                    if($('.cardSelected').length == 1){
                        $(this).addClass('firstCard');
                        level2.firstBoom();
                    }
                    if($('.cardSelected').length == 2){
                        $(this).addClass('secondCard');
                        level2.cardMatch();
                        level2.secondBoom();
                    }
                }
            });
        },
        cardMatch:function() {
            if($('.cardCheckMatch').first().data('cardValue') == $('.cardCheckMatch').last().data('cardValue')) {
                $('.cardCheckMatch').each(function(){
                    $(this).removeClass('cardSelected');
                    $(this).removeClass('cardCheckMatch');
                    $(this).addClass('cardMatched');
                    $(this).removeClass('firstCard');
                    $(this).removeClass('secondCard');

                    var flips = $('#level2-flips').text();
                    flips = Number(flips) + 0.5;
                    $('#level2-flips').text(flips);

                    var pairLeft = $('#level2-pairLeft').text();
                    pairLeft = Number(pairLeft) - 0.5;
                    $('#level2-pairLeft').text(pairLeft);
                });
                level2.checkWin();
            }else {
                setTimeout(function(){
                    $('.cardCheckMatch').each(function(){
                        $(this).removeClass('cardSelected');
                        $(this).find('card-back').html('');
                        $(this).removeClass('flip-card');
                        $(this).removeClass('cardCheckMatch');
                        $(this).removeClass('firstCard');
                        $(this).removeClass('secondCard');
                        $(this).addClass('flip-card-back');
                    });
                    $('.cardSelected').each(function(){
                        $(this).removeClass("cardSelected");
                    });
                }, 5000);
            }
        },
        checkWin:function() {
            var flips = $('#level2-flips').text();

            if(flips >= 5){
                level2.victory();
            }
        },
        firstBoom: function() {
            if($('.firstCard').data("cardValue") === "Demon.jpg" || $(".firstCard").data("cardValue") === "Demon2.jpg"){
                var livesLeft = $('#level2-livesLeft').text();
                livesLeft = Number(livesLeft) - 1;
                $('#level2-livesLeft').text(livesLeft);
                
                level2.checkBoom();
            }
        },
        secondBoom: function(){
            if($('.secondCard').data("cardValue") === "Demon.jpg" || $(".secondCard").data("cardValue") === "Demon2.jpg"){
                var livesLeft = $('#level2-livesLeft').text();
                livesLeft = Number(livesLeft) - 1;
                $('#level2-livesLeft').text(livesLeft);
                
                level2.checkBoom();
            }
        },
        checkBoom: function() {
            var livesLeft = $('#level2-livesLeft').text();

            if(livesLeft == 2){
                $('.level2-heart').hide(2000);
                $('.level2-whiteHeart').fadeIn(3000);
            }else if(livesLeft == 1){
                $('.level2-heart2').hide(2000);
                $('.level2-whiteHeart2').fadeIn(3000);
            }else if(livesLeft == 0){
                $('.level2-heart3').hide();
                $('.level2-whiteHeart3').fadeIn();
                level2.gameOver();
            }
        },
        gameOver: function() {
            $('#level2-game-over').addClass('visible');
            clearInterval(window.countDown2);
        },
        victory: function() {
            $('#level2-victory').addClass('visible');
            clearInterval(window.countDown2);
        }
    };

    $('.level2-overlay-text').on('click',function(){
        $(this).removeClass('visible');
        //level2.reset();
        level2.init();
    });

});