! function(e) {
  var t = Cookies.get("hide_popup");
  if (!t) {
    var l = e(".js-popup"), n = e(".js-popup-close");
    l.fadeIn(500), n.one("click", (function() {
      l.fadeOut(), t = 1, Cookies.set("hide_popup", t, {
        expires: 1,
        path: ""
      })
    }))
  }
}(jQuery, window, window.document);