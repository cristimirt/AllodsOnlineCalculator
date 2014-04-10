al.calc.AOItem = function(e) {
    var t = function(t, i, s) {
        al.calc.fields[e].remove(i, !0);
        al.calc.addItem(t, i);
        t = '<img src="' + t.icoPath + '" alt="' + t.name + '"/><div class="ico_qual ico_qual_' + t.qual + '"></div>';
        n();
        $("#mosaic_" + e + "_0_" + i).append(t).unbind("mouseenter").mouseenter(function() {
            var e = al.calc.getPosition($(this).attr("id"));
            al.desc.show($(this), al.calc.items[e.x].call("text"));
        }).unbind("mouseleave").mouseleave(function() {
            al.desc.hide();
        });
        al.calc.flush();
        al.calc.urlManager.set("f", r(), e, s);
    }, n = function() {
        var e = [0, 0],
                t = [0, 0],
                n = 0,
                r;
        for (r in al.calc.items)
            null != al.calc.items[r] && (r = new Number(r), e[(r + 1) % 2] += new Number(al.calc.items[r].attr("min_damage")), t[(r + 1) % 2] += new Number(al.calc.items[r].attr("max_damage")), n += new Number(al.calc.items[r].attr("spell_power")));
        r = al.calc.urlManager.get().c[0];
        var i = e[1] + "-" + t[1],
                s = al.t("Damage");
        al.inArray(r, ["t", "b", "d"]) ? (i += " / " + n, s += " / " + al.t("magic")) : al.inArray(r, ["w", "s"]) ? 0 < e[0] && (i += " / " + e[0] + "-" + t[0]) : (i = n, s = al.t("magic"));
        $("#stat-dmg").html(i).attr("_name", s);
    }, r = function() {
        for (var e = "", t = 0; 4 > t; t++)
            0 < t && (e += "-"), void 0 != al.calc.items[t] && (e += al.calc.convertNS(al.calc.items[t].attr("iid"), 10, 36));
        "-" == e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1));
        return e;
    }, i = !1;
    return {
        init: function() {
            $(document).ready(function() {
                al.itemSelector.init();
            });
            $("#normalItems,#doItems").click(function() {
                al.calc.fields[4].dragon();
                return !1;
            });
            $("#mosaic_field_" + e).children(".cell").click(function() {
                var e = al.calc.getPosition($(this).attr("id"));
                if (al.calc.fields[e.z].locked)
                    al.calc.lock(!1);
                else {
                    var t = !1;
                    var n = [
                        [14, 35],
                        [16]
                    ];
                    switch (al.calc.urlManager.get().c[0]) {
                        case "w":
                            t = [8, 9, 10, 11, 12, 14, 16, 17, 18, 19, 20, 21, 27, 23, 24, 25, 26];
                            n = [
                                [14, 35, 36],
                                [15, 16]
                            ];
                            break;
                        case "p":
                            t = [2, 5, 11, 12, 16, 23];
                            break;
                        case "t":
                            t = [2, 8, 12, 16, 17, 21, 23, 24, 11, 23];
                            break;
                        case "s":
                            t = [8, 10, 11, 13, 14, 18, 19, 20, 25, 26, 27];
                            n[0] = [14, 36];
                            break;
                        case "d":
                            t = [2, 5, 11, 12, 13, 14, 15, 23];
                            n[0] = [14, 35, 36];
                            break;
                        case "m":
                            t = [2, 5, 14];
                            break;
                        case "n":
                            t = [2, 5, 12, 14, 16];
                            break;
                        case "v":
                            t = [2, 5, 13, 14];
                            n[0] = [35, 14, 36];
                            break;
                        case "b":
                            t = [2, 8, 11, 14, 19, 20, 24, 26, 25];
                            n[0] = [14, 36];
                    }
                    n = 0 == e.x || 2 == e.x ? n[0] : n[1];
                    al.itemSelector.show(function(e, t) {
                        al.calc.fields[t.z].add(e, t.x);
                    }, {
                        slots: n,
                        classes: t,
                        submit: !0,
                        lvl: al.calc.currentLvl() + "-" + al.calc.lvl,
                        dragon: i ? 2 : 0,
                        param: e
                    });
                }
            }).bind("contextmenu", function() {
                var t = al.calc.getPosition($(this).attr("id"));
                al.calc.fields[t.z].locked ? al.calc.lock(!1) : al.calc.fields[e].remove(t.x);
                return !1;
            });
        },
        add: function(n, r) {
            var i = al.itemSelector.getItem(n);
            !1 !== i ? t(i, r) : $.getJSON("http://armory.aolive.ru/item/" + n + "/json?callback=?", function(t) {
                al.calc.fields[e].save(t, r, !0);
            });
        },
        save: function(e, n, r) {
            void 0 === n && (n = 0);
            e = al.Item(e);
            t(e, n, r);
        },
        remove: function(t, i) {
            $("#mosaic_" + e + "_0_" + t).unbind("mouseenter").mouseleave().unbind("mouseleave").children("img,div").remove();
            void 0 !== al.calc.items[t] && (al.calc.removeItem(t), al.calc.flush(), n(), void 0 == i && al.calc.urlManager.set("f", r(), e));
        },
        dragon: function() {
            i ? ($("#mosaic_field_" + e).removeClass("dragon"), i = !1) : ($("#mosaic_field_" + e).addClass("dragon"), i = !0);
        },
        load: function(t) {
            if (null != t && 0 < t.length) {
                var t = t.split("-"),
                        n;
                for (n in t)
                    al.calc.fields[e].add(al.calc.convertNS(t[n], 36, 10), n);
            }
        },
        clear: function() {
            this.remove(0, !0);
            this.remove(1, !0);
            this.remove(2, !0);
            this.remove(3, !0);
        },
        getLvl: function() {
            return 0;
        },
        check: function() {
            return 0;
        },
        unload: function() {
            this.clear();
        },
        locked: !1,
        lock: function() {
            this.locked = !0;
        },
        unlock: function() {
            this.locked = !1;
        }
    };
};
al.calc.AORField = function(e, t, n) {
	var y = 4;
	var x = 3;
	var startp = {};
	startp["w"]={1:{"x":3,"y":4},2:{"x":3,"y":4},3:{"x":3,"y":4}};
	startp["p"]={1:{"x":3,"y":4},2:{"x":3,"y":4},3:{"x":3,"y":4}};
	startp["t"]={1:{"x":3,"y":4},2:{"x":3,"y":4},3:{"x":3,"y":4}};
	startp["n"]={1:{"x":3,"y":4},2:{"x":3,"y":4},3:{"x":3,"y":4}};
	startp["s"]={1:{"x":3,"y":4},2:{"x":3,"y":4},3:{"x":3,"y":4}};
	startp["d"]={1:{"x":3,"y":4},2:{"x":3,"y":4},3:{"x":3,"y":4}};
	startp["m"]={1:{"x":3,"y":4},2:{"x":3,"y":4},3:{"x":3,"y":4}};
	startp["v"]={1:{"x":3,"y":4},2:{"x":3,"y":4},3:{"x":3,"y":4}};
	startp["b"]={1:{"x":3,"y":4},2:{"x":3,"y":4},3:{"x":3,"y":4}};
	startp["e"]={1:{"x":3,"y":0},2:{"x":5,"y":0},3:{"x":3,"y":1}};
	var l = window.location.href.split("#")[1].split("/")[0];
	if (l && startp[l]){
			y = startp[l][e]["y"];
			x = startp[l][e]["x"];
	}
	t--;
	n--;
    var r = y, 
          i = x, 
            s = [],
            o = [],
            u = {}, a = function(t, n, r) {
        if (!o[t][n]) {
            o[t][n] = !0;
            void 0 !== r ? s[t][n].changeLvl(1) : g(s[t][n].changeLvl(1));
            var r = $("#mosaic_" + e + "_" + t + "_" + n),
                    i = r.css("background-position").split(" ");
            r.addClass("active").css("background-position", i[0] + " top");
            4 == t && 3 == n || u.html(new Number(u.html()) + 1);
            l(t, n);
        }
    }, f = function(t, n) {
        if (o[t][n]) {
            o[t][n] = !1;
            g(s[t][n].changeLvl(-1));
            var r = $("#mosaic_" + e + "_" + t + "_" + n),
                    i = r.css("background-position").split(" ");
            r.removeClass("active").css("background-position", i[0] + " bottom");
            u.html(new Number(u.html()) - 1);
            l(t, n);
        }
    }, l = function(t, n) {
        var t = new Number(t),
                n = new Number(n),
                r = 0 < al.calc.resource.rubins;
        p(t + 1, n) && r ? $("#mosaic_" + e + "_" + (t + 1) + "_" + n).addClass("can") : $("#mosaic_" + e + "_" + (t + 1) + "_" + n).removeClass("can");
        p(t - 1, n) && r ? $("#mosaic_" + e + "_" + (t - 1) + "_" + n).addClass("can") : $("#mosaic_" + e + "_" + (t - 1) + "_" + n).removeClass("can");
        p(t, n + 1) && r ? $("#mosaic_" + e + "_" + t + "_" + (n + 1)).addClass("can") : $("#mosaic_" + e + "_" + t + "_" + (n + 1)).removeClass("can");
        p(t, n - 1) && r ? $("#mosaic_" + e + "_" + t + "_" + (n - 1)).addClass("can") : $("#mosaic_" + e + "_" + t + "_" + (n - 1)).removeClass("can");
    }, c = function(n) {
        for (var r = 0; r <= t; r++)
            for (var i in s[r])
                l(r, i);
        if (void 0 === n)
            for (var o in al.calc.fields)
                o != e && "AORField" == al.calc.fields[o].name && al.calc.fields[o].check(!0);
    }, h = function(n) {
        (0 == al.calc.resource.rubins || 1 == al.calc.resource.rubins) && c();
        l(r, i);
        for (var u = 0; u <= t; u++)
            for (var a in s[u])
                d = [], (u != r || a != i) && o[u][a] && !v(u, a) && f(u, a);
        c();
        al.calc.currentLvl();
        "calc" == y && !n && al.calc.urlManager.set("f", m(), e, n);
    }, p = function(e, t) {
        e = new Number(e);
        t = new Number(t);
        return void 0 !== o[e - 1] && void 0 !== o[e - 1][t] && o[e - 1][t] || void 0 !== o[e + 1] && void 0 !== o[e + 1][t] && o[e + 1][t] || void 0 !== o[e] && void 0 !== o[e][t - 1] && o[e][t - 1] || void 0 !== o[e] && void 0 !== o[e][t + 1] && o[e][t + 1] ? !0 : !1
    }, d = [],
            v = function(e, t) {
        if (void 0 === s[e][t] || !o[e][t] || void 0 !== d[e + "|" + t])
            return !1;
        d[e + "|" + t] = !0;
        e = new Number(e);
        t = new Number(t);
        return void 0 !== o[e - 1] && void 0 !== o[e - 1][t] && o[e - 1][t] && (e - 1 == r && t == i || v(e - 1, t)) || void 0 !== o[e + 1] && void 0 !== o[e + 1][t] && o[e + 1][t] && (e + 1 == r && t == i || v(e + 1, t)) || void 0 !== o[e][t + 1] && o[e][t + 1] && (e == r && t + 1 == i || v(e, t + 1)) || void 0 !== o[e][t - 1] && o[e][t - 1] && (e == r && t - 1 == i || v(e, t - 1)) ? !0 : !1;
    }, m = function() {
        for (var e = "", u = !1, a = 0, f = 0, l = "", a = 0; a <= t; a++)
            for (f = 0; f <= n; f++)
                if (!(void 0 == s[a][f] || a == r && f == i))
                    if (o[a][f] || u)
                        if (u)
                            e = o[a][f] ? e + "1" : e + "0";
                        else {
                            for (l = al.calc.convertNS(a, 10, 2); 4 > l.length; )
                                l = "0" + l;
                            e = "1" + l;
                            for (l = al.calc.convertNS(f, 10, 2); 3 > l.length; )
                                l = "0" + l;
                            e += l;
                            u = !0;
                        }
        e = e.replace(/0+$/, "");
        "" != e && (e = al.calc.binEncode(e));
        return e
    }, g = function(e) {
        al.calc.resource.rubins -= e;
        al.calc.setResource("rubins", al.calc.resource.rubins);
    }, y = "";
    return {
        name: "AORField",
        init: function(n) {
            y = n.load;
            "admin" == y ? $("#mosaic_field_" + e).children(".cell").unbind("click").click(function() {
                var e = al.calc.getPosition($(this).attr("id"));
                if (admin.linkSelect) {
                    var e = s[e.y][e.x],
                            t = $(".tlink.active>input:first");
                    t.val(e.attr("id"));
                    t = t.next().next();
                    t.val(e.attr("title"));
                    admin.linkSelect = !1;
                    ajaxReply("linkSelect", 'Selecter link "' + t.attr("title") + '"<br/>Enter the text accordingly');
                } else
                    al.calc.fields[e.z].admin(e.y, e.x);
                return !1;
            }).unbind("mouseenter").mouseenter(function() {
                var e = al.calc.getPosition($(this).attr("id"));
                e.text = al.calc.fields[e.z].desc(e.y, e.x);
                "" != e.text && al.desc.show($(this), e.text);
            }).unbind("mouseleave").mouseleave(function() {
                al.desc.hide();
            }) : "min" == y ? al.calc.classicMinInit(e) : al.calc.classicInit(e);
            for (n = 0; n <= t; n++)
                o[n] = [];
            u = $("#mosaic_head_" + e + ">p>b:first");
        },
        resource: "rubins",
        add: function(t, n, r) {
            void 0 === s[t] && (s[t] = []);
            s[t][n] = al.calc.talents[r];
            s[t][n].addMosaic({
                z: e,
                y: t,
                x: n
            });
            s[t][n].resource = "rubins";
            void 0 === o[t] && (o[t] = []);
            o[t][n] = !1;
            r = $("#mosaic_" + e + "_" + t + "_" + n);
            if ("" != s[t][n].attr("line") && s[t][n].attr("line")) {
                r.css({
                    "background-image": "url(" + al.staticPath + "themes/calc" + s[t][n].attr("line").replace(".png", "_v.png") + ")",
                    "background-position": "-" + s[t][n].attr("icoPosition") + "px bottom"
                });
            } else {
                var imageUrl = "http://eu.allodswiki.ru/" + s[t][n].attr("ico");
                r.append('<img src="' + imageUrl + '" style="width: 33px;"/>');
            }
        },
        plus: function(t, n) {
            if (void 0 != s[t][n] && !(t == r && n == i)) {
                if (0 <= al.calc.resource.rubins - 1 && !o[t][n]) {
                    if (!p(t, n))
                        return;
                    a(t, n);
                }
                c();
                al.calc.currentLvl();
                al.calc.urlManager.set("f", m(), e);
            }
        },
        minus: function(e, t) {
            void 0 != s[e][t] && !(e == r && t == i) && (f(e, t), h());
        },
        activateCost: function() {
            return 1;
        },
        cost: function() {
            return 1;
        },
        load: function(u) {
            for (var f = 0; f <= t; f++)
                for (var l = 0; l <= n; l++)
                    void 0 === s[f] && (s[f] = []), void 0 === o[f] && (o[f] = []), void 0 == s[f][l] && (s[f][l] = al.calc.talents.nullic, $("#mosaic_" + e + "_" + f + "_" + l).addClass("empty"));
            a(r, i, !0);
            f = $("#mosaic_head_" + e);
            l = $("#mosaic_" + e + "_"+r+"_"+i);
            f.children("div").css({
                "background-image": l.css("background-image"),
                "background-position": l.css("background-position")
            });
            f.children("h2").html(s[r][i].attr("title"));
            $("#mosaic_head_" + e + ">p>b:first").html(0);
            $("#mosaic_head_" + e + ">p>b:last").html((t + 1) * (n + 1) - 1);
            if (!(void 0 === u || null === u || "" === u)) {
                u = al.calc.binDecode(u);
                f = new Number(al.calc.convertNS(u.substr(1, 4), 2, 10));
                l = new Number(al.calc.convertNS(u.substr(5, 3), 2, 10));
                a(f, l);
                l < n ? l++ : (f++, l = 0);
                var c = 8;
                for (f; f <= t; f++) {
                    for (l; l <= n; l++)
                        void 0 === s[f][l] || f == r && l == i || "1" == u.charAt(c++) && a(f, l);
                    l = 0;
                }
                h(!0);
            }
        },
        clear: function() {
            for (var e = 0; e < s.length; e++)
                for (var t = 0; t < s[e].length; t++)
                    void 0 === s[e][t] || !o[e][t] || e == r && t == i || f(e, t);
            h();
        },
        getLvl: function() {
            var e = al.calc.getResourceMax("rubins");
            if (e.max + e.bonus == al.calc.resource.rubins)
                return 0;
            e = e.max + e.bonus - al.calc.resource.rubins + 9;
            return e > al.calc.lvl ? al.calc.lvl : e;
        },
        addLock: function() {
        },
        check: function(e) {
            c(e);
        },
        desc: function(e, t) {
            return void 0 !== s[e][t] ? s[e][t].getDesc() : "";
        },
        unload: function() {
            al.calc.talents = {};
            for (var r = 0; r <= t; r++)
                for (var i = 0; i <= n; i++)
                    $("#mosaic_" + e + "_" + r + "_" + i).css("background-image", "none").removeClass("can active empty");
            s = [];
            o = [];
        },
        admin: function(t, n) {
            admin.put(s[t][n], e, t, n);
        },
        locked: !1,
        lock: function() {
            this.locked = !0;
            $("#mosaic_field_" + e + ">.can:not(.active)").addClass("locked");
        },
        unlock: function() {
            this.locked = !1;
            $("#mosaic_field_" + e + ">.can").removeClass("locked");
        }
    };
};
al.calc.AOStats = function(e) {
    var t = function() {
        var e = "",
                t;
        for (t in al.calc.stats)
            al.calc.stats[t].value() != al.calc.stats[t].dvalue() && (e += t + al.calc.stats[t].value());
        return e;
    };
    return {
        init: function() {
            $(".stats-face").click(function() {
                var e = $(this);
                e.hide();
                e.next().show().focus();
            });
            $(".stats-body").blur(function() {
                var e = $(this);
                e.hide();
                e.prev().show();
            });
            $("#mosaic_field_" + e + " input").focus(function() {
                return al.calc.locked ? (al.calc.lock(!1), !1) : !0;
            });
            $("#mosaic_field_" + e + ' [name="i"],#mosaic_field_' + e + ' [name="s"]').keyup(function() {
                var t = $(this),
                        n = t.attr("name"),
                        t = new Number(t.val());
                isNaN(t) && (t = 0);
                al.calc.fields[e].add(n, t);
            });
            $("#mosaic_field_" + e + ' [name^="r"]').keyup(function() {
                var t = "";
                $("#mosaic_field_" + e + ' [name^="r"]').each(function(e, n) {
                    var r = new Number($(n).val());
                    isNaN(r) ? r = 0 : 30 < r && (r = 30);
                    t = 10 > r ? t + ("0" + r) : t + r;
                });
                al.calc.fields[e].add("r", t);
            });
            $("#mosaic_field_" + e + ' [name="f"]').change(function() {
                al.calc.fields[e].add("f", $(this).val());
                $(this).blur();
            });
            $("#lvl").change(function() {
                $(this).blur();
            });
            $(".tears").click(function() {
                al.calc.fields[e].add("t", $(this).attr("value"));
            });
        },
        add: function(n, r, i) {
            al.calc.stats[n].set(r);
            if ("s" == n || "i" == n)
                $('input[name="' + n + '"]').val(r), $("#stat-" + n).html(r + " (x" + (new Number(al.calc.stats[n].get())).toFixed(2) + ")");
            else if ("r" == n)
                r += "", n = new Number(r.substr(0, 2)), $('[name="r1"]').val(n).attr("_name", "+" + al.calc.formuls.rune.exec(n) + "%"), n = new Number(r.substr(2, 2)), $('[name="r2"]').val(n).attr("_name", "+" + al.calc.formuls.rune.exec(n) + "%"), n = new Number(r.substr(4, 2)), $('[name="r3"]').val(n).attr("_name", "+" + al.calc.formuls.rune.exec(n) + "%"), $("#rune").attr("_name", "Runes: +" + al.calc.stats.r.get() + "%");
            else if ("f" == n) {
                var s = $('[name="f"] [value="' + r + '"]').html();
                $('[name="f"]').val(r);
                $("#stat-" + n).html(s + " (+" + al.calc.stats.f.get() + "%)");
            } else
                "t" == n && ($(".tears").removeClass("active"), $('.tears[value="' + r + '"]').addClass("active"));
            void 0 == i && al.calc.urlManager.set("f", t(), e, i);
        },
        load: function(t) {
            for (var n in al.calc.stats)
                this.add(n, al.calc.stats[n].dvalue(), !0);
            if (null != t) {
                n = /([A-z]+)(\d+)/g;
                for (var r = null; null != (r = n.exec(t)); )
                    al.calc.fields[e].add(r[1], r[2], !0);
            }
            al.inArray(al.calc.urlManager.get().c[0], ["w", "s", "t", "b"]) ? $("#mosaic_field_" + e).removeClass("m").addClass("f") : $("#mosaic_field_" + e).removeClass("f").addClass("m");
        },
        clear: function() {
            for (var t in al.calc.stats)
                al.calc.stats[t].clear(), this.add(t, al.calc.stats[t].value(), !0);
            al.calc.urlManager.set("f", "", e);
        },
        getLvl: function() {
            return 0;
        },
        check: function() {
            return 0;
        },
        unload: function() {
            this.clear();
            $(".stats-face").removeAttr("style");
        },
        locked: !1,
        lock: function() {
            this.locked = !0;
        },
        unlock: function() {
            this.locked = !1;
        }
    };
};
al.calc.AOTField = function(e, t, n) {
    t--;
    n--;
    for (var r = [], i = 0; i <= t; i++)
        r[i] = [];
    var s = [],
            o = function(t, n) {
        s[t][n] = !1;
        var r = $("#mosaic_" + e + "_" + t + "_" + n),
                i = r.css("background-position").split(" ");
        r.removeClass("can").css("background-position", i[0] + " bottom");
    }, u = function(n) {
        for (var i = 0, u = 0; u <= t; u++) {
            for (var l in r[u]) {
                if (0 < r[u][l].attr("lvl") && (!a(u, l) || 0 < al.calc.fields[e].activateCost(u, 0, i)))
                    lvl = r[u][l].attr("lvl"), c(r[u][l].setLvl(0), lvl);
                if (0 >= al.calc.fields[e].activateCost(u, 0, i)) {
                    var p = u,
                            v = l;
                    s[p][v] = !0;
                    p = $("#mosaic_" + e + "_" + p + "_" + v);
                    v = p.css("background-position").split(" ");
                    p.addClass("can").css("background-position", v[0] + " top");
                } else
                    o(u, l);
                p = r[u][l].attr("lvl");
                $("#mosaic_" + e + "_" + u + "_" + l).children(".lvl").html(p);
                s[u][l] && 0 == r[u][l].attr("lvl") && 0 >= al.calc.resource.skills && o(u, l);
            }
            p = u;
            result = 0;
            v = void 0;
            for (v in r[p])
                void 0 !== r[p][v] && (result += h(r[p][v].attr("lvl"), 0));
            i += result;
        }
        al.calc.currentLvl();
        "calc" == d && !n && al.calc.urlManager.set("f", f(), e, n);
    }, a = function(e, t, n) {
        void 0 === n && (n = r[e][t].attr("lvl"));
        var e = r[e][t].attr("locks"),
                i;
        for (i in e)
            if (al.calc.talents[e[i].parent].attr("lvl") < n)
                return !1;
        return !0;
    }, f = function() {
        var e = "";
        if (void 0 == r[0])
            return "";
        for (var i = 0; i <= t; i++)
            for (var s = 0; s <= n; s++)
                r[i] && void 0 != r[i][s] && (e += r[i][s].attr("lvl") + "");
        e = e.replace(/0+$/, "");
        return e = al.calc.decEncode(e);
    }, l = function(e) {
        for (var e = al.calc.decDecode(e), i = 0, s = 0; s <= t; s++)
            for (var o = 0; o <= n; o++)
                void 0 != r[s][o] && c(r[s][o].changeLvl(new Number(e.charAt(i++))), 0);
        u(!0);
    }, c = function(e, t) {
        void 0 === t && (t = 0);
        al.calc.resource.skills -= h(e, t);
        al.calc.setResource("skills", al.calc.resource.skills);
    }, h = function(e, t) {
        void 0 === t && (t = 0);
        return result = 0 > e ? p(-t, -t - (e + 1)) : t * e + p(e);
    }, p = function(e, t) {
        void 0 === t && (t = 1);
        var n = 0;
        if (0 < e)
            for (var r = t; r <= e; r++)
                n += r;
        else if (0 > e)
            for (r = t; r >= e; r--)
                n += r;
        return n;
    }, d = "";
    return {
        init: function(t) {
            d = t.load;
            "admin" == d ? $("#mosaic_field_" + e).children(".cell").unbind("click").click(function() {
                var e = al.calc.getPosition($(this).attr("id"));
                if (admin.lockSelect)
                    e = r[e.y][e.x], $("#Lock_parent").val(e.attr("id")), $("#Lock_parentname").val(e.attr("title")), admin.lockSelect = !1, ajaxReply("lockSelect", 'Selected Talent "' + e.attr("title") + '"<br/>Select the direction of the arrow');
                else if (admin.linkSelect) {
                    var e = r[e.y][e.x],
                            t = $(".tlink.active>input:first");
                    t.val(e.attr("id"));
                    t = t.next();
                    t.val("1");
                    t = t.next();
                    t.val(e.attr("title"));
                    admin.linkSelect = !1;
                    ajaxReply("linkSelect", 'Selected link "' + e.attr("title") + '"<br/>Enter the text accordingly');
                } else
                    al.calc.fields[e.z].admin(e.y, e.x);
                return !1;
            }).unbind("mouseenter").mouseenter(function() {
                var e = al.calc.getPosition($(this).attr("id"));
                e.text = al.calc.fields[e.z].desc(e.y, e.x);
                "" != e.text && al.desc.show($(this), e.text);
            }).unbind("mouseleave").mouseleave(function() {
                al.desc.hide();
            }) : "min" == d ? al.calc.classicMinInit(e) : al.calc.classicInit(e);
        },
        resource: "skills",
        add: function(t, n, i) {
            void 0 === r[t] && (r[t] = []);
            r[t][n] = al.calc.talents[i];
            r[t][n].addMosaic({
                z: e,
                y: t,
                x: n
            });
            r[t][n].resource = "skills";
            r[t][n].defaultLvl = 1;
            void 0 === s[t] && (s[t] = []);
            s[t][n] = !1;
            o(t, n);
            i = $("#mosaic_" + e + "_" + t + "_" + n);
            i.children(".lvl").html(0);
            if ("" != r[t][n].attr("line") && r[t][n].attr("line")) {
                i.css({
                    "background-image": "url(" + al.staticPath + "themes/calc" + r[t][n].attr("line") + ")",
                    "background-position": "-" + r[t][n].attr("icoPosition") + "px bottom"
                });
            } else {
                var imageUrl = "http://eu.allodswiki.ru/" + r[t][n].attr("ico");
                i.append('<img src="' + imageUrl + '" style="width: 40px;"/>');
            }
        },
        plus: function(e, t, n) {
            if (void 0 != r[e][t] && !(0 < this.activateCost(e))) {
                void 0 === n && (n = 1);
                var i = h(n, r[e][t].attr("lvl"));
                0 <= al.calc.resource.skills - i && a(e, t, r[e][t].attr("lvl") + 1) && (c(r[e][t].changeLvl(n), r[e][t].attr("lvl") - 1), u());
            }
        },
        minus: function(e, t, n) {
            void 0 != r[e][t] && (void 0 === n && (n = -1), 0 == e && al.inArray(t, ["0", "1", "2"]) && 1 == r[e][t].attr("lvl") || (c(r[e][t].changeLvl(n), r[e][t].attr("lvl") + 1), 1 > r[e][t].attr("lvl") && s[e][t] && o(e, t), u()));
        },
        activateCost: function(e, t, n) {
            void 0 === n && (t = al.calc.getResourceMax("skills"), n = t.max + t.bonus - al.calc.resource.skills);
            return (1 > e ? 0 : 8 * (e - 1) + 4) - n;
        },
        cost: function(e, t, n) {
            return n;
        },
        load: function(i) {
            var s = al.calc.urlManager.get().c,
                    s = s[0];
            "calc" == d && ($("#class_back").css({
                "background-image": "url(" + al.staticPath + "themes/calc/images/" + s + "_back.png)"
            }), $("#calcmenu>a.active").removeClass("active"), $('#calcmenu>a[href="#' + s + '"]').addClass("active"));
            for (s = 0; s <= t; s++)
                for (var o = 0; o <= n; o++)
                    r[s] && void 0 === r[s][o] && $("#mosaic_" + e + "_" + s + "_" + o).addClass("empty");
            void 0 === i || null === i || "" == i ? (void 0 !== r[0][0] && c(r[0][0].changeLvl(1), 0), void 0 !== r[0][1] && c(r[0][1].changeLvl(1), 0), void 0 !== r[0][2] && c(r[0][2].changeLvl(1), 0), void 0 !== r[0][3] && c(r[0][3].changeLvl(1), 0), u()) : l(i);
        },
        clear: function() {
            for (var e = 0; e < r.length; e++)
                for (var t = 0; t < r[e].length; t++)
                    void 0 !== r[e][t] && (lvl = r[e][t].attr("lvl"), c(r[e][t].setLvl(0), lvl));
            l("l");
        },
        getLvl: function() {
            for (var e = al.calc.getResourceMax("skills").max - al.calc.resource.skills, t = 0, n = 5; n < e; n++)
                if (0 == n % 5 && (t = Math.floor(n / 5)), n + t >= e)
                    return n;
            return e;
        },
        addLock: function(t, n, r, i) {
            var s = $("#mosaic_" + e + "_" + r.y + "_" + r.x).offset();
            s.width = $("#mosaic_" + e + "_" + r.y + "_" + r.x).width();
            s.height = $("#mosaic_" + e + "_" + r.y + "_" + r.x).height();
            var t = $("#mosaic_" + e + "_" + t + "_" + n).offset(),
                    n = $('<div class="arrow"/>').appendTo("#mosaic_field_" + e),
                    o;
            switch (i) {
                case "0":
                    i = $('<div class="arrow_begin_left"/>').appendTo(n);
                    r = $('<div class="arrow_body_left"/>').appendTo(n);
                    o = $('<div class="arrow_end_left"/>').appendTo(n);
                    n.offset({
                        top: s.top + s.height / 2,
                        left: s.left - n.width() + 2
                    });
                    r.height(t.top - s.top - i.height() - o.height());
                    break;
                case "1":
                    i = $('<div class="arrow_begin_right"/>').appendTo(n), r = $('<div class="arrow_body_right"/>').appendTo(n), o = $('<div class="arrow_end_right"/>').appendTo(n), n.offset({
                        top: s.top + s.height / 2,
                        left: s.left + s.width - 2
                    }), r.height(t.top - s.top - i.height() - o.height());
            }
        },
        check: function(e) {
            u(e);
        },
        desc: function(e, t) {
            return void 0 !== r[e][t] ? r[e][t].getDesc() : "";
        },
        unload: function() {
            al.calc.talents = {};
            for (var i = 0; i <= t; i++)
                for (var s = 0; s <= n; s++) {
                    var o = $("#mosaic_" + e + "_" + i + "_" + s);
                    o.children(".lvl").html("");
                    o.css("background", "none").removeClass("can active empty");
                }
            r = [];
            $(".arrow").remove();
        },
        admin: function(t, n) {
            admin.put(r[t][n], e, t, n);
        },
        locked: !1,
        lock: function() {
            for (var t in r)
                for (var n in r[t])
                    void 0 !== r[t][n] && 0 == r[t][n].attr("lvl") && $("#mosaic_" + e + "_" + t + "_" + n).addClass("locked");
            this.locked = !0;
        },
        unlock: function() {
            $("#mosaic_field_" + e + ">.locked").removeClass("locked");
            this.locked = !1;
            u(!0);
        }
    };
};
al.calc.AOUnlocks = function(c, l, d) {
    d--;
    var a = null,
            k = function() {
        var e = 0,
                t = 0,
                n = 0;
        a[0].enabled && (e += a[0].amount);
        a[1].enabled && (e += a[1].amount);
        a[2].enabled && (e += a[2].amount);
        for (var r = 3; r < a.length; r++)
            a[r].enabled && (8 > r ? t += a[r].amount : n += a[r].amount);
        $("#shopSkills").html(al.t("{n} talent|talents|talents", e));
        $("#shopRubins").html(al.t("{n} ruby|rubies|rubies", t));
        $("#unlock-mystery").html("+" + al.t("{n} ruby|rubies|rubies", n));
    }, f = function() {
        for (var e = "", t = d; 0 <= t; t--)
            e = a[t].enabled ? e + "1" : e + "0";
        e = e.replace(/^0+/, "");
        return al.calc.binEncode(e);
    }, h = function(e, t) {
        for (var e = al.calc.binDecode(e), n = 0; n < e.length; n++)
            "1" === e.charAt(n) && al.calc.fields[c].plus(0, e.length - n - 1, t);
        k();
    };
    return {
        init: function() {
            null === a && function(e) {
                for (var t in e)
                    al.calc.fields[c].add(e[t]);
            }(allodsunlocks);
            al.calc.classicInit(c);
            $("#mysteryWindow").appendTo($("body"));
            $("#mystery").click(function() {
                al.calc.locked ? al.calc.lock(!1) : al.sheet.show(function() {
                    $("#mysteryWindow").hide();
                    al.sheet.hide();
                }, $("#mysteryWindow"));
            });
        },
        add: function(e) {
            null === a && (a = []);
            var t = e.calc_used - 1;
            a[t] = e;
            a[t].enabled = !1;
            a[t].amount = new Number(a[t].amount);
            $("#mosaic_" + c + "_0_" + t).append('<img src="' + al.staticPath + "themes/armory" + e.ico + '"/>');
        },
        desc: function(e, t) {
            var n = a[t].calc_description,
                    n = n.replace("!name", '<div class="talent_name">' + a[t].name + "</div>"),
                    n = n.replace("!d", '<div class="talent_desc">' + a[t].description + '</div><div class="unlock_desc">');
            return n + "</div>";
        },
        plus: function(d, h, l) {
            !a[h].enabled && !1 !== eval("(function(p){" + a[h].calc_effect_on + "})(" + a[h].amount + ")") && (a[h].enabled = !0, $("#mosaic_" + c + "_0_" + h).children(".deactive").hide(), void 0 === l && (k(), al.calc.urlManager.set("f", f(), c)));
        },
        minus: function(d, h, l) {
            a[h].enabled && !1 !== eval("(function(p){" + a[h].calc_effect_off + "})(" + a[h].amount + ")") && (a[h].enabled = !1, $("#mosaic_" + c + "_0_" + h).children(".deactive").show(), void 0 === l && (al.calc.urlManager.set("f", f(), c), k()));
        },
        load: function(e) {
            null === e && (e = "2sxs");
            h(e, !0);
        },
        clear: function() {
            for (var e = 0; 8 > e; e++)
                this.minus(0, e, !0);
            h("2sxs");
        },
        getLvl: function() {
            return 0;
        },
        check: function() {
            return 0;
        },
        unload: function() {
            $(".field_AOTField img").remove();
            $(".field_AORField img").remove();
            for (var e in a)
                $("#mosaic_" + c + "_0_" + e).children(".deactive").show(), a[e].enabled = !1;
        },
        locked: !1,
        lock: function() {
            this.locked = !0;
        },
        unlock: function() {
            this.locked = !1;
        }
    };
};
