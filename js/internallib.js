function createWindow() {
    $(".window").each(function(e, t) {
        t = $(t);
        var n = $('<div class="outer"/>');
        var r = $('<div class="inner"/>');
        r.append(t.children()).appendTo(n);
        t.append('<div class="up-left"></div><div class="up-right"></div>');
        n.appendTo(t);
        t.append('<div class="dn-left"></div><div class="dn-right"></div>');
    }).appendTo("body");
}

(function(e) {
    function t(t) {
        var n = t || window.event,
                r = [].slice.call(arguments, 1),
                i = 0,
                s = 0,
                o = 0,
                t = e.event.fix(n);
        t.type = "mousewheel";
        n.wheelDelta && (i = n.wheelDelta / 120);
        n.detail && (i = -n.detail / 3);
        o = i;
        n.axis !== void 0 && n.axis === n.HORIZONTAL_AXIS && (o = 0, s = -1 * i);
        n.wheelDeltaY !== void 0 && (o = n.wheelDeltaY / 120);
        n.wheelDeltaX !== void 0 && (s = -1 * n.wheelDeltaX / 120);
        r.unshift(t, i, s, o);
        return (e.event.dispatch || e.event.handle).apply(this, r);
    }
    var n = ["DOMMouseScroll", "mousewheel"];
    if (e.event.fixHooks)
        for (var r = n.length; r; )
            e.event.fixHooks[n[--r]] = e.event.mouseHooks;
    e.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener)
                for (var e = n.length; e; )
                    this.addEventListener(n[--e], t, false);
            else
                this.onmousewheel = t;
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var e = n.length; e; )
                    this.removeEventListener(n[--e], t, false);
            else
                this.onmousewheel = null;
        }
    };
    e.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel");
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e);
        }
    });
})(jQuery);

var message = function() {
    var e = $('<div id="alertContainer"/>');
    var t = 0;
    var n = [];
    var r = false;
    return {
        add: function(i, s, o) {
            if (i === undefined || i === "")
                return t;
            if (!r) {
                n[t] = {
                    text: i,
                    url: "",
                    permanent: ""
                };
                if (s !== undefined)
                    n[t].url = s;
                if (o !== undefined)
                    n[t].permanent = o;
                t++;
                return t - 1;
            }
            if (o !== undefined && o !== "") {
                var u = $('<div id="alert_' + o + '" class="alert"/>');
            } else {
                var u = $('<div id="alert_' + t + '" class="alert"/>');
                setTimeout('$("#alert_' + t + '").remove()', 6e3);
                t++;
            }
            u.children().remove();
            var a = '<div class="a-desc-inner">' + i + "</div>";
            u.append(a).appendTo(e);
            if (s !== undefined && s !== "")
                u.click(function() {
                    document.location = s;
                }).css("cursor", "pointer");
            return t - 1;
        },
        remove: function(e) {
            $("#alert_" + e).remove();
        },
        init: function() {
            e.appendTo("body");
            r = true;
            var i = t;
            if (i > 0)
                for (var s = 0; s < i; s++)
                    this.add(n[s].text, n[s].url, n[s].permanent);
        }
    };
}();

ajaxReply = function() {
    var active = [];
    return function(id, obj) {
        if (typeof obj === "string") {
            if (obj.charAt(0) === "{")
                obj = eval("(" + obj + ")");
            else
                obj = {
                    error: 0,
                    text: obj
                };
        }
        if (active[id] === undefined || active[id] === "") {
            active[id] = obj.text;
            message.add(obj.text, "", id);
        } else {
            active[id] = "";
            message.remove(id);
            message.add(obj.text);
        }
        if (obj.redirect !== undefined) {
            document.location.replace(obj.redirect);
            document.location.reload(false);
        }
    };
}();

$(document).ready(function() {
    message.init();
    createWindow();
    $(document).on("click", 'a[href *= "delete"]', function() {
        return confirm("Are you sure?");
    });
    var e = $('<div id="loadingCursor"/>').appendTo("body");
    var t = {
        top: 0,
        left: 0
    };
    var n = function(e) {
        t = {
            top: e.pageY,
            left: e.pageX
        };
    };
    var r = function(t) {
        e.offset({
            top: t.pageY + 16,
            left: t.pageX - 20
        });
    };
    $("body").on("mousemove", n);
    $(document).ajaxStart(function() {
        e.show().offset({
            top: t.top + 16,
            left: t.left - 20
        });
        $("body").off("mousemove", n).on("mousemove", r);
    });
    $(document).ajaxStop(function() {
        e.hide();
        $("body").off("mousemove", r).on("mousemove", n);
    });
});
