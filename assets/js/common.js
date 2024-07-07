//ヘッダーナビゲーション
$(function () {
  const $menuButton = $(".js-header-menu-button");
  const $langButton = $(".js-lang a");
  const $searchButton = $(".js-search a");
  const $openInfoButton = $(".js-open-info");
  const $pageShadow = $(".js-shadow");
  const $closeButton = $(".js-nav-close, .js-shadow, .js-box-space, .js-lang-list a, .icon-menu a");

  function removeActive() {
    $(".js-body").removeClass("fixed");
    $(".js-header-menu-button, .js-lang, .js-lang-box, .js-open-info, .js-open-info-box,.js-search, .js-search-box,.js-nav-box, .js-shadow").removeClass("active");
  }
  function shadowActive() {
    $(".js-body").toggleClass("fixed");
    $(".js-slide-nav").addClass("hide");
    $(".js-shadow").toggleClass("active");
  }

  $menuButton.on("click", function () {
    if ($pageShadow.hasClass("active")) {
      removeActive();
    } else {
      shadowActive();
      $(this).toggleClass("active");
      $(".js-nav-box").toggleClass("active");
    }
  });
  $langButton.on("click", function () {
    if ($pageShadow.hasClass("active")) {
      removeActive();
      return false;
    } else {
      shadowActive();
      $(".js-lang, .js-lang-box").toggleClass("active");
      return false;
    }
  });
  $searchButton.on("click", function () {
    if ($pageShadow.hasClass("active")) {
      removeActive();
      return false;
    } else {
      shadowActive();
      $(".js-search-box, .js-search").toggleClass("active");
      return false;
    }
  });
  $openInfoButton.on("click", function () {
    if ($pageShadow.hasClass("active") && $(".js-open-info-box").hasClass("active")) {
      removeActive();
      return false;
    } else if ($pageShadow.hasClass("active") && $menuButton.hasClass("active")) {
      $(".js-nav-box, .js-open-info, .js-open-info-box").toggleClass("active");
      return false;
    } else if ($pageShadow.hasClass("active")) {
      removeActive();
      return false;
    } else {
      shadowActive();
      $(".js-open-info, .js-open-info-box").toggleClass("active");
      return false;
    }
  });
  $closeButton.on("click", function () {
    removeActive();
  });
});

//言語取得
$(function(){
  let lang  = 0;
  function langSetting(lang) {
    if (lang == "简体" || lang == "繁體") {
      $(".js-lang-list").addClass("ch");
    } else if (lang == "한국어"){
      $(".js-lang, .js-lang-list").addClass("ko");
    }
  };
  
  setTimeout(function(){
    let lang  = $(".js-lang-list a[data-stt-active]").text();
    $(".js-lang .current-lang").text(lang);
    langSetting(lang);
  },1000);

  $(".js-lang-list a").on("click", function () {
    $(".js-lang, .js-lang-list").removeClass("ch ko");
    lang = $(this).text();
    $(".js-lang .current-lang").text(lang);
    langSetting(lang);
  });

  langSetting();
});


//スライドナビ
$(function () {
  let pos = 0;
  const $slideNav = $(".js-slide-nav");
  const menuPos = 600;

  $(window).on("load scroll", function () {
    if ($(".js-shadow").hasClass("active")) {
      $slideNav.addClass("hide");
    } else if ($(this).scrollTop() < menuPos) {
      //トップページでメニューより上にある場合
      $slideNav.addClass("hide");
      setTimeout(function () {
        $slideNav.removeClass("visibility");
      }, 1000);
    } else if ($(this).scrollTop() < pos) {
      //上にスクロールしたとき
      $slideNav.removeClass("hide");
      $slideNav.addClass("visibility");
    } else {
      //下にスクロールしたとき
      $slideNav.addClass("hide");
    }
    pos = $(this).scrollTop();
  });
});

//横スクロール
$(window).on("scroll", function () {
  $fixedBox = $(".header-inner, .js-nav-box, .js-slide-nav, .js-search-box, .js-lang-box, .js-open-info-box, .js-fixed-banner, .js-portal-box");
  $fixedBox.css("left", -$(window).scrollLeft());
});

//フェードイン
$(function() {
  const $FadeUp = $(".js-fadeup");
  setTimeout(function(){
    $(window).on("load scroll", function () {
      const windowHeight = $(window).height();
      const scroll = $(window).scrollTop();

      $FadeUp.each(function () {
        const targetPosition = $(this).offset().top;
        if (scroll > targetPosition - windowHeight + 100) {
          $(this).addClass("fadein");
        }
      });
    });
    window.scrollBy(0,1);
  },300);
});

//スライダー
$(function () {
  $(".js-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    pauseOnHover: false,
    asNavFor: ".js-slider-nav",
  });
  $(".js-slider-nav").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    pauseOnHover: false,
    asNavFor: ".js-slider",
    focusOnSelect: true,
    prevArrow: '<div class="slide-arrow prev-arrow"><span class="material-symbols-outlined">arrow_back_ios</span></div>',
    nextArrow: '<div class="slide-arrow next-arrow"><span class="material-symbols-outlined">arrow_forward_ios</span></div>',
    responsive: [
      {
        breakpoint: 767.9999, //モニターの横幅が767.9999px以下の見せ方
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });
});

//2ndページスライダー
$(function () {
  $(".js-slider-common").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    pauseOnHover: false,
    prevArrow: '<div class="slide-arrow prev-arrow"><span class="material-symbols-outlined">arrow_back_ios</span></div>',
    nextArrow: '<div class="slide-arrow next-arrow"><span class="material-symbols-outlined">arrow_forward_ios</span></div>',
    responsive: [
      {
        breakpoint: 767.9999, //モニターの横幅が767.9999px以下の見せ方
        settings: {
          arrows: false,
        },
      },
    ],
  });
});

//カテゴリーボタン
$(function () {
  $(".js-category-select a").on("click", function () {
    $(".js-category-select a").removeClass("active");
    $(this).toggleClass("active");
    if ($(this).is("[id=all],.all")) {
      $("[id=all],.all").addClass("active");
      $(".js-item-list li").removeClass("hide");
    } else {
      $(".js-item-list li").addClass("hide");
      let category = $(this).attr("id");
      $(".js-item-list ." + category).removeClass("hide");
    };
    if ($(".js-fadeup").hasClass("fadein")) {
      $(".js-fadeup").removeClass("fadein");
    };
    window.scrollBy(0,1);
    return false;
  });
});

//タブ切り替えボタン
$(function () {
  $(".js-tab-list a").on("click", function () {
    $(".js-tab-list li").removeClass("active");
    $(".js-tab-item").addClass("hide");
    $(this).parent().toggleClass("active");
    let category = $(this).attr("id");
    $(".js-tab-item." + category).removeClass("hide");
    if ($(".js-fadeup").hasClass("fadein")) {
      $(".js-fadeup").removeClass("fadein");
    };
  window.scrollBy(0,1);
  return false;
  });
});

//つづきを見る
$(function(){
	var num = 8; //表示個数
	var i_num = 8; //初期表示個数
	$('.js-item-box').each(function() {
		$('.js-item-list > li:gt('+ (i_num - 1) +')',this).addClass('none');
		if ($('.js-item-list > li',this).length > i_num) {
			$('.js-trigger-button',this).removeClass('none');
		}
	});
	$('.js-item-box .js-trigger-button').on('click', function() { 
		var h_tag = $(this).parents('.js-item-box').find('.js-item-list li.none');
		var h_tag_num = h_tag.length;
		h_tag.slice(0, num).slideDown('fast').removeClass('none');
		if (num >= h_tag_num) {
			$(this).addClass('none');
		}
	});
});

//URLパラメーター取得
$(function () {
  function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  let areaNum = getParam("a");
  let categoryNum = getParam("c");
  if (areaNum) {
    $(".js-area-select dl").removeClass("active");
    $(".a" + areaNum).toggleClass("active");
    $(".js-area-list>li").addClass("hide");
    let area = $(".a" + areaNum).find("a").attr("id");
    $(".js-area-list ." + area).removeClass("hide");
    if ($(".js-fadeup").hasClass("fadein")) {
      $(".js-fadeup").removeClass("fadein");
    };
    window.scrollBy(0,1);
  }
  if (categoryNum) {
    $(".js-category-select a").removeClass("active");
    $(".c" + categoryNum).toggleClass("active");
    if ($(".c" + categoryNum).is("[id=all],.all")) {
      $("[id=all],.all").addClass("active");
      $(".js-item-list li").removeClass("hide");
    } else {
      $(".js-item-list li").addClass("hide");
      let category = $(".c" + categoryNum).attr("id");
      $(".js-item-list ." + category).removeClass("hide");
    };
    if ($(".js-fadeup").hasClass("fadein")) {
      $(".js-fadeup").removeClass("fadein");
    };
    window.scrollBy(0,1);
  }
});

//エリア選択ボタン
$(function () {
  $(".js-area-select a").on("click", function () {
    $(".js-area-select dl").removeClass("active");
    $(this).parent().parent().toggleClass("active");
    $(".js-area-list>li").addClass("hide");
    let area = $(this).attr("id");
    $(".js-area-list ." + area).removeClass("hide");
    if ($(".js-fadeup").hasClass("fadein")) {
      $(".js-fadeup").removeClass("fadein");
    };
    window.scrollBy(0,1);
  });
});

//（フッター）アコーディオン
$(function () {
  $(".js-footer-menu dt, .js-accordion > dt").on("click", function () {
    $(this).next().slideToggle();
    $(this).toggleClass("open");
  });
});

//ページトップ
function PageTopAnime() {
  const scroll = $(window).scrollTop();
  if (scroll >= 200) {
    $(".js-go-top").removeClass("DownMove");
    $(".js-go-top").addClass("UpMove");
  } else {
    if ($(".js-go-top").hasClass("UpMove")) {
      $(".js-go-top").removeClass("UpMove");
      $(".js-go-top").addClass("DownMove");
    }
  }
}
$(window).on("scroll", function () {
  PageTopAnime();
});
$(".js-go-top").on("click", function () {
  $("body,html").animate({
      scrollTop: 0,
    }, 500);
  return false;
});

//ページスクロール
$('a[href^="#"]').on('click', function () {
  const speed = 500;
  const href = $(this).attr('href');
  const target = $(href == '#' || href == "" ? 'html' : href);
  const position = target.offset().top;
  
  $('body,html').animate({
  scrollTop: position
  }, speed, 'swing');
  setTimeout(function(){
    window.scrollBy(0,1);
  },550);
  return false;
  });

