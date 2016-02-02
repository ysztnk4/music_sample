$(function () {

    'use strict';

    //ローダー
    $(window).load(function () {
        setTimeout(function () {
            $('.loader').addClass('hide');
        }, 500);
        setTimeout(function () {
            $('.loader').remove();
        }, 1500);
    });

    /*/// audio & video ///*/
    var media_audio = document.getElementById('audio'),
        media_video = document.getElementById('video'),
        $media_audio = $('#audio'),
        $media_video = $('#video'),
        $video_close = $('#video_close');

    //アイテムをクリックしてから再生までの処理
    $('.item_link').click(function (e) {
        e.preventDefault();

        var $this = $(this);

        if ($this.hasClass('audio_link')) {
            //audioの場合
            $video_close.removeClass('active');
            media_video.pause();
            media_video.classList.remove('active');
            $media_audio.addClass('active');
            setTimeout(function () {
                media_video.load();
            }, 200);
            playerClasses();
            playerSetting($this, media_audio, $media_audio);
            playerInit(media_audio);
            itemSelected($this);

        } else if ($this.hasClass('video_link')) {
            //videoの場合
            $media_video.removeClass('hide');
            $video_close.addClass('active');
            media_audio.pause();
            media_audio.classList.remove('active');
            $media_video.addClass('active');
            setTimeout(function () {
                media_audio.load();
            }, 200);
            playerClasses();
            playerSetting($this, media_video, $media_video);
            playerInit(media_video);
            itemSelected($this);
        }
    });

    //クリックされたアイコン
    function itemSelected($this) {
        $this.addClass('active');
        $('.item_icon .fa', $this).addClass('anm_iconJump');
        setTimeout(function () {
            $('.item_icon .fa').removeClass('anm_iconJump');
        }, 500);
    }

    //プレーヤー及びのクラス操作
    function playerClasses() {
        $('.player').addClass('active');
        $('.item_link').removeClass('active');
        //スマートフォン場合のプレーヤーとメニューボタンのかぶり対策
        $('.sp_menu_btn').addClass('rize');

        if ($('.player_play').hasClass('active')) {
            $('.player_play').removeClass('active');
            $('.player_stop').addClass('active');
        }
    }

    //プレーヤーのセッティング
    function playerSetting(item_link, media, $media) {
        var $playerSource = $('#playerSource'),
            sourcePath = item_link.attr('href'),
            audioTitle = item_link.children('.item_header').children('.item_title').text(),
            audioSongTag = item_link.children('.item_header').children('.item_songTag').html();

        $('.player_title').text(audioTitle);
        $('.player_songTag').html(audioSongTag);

        $playerSource.remove();
        $media.prepend('<source src="' + sourcePath + '" type="audio/mp3" id="playerSource">');
        media.load();
        media.play();
    }

    //プレーヤーの初期値
    function playerInit(media) {
        media.addEventListener('timeupdate', function () {
            var now = Math.round(media.currentTime),
                all = Math.round(media.duration),
                all_per = all * 100,
                set_position = (now / all) * 100,
                $seek = $('.player_seek_input'),
                $vol = $('.player_volume_input');

            $seek.attr('max', all);
            $seek.on('input', function () {
                var val = $(this).val();
                media.currentTime = val;
            });
            $seek.change(function () {
                var val = $(this).val();
                media.currentTime = val;
            });
            $('.player_seek_point').css('width', +set_position + '%');

            $vol.on('input', function () {
                var vol_now = $(this).val(),
                    vol_min = vol_now / 100;
                media.volume = vol_min;
                $('.player_volume_point').css('width', +vol_now + '%');
            });
            $vol.change(function () {
                var vol_now = $(this).val(),
                    vol_min = vol_now / 100;
                media.volume = vol_min;
                $('.player_volume_point').css('width', +vol_now + '%');
                console.log(vol_now);
            });
        }, true);
    }

    //再生ボタン
    $('.player_play').click(function (e) {
        e.preventDefault();
        var $this = $(this);

        if ($media_audio.hasClass('active')) {
            playerPlay($this, media_audio, $media_audio);
        } else if ($media_video.hasClass('active')) {
            playerPlay($this, media_video, $media_video);
            $video_close.addClass('active');
            $media_video.removeClass('hide');
        }

    });

    //停止ボタン
    $('.player_stop').click(function (e) {
        e.preventDefault();
        var $this = $(this);

        if ($media_audio.hasClass('active')) {
            playerStop($this, media_audio, $media_audio);
        } else if ($media_video.hasClass('active')) {
            playerStop($this, media_video, $media_video);
            $video_close.removeClass('active');
            $media_video.addClass('hide');
        }
    });
    
    $video_close.click(function(){
        $(this).removeClass('active');
        $media_video.addClass('hide');
    });

    function playerPlay(play_btn, media, $media) {
        media.play();
        play_btn.removeClass('active');
        $('.player_stop').addClass('active');
    }

    function playerStop(stop_btn, media, $media                                                                                                                         ) {
        media.pause();
        stop_btn.removeClass('active');
        $('.player_play').addClass('active')
    }



    /* アイテムソート */
    $('.sortMenu_btn').click(function () {
        var sort_1 = $('#sortMenu_list_1_result').data('sort'),
            sort_2 = $('#sortMenu_list_2_result').data('sort'),
            sort_3 = $('#sortMenu_list_3_result').data('sort'),
            sortResult = '';

        $(this).addClass('active');
        $(this).parent().siblings().children('.sortMenu_btn').removeClass('active');

        if ($(this).parents('#sortMenu_list_1').length > 0) {
            var sort_type_1 = $(this).data('sort'),
                sort_1 = '.';
            sort_1 += sort_type_1;
        } else if ($(this).parents('#sortMenu_list_2').length > 0) {
            var sort_type_2 = $(this).data('sort'),
                sort_2 = '.';
            sort_2 += sort_type_2;
        } else if ($(this).parents('#sortMenu_list_3').length > 0) {
            var sort_type_3 = $(this).data('sort'),
                sort_3 = '.';
            sort_3 += sort_type_3;
        }

        console.log('1', sort_1, '2', sort_2, '3', sort_3);

        $('#sortMenu_list_1_result').text(sort_1).data('sort', sort_1);
        $('#sortMenu_list_2_result').text(sort_2).data('sort', sort_2);
        $('#sortMenu_list_3_result').text(sort_3).data('sort', sort_3);

        if (sort_1 == '.null' && sort_2 == '.null' && sort_3 == '.null') {
            var sortResult = '.item';
        } else if (sort_1 == '.null' && sort_2 == '.null') {
            var sortResult = sort_3;
        } else if (sort_2 == '.null' && sort_3 == '.null') {
            var sortResult = sort_1;
        } else if (sort_1 == '.null' && sort_3 == '.null') {
            var sortResult = sort_2;
        } else if (sort_1 == '.null') {
            var sortResult = sort_2 + sort_3;
        } else if (sort_2 == '.null') {
            var sortResult = sort_1 + sort_3;
        } else if (sort_3 == '.null') {
            var sortResult = sort_1 + sort_2;
        } else {
            var sortResult = sort_1 + sort_2 + sort_3;
        }

        console.log(sortResult);

        var $item_not = $('.item:not(' + sortResult + ')');
        $item_not.addClass('hide').slideUp();
        $(sortResult).removeClass('hide').slideDown();
    });

    //menu btn
    $('.sp_menu_btn').click(function () {
        $(this).toggleClass('active');
        $('.side,.main').toggleClass('active');
    });

    //スクロールするとロゴが半透明
    var $sp_header_logo = $('.sp_header_logo'),
        start = 0;

    $(window).scroll(function () {
        var current = $(this).scrollTop();
        if (current > start) {
            if ($(window).scrollTop() >= 100) {
                $sp_header_logo.addClass('hide');
            }
        } else {
            $sp_header_logo.removeClass('hide');
        }

        //start = current;
    });

});