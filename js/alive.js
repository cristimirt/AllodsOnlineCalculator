var al = function() {
    var e = null,
            t = {
        allods: "Astral I",
        0: "anotherlive"
    }, n = {}, r = {}, i = function(e) {
        jQuery("[_name]").unbind("mouseenter").mouseenter(function() {
            var e = jQuery(this).attr("_name");
            void 0 !== e && al.desc.show(this, e)
        }).unbind("mouseleave").mouseleave(function() {
            al.desc.hide()
        });
        e && (jQuery(".allods_money").each(function(e, t) {
            jQuery(t).html(al.moneyToText(jQuery(t).html()))
        }), jQuery(".item_ico").each(function() {
            void 0 !== jQuery(this).attr("qual") && jQuery(this).children("a").append('<div class="ico_qual ico_qual_' + jQuery(this).attr("qual") + '"></div>')
        }))
    }, s = {}, o = 0,
            u = 0,
            a = 0,
            f = 0,
            l = 0,
            c = null,
            p = !1,
            d = null,
            v = null,
            m = [],
            g = null,
            y = null;
    return {
        game: "allods",
        lang: "ru",
        scroll: !1,
        theme: null,
        staticPath: "http://static.anotherlive.ru/",
        apiPath: "http://api.anotherlive.ru/",
        url: [],
        desc: {
            init: function() {
                n = jQuery('<div id="a-desc"/>').appendTo("body");
                r = jQuery('<div class="a-desc-inner"/>').appendTo(n);
                i(!0)
            },
            show: function(e, t, i) {
                if ("" != t) {
                    r.html(t);
                    "object" != typeof i && (i = {});
                    void 0 == i.inner && (i.inner = "center");
                    n.clearQueue().stop().css("opacity", "1").animate({
                        left: -1e3
                    }, 0).show();
                    var t = jQuery(e).offset().left + jQuery(e).outerWidth(),
                            s = jQuery(e).offset().top;
                    s + n.height() > jQuery(window).height() + jQuery(window).scrollTop() && (s -= s + n.height() - (jQuery(window).height() + jQuery(window).scrollTop()) + 5);
                    s < jQuery(window).scrollTop() && (s = jQuery(window).scrollTop());
                    t + n.outerWidth() + 10 > jQuery(window).width() && (t = jQuery(e).offset().left - n.outerWidth());
                    t -= 7;
                    r.removeClass("w100 w200 w300");
                    300 < n.outerWidth() && 300 < n.outerHeight() ? r.addClass("w300") : 200 < n.outerWidth() && 200 < n.outerHeight() ? r.addClass("w200") : 100 < n.outerWidth() && 100 < n.outerHeight() ? r.addClass("w100") : r.css("background-position", i.inner);
                    void 0 !== i.fade ? n.hide().animate({
                        left: t,
                        top: s
                    }, 0).fadeIn(1e3 * i.fade) : n.animate({
                        left: t,
                        top: s
                    }, 0)
                }
            },
            hide: function() {
                n.hide();
                n.attr("class", "")
            },
            block: function() {
                return n
            },
            nns: function() {
                i()
            }
        },
        sheet: {
            init: function() {
                s = jQuery('<div id="a_sheet" />');
                s.appendTo("body");
                a = jQuery(window).width();
                f = jQuery(window).width() / 2;
                this.recalc()
            },
            recalc: function() {
                u = jQuery(window).height();
                l = u / 2 + jQuery(window).scrollTop();
                o = jQuery(document).height();
                s.animate({
                    top: 0,
                    left: 0
                }, 0);
                s.height(o)
            },
            get: function(e) {
                this.recalc();
                return void 0 === e ? {
                    top: l,
                    left: f,
                    height: o,
                    width: a
                } : {
                    top: l - e.height() / 2,
                    left: f - e.width() / 2
                }
            },
            show: function(e, t, n) {
                p = void 0 === n ? !1 : n;
                c = void 0 === e ? function() {
                    jQuery(this).hide()
                } : e;
                s.show().unbind("click").click(c);
                void 0 !== t && t.animate({
                    left: -1e3
                }, 0).show().animate(this.get(t), 0)
            },
            hide: function() {
                null !== c && p ? (p = !1, c()) : s.hide();
                c = null
            }
        },
        init: function() {
            var n = jQuery('script[src*="alive.js"]').attr("game");
            null !== n && ("ao" == n && (n = "allods"), al.game = n);
            n = null == al.theme ? t[al.game] : al.theme;
            n = al.staticPath + "themes/" + n + "/api.css";
            0 == jQuery('[href="' + n + '"]').length && jQuery("head").append('<link rel="stylesheet" type="text/css" href="' + n + '" />');
            al.desc.init();
            al.sheet.init();
            null == e && jQuery.getJSON("data/user.json", function(e) {
                al.su(e)
            });
            "function" == typeof al.gameInit && al.gameInit()
        },
        inArray: function(e, t) {
            if ("object" !== typeof t)
                return !1;
            for (var n in t)
                if (t[n] == e)
                    return !0;
            return !1
        },
        count: function(e) {
            var t = 0,
                    n;
            for (n in e)
                "function" != typeof e[n] && t++;
            return t
        },
        empty: function(e) {
            return void 0 === e || null === e || "number" == typeof e && 0 == e || "string" == typeof e && 0 == e.length || 0 == al.count(e) ? !0 : !1
        },
        t: function(e, t) {
            if (void 0 === t)
                t = {
                    n: "0"
                };
            else if ("number" == typeof t || "string" == typeof t)
                t = {
                    n: t
                };
            t.n += "";
            e = e.replace(/([A-z?-?]+\|[^\s]+)/, function(e, n) {
                var n = n.split("|"),
                        r = new Number(t.n.substr(t.n.length - 1, 1)),
                        i = new Number(t.n.substr(t.n.length - 2, 1));
                return "ru" == al.lang ? "1" == t.n || 1 != i && 1 == r ? n[0] : 0 == r || 1 == i || 4 < r && 9 >= r ? n[2] : n[1] : "1" == t.n ? n[0] : n[1]
            });
            return e = e.replace(/\{([^\}]+)\}/, function(e, n) {
                return t[n]
            })
        },
        getUser: function() {
            return e
        },
        su: function(t) {
            e = t
        },
        itemSelector: {
            json: {},
            init: function(e) {
                al.empty(e) ? function(e) {
                    al.itemSelector.init(e)
                }(itemSelector) : (this.json = e, al.itemSelector.json.slotClass = this.json.slots, d = jQuery('<div id="itemSelector" style="display:none"/>'), d.html(this.json.html).appendTo("body"), v = jQuery("#itemSelector form"), v.submit(function() {
                    al.itemSelector.formData = {};
                    al.itemSelector.getData(jQuery(this));
                    var e = "?",
                            t;
                    for (t in al.itemSelector.formData)
                        e += t + "=" + al.itemSelector.formData[t] + "&";
                    e += "callback=?";
                    jQuery("#isItems").html("Loading...");
                    jQuery.getJSON(jQuery(this).attr("action") + e, function(e) {
                        al.itemSelector.post(e)
                    });
                    return !1
                }))
            },
            formData: {},
            getData: function(e) {
                e.children().each(function(e, t) {
                    t = jQuery(t);
                    al.inArray(t.get(0).tagName, ["INPUT", "SELECT"]) && "" != t.val() ? al.itemSelector.formData[t.attr("name")] = t.val() : al.itemSelector.getData(t)
                })
            },
            show: function(e, t) {
                void 0 !== e && (g = e, void 0 !== t.param && (y = t.param));
                this.set(t);
                void 0 !== t.submit && !0 == t.submit && v.submit();
                d.animate({
                    left: -1e3
                }, 0).show();
                al.sheet.show(function() {
                    al.itemSelector.hide()
                });
                var n = al.sheet.get(d);
                d.animate({
                    top: n.top,
                    left: n.left
                }, 0)
            },
            set: function(e) {
                var t = jQuery("select#Item_slot");
                jQuery("select#Item_class");
                this.o = e;
                t.unbind("change").change(function() {
                    var e = $(this).val(),
                            t = jQuery("select#Item_class");
                    t.children().remove();
                    var n = al.itemSelector.json.slotClass,
                            r = al.itemSelector.o.classes;
                    if (n) {
                        if (r)
                            for (i in n[e])
                                al.inArray(i, r) && t.append('<option value="' + i + '">' + n[e][i] + "</option>");
                        else
                            for (var i in n[e])
                                t.append('<option value="' + i + '">' + n[e][i] + "</option>");
                        t.show()
                    }
                });
                if (void 0 !== e.slots && !al.empty(e.slots)) {
                    void 0 === al.itemSelector.slots && (al.itemSelector.slots = {}, t.children().each(function(e, t) {
                        t = jQuery(t);
                        al.itemSelector.slots[t.attr("value")] = t.html()
                    }));
                    t.children().remove();
                    for (var n in e.slots)
                        t.append('<option value="' + e.slots[n] + '">' + al.itemSelector.slots[e.slots[n]] + "</option>");
                    t.val(e.slots[0]).change()
                }
                void 0 !== e.dragon && jQuery("input#dragon").val(e.dragon);
                void 0 !== e.lvl && jQuery("input#Item_rlvl").val(e.lvl)
            },
            hide: function() {
                d.hide();
                al.sheet.hide()
            },
            post: function(e) {
                jQuery("#isItems").html("");
                v.children("#page").val("");
                m = [];
                for (var t in e)
                    "object" == typeof e[t] && (m[t] = al.Item(e[t]), text = '<div class="is-item" id="isItem_' + t + '" index="' + t + '"><div class="is-name qual_' + e[t].qual + '">' + e[t].name + "</div>", text += '<div class="is-ico"><img class="item_ico" src="' + e[t].icoPath + '" /><div class="ico_qual ico_qual_' + e[t].qual + '"></div></div>', text += '<div class="is-desc">Required level: ' + e[t].rlvl + "<br>Quality: " + e[t].qualStr + "</div></div>", jQuery("#isItems").append(text), jQuery("#isItem_" + t).mouseenter(function() {
                        index = jQuery(this).attr("index");
                        al.desc.show(this, m[index].text())
                    }).mouseleave(function() {
                        al.desc.hide()
                    }).click(function() {
                        index = new Number(jQuery(this).attr("index"));
                        al.itemSelector.callback(index)
                    }));
                this.paginator(e.count, e.pageSize, e.currentPage)
            },
            paginator: function(e, t, n) {
                n++;
                var r = Math.ceil(e / t),
                        e = jQuery("#isPager");
                e.children().remove();
                e.text("");
                t = "[ ";
                if (1 < r) {
                    var i = 5 < n ? n - 5 : 1,
                            s = i + 9;
                    s > r && (i -= s - r, 1 > i && (i = 1), s = r);
                    for (r = i; r <= s; r++)
                        t += "<span", r == n && (t += ' class="current"'), t += ">" + r + "</span>";
                    e.append(t + " ]");
                    e.children("span:first").addClass("first")
                }
                jQuery("#isPager").children("span").click(function() {
                    var e = new Number(jQuery(this).html()) - 1;
                    jQuery("#isForm #page").val(e);
                    jQuery("#isForm form").submit()
                })
            },
            getItem: function(e) {
                return null !== m && void 0 !== m[e] ? m[e] : !1
            },
            callback: function(e) {
                null !== g && g(e, y);
                y = g = null;
                this.hide()
            }
        },
        getStatTitle: function(e) {
            switch (e) {
                case "agility":
                    return "Agility";
                case "dexterity":
                    return "Dexterity";
                case "hardiness":
                    return "Instinct";
                case "intellect":
                    return "Intelligence";
                case "intuition":
                    return "insight";
                case "lethality":
                    return "Rage";
                case "might":
                    return "Expertise";
                case "precision":
                    return "Luck";
                case "resolve":
                    return "Will";
                case "spirit":
                    return "Spirit";
                case "stamina":
                    return "Stamina";
                case "strength":
                    return "Strength";
                case "will":
                    return "Will";
                case "wisdom":
                    return "Wisdom";
                case "elemental":
                    return "Elemental Resistance";
                case "nature":
                    return "Resistance to poisons and diseases";
                case "divine":
                    return "Divine Resistance";
                case "armor":
                    return "Armor";
                case "hp":
                    return "Health";
                case "mp":
                    switch (character.clas) {
                        case "WARRIOR":
                        case "PALADIN":
                        case "STALKER":
                            return "Energy";
                        default:
                            return "Mana"
                    }
                    ;
                default:
                    return "HZ"
            }
        },
        timeToText: function(e) {
            var e = new Number(e),
                    t = Math.floor(e / 60 / 60 / 24),
                    n = Math.floor(e / 60 / 60) - 24 * t,
                    r = Math.floor(e / 60) - 60 * n - 1440 * t,
                    e = new Number((e - 86400 * t - 3600 * n - 60 * r).toFixed(1)),
                    i = "";
            0 < t ? i += t + "d " + n + "h " + r + "m " : 0 < n ? i += n + "h " + r + "m " : 0 < r && (i += r + "m ");
            if (0 == i.length || 0 < e)
                i += e + "s";
            return i
        },
        moneyToText: function(e) {
            var e = new Number(e),
                    t = Math.floor(e / 1e4),
                    n = Math.floor((e - 1e4 * t) / 100),
                    e = e - 1e4 * t - 100 * n,
                    r = "";
            0 < t && (r += t + '<div class="a-money-1"></div>');
            0 < n && (r += n + '<div class="a-money-2"></div>');
            0 < e && (r += e + '<div class="a-money-3"></div>');
            return r
        },
        Item: function(e) {
            e.slot = new Number(e.slot);
            200 <= e.slot && (e.slot -= 200);
            e.sub_slot = new Number(e.sub_slot);
            var t = null;
            return {
                iid: e.iid,
                name: e.name,
                lvl: e.lvl,
                price: e.price,
                rdis: e.rdis,
                rlvl: e.rlvl,
                classStr: e.classStr,
                class_: e.class_,
                misc: e.misc,
                stat: e.stat,
                qual: e.qual,
                qualStr: e.qualStr,
                pocketSize: e.pocketSize,
                description: e.description,
                edesc: e.edesc,
                ico: e.ico,
                icoPath: e.icoPath,
                time: e.time,
                slot: e.slot,
                slotName: e.slotName,
                points: e.points,
                sub_slot: e.sub_slot,
                guild: e.guild,
                fr: e.fr,
                spellDescription: e.spellDescription,
                spellCooldown: e.spellCooldown,
                container: e.container,
                cell: function() {
                    return t
                },
                post: function() {
                    t = e.container !== void 0 ? jQuery("#" + e.container) : jQuery("#slot_" + e.slot);
                    if (t.length != 0) {
                        t.addClass("qual_" + e.qual);
                        text = "";
                        e.fr === void 0 && (text = text + ('<a href="/item/' + e.iid + '">'));
                        text = text + ('<img class="item_ico" slot="' + e.slot + '" src="' + e.icoPath + '" />');
                        text = text + ('<div class="ico_qual ico_qual_' + e.qual + '" slot="' + e.slot + '"></div>');
                        e.fr === void 0 && (text = text + "</a>");
                        t.html(text);
                        t.attr("item", e.iid);
                        t.unbind("mouseenter").mouseenter(function() {
                            slot = new Number(jQuery(this).attr("slot"));
                            jQuery(this).attr("sub_slot") == "1" && (slot = slot + 100);
                            character.dragon == 1 ? al.desc.show(this, ditems[slot].text()) : al.desc.show(this, aitems[slot].text())
                        }).unbind("mouseleave").mouseleave(function() {
                            al.desc.hide()
                        });
                        character.fr == 1 && t.children("a").click(function() {
                            jQuery(this).parent().click();
                            return false
                        })
                    }
                },
                remove: function() {
                    t !== void 0 && t.length != 0 && t.attr("item") == e.iid && t.html("").attr("class", "slot").unbind("mouseenter")
                },
                text: function(t) {
                    text = '<div class="item_name qual_' + e.qual + '">' + e.name + "</div>";
                    text = text + ('<div class="slot_name">' + e.slotName + '</div><div class="item_class">' + e.classStr + '</div><div class="clear"></div>');
                    if (new Number(e.misc.armor) > 0)
                        text = text + ('<div class="item_armor">Armor: ' + e.misc.armor + "</div>");
                    else if (new Number(e.misc.spell_power) > 0)
                        text = text + ('<div class="item_damage">Magic: ' + e.misc.spell_power + '</div><div class="clear"></div>');
                    else if (new Number(e.misc.max_damage) > 0) {
                        text = text + ('<div class="item_damage">Damage: ' + e.misc.min_damage + "-" + e.misc.max_damage + "</div>");
                        text = text + ('<div class="item_DPS">per second: ' + e.misc.dps.toFixed(2) + '</div><div class="clear"></div>');
                        text = text + ('<div class="item_speed">Speed: ' + e.misc.weapon_speed + "</div>")
                    }
                    e.slotName == "Bag" && (text = text + ('<div class="al.itemDescription">Bag of ' + e.pocketSize + " slots</div>"));
                    for (var n in e.stat)
                        if (e.stat[n] > 0) {
                            text = text + '<div class="item_stat';
                            text = text + (" " + n);
                            if (typeof character != "undefined" && (character.type == 0 && al.inArray(n, ["dexterity", "strength", "might", "precision"]) || character.type == 1 && al.inArray(n, ["intellect", "intuition", "spirit", "wisdom", "precision"])))
                                text = text + " primary";
                            text = text + ('">+' + e.stat[n] + " " + al.getStatTitle(n) + "</div>")
                        }
                    e.spellDescription !== void 0 && (text = text + ('<div class="qual_3">Use: ' + e.spellDescription + "</div>"));
                    e.description !== void 0 && (text = text + ('<div class="al.itemDescription">' + e.description + "</div>"));
                    e.edesc !== void 0 && (text = text + ('<div class="">' + e.edesc + "</div>"));
                    e.spellCooldown !== void 0 && (text = text + ('<div class="qual_7">Cooldown: ' + al.timeToText(e.spellCooldown / 1e3) + "</div>"));
                    text = text + ('<div class="item_lvl">Item Level: ' + e.lvl + "</div>");
                    text = text + ('<div class="item_lvl">Required Level: ' + e.rlvl + "</div>");
                    e.slot == 18 && e.guild !== void 0 && (text = text + ("<div>" + e.guild + "</div>"));
                    if ((t === void 0 || t == 1) && e.points > 0)
                        text = text + ('<div class="item_lvl">Points: ' + e.points + "</div>");
                    e.time !== void 0 && (text = text + ('<div class="qual_3">Updated: ' + e.time + "</div>"));
                    return text
                }
            }
        },
        itemDesc: {
            item: {},
            enter: 0,
            url: "",
            show: function(e, t, n) {
                void 0 === al.url[e] ? jQuery.getJSON(e + "/json?callback=?", function(r) {
                    al.itemDesc.item = al.Item(r);
                    al.url[e] = al.itemDesc.item;
                    void 0 !== n && (width = 40, "" != jQuery(t).attr("ico") && (width = jQuery(t).attr("ico")), "" != al.itemDesc.item.ico ? jQuery(t).html('<img class="item_ico" src="' + al.itemDesc.item.ico + '" width="' + width + 'px" />') : jQuery(t).html(al.itemDesc.name));
                    al.itemDesc.desc(t)
                }) : (al.itemDesc.item = al.url[e], al.itemDesc.desc(t))
            },
            desc: function(e) {
                1 == al.itemDesc.enter && (jQuery("#itemdesc_ico").remove(), 0 == jQuery(e).children("img").length && al.desc.block().prepend('<div id="itemdesc_ico" class="item_ico" style="float:left;"><img src="' + al.itemDesc.item.icoPath + '" /><div class="ico_qual ico_qual_' + al.itemDesc.item.qual + '"></div></div>'), al.desc.show(e, al.itemDesc.item.text(0)))
            },
            hide: function() {
                jQuery("#itemdesc_ico").remove();
                al.desc.hide()
            },
            post: function() {
                var e = /a/,
                        e = /armory\.(aolive|al|ao\.anotherlive)\.ru/.test(document.location.host) ? /\/item\/\d+/ : /armory\.(aolive|al)\.ru\/item\/\d+/;
                jQuery("a").each(function(t, n) {
                    0 == jQuery(n).children("[slot]").length && "1" !== jQuery(n).attr("no_desc") && (h = jQuery(n).attr("href"), e.test(h) && (void 0 !== jQuery(n).attr("ico") && al.itemDesc.show(h, n, !0), jQuery(n).mouseenter(function() {
                        al.itemDesc.enter = 1;
                        al.itemDesc.show(jQuery(this).attr("href"), this)
                    }).mouseleave(function() {
                        al.itemDesc.enter = 0;
                        al.itemDesc.hide()
                    })))
                })
            }
        },
        reloadDesc: function() {
            al.itemDesc.post();
            "function" == typeof commentHeightFix && commentHeightFix();
            "function" == typeof headerTextFontFix && headerTextFontFix()
        },
        gameInit: function() {
            al.reloadDesc();
            1 == al.scroll && jQuery("div").each(function(e) {
                "hidden" == jQuery(this).css("overflow-y") && (scroll[e] = new Scroll(this, e))
            })
        }
    }
}();
jQuery(document).ready(al.init);
