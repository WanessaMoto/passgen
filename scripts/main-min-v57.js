(function() {
    var e, t, n;
    (function(r) {
        function d(e, t) {
            return h.call(e, t)
        }

        function v(e, t) {
            var n, r, i, s, o, u, a, f, c, h, p = t && t.split("/"),
                d = l.map,
                v = d && d["*"] || {};
            if (e && e.charAt(0) === ".")
                if (t) {
                    p = p.slice(0, p.length - 1), e = p.concat(e.split("/"));
                    for (f = 0; f < e.length; f += 1) {
                        h = e[f];
                        if (h === ".") e.splice(f, 1), f -= 1;
                        else if (h === "..") {
                            if (f === 1 && (e[2] === ".." || e[0] === "..")) break;
                            f > 0 && (e.splice(f - 1, 2), f -= 2)
                        }
                    }
                    e = e.join("/")
                } else e.indexOf("./") === 0 && (e = e.substring(2));
            if ((p || v) && d) {
                n = e.split("/");
                for (f = n.length; f > 0; f -= 1) {
                    r = n.slice(0, f).join("/");
                    if (p)
                        for (c = p.length; c > 0; c -= 1) {
                            i = d[p.slice(0, c).join("/")];
                            if (i) {
                                i = i[r];
                                if (i) {
                                    s = i, o = f;
                                    break
                                }
                            }
                        }
                    if (s) break;
                    !u && v && v[r] && (u = v[r], a = f)
                }!s && u && (s = u, o = a), s && (n.splice(0, o, s), e = n.join("/"))
            }
            return e
        }

        function m(e, t) {
            return function() {
                return s.apply(r, p.call(arguments, 0).concat([e, t]))
            }
        }

        function g(e) {
            return function(t) {
                return v(t, e)
            }
        }

        function y(e) {
            return function(t) {
                a[e] = t
            }
        }

        function b(e) {
            if (d(f, e)) {
                var t = f[e];
                delete f[e], c[e] = !0, i.apply(r, t)
            }
            if (!d(a, e) && !d(c, e)) throw new Error("No " + e);
            return a[e]
        }

        function w(e) {
            var t, n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
        }

        function E(e) {
            return function() {
                return l && l.config && l.config[e] || {}
            }
        }
        var i, s, o, u, a = {},
            f = {},
            l = {},
            c = {},
            h = Object.prototype.hasOwnProperty,
            p = [].slice;
        o = function(e, t) {
            var n, r = w(e),
                i = r[0];
            return e = r[1], i && (i = v(i, t), n = b(i)), i ? n && n.normalize ? e = n.normalize(e, g(t)) : e = v(e, t) : (e = v(e, t), r = w(e), i = r[0], e = r[1], i && (n = b(i))), {
                f: i ? i + "!" + e : e,
                n: e,
                pr: i,
                p: n
            }
        }, u = {
            require: function(e) {
                return m(e)
            },
            exports: function(e) {
                var t = a[e];
                return typeof t != "undefined" ? t : a[e] = {}
            },
            module: function(e) {
                return {
                    id: e,
                    uri: "",
                    exports: a[e],
                    config: E(e)
                }
            }
        }, i = function(e, t, n, i) {
            var s, l, h, p, v, g = [],
                w;
            i = i || e;
            if (typeof n == "function") {
                t = !t.length && n.length ? ["require", "exports", "module"] : t;
                for (v = 0; v < t.length; v += 1) {
                    p = o(t[v], i), l = p.f;
                    if (l === "require") g[v] = u.require(e);
                    else if (l === "exports") g[v] = u.exports(e), w = !0;
                    else if (l === "module") s = g[v] = u.module(e);
                    else if (d(a, l) || d(f, l) || d(c, l)) g[v] = b(l);
                    else {
                        if (!p.p) throw new Error(e + " missing " + l);
                        p.p.load(p.n, m(i, !0), y(l), {}), g[v] = a[l]
                    }
                }
                h = n.apply(a[e], g);
                if (e)
                    if (s && s.exports !== r && s.exports !== a[e]) a[e] = s.exports;
                    else if (h !== r || !w) a[e] = h
            } else e && (a[e] = n)
        }, e = t = s = function(e, t, n, a, f) {
            return typeof e == "string" ? u[e] ? u[e](t) : b(o(e, t).f) : (e.splice || (l = e, t.splice ? (e = t, t = n, n = null) : e = r), t = t || function() {}, typeof n == "function" && (n = a, a = f), a ? i(r, e, t, n) : setTimeout(function() {
                i(r, e, t, n)
            }, 4), s)
        }, s.config = function(e) {
            return l = e, l.deps && s(l.deps, l.callback), s
        }, n = function(e, t, n) {
            t.splice || (n = t, t = []), !d(a, e) && !d(f, e) && (f[e] = [e, t, n])
        }, n.amd = {
            jQuery: !0
        }
    })(), n("almond", function() {}),
        function(e, t) {
            typeof module == "object" && typeof module.exports == "object" ? module.exports = e.document ? t(e, !0) : function(e) {
                if (!e.document) throw new Error("jQuery requires a window with a document");
                return t(e)
            } : t(e)
        }(typeof window != "undefined" ? window : this, function(e, t) {
            function b(e) {
                var t = !!e && "length" in e && e.length,
                    n = d.type(e);
                return n === "function" || d.isWindow(e) ? !1 : n === "array" || t === 0 || typeof t == "number" && t > 0 && t - 1 in e
            }

            function C(e, t, n) {
                if (d.isFunction(t)) return d.grep(e, function(e, r) {
                    return !!t.call(e, r, e) !== n
                });
                if (t.nodeType) return d.grep(e, function(e) {
                    return e === t !== n
                });
                if (typeof t == "string") {
                    if (N.test(t)) return d.filter(t, e, n);
                    t = d.filter(t, e)
                }
                return d.grep(e, function(e) {
                    return d.inArray(e, t) > -1 !== n
                })
            }

            function _(e, t) {
                do e = e[t]; while (e && e.nodeType !== 1);
                return e
            }

            function P(e) {
                var t = {};
                return d.each(e.match(D) || [], function(e, n) {
                    t[n] = !0
                }), t
            }

            function B() {
                i.addEventListener ? (i.removeEventListener("DOMContentLoaded", j), e.removeEventListener("load", j)) : (i.detachEvent("onreadystatechange", j), e.detachEvent("onload", j))
            }

            function j() {
                if (i.addEventListener || e.event.type === "load" || i.readyState === "complete") B(), d.ready()
            }

            function U(e, t, n) {
                if (n === undefined && e.nodeType === 1) {
                    var r = "data-" + t.replace(R, "-$1").toLowerCase();
                    n = e.getAttribute(r);
                    if (typeof n == "string") {
                        try {
                            n = n === "true" ? !0 : n === "false" ? !1 : n === "null" ? null : +n + "" === n ? +n : q.test(n) ? d.parseJSON(n) : n
                        } catch (i) {}
                        d.data(e, t, n)
                    } else n = undefined
                }
                return n
            }

            function z(e) {
                var t;
                for (t in e) {
                    if (t === "data" && d.isEmptyObject(e[t])) continue;
                    if (t !== "toJSON") return !1
                }
                return !0
            }

            function W(e, t, n, i) {
                if (!I(e)) return;
                var s, o, u = d.expando,
                    a = e.nodeType,
                    f = a ? d.cache : e,
                    l = a ? e[u] : e[u] && u;
                if ((!l || !f[l] || !i && !f[l].data) && n === undefined && typeof t == "string") return;
                l || (a ? l = e[u] = r.pop() || d.guid++ : l = u), f[l] || (f[l] = a ? {} : {
                    toJSON: d.noop
                });
                if (typeof t == "object" || typeof t == "function") i ? f[l] = d.extend(f[l], t) : f[l].data = d.extend(f[l].data, t);
                return o = f[l], i || (o.data || (o.data = {}), o = o.data), n !== undefined && (o[d.camelCase(t)] = n), typeof t == "string" ? (s = o[t], s == null && (s = o[d.camelCase(t)])) : s = o, s
            }

            function X(e, t, n) {
                if (!I(e)) return;
                var r, i, s = e.nodeType,
                    o = s ? d.cache : e,
                    u = s ? e[d.expando] : d.expando;
                if (!o[u]) return;
                if (t) {
                    r = n ? o[u] : o[u].data;
                    if (r) {
                        d.isArray(t) ? t = t.concat(d.map(t, d.camelCase)) : t in r ? t = [t] : (t = d.camelCase(t), t in r ? t = [t] : t = t.split(" ")), i = t.length;
                        while (i--) delete r[t[i]];
                        if (n ? !z(r) : !d.isEmptyObject(r)) return
                    }
                }
                if (!n) {
                    delete o[u].data;
                    if (!z(o[u])) return
                }
                s ? d.cleanData([e], !0) : h.deleteExpando || o != o.window ? delete o[u] : o[u] = undefined
            }

            function Q(e, t, n, r) {
                var i, s = 1,
                    o = 20,
                    u = r ? function() {
                        return r.cur()
                    } : function() {
                        return d.css(e, t, "")
                    },
                    a = u(),
                    f = n && n[3] || (d.cssNumber[t] ? "" : "px"),
                    l = (d.cssNumber[t] || f !== "px" && +a) && $.exec(d.css(e, t));
                if (l && l[3] !== f) {
                    f = f || l[3], n = n || [], l = +a || 1;
                    do s = s || ".5", l /= s, d.style(e, t, l + f); while (s !== (s = u() / a) && s !== 1 && --o)
                }
                return n && (l = +l || +a || 0, i = n[1] ? l + (n[1] + 1) * n[2] : +n[2], r && (r.unit = f, r.start = l, r.end = i)), i
            }

            function rt(e) {
                var t = nt.split("|"),
                    n = e.createDocumentFragment();
                if (n.createElement)
                    while (t.length) n.createElement(t.pop());
                return n
            }

            function st(e, t) {
                var n, r, i = 0,
                    s = typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll(t || "*") : undefined;
                if (!s)
                    for (s = [], n = e.childNodes || e;
                        (r = n[i]) != null; i++) !t || d.nodeName(r, t) ? s.push(r) : d.merge(s, st(r, t));
                return t === undefined || t && d.nodeName(e, t) ? d.merge([e], s) : s
            }

            function ot(e, t) {
                var n, r = 0;
                for (;
                    (n = e[r]) != null; r++) d._data(n, "globalEval", !t || d._data(t[r], "globalEval"))
            }

            function ft(e) {
                Y.test(e.type) && (e.defaultChecked = e.checked)
            }

            function lt(e, t, n, r, i) {
                var s, o, u, a, f, l, c, p = e.length,
                    v = rt(t),
                    m = [],
                    g = 0;
                for (; g < p; g++) {
                    o = e[g];
                    if (o || o === 0)
                        if (d.type(o) === "object") d.merge(m, o.nodeType ? [o] : o);
                        else if (!ut.test(o)) m.push(t.createTextNode(o));
                    else {
                        a = a || v.appendChild(t.createElement("div")), f = (Z.exec(o) || ["", ""])[1].toLowerCase(), c = it[f] || it._default, a.innerHTML = c[1] + d.htmlPrefilter(o) + c[2], s = c[0];
                        while (s--) a = a.lastChild;
                        !h.leadingWhitespace && tt.test(o) && m.push(t.createTextNode(tt.exec(o)[0]));
                        if (!h.tbody) {
                            o = f === "table" && !at.test(o) ? a.firstChild : c[1] === "<table>" && !at.test(o) ? a : 0, s = o && o.childNodes.length;
                            while (s--) d.nodeName(l = o.childNodes[s], "tbody") && !l.childNodes.length && o.removeChild(l)
                        }
                        d.merge(m, a.childNodes), a.textContent = "";
                        while (a.firstChild) a.removeChild(a.firstChild);
                        a = v.lastChild
                    }
                }
                a && v.removeChild(a), h.appendChecked || d.grep(st(m, "input"), ft), g = 0;
                while (o = m[g++]) {
                    if (r && d.inArray(o, r) > -1) {
                        i && i.push(o);
                        continue
                    }
                    u = d.contains(o.ownerDocument, o), a = st(v.appendChild(o), "script"), u && ot(a);
                    if (n) {
                        s = 0;
                        while (o = a[s++]) et.test(o.type || "") && n.push(o)
                    }
                }
                return a = null, v
            }

            function mt() {
                return !0
            }

            function gt() {
                return !1
            }

            function yt() {
                try {
                    return i.activeElement
                } catch (e) {}
            }

            function bt(e, t, n, r, i, s) {
                var o, u;
                if (typeof t == "object") {
                    typeof n != "string" && (r = r || n, n = undefined);
                    for (u in t) bt(e, u, n, r, t[u], s);
                    return e
                }
                r == null && i == null ? (i = n, r = n = undefined) : i == null && (typeof n == "string" ? (i = r, r = undefined) : (i = r, r = n, n = undefined));
                if (i === !1) i = gt;
                else if (!i) return e;
                return s === 1 && (o = i, i = function(e) {
                    return d().off(e), o.apply(this, arguments)
                }, i.guid = o.guid || (o.guid = d.guid++)), e.each(function() {
                    d.event.add(this, t, i, r, n)
                })
            }

            function At(e, t) {
                return d.nodeName(e, "table") && d.nodeName(t.nodeType !== 11 ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
            }

            function Ot(e) {
                return e.type = (d.find.attr(e, "type") !== null) + "/" + e.type, e
            }

            function Mt(e) {
                var t = Nt.exec(e.type);
                return t ? e.type = t[1] : e.removeAttribute("type"), e
            }

            function _t(e, t) {
                if (t.nodeType !== 1 || !d.hasData(e)) return;
                var n, r, i, s = d._data(e),
                    o = d._data(t, s),
                    u = s.events;
                if (u) {
                    delete o.handle, o.events = {};
                    for (n in u)
                        for (r = 0, i = u[n].length; r < i; r++) d.event.add(t, n, u[n][r])
                }
                o.data && (o.data = d.extend({}, o.data))
            }

            function Dt(e, t) {
                var n, r, i;
                if (t.nodeType !== 1) return;
                n = t.nodeName.toLowerCase();
                if (!h.noCloneEvent && t[d.expando]) {
                    i = d._data(t);
                    for (r in i.events) d.removeEvent(t, r, i.handle);
                    t.removeAttribute(d.expando)
                }
                if (n === "script" && t.text !== e.text) Ot(t).text = e.text, Mt(t);
                else if (n === "object") t.parentNode && (t.outerHTML = e.outerHTML), h.html5Clone && e.innerHTML && !d.trim(t.innerHTML) && (t.innerHTML = e.innerHTML);
                else if (n === "input" && Y.test(e.type)) t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value);
                else if (n === "option") t.defaultSelected = t.selected = e.defaultSelected;
                else if (n === "input" || n === "textarea") t.defaultValue = e.defaultValue
            }

            function Pt(e, t, n, r) {
                t = o.apply([], t);
                var i, s, u, a, f, l, c = 0,
                    p = e.length,
                    v = p - 1,
                    m = t[0],
                    g = d.isFunction(m);
                if (g || p > 1 && typeof m == "string" && !h.checkClone && Tt.test(m)) return e.each(function(i) {
                    var s = e.eq(i);
                    g && (t[0] = m.call(this, i, s.html())), Pt(s, t, n, r)
                });
                if (p) {
                    l = lt(t, e[0].ownerDocument, !1, e, r), i = l.firstChild, l.childNodes.length === 1 && (l = i);
                    if (i || r) {
                        a = d.map(st(l, "script"), Ot), u = a.length;
                        for (; c < p; c++) s = l, c !== v && (s = d.clone(s, !0, !0), u && d.merge(a, st(s, "script"))), n.call(e[c], s, c);
                        if (u) {
                            f = a[a.length - 1].ownerDocument, d.map(a, Mt);
                            for (c = 0; c < u; c++) s = a[c], et.test(s.type || "") && !d._data(s, "globalEval") && d.contains(f, s) && (s.src ? d._evalUrl && d._evalUrl(s.src) : d.globalEval((s.text || s.textContent || s.innerHTML || "").replace(Ct, "")))
                        }
                        l = i = null
                    }
                }
                return e
            }

            function Ht(e, t, n) {
                var r, i = t ? d.filter(t, e) : e,
                    s = 0;
                for (;
                    (r = i[s]) != null; s++) !n && r.nodeType === 1 && d.cleanData(st(r)), r.parentNode && (n && d.contains(r.ownerDocument, r) && ot(st(r, "script")), r.parentNode.removeChild(r));
                return e
            }

            function Ft(e, t) {
                var n = d(t.createElement(e)).appendTo(t.body),
                    r = d.css(n[0], "display");
                return n.detach(), r
            }

            function It(e) {
                var t = i,
                    n = jt[e];
                if (!n) {
                    n = Ft(e, t);
                    if (n === "none" || !n) Bt = (Bt || d("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Bt[0].contentWindow || Bt[0].contentDocument).document, t.write(), t.close(), n = Ft(e, t), Bt.detach();
                    jt[e] = n
                }
                return n
            }

            function $t(e, t) {
                return {
                    get: function() {
                        if (e()) {
                            delete this.get;
                            return
                        }
                        return (this.get = t).apply(this, arguments)
                    }
                }
            }

            function nn(e) {
                if (e in tn) return e;
                var t = e.charAt(0).toUpperCase() + e.slice(1),
                    n = en.length;
                while (n--) {
                    e = en[n] + t;
                    if (e in tn) return e
                }
            }

            function rn(e, t) {
                var n, r, i, s = [],
                    o = 0,
                    u = e.length;
                for (; o < u; o++) {
                    r = e[o];
                    if (!r.style) continue;
                    s[o] = d._data(r, "olddisplay"), n = r.style.display, t ? (!s[o] && n === "none" && (r.style.display = ""), r.style.display === "" && K(r) && (s[o] = d._data(r, "olddisplay", It(r.nodeName)))) : (i = K(r), (n && n !== "none" || !i) && d._data(r, "olddisplay", i ? n : d.css(r, "display")))
                }
                for (o = 0; o < u; o++) {
                    r = e[o];
                    if (!r.style) continue;
                    if (!t || r.style.display === "none" || r.style.display === "") r.style.display = t ? s[o] || "" : "none"
                }
                return e
            }

            function sn(e, t, n) {
                var r = Gt.exec(t);
                return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
            }

            function on(e, t, n, r, i) {
                var s = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
                    o = 0;
                for (; s < 4; s += 2) n === "margin" && (o += d.css(e, n + J[s], !0, i)), r ? (n === "content" && (o -= d.css(e, "padding" + J[s], !0, i)), n !== "margin" && (o -= d.css(e, "border" + J[s] + "Width", !0, i))) : (o += d.css(e, "padding" + J[s], !0, i), n !== "padding" && (o += d.css(e, "border" + J[s] + "Width", !0, i)));
                return o
            }

            function un(t, n, r) {
                var s = !0,
                    o = n === "width" ? t.offsetWidth : t.offsetHeight,
                    u = Wt(t),
                    a = h.boxSizing && d.css(t, "boxSizing", !1, u) === "border-box";
                i.msFullscreenElement && e.top !== e && t.getClientRects().length && (o = Math.round(t.getBoundingClientRect()[n] * 100));
                if (o <= 0 || o == null) {
                    o = Xt(t, n, u);
                    if (o < 0 || o == null) o = t.style[n];
                    if (Rt.test(o)) return o;
                    s = a && (h.boxSizingReliable() || o === t.style[n]), o = parseFloat(o) || 0
                }
                return o + on(t, n, r || (a ? "border" : "content"), s, u) + "px"
            }

            function an(e, t, n, r, i) {
                return new an.prototype.init(e, t, n, r, i)
            }

            function pn() {
                return e.setTimeout(function() {
                    fn = undefined
                }), fn = d.now()
            }

            function dn(e, t) {
                var n, r = {
                        height: e
                    },
                    i = 0;
                t = t ? 1 : 0;
                for (; i < 4; i += 2 - t) n = J[i], r["margin" + n] = r["padding" + n] = e;
                return t && (r.opacity = r.width = e), r
            }

            function vn(e, t, n) {
                var r, i = (yn.tweeners[t] || []).concat(yn.tweeners["*"]),
                    s = 0,
                    o = i.length;
                for (; s < o; s++)
                    if (r = i[s].call(n, t, e)) return r
            }

            function mn(e, t, n) {
                var r, i, s, o, u, a, f, l, c = this,
                    p = {},
                    v = e.style,
                    m = e.nodeType && K(e),
                    g = d._data(e, "fxshow");
                n.queue || (u = d._queueHooks(e, "fx"), u.unqueued == null && (u.unqueued = 0, a = u.empty.fire, u.empty.fire = function() {
                    u.unqueued || a()
                }), u.unqueued++, c.always(function() {
                    c.always(function() {
                        u.unqueued--, d.queue(e, "fx").length || u.empty.fire()
                    })
                })), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [v.overflow, v.overflowX, v.overflowY], f = d.css(e, "display"), l = f === "none" ? d._data(e, "olddisplay") || It(e.nodeName) : f, l === "inline" && d.css(e, "float") === "none" && (!h.inlineBlockNeedsLayout || It(e.nodeName) === "inline" ? v.display = "inline-block" : v.zoom = 1)), n.overflow && (v.overflow = "hidden", h.shrinkWrapBlocks() || c.always(function() {
                    v.overflow = n.overflow[0], v.overflowX = n.overflow[1], v.overflowY = n.overflow[2]
                }));
                for (r in t) {
                    i = t[r];
                    if (cn.exec(i)) {
                        delete t[r], s = s || i === "toggle";
                        if (i === (m ? "hide" : "show")) {
                            if (i !== "show" || !g || g[r] === undefined) continue;
                            m = !0
                        }
                        p[r] = g && g[r] || d.style(e, r)
                    } else f = undefined
                }
                if (!d.isEmptyObject(p)) {
                    g ? "hidden" in g && (m = g.hidden) : g = d._data(e, "fxshow", {}), s && (g.hidden = !m), m ? d(e).show() : c.done(function() {
                        d(e).hide()
                    }), c.done(function() {
                        var t;
                        d._removeData(e, "fxshow");
                        for (t in p) d.style(e, t, p[t])
                    });
                    for (r in p) o = vn(m ? g[r] : 0, r, c), r in g || (g[r] = o.start, m && (o.end = o.start, o.start = r === "width" || r === "height" ? 1 : 0))
                } else(f === "none" ? It(e.nodeName) : f) === "inline" && (v.display = f)
            }

            function gn(e, t) {
                var n, r, i, s, o;
                for (n in e) {
                    r = d.camelCase(n), i = t[r], s = e[n], d.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = d.cssHooks[r];
                    if (o && "expand" in o) {
                        s = o.expand(s), delete e[r];
                        for (n in s) n in e || (e[n] = s[n], t[n] = i)
                    } else t[r] = i
                }
            }

            function yn(e, t, n) {
                var r, i, s = 0,
                    o = yn.prefilters.length,
                    u = d.Deferred().always(function() {
                        delete a.elem
                    }),
                    a = function() {
                        if (i) return !1;
                        var t = fn || pn(),
                            n = Math.max(0, f.startTime + f.duration - t),
                            r = n / f.duration || 0,
                            s = 1 - r,
                            o = 0,
                            a = f.tweens.length;
                        for (; o < a; o++) f.tweens[o].run(s);
                        return u.notifyWith(e, [f, s, n]), s < 1 && a ? n : (u.resolveWith(e, [f]), !1)
                    },
                    f = u.promise({
                        elem: e,
                        props: d.extend({}, t),
                        opts: d.extend(!0, {
                            specialEasing: {},
                            easing: d.easing._default
                        }, n),
                        originalProperties: t,
                        originalOptions: n,
                        startTime: fn || pn(),
                        duration: n.duration,
                        tweens: [],
                        createTween: function(t, n) {
                            var r = d.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                            return f.tweens.push(r), r
                        },
                        stop: function(t) {
                            var n = 0,
                                r = t ? f.tweens.length : 0;
                            if (i) return this;
                            i = !0;
                            for (; n < r; n++) f.tweens[n].run(1);
                            return t ? (u.notifyWith(e, [f, 1, 0]), u.resolveWith(e, [f, t])) : u.rejectWith(e, [f, t]), this
                        }
                    }),
                    l = f.props;
                gn(l, f.opts.specialEasing);
                for (; s < o; s++) {
                    r = yn.prefilters[s].call(f, e, l, f.opts);
                    if (r) return d.isFunction(r.stop) && (d._queueHooks(f.elem, f.opts.queue).stop = d.proxy(r.stop, r)), r
                }
                return d.map(l, vn, f), d.isFunction(f.opts.start) && f.opts.start.call(e, f), d.fx.timer(d.extend(a, {
                    elem: e,
                    anim: f,
                    queue: f.opts.queue
                })), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
            }

            function On(e) {
                return d.attr(e, "class") || ""
            }

            function $n(e) {
                return function(t, n) {
                    typeof t != "string" && (n = t, t = "*");
                    var r, i = 0,
                        s = t.toLowerCase().match(D) || [];
                    if (d.isFunction(n))
                        while (r = s[i++]) r.charAt(0) === "+" ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
                }
            }

            function Jn(e, t, n, r) {
                function o(u) {
                    var a;
                    return i[u] = !0, d.each(e[u] || [], function(e, u) {
                        var f = u(t, n, r);
                        if (typeof f == "string" && !s && !i[f]) return t.dataTypes.unshift(f), o(f), !1;
                        if (s) return !(a = f)
                    }), a
                }
                var i = {},
                    s = e === zn;
                return o(t.dataTypes[0]) || !i["*"] && o("*")
            }

            function Kn(e, t) {
                var n, r, i = d.ajaxSettings.flatOptions || {};
                for (r in t) t[r] !== undefined && ((i[r] ? e : n || (n = {}))[r] = t[r]);
                return n && d.extend(!0, e, n), e
            }

            function Qn(e, t, n) {
                var r, i, s, o, u = e.contents,
                    a = e.dataTypes;
                while (a[0] === "*") a.shift(), i === undefined && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                if (i)
                    for (o in u)
                        if (u[o] && u[o].test(i)) {
                            a.unshift(o);
                            break
                        } if (a[0] in n) s = a[0];
                else {
                    for (o in n) {
                        if (!a[0] || e.converters[o + " " + a[0]]) {
                            s = o;
                            break
                        }
                        r || (r = o)
                    }
                    s = s || r
                }
                if (s) return s !== a[0] && a.unshift(s), n[s]
            }

            function Gn(e, t, n, r) {
                var i, s, o, u, a, f = {},
                    l = e.dataTypes.slice();
                if (l[1])
                    for (o in e.converters) f[o.toLowerCase()] = e.converters[o];
                s = l.shift();
                while (s) {
                    e.responseFields[s] && (n[e.responseFields[s]] = t), !a && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), a = s, s = l.shift();
                    if (s)
                        if (s === "*") s = a;
                        else if (a !== "*" && a !== s) {
                        o = f[a + " " + s] || f["* " + s];
                        if (!o)
                            for (i in f) {
                                u = i.split(" ");
                                if (u[1] === s) {
                                    o = f[a + " " + u[0]] || f["* " + u[0]];
                                    if (o) {
                                        o === !0 ? o = f[i] : f[i] !== !0 && (s = u[0], l.unshift(u[1]));
                                        break
                                    }
                                }
                            }
                        if (o !== !0)
                            if (o && e["throws"]) t = o(t);
                            else try {
                                t = o(t)
                            } catch (c) {
                                return {
                                    state: "parsererror",
                                    error: o ? c : "No conversion from " + a + " to " + s
                                }
                            }
                    }
                }
                return {
                    state: "success",
                    data: t
                }
            }

            function Yn(e) {
                return e.style && e.style.display || d.css(e, "display")
            }

            function Zn(e) {
                while (e && e.nodeType === 1) {
                    if (Yn(e) === "none" || e.type === "hidden") return !0;
                    e = e.parentNode
                }
                return !1
            }

            function sr(e, t, n, r) {
                var i;
                if (d.isArray(t)) d.each(t, function(t, i) {
                    n || tr.test(e) ? r(e, i) : sr(e + "[" + (typeof i == "object" && i != null ? t : "") + "]", i, n, r)
                });
                else if (!n && d.type(t) === "object")
                    for (i in t) sr(e + "[" + i + "]", t[i], n, r);
                else r(e, t)
            }

            function fr() {
                try {
                    return new e.XMLHttpRequest
                } catch (t) {}
            }

            function lr() {
                try {
                    return new e.ActiveXObject("Microsoft.XMLHTTP")
                } catch (t) {}
            }

            function dr(e) {
                return d.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1
            }
            var r = [],
                i = e.document,
                s = r.slice,
                o = r.concat,
                u = r.push,
                a = r.indexOf,
                f = {},
                l = f.toString,
                c = f.hasOwnProperty,
                h = {},
                p = "1.12.3",
                d = function(e, t) {
                    return new d.fn.init(e, t)
                },
                v = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                m = /^-ms-/,
                g = /-([\da-z])/gi,
                y = function(e, t) {
                    return t.toUpperCase()
                };
            d.fn = d.prototype = {
                jquery: p,
                constructor: d,
                selector: "",
                length: 0,
                toArray: function() {
                    return s.call(this)
                },
                get: function(e) {
                    return e != null ? e < 0 ? this[e + this.length] : this[e] : s.call(this)
                },
                pushStack: function(e) {
                    var t = d.merge(this.constructor(), e);
                    return t.prevObject = this, t.context = this.context, t
                },
                each: function(e) {
                    return d.each(this, e)
                },
                map: function(e) {
                    return this.pushStack(d.map(this, function(t, n) {
                        return e.call(t, n, t)
                    }))
                },
                slice: function() {
                    return this.pushStack(s.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(e) {
                    var t = this.length,
                        n = +e + (e < 0 ? t : 0);
                    return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor()
                },
                push: u,
                sort: r.sort,
                splice: r.splice
            }, d.extend = d.fn.extend = function() {
                var e, t, n, r, i, s, o = arguments[0] || {},
                    u = 1,
                    a = arguments.length,
                    f = !1;
                typeof o == "boolean" && (f = o, o = arguments[u] || {}, u++), typeof o != "object" && !d.isFunction(o) && (o = {}), u === a && (o = this, u--);
                for (; u < a; u++)
                    if ((i = arguments[u]) != null)
                        for (r in i) {
                            e = o[r], n = i[r];
                            if (o === n) continue;
                            f && n && (d.isPlainObject(n) || (t = d.isArray(n))) ? (t ? (t = !1, s = e && d.isArray(e) ? e : []) : s = e && d.isPlainObject(e) ? e : {}, o[r] = d.extend(f, s, n)) : n !== undefined && (o[r] = n)
                        }
                return o
            }, d.extend({
                expando: "jQuery" + (p + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(e) {
                    throw new Error(e)
                },
                noop: function() {},
                isFunction: function(e) {
                    return d.type(e) === "function"
                },
                isArray: Array.isArray || function(e) {
                    return d.type(e) === "array"
                },
                isWindow: function(e) {
                    return e != null && e == e.window
                },
                isNumeric: function(e) {
                    var t = e && e.toString();
                    return !d.isArray(e) && t - parseFloat(t) + 1 >= 0
                },
                isEmptyObject: function(e) {
                    var t;
                    for (t in e) return !1;
                    return !0
                },
                isPlainObject: function(e) {
                    var t;
                    if (!e || d.type(e) !== "object" || e.nodeType || d.isWindow(e)) return !1;
                    try {
                        if (e.constructor && !c.call(e, "constructor") && !c.call(e.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (n) {
                        return !1
                    }
                    if (!h.ownFirst)
                        for (t in e) return c.call(e, t);
                    for (t in e);
                    return t === undefined || c.call(e, t)
                },
                type: function(e) {
                    return e == null ? e + "" : typeof e == "object" || typeof e == "function" ? f[l.call(e)] || "object" : typeof e
                },
                globalEval: function(t) {
                    t && d.trim(t) && (e.execScript || function(t) {
                        e.eval.call(e, t)
                    })(t)
                },
                camelCase: function(e) {
                    return e.replace(m, "ms-").replace(g, y)
                },
                nodeName: function(e, t) {
                    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                },
                each: function(e, t) {
                    var n, r = 0;
                    if (b(e)) {
                        n = e.length;
                        for (; r < n; r++)
                            if (t.call(e[r], r, e[r]) === !1) break
                    } else
                        for (r in e)
                            if (t.call(e[r], r, e[r]) === !1) break;
                    return e
                },
                trim: function(e) {
                    return e == null ? "" : (e + "").replace(v, "")
                },
                makeArray: function(e, t) {
                    var n = t || [];
                    return e != null && (b(Object(e)) ? d.merge(n, typeof e == "string" ? [e] : e) : u.call(n, e)), n
                },
                inArray: function(e, t, n) {
                    var r;
                    if (t) {
                        if (a) return a.call(t, e, n);
                        r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
                        for (; n < r; n++)
                            if (n in t && t[n] === e) return n
                    }
                    return -1
                },
                merge: function(e, t) {
                    var n = +t.length,
                        r = 0,
                        i = e.length;
                    while (r < n) e[i++] = t[r++];
                    if (n !== n)
                        while (t[r] !== undefined) e[i++] = t[r++];
                    return e.length = i, e
                },
                grep: function(e, t, n) {
                    var r, i = [],
                        s = 0,
                        o = e.length,
                        u = !n;
                    for (; s < o; s++) r = !t(e[s], s), r !== u && i.push(e[s]);
                    return i
                },
                map: function(e, t, n) {
                    var r, i, s = 0,
                        u = [];
                    if (b(e)) {
                        r = e.length;
                        for (; s < r; s++) i = t(e[s], s, n), i != null && u.push(i)
                    } else
                        for (s in e) i = t(e[s], s, n), i != null && u.push(i);
                    return o.apply([], u)
                },
                guid: 1,
                proxy: function(e, t) {
                    var n, r, i;
                    return typeof t == "string" && (i = e[t], t = e, e = i), d.isFunction(e) ? (n = s.call(arguments, 2), r = function() {
                        return e.apply(t || this, n.concat(s.call(arguments)))
                    }, r.guid = e.guid = e.guid || d.guid++, r) : undefined
                },
                now: function() {
                    return +(new Date)
                },
                support: h
            }), typeof Symbol == "function" && (d.fn[Symbol.iterator] = r[Symbol.iterator]), d.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
                f["[object " + t + "]"] = t.toLowerCase()
            });
            var w = function(e) {
                function st(e, t, r, i) {
                    var s, u, f, l, c, d, g, y, S = t && t.ownerDocument,
                        x = t ? t.nodeType : 9;
                    r = r || [];
                    if (typeof e != "string" || !e || x !== 1 && x !== 9 && x !== 11) return r;
                    if (!i) {
                        (t ? t.ownerDocument || t : E) !== p && h(t), t = t || p;
                        if (v) {
                            if (x !== 11 && (d = Y.exec(e)))
                                if (s = d[1]) {
                                    if (x === 9) {
                                        if (!(f = t.getElementById(s))) return r;
                                        if (f.id === s) return r.push(f), r
                                    } else if (S && (f = S.getElementById(s)) && b(t, f) && f.id === s) return r.push(f), r
                                } else {
                                    if (d[2]) return D.apply(r, t.getElementsByTagName(e)), r;
                                    if ((s = d[3]) && n.getElementsByClassName && t.getElementsByClassName) return D.apply(r, t.getElementsByClassName(s)), r
                                } if (n.qsa && !C[e + " "] && (!m || !m.test(e))) {
                                if (x !== 1) S = t, y = e;
                                else if (t.nodeName.toLowerCase() !== "object") {
                                    (l = t.getAttribute("id")) ? l = l.replace(et, "\\$&"): t.setAttribute("id", l = w), g = o(e), u = g.length, c = $.test(l) ? "#" + l : "[id='" + l + "']";
                                    while (u--) g[u] = c + " " + mt(g[u]);
                                    y = g.join(","), S = Z.test(e) && dt(t.parentNode) || t
                                }
                                if (y) try {
                                    return D.apply(r, S.querySelectorAll(y)), r
                                } catch (T) {} finally {
                                    l === w && t.removeAttribute("id")
                                }
                            }
                        }
                    }
                    return a(e.replace(U, "$1"), t, r, i)
                }

                function ot() {
                    function t(n, i) {
                        return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
                    }
                    var e = [];
                    return t
                }

                function ut(e) {
                    return e[w] = !0, e
                }

                function at(e) {
                    var t = p.createElement("div");
                    try {
                        return !!e(t)
                    } catch (n) {
                        return !1
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t), t = null
                    }
                }

                function ft(e, t) {
                    var n = e.split("|"),
                        i = n.length;
                    while (i--) r.attrHandle[n[i]] = t
                }

                function lt(e, t) {
                    var n = t && e,
                        r = n && e.nodeType === 1 && t.nodeType === 1 && (~t.sourceIndex || L) - (~e.sourceIndex || L);
                    if (r) return r;
                    if (n)
                        while (n = n.nextSibling)
                            if (n === t) return -1;
                    return e ? 1 : -1
                }

                function ct(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return n === "input" && t.type === e
                    }
                }

                function ht(e) {
                    return function(t) {
                        var n = t.nodeName.toLowerCase();
                        return (n === "input" || n === "button") && t.type === e
                    }
                }

                function pt(e) {
                    return ut(function(t) {
                        return t = +t, ut(function(n, r) {
                            var i, s = e([], n.length, t),
                                o = s.length;
                            while (o--) n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                        })
                    })
                }

                function dt(e) {
                    return e && typeof e.getElementsByTagName != "undefined" && e
                }

                function vt() {}

                function mt(e) {
                    var t = 0,
                        n = e.length,
                        r = "";
                    for (; t < n; t++) r += e[t].value;
                    return r
                }

                function gt(e, t, n) {
                    var r = t.dir,
                        i = n && r === "parentNode",
                        s = x++;
                    return t.first ? function(t, n, s) {
                        while (t = t[r])
                            if (t.nodeType === 1 || i) return e(t, n, s)
                    } : function(t, n, o) {
                        var u, a, f, l = [S, s];
                        if (o) {
                            while (t = t[r])
                                if (t.nodeType === 1 || i)
                                    if (e(t, n, o)) return !0
                        } else
                            while (t = t[r])
                                if (t.nodeType === 1 || i) {
                                    f = t[w] || (t[w] = {}), a = f[t.uniqueID] || (f[t.uniqueID] = {});
                                    if ((u = a[r]) && u[0] === S && u[1] === s) return l[2] = u[2];
                                    a[r] = l;
                                    if (l[2] = e(t, n, o)) return !0
                                }
                    }
                }

                function yt(e) {
                    return e.length > 1 ? function(t, n, r) {
                        var i = e.length;
                        while (i--)
                            if (!e[i](t, n, r)) return !1;
                        return !0
                    } : e[0]
                }

                function bt(e, t, n) {
                    var r = 0,
                        i = t.length;
                    for (; r < i; r++) st(e, t[r], n);
                    return n
                }

                function wt(e, t, n, r, i) {
                    var s, o = [],
                        u = 0,
                        a = e.length,
                        f = t != null;
                    for (; u < a; u++)
                        if (s = e[u])
                            if (!n || n(s, r, i)) o.push(s), f && t.push(u);
                    return o
                }

                function Et(e, t, n, r, i, s) {
                    return r && !r[w] && (r = Et(r)), i && !i[w] && (i = Et(i, s)), ut(function(s, o, u, a) {
                        var f, l, c, h = [],
                            p = [],
                            d = o.length,
                            v = s || bt(t || "*", u.nodeType ? [u] : u, []),
                            m = e && (s || !t) ? wt(v, h, e, u, a) : v,
                            g = n ? i || (s ? e : d || r) ? [] : o : m;
                        n && n(m, g, u, a);
                        if (r) {
                            f = wt(g, p), r(f, [], u, a), l = f.length;
                            while (l--)
                                if (c = f[l]) g[p[l]] = !(m[p[l]] = c)
                        }
                        if (s) {
                            if (i || e) {
                                if (i) {
                                    f = [], l = g.length;
                                    while (l--)(c = g[l]) && f.push(m[l] = c);
                                    i(null, g = [], f, a)
                                }
                                l = g.length;
                                while (l--)(c = g[l]) && (f = i ? H(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                            }
                        } else g = wt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : D.apply(o, g)
                    })
                }

                function St(e) {
                    var t, n, i, s = e.length,
                        o = r.relative[e[0].type],
                        u = o || r.relative[" "],
                        a = o ? 1 : 0,
                        l = gt(function(e) {
                            return e === t
                        }, u, !0),
                        c = gt(function(e) {
                            return H(t, e) > -1
                        }, u, !0),
                        h = [function(e, n, r) {
                            var i = !o && (r || n !== f) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r));
                            return t = null, i
                        }];
                    for (; a < s; a++)
                        if (n = r.relative[e[a].type]) h = [gt(yt(h), n)];
                        else {
                            n = r.filter[e[a].type].apply(null, e[a].matches);
                            if (n[w]) {
                                i = ++a;
                                for (; i < s; i++)
                                    if (r.relative[e[i].type]) break;
                                return Et(a > 1 && yt(h), a > 1 && mt(e.slice(0, a - 1).concat({
                                    value: e[a - 2].type === " " ? "*" : ""
                                })).replace(U, "$1"), n, a < i && St(e.slice(a, i)), i < s && St(e = e.slice(i)), i < s && mt(e))
                            }
                            h.push(n)
                        } return yt(h)
                }

                function xt(e, t) {
                    var n = t.length > 0,
                        i = e.length > 0,
                        s = function(s, o, u, a, l) {
                            var c, d, m, g = 0,
                                y = "0",
                                b = s && [],
                                w = [],
                                E = f,
                                x = s || i && r.find.TAG("*", l),
                                T = S += E == null ? 1 : Math.random() || .1,
                                N = x.length;
                            l && (f = o === p || o || l);
                            for (; y !== N && (c = x[y]) != null; y++) {
                                if (i && c) {
                                    d = 0, !o && c.ownerDocument !== p && (h(c), u = !v);
                                    while (m = e[d++])
                                        if (m(c, o || p, u)) {
                                            a.push(c);
                                            break
                                        } l && (S = T)
                                }
                                n && ((c = !m && c) && g--, s && b.push(c))
                            }
                            g += y;
                            if (n && y !== g) {
                                d = 0;
                                while (m = t[d++]) m(b, w, o, u);
                                if (s) {
                                    if (g > 0)
                                        while (y--) !b[y] && !w[y] && (w[y] = M.call(a));
                                    w = wt(w)
                                }
                                D.apply(a, w), l && !s && w.length > 0 && g + t.length > 1 && st.uniqueSort(a)
                            }
                            return l && (S = T, f = E), b
                        };
                    return n ? ut(s) : s
                }
                var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w = "sizzle" + 1 * new Date,
                    E = e.document,
                    S = 0,
                    x = 0,
                    T = ot(),
                    N = ot(),
                    C = ot(),
                    k = function(e, t) {
                        return e === t && (c = !0), 0
                    },
                    L = 1 << 31,
                    A = {}.hasOwnProperty,
                    O = [],
                    M = O.pop,
                    _ = O.push,
                    D = O.push,
                    P = O.slice,
                    H = function(e, t) {
                        var n = 0,
                            r = e.length;
                        for (; n < r; n++)
                            if (e[n] === t) return n;
                        return -1
                    },
                    B = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    j = "[\\x20\\t\\r\\n\\f]",
                    F = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    I = "\\[" + j + "*(" + F + ")(?:" + j + "*([*^$|!~]?=)" + j + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + F + "))|)" + j + "*\\]",
                    q = ":(" + F + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + I + ")*)|" + ".*" + ")\\)|)",
                    R = new RegExp(j + "+", "g"),
                    U = new RegExp("^" + j + "+|((?:^|[^\\\\])(?:\\\\.)*)" + j + "+$", "g"),
                    z = new RegExp("^" + j + "*," + j + "*"),
                    W = new RegExp("^" + j + "*([>+~]|" + j + ")" + j + "*"),
                    X = new RegExp("=" + j + "*([^\\]'\"]*?)" + j + "*\\]", "g"),
                    V = new RegExp(q),
                    $ = new RegExp("^" + F + "$"),
                    J = {
                        ID: new RegExp("^#(" + F + ")"),
                        CLASS: new RegExp("^\\.(" + F + ")"),
                        TAG: new RegExp("^(" + F + "|[*])"),
                        ATTR: new RegExp("^" + I),
                        PSEUDO: new RegExp("^" + q),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + j + "*(even|odd|(([+-]|)(\\d*)n|)" + j + "*(?:([+-]|)" + j + "*(\\d+)|))" + j + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + B + ")$", "i"),
                        needsContext: new RegExp("^" + j + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + j + "*((?:-\\d)?\\d*)" + j + "*\\)|)(?=[^-]|$)", "i")
                    },
                    K = /^(?:input|select|textarea|button)$/i,
                    Q = /^h\d$/i,
                    G = /^[^{]+\{\s*\[native \w/,
                    Y = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    Z = /[+~]/,
                    et = /'|\\/g,
                    tt = new RegExp("\\\\([\\da-f]{1,6}" + j + "?|(" + j + ")|.)", "ig"),
                    nt = function(e, t, n) {
                        var r = "0x" + t - 65536;
                        return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320)
                    },
                    rt = function() {
                        h()
                    };
                try {
                    D.apply(O = P.call(E.childNodes), E.childNodes), O[E.childNodes.length].nodeType
                } catch (it) {
                    D = {
                        apply: O.length ? function(e, t) {
                            _.apply(e, P.call(t))
                        } : function(e, t) {
                            var n = e.length,
                                r = 0;
                            while (e[n++] = t[r++]);
                            e.length = n - 1
                        }
                    }
                }
                n = st.support = {}, s = st.isXML = function(e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return t ? t.nodeName !== "HTML" : !1
                }, h = st.setDocument = function(e) {
                    var t, i, o = e ? e.ownerDocument || e : E;
                    if (o === p || o.nodeType !== 9 || !o.documentElement) return p;
                    p = o, d = p.documentElement, v = !s(p), (i = p.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", rt, !1) : i.attachEvent && i.attachEvent("onunload", rt)), n.attributes = at(function(e) {
                        return e.className = "i", !e.getAttribute("className")
                    }), n.getElementsByTagName = at(function(e) {
                        return e.appendChild(p.createComment("")), !e.getElementsByTagName("*").length
                    }), n.getElementsByClassName = G.test(p.getElementsByClassName), n.getById = at(function(e) {
                        return d.appendChild(e).id = w, !p.getElementsByName || !p.getElementsByName(w).length
                    }), n.getById ? (r.find.ID = function(e, t) {
                        if (typeof t.getElementById != "undefined" && v) {
                            var n = t.getElementById(e);
                            return n ? [n] : []
                        }
                    }, r.filter.ID = function(e) {
                        var t = e.replace(tt, nt);
                        return function(e) {
                            return e.getAttribute("id") === t
                        }
                    }) : (delete r.find.ID, r.filter.ID = function(e) {
                        var t = e.replace(tt, nt);
                        return function(e) {
                            var n = typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id");
                            return n && n.value === t
                        }
                    }), r.find.TAG = n.getElementsByTagName ? function(e, t) {
                        if (typeof t.getElementsByTagName != "undefined") return t.getElementsByTagName(e);
                        if (n.qsa) return t.querySelectorAll(e)
                    } : function(e, t) {
                        var n, r = [],
                            i = 0,
                            s = t.getElementsByTagName(e);
                        if (e === "*") {
                            while (n = s[i++]) n.nodeType === 1 && r.push(n);
                            return r
                        }
                        return s
                    }, r.find.CLASS = n.getElementsByClassName && function(e, t) {
                        if (typeof t.getElementsByClassName != "undefined" && v) return t.getElementsByClassName(e)
                    }, g = [], m = [];
                    if (n.qsa = G.test(p.querySelectorAll)) at(function(e) {
                        d.appendChild(e).innerHTML = "<a id='" + w + "'></a>" + "<select id='" + w + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + j + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + j + "*(?:value|" + B + ")"), e.querySelectorAll("[id~=" + w + "-]").length || m.push("~="), e.querySelectorAll(":checked").length || m.push(":checked"), e.querySelectorAll("a#" + w + "+*").length || m.push(".#.+[+~]")
                    }), at(function(e) {
                        var t = p.createElement("input");
                        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + j + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
                    });
                    return (n.matchesSelector = G.test(y = d.matches || d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && at(function(e) {
                        n.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), g.push("!=", q)
                    }), m = m.length && new RegExp(m.join("|")), g = g.length && new RegExp(g.join("|")), t = G.test(d.compareDocumentPosition), b = t || G.test(d.contains) ? function(e, t) {
                        var n = e.nodeType === 9 ? e.documentElement : e,
                            r = t && t.parentNode;
                        return e === r || !!r && r.nodeType === 1 && !!(n.contains ? n.contains(r) : e.compareDocumentPosition && e.compareDocumentPosition(r) & 16)
                    } : function(e, t) {
                        if (t)
                            while (t = t.parentNode)
                                if (t === e) return !0;
                        return !1
                    }, k = t ? function(e, t) {
                        if (e === t) return c = !0, 0;
                        var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, r & 1 || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === p || e.ownerDocument === E && b(E, e) ? -1 : t === p || t.ownerDocument === E && b(E, t) ? 1 : l ? H(l, e) - H(l, t) : 0 : r & 4 ? -1 : 1)
                    } : function(e, t) {
                        if (e === t) return c = !0, 0;
                        var n, r = 0,
                            i = e.parentNode,
                            s = t.parentNode,
                            o = [e],
                            u = [t];
                        if (!i || !s) return e === p ? -1 : t === p ? 1 : i ? -1 : s ? 1 : l ? H(l, e) - H(l, t) : 0;
                        if (i === s) return lt(e, t);
                        n = e;
                        while (n = n.parentNode) o.unshift(n);
                        n = t;
                        while (n = n.parentNode) u.unshift(n);
                        while (o[r] === u[r]) r++;
                        return r ? lt(o[r], u[r]) : o[r] === E ? -1 : u[r] === E ? 1 : 0
                    }, p
                }, st.matches = function(e, t) {
                    return st(e, null, null, t)
                }, st.matchesSelector = function(e, t) {
                    (e.ownerDocument || e) !== p && h(e), t = t.replace(X, "='$1']");
                    if (n.matchesSelector && v && !C[t + " "] && (!g || !g.test(t)) && (!m || !m.test(t))) try {
                        var r = y.call(e, t);
                        if (r || n.disconnectedMatch || e.document && e.document.nodeType !== 11) return r
                    } catch (i) {}
                    return st(t, p, null, [e]).length > 0
                }, st.contains = function(e, t) {
                    return (e.ownerDocument || e) !== p && h(e), b(e, t)
                }, st.attr = function(e, t) {
                    (e.ownerDocument || e) !== p && h(e);
                    var i = r.attrHandle[t.toLowerCase()],
                        s = i && A.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !v) : undefined;
                    return s !== undefined ? s : n.attributes || !v ? e.getAttribute(t) : (s = e.getAttributeNode(t)) && s.specified ? s.value : null
                }, st.error = function(e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }, st.uniqueSort = function(e) {
                    var t, r = [],
                        i = 0,
                        s = 0;
                    c = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(k);
                    if (c) {
                        while (t = e[s++]) t === e[s] && (i = r.push(s));
                        while (i--) e.splice(r[i], 1)
                    }
                    return l = null, e
                }, i = st.getText = function(e) {
                    var t, n = "",
                        r = 0,
                        s = e.nodeType;
                    if (!s)
                        while (t = e[r++]) n += i(t);
                    else if (s === 1 || s === 9 || s === 11) {
                        if (typeof e.textContent == "string") return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
                    } else if (s === 3 || s === 4) return e.nodeValue;
                    return n
                }, r = st.selectors = {
                    cacheLength: 50,
                    createPseudo: ut,
                    match: J,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(e) {
                            return e[1] = e[1].replace(tt, nt), e[3] = (e[3] || e[4] || e[5] || "").replace(tt, nt), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                        },
                        CHILD: function(e) {
                            return e[1] = e[1].toLowerCase(), e[1].slice(0, 3) === "nth" ? (e[3] || st.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd")), e[5] = +(e[7] + e[8] || e[3] === "odd")) : e[3] && st.error(e[0]), e
                        },
                        PSEUDO: function(e) {
                            var t, n = !e[6] && e[2];
                            return J.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && V.test(n) && (t = o(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(e) {
                            var t = e.replace(tt, nt).toLowerCase();
                            return e === "*" ? function() {
                                return !0
                            } : function(e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                        },
                        CLASS: function(e) {
                            var t = T[e + " "];
                            return t || (t = new RegExp("(^|" + j + ")" + e + "(" + j + "|$)")) && T(e, function(e) {
                                return t.test(typeof e.className == "string" && e.className || typeof e.getAttribute != "undefined" && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(e, t, n) {
                            return function(r) {
                                var i = st.attr(r, e);
                                return i == null ? t === "!=" : t ? (i += "", t === "=" ? i === n : t === "!=" ? i !== n : t === "^=" ? n && i.indexOf(n) === 0 : t === "*=" ? n && i.indexOf(n) > -1 : t === "$=" ? n && i.slice(-n.length) === n : t === "~=" ? (" " + i.replace(R, " ") + " ").indexOf(n) > -1 : t === "|=" ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
                            }
                        },
                        CHILD: function(e, t, n, r, i) {
                            var s = e.slice(0, 3) !== "nth",
                                o = e.slice(-4) !== "last",
                                u = t === "of-type";
                            return r === 1 && i === 0 ? function(e) {
                                return !!e.parentNode
                            } : function(t, n, a) {
                                var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling",
                                    m = t.parentNode,
                                    g = u && t.nodeName.toLowerCase(),
                                    y = !a && !u,
                                    b = !1;
                                if (m) {
                                    if (s) {
                                        while (v) {
                                            h = t;
                                            while (h = h[v])
                                                if (u ? h.nodeName.toLowerCase() === g : h.nodeType === 1) return !1;
                                            d = v = e === "only" && !d && "nextSibling"
                                        }
                                        return !0
                                    }
                                    d = [o ? m.firstChild : m.lastChild];
                                    if (o && y) {
                                        h = m, c = h[w] || (h[w] = {}), l = c[h.uniqueID] || (c[h.uniqueID] = {}), f = l[e] || [], p = f[0] === S && f[1], b = p && f[2], h = p && m.childNodes[p];
                                        while (h = ++p && h && h[v] || (b = p = 0) || d.pop())
                                            if (h.nodeType === 1 && ++b && h === t) {
                                                l[e] = [S, p, b];
                                                break
                                            }
                                    } else {
                                        y && (h = t, c = h[w] || (h[w] = {}), l = c[h.uniqueID] || (c[h.uniqueID] = {}), f = l[e] || [], p = f[0] === S && f[1], b = p);
                                        if (b === !1)
                                            while (h = ++p && h && h[v] || (b = p = 0) || d.pop())
                                                if ((u ? h.nodeName.toLowerCase() === g : h.nodeType === 1) && ++b) {
                                                    y && (c = h[w] || (h[w] = {}), l = c[h.uniqueID] || (c[h.uniqueID] = {}), l[e] = [S, b]);
                                                    if (h === t) break
                                                }
                                    }
                                    return b -= i, b === r || b % r === 0 && b / r >= 0
                                }
                            }
                        },
                        PSEUDO: function(e, t) {
                            var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || st.error("unsupported pseudo: " + e);
                            return i[w] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? ut(function(e, n) {
                                var r, s = i(e, t),
                                    o = s.length;
                                while (o--) r = H(e, s[o]), e[r] = !(n[r] = s[o])
                            }) : function(e) {
                                return i(e, 0, n)
                            }) : i
                        }
                    },
                    pseudos: {
                        not: ut(function(e) {
                            var t = [],
                                n = [],
                                r = u(e.replace(U, "$1"));
                            return r[w] ? ut(function(e, t, n, i) {
                                var s, o = r(e, null, i, []),
                                    u = e.length;
                                while (u--)
                                    if (s = o[u]) e[u] = !(t[u] = s)
                            }) : function(e, i, s) {
                                return t[0] = e, r(t, null, s, n), t[0] = null, !n.pop()
                            }
                        }),
                        has: ut(function(e) {
                            return function(t) {
                                return st(e, t).length > 0
                            }
                        }),
                        contains: ut(function(e) {
                            return e = e.replace(tt, nt),
                                function(t) {
                                    return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
                                }
                        }),
                        lang: ut(function(e) {
                            return $.test(e || "") || st.error("unsupported lang: " + e), e = e.replace(tt, nt).toLowerCase(),
                                function(t) {
                                    var n;
                                    do
                                        if (n = v ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || n.indexOf(e + "-") === 0; while ((t = t.parentNode) && t.nodeType === 1);
                                    return !1
                                }
                        }),
                        target: function(t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id
                        },
                        root: function(e) {
                            return e === d
                        },
                        focus: function(e) {
                            return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        enabled: function(e) {
                            return e.disabled === !1
                        },
                        disabled: function(e) {
                            return e.disabled === !0
                        },
                        checked: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return t === "input" && !!e.checked || t === "option" && !!e.selected
                        },
                        selected: function(e) {
                            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                        },
                        empty: function(e) {
                            for (e = e.firstChild; e; e = e.nextSibling)
                                if (e.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function(e) {
                            return !r.pseudos.empty(e)
                        },
                        header: function(e) {
                            return Q.test(e.nodeName)
                        },
                        input: function(e) {
                            return K.test(e.nodeName)
                        },
                        button: function(e) {
                            var t = e.nodeName.toLowerCase();
                            return t === "input" && e.type === "button" || t === "button"
                        },
                        text: function(e) {
                            var t;
                            return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === "text")
                        },
                        first: pt(function() {
                            return [0]
                        }),
                        last: pt(function(e, t) {
                            return [t - 1]
                        }),
                        eq: pt(function(e, t, n) {
                            return [n < 0 ? n + t : n]
                        }),
                        even: pt(function(e, t) {
                            var n = 0;
                            for (; n < t; n += 2) e.push(n);
                            return e
                        }),
                        odd: pt(function(e, t) {
                            var n = 1;
                            for (; n < t; n += 2) e.push(n);
                            return e
                        }),
                        lt: pt(function(e, t, n) {
                            var r = n < 0 ? n + t : n;
                            for (; --r >= 0;) e.push(r);
                            return e
                        }),
                        gt: pt(function(e, t, n) {
                            var r = n < 0 ? n + t : n;
                            for (; ++r < t;) e.push(r);
                            return e
                        })
                    }
                }, r.pseudos.nth = r.pseudos.eq;
                for (t in {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) r.pseudos[t] = ct(t);
                for (t in {
                        submit: !0,
                        reset: !0
                    }) r.pseudos[t] = ht(t);
                return vt.prototype = r.filters = r.pseudos, r.setFilters = new vt, o = st.tokenize = function(e, t) {
                    var n, i, s, o, u, a, f, l = N[e + " "];
                    if (l) return t ? 0 : l.slice(0);
                    u = e, a = [], f = r.preFilter;
                    while (u) {
                        if (!n || (i = z.exec(u))) i && (u = u.slice(i[0].length) || u), a.push(s = []);
                        n = !1;
                        if (i = W.exec(u)) n = i.shift(), s.push({
                            value: n,
                            type: i[0].replace(U, " ")
                        }), u = u.slice(n.length);
                        for (o in r.filter)(i = J[o].exec(u)) && (!f[o] || (i = f[o](i))) && (n = i.shift(), s.push({
                            value: n,
                            type: o,
                            matches: i
                        }), u = u.slice(n.length));
                        if (!n) break
                    }
                    return t ? u.length : u ? st.error(e) : N(e, a).slice(0)
                }, u = st.compile = function(e, t) {
                    var n, r = [],
                        i = [],
                        s = C[e + " "];
                    if (!s) {
                        t || (t = o(e)), n = t.length;
                        while (n--) s = St(t[n]), s[w] ? r.push(s) : i.push(s);
                        s = C(e, xt(i, r)), s.selector = e
                    }
                    return s
                }, a = st.select = function(e, t, i, s) {
                    var a, f, l, c, h, p = typeof e == "function" && e,
                        d = !s && o(e = p.selector || e);
                    i = i || [];
                    if (d.length === 1) {
                        f = d[0] = d[0].slice(0);
                        if (f.length > 2 && (l = f[0]).type === "ID" && n.getById && t.nodeType === 9 && v && r.relative[f[1].type]) {
                            t = (r.find.ID(l.matches[0].replace(tt, nt), t) || [])[0];
                            if (!t) return i;
                            p && (t = t.parentNode), e = e.slice(f.shift().value.length)
                        }
                        a = J.needsContext.test(e) ? 0 : f.length;
                        while (a--) {
                            l = f[a];
                            if (r.relative[c = l.type]) break;
                            if (h = r.find[c])
                                if (s = h(l.matches[0].replace(tt, nt), Z.test(f[0].type) && dt(t.parentNode) || t)) {
                                    f.splice(a, 1), e = s.length && mt(f);
                                    if (!e) return D.apply(i, s), i;
                                    break
                                }
                        }
                    }
                    return (p || u(e, d))(s, t, !v, i, !t || Z.test(e) && dt(t.parentNode) || t), i
                }, n.sortStable = w.split("").sort(k).join("") === w, n.detectDuplicates = !!c, h(), n.sortDetached = at(function(e) {
                    return e.compareDocumentPosition(p.createElement("div")) & 1
                }), at(function(e) {
                    return e.innerHTML = "<a href='#'></a>", e.firstChild.getAttribute("href") === "#"
                }) || ft("type|href|height|width", function(e, t, n) {
                    if (!n) return e.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2)
                }), (!n.attributes || !at(function(e) {
                    return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), e.firstChild.getAttribute("value") === ""
                })) && ft("value", function(e, t, n) {
                    if (!n && e.nodeName.toLowerCase() === "input") return e.defaultValue
                }), at(function(e) {
                    return e.getAttribute("disabled") == null
                }) || ft(B, function(e, t, n) {
                    var r;
                    if (!n) return e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                }), st
            }(e);
            d.find = w, d.expr = w.selectors, d.expr[":"] = d.expr.pseudos, d.uniqueSort = d.unique = w.uniqueSort, d.text = w.getText, d.isXMLDoc = w.isXML, d.contains = w.contains;
            var E = function(e, t, n) {
                    var r = [],
                        i = n !== undefined;
                    while ((e = e[t]) && e.nodeType !== 9)
                        if (e.nodeType === 1) {
                            if (i && d(e).is(n)) break;
                            r.push(e)
                        } return r
                },
                S = function(e, t) {
                    var n = [];
                    for (; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
                    return n
                },
                x = d.expr.match.needsContext,
                T = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
                N = /^.[^:#\[\.,]*$/;
            d.filter = function(e, t, n) {
                var r = t[0];
                return n && (e = ":not(" + e + ")"), t.length === 1 && r.nodeType === 1 ? d.find.matchesSelector(r, e) ? [r] : [] : d.find.matches(e, d.grep(t, function(e) {
                    return e.nodeType === 1
                }))
            }, d.fn.extend({
                find: function(e) {
                    var t, n = [],
                        r = this,
                        i = r.length;
                    if (typeof e != "string") return this.pushStack(d(e).filter(function() {
                        for (t = 0; t < i; t++)
                            if (d.contains(r[t], this)) return !0
                    }));
                    for (t = 0; t < i; t++) d.find(e, r[t], n);
                    return n = this.pushStack(i > 1 ? d.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
                },
                filter: function(e) {
                    return this.pushStack(C(this, e || [], !1))
                },
                not: function(e) {
                    return this.pushStack(C(this, e || [], !0))
                },
                is: function(e) {
                    return !!C(this, typeof e == "string" && x.test(e) ? d(e) : e || [], !1).length
                }
            });
            var k, L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
                A = d.fn.init = function(e, t, n) {
                    var r, s;
                    if (!e) return this;
                    n = n || k;
                    if (typeof e == "string") {
                        e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? r = [null, e, null] : r = L.exec(e);
                        if (r && (r[1] || !t)) {
                            if (r[1]) {
                                t = t instanceof d ? t[0] : t, d.merge(this, d.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : i, !0));
                                if (T.test(r[1]) && d.isPlainObject(t))
                                    for (r in t) d.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                                return this
                            }
                            s = i.getElementById(r[2]);
                            if (s && s.parentNode) {
                                if (s.id !== r[2]) return k.find(e);
                                this.length = 1, this[0] = s
                            }
                            return this.context = i, this.selector = e, this
                        }
                        return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e)
                    }
                    return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : d.isFunction(e) ? typeof n.ready != "undefined" ? n.ready(e) : e(d) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), d.makeArray(e, this))
                };
            A.prototype = d.fn, k = d(i);
            var O = /^(?:parents|prev(?:Until|All))/,
                M = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };
            d.fn.extend({
                has: function(e) {
                    var t, n = d(e, this),
                        r = n.length;
                    return this.filter(function() {
                        for (t = 0; t < r; t++)
                            if (d.contains(this, n[t])) return !0
                    })
                },
                closest: function(e, t) {
                    var n, r = 0,
                        i = this.length,
                        s = [],
                        o = x.test(e) || typeof e != "string" ? d(e, t || this.context) : 0;
                    for (; r < i; r++)
                        for (n = this[r]; n && n !== t; n = n.parentNode)
                            if (n.nodeType < 11 && (o ? o.index(n) > -1 : n.nodeType === 1 && d.find.matchesSelector(n, e))) {
                                s.push(n);
                                break
                            } return this.pushStack(s.length > 1 ? d.uniqueSort(s) : s)
                },
                index: function(e) {
                    return e ? typeof e == "string" ? d.inArray(this[0], d(e)) : d.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(e, t) {
                    return this.pushStack(d.uniqueSort(d.merge(this.get(), d(e, t))))
                },
                addBack: function(e) {
                    return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
                }
            }), d.each({
                parent: function(e) {
                    var t = e.parentNode;
                    return t && t.nodeType !== 11 ? t : null
                },
                parents: function(e) {
                    return E(e, "parentNode")
                },
                parentsUntil: function(e, t, n) {
                    return E(e, "parentNode", n)
                },
                next: function(e) {
                    return _(e, "nextSibling")
                },
                prev: function(e) {
                    return _(e, "previousSibling")
                },
                nextAll: function(e) {
                    return E(e, "nextSibling")
                },
                prevAll: function(e) {
                    return E(e, "previousSibling")
                },
                nextUntil: function(e, t, n) {
                    return E(e, "nextSibling", n)
                },
                prevUntil: function(e, t, n) {
                    return E(e, "previousSibling", n)
                },
                siblings: function(e) {
                    return S((e.parentNode || {}).firstChild, e)
                },
                children: function(e) {
                    return S(e.firstChild)
                },
                contents: function(e) {
                    return d.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : d.merge([], e.childNodes)
                }
            }, function(e, t) {
                d.fn[e] = function(n, r) {
                    var i = d.map(this, t, n);
                    return e.slice(-5) !== "Until" && (r = n), r && typeof r == "string" && (i = d.filter(r, i)), this.length > 1 && (M[e] || (i = d.uniqueSort(i)), O.test(e) && (i = i.reverse())), this.pushStack(i)
                }
            });
            var D = /\S+/g;
            d.Callbacks = function(e) {
                e = typeof e == "string" ? P(e) : d.extend({}, e);
                var t, n, r, i, s = [],
                    o = [],
                    u = -1,
                    a = function() {
                        i = e.once, r = t = !0;
                        for (; o.length; u = -1) {
                            n = o.shift();
                            while (++u < s.length) s[u].apply(n[0], n[1]) === !1 && e.stopOnFalse && (u = s.length, n = !1)
                        }
                        e.memory || (n = !1), t = !1, i && (n ? s = [] : s = "")
                    },
                    f = {
                        add: function() {
                            return s && (n && !t && (u = s.length - 1, o.push(n)), function r(t) {
                                d.each(t, function(t, n) {
                                    d.isFunction(n) ? (!e.unique || !f.has(n)) && s.push(n) : n && n.length && d.type(n) !== "string" && r(n)
                                })
                            }(arguments), n && !t && a()), this
                        },
                        remove: function() {
                            return d.each(arguments, function(e, t) {
                                var n;
                                while ((n = d.inArray(t, s, n)) > -1) s.splice(n, 1), n <= u && u--
                            }), this
                        },
                        has: function(e) {
                            return e ? d.inArray(e, s) > -1 : s.length > 0
                        },
                        empty: function() {
                            return s && (s = []), this
                        },
                        disable: function() {
                            return i = o = [], s = n = "", this
                        },
                        disabled: function() {
                            return !s
                        },
                        lock: function() {
                            return i = !0, n || f.disable(), this
                        },
                        locked: function() {
                            return !!i
                        },
                        fireWith: function(e, n) {
                            return i || (n = n || [], n = [e, n.slice ? n.slice() : n], o.push(n), t || a()), this
                        },
                        fire: function() {
                            return f.fireWith(this, arguments), this
                        },
                        fired: function() {
                            return !!r
                        }
                    };
                return f
            }, d.extend({
                Deferred: function(e) {
                    var t = [
                            ["resolve", "done", d.Callbacks("once memory"), "resolved"],
                            ["reject", "fail", d.Callbacks("once memory"), "rejected"],
                            ["notify", "progress", d.Callbacks("memory")]
                        ],
                        n = "pending",
                        r = {
                            state: function() {
                                return n
                            },
                            always: function() {
                                return i.done(arguments).fail(arguments), this
                            },
                            then: function() {
                                var e = arguments;
                                return d.Deferred(function(n) {
                                    d.each(t, function(t, s) {
                                        var o = d.isFunction(e[t]) && e[t];
                                        i[s[1]](function() {
                                            var e = o && o.apply(this, arguments);
                                            e && d.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[s[0] + "With"](this === r ? n.promise() : this, o ? [e] : arguments)
                                        })
                                    }), e = null
                                }).promise()
                            },
                            promise: function(e) {
                                return e != null ? d.extend(e, r) : r
                            }
                        },
                        i = {};
                    return r.pipe = r.then, d.each(t, function(e, s) {
                        var o = s[2],
                            u = s[3];
                        r[s[1]] = o.add, u && o.add(function() {
                            n = u
                        }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = function() {
                            return i[s[0] + "With"](this === i ? r : this, arguments), this
                        }, i[s[0] + "With"] = o.fireWith
                    }), r.promise(i), e && e.call(i, i), i
                },
                when: function(e) {
                    var t = 0,
                        n = s.call(arguments),
                        r = n.length,
                        i = r !== 1 || e && d.isFunction(e.promise) ? r : 0,
                        o = i === 1 ? e : d.Deferred(),
                        u = function(e, t, n) {
                            return function(r) {
                                t[e] = this, n[e] = arguments.length > 1 ? s.call(arguments) : r, n === a ? o.notifyWith(t, n) : --i || o.resolveWith(t, n)
                            }
                        },
                        a, f, l;
                    if (r > 1) {
                        a = new Array(r), f = new Array(r), l = new Array(r);
                        for (; t < r; t++) n[t] && d.isFunction(n[t].promise) ? n[t].promise().progress(u(t, f, a)).done(u(t, l, n)).fail(o.reject) : --i
                    }
                    return i || o.resolveWith(l, n), o.promise()
                }
            });
            var H;
            d.fn.ready = function(e) {
                return d.ready.promise().done(e), this
            }, d.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function(e) {
                    e ? d.readyWait++ : d.ready(!0)
                },
                ready: function(e) {
                    if (e === !0 ? --d.readyWait : d.isReady) return;
                    d.isReady = !0;
                    if (e !== !0 && --d.readyWait > 0) return;
                    H.resolveWith(i, [d]), d.fn.triggerHandler && (d(i).triggerHandler("ready"), d(i).off("ready"))
                }
            }), d.ready.promise = function(t) {
                if (!H) {
                    H = d.Deferred();
                    if (i.readyState === "complete" || i.readyState !== "loading" && !i.documentElement.doScroll) e.setTimeout(d.ready);
                    else if (i.addEventListener) i.addEventListener("DOMContentLoaded", j), e.addEventListener("load", j);
                    else {
                        i.attachEvent("onreadystatechange", j), e.attachEvent("onload", j);
                        var n = !1;
                        try {
                            n = e.frameElement == null && i.documentElement
                        } catch (r) {}
                        n && n.doScroll && function s() {
                            if (!d.isReady) {
                                try {
                                    n.doScroll("left")
                                } catch (t) {
                                    return e.setTimeout(s, 50)
                                }
                                B(), d.ready()
                            }
                        }()
                    }
                }
                return H.promise(t)
            }, d.ready.promise();
            var F;
            for (F in d(h)) break;
            h.ownFirst = F === "0", h.inlineBlockNeedsLayout = !1, d(function() {
                    var e, t, n, r;
                    n = i.getElementsByTagName("body")[0];
                    if (!n || !n.style) return;
                    t = i.createElement("div"), r = i.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom != "undefined" && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", h.inlineBlockNeedsLayout = e = t.offsetWidth === 3, e && (n.style.zoom = 1)), n.removeChild(r)
                }),
                function() {
                    var e = i.createElement("div");
                    h.deleteExpando = !0;
                    try {
                        delete e.test
                    } catch (t) {
                        h.deleteExpando = !1
                    }
                    e = null
                }();
            var I = function(e) {
                    var t = d.noData[(e.nodeName + " ").toLowerCase()],
                        n = +e.nodeType || 1;
                    return n !== 1 && n !== 9 ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
                },
                q = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                R = /([A-Z])/g;
            d.extend({
                    cache: {},
                    noData: {
                        "applet ": !0,
                        "embed ": !0,
                        "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                    },
                    hasData: function(e) {
                        return e = e.nodeType ? d.cache[e[d.expando]] : e[d.expando], !!e && !z(e)
                    },
                    data: function(e, t, n) {
                        return W(e, t, n)
                    },
                    removeData: function(e, t) {
                        return X(e, t)
                    },
                    _data: function(e, t, n) {
                        return W(e, t, n, !0)
                    },
                    _removeData: function(e, t) {
                        return X(e, t, !0)
                    }
                }), d.fn.extend({
                    data: function(e, t) {
                        var n, r, i, s = this[0],
                            o = s && s.attributes;
                        if (e === undefined) {
                            if (this.length) {
                                i = d.data(s);
                                if (s.nodeType === 1 && !d._data(s, "parsedAttrs")) {
                                    n = o.length;
                                    while (n--) o[n] && (r = o[n].name, r.indexOf("data-") === 0 && (r = d.camelCase(r.slice(5)), U(s, r, i[r])));
                                    d._data(s, "parsedAttrs", !0)
                                }
                            }
                            return i
                        }
                        return typeof e == "object" ? this.each(function() {
                            d.data(this, e)
                        }) : arguments.length > 1 ? this.each(function() {
                            d.data(this, e, t)
                        }) : s ? U(s, e, d.data(s, e)) : undefined
                    },
                    removeData: function(e) {
                        return this.each(function() {
                            d.removeData(this, e)
                        })
                    }
                }), d.extend({
                    queue: function(e, t, n) {
                        var r;
                        if (e) return t = (t || "fx") + "queue", r = d._data(e, t), n && (!r || d.isArray(n) ? r = d._data(e, t, d.makeArray(n)) : r.push(n)), r || []
                    },
                    dequeue: function(e, t) {
                        t = t || "fx";
                        var n = d.queue(e, t),
                            r = n.length,
                            i = n.shift(),
                            s = d._queueHooks(e, t),
                            o = function() {
                                d.dequeue(e, t)
                            };
                        i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
                    },
                    _queueHooks: function(e, t) {
                        var n = t + "queueHooks";
                        return d._data(e, n) || d._data(e, n, {
                            empty: d.Callbacks("once memory").add(function() {
                                d._removeData(e, t + "queue"), d._removeData(e, n)
                            })
                        })
                    }
                }), d.fn.extend({
                    queue: function(e, t) {
                        var n = 2;
                        return typeof e != "string" && (t = e, e = "fx", n--), arguments.length < n ? d.queue(this[0], e) : t === undefined ? this : this.each(function() {
                            var n = d.queue(this, e, t);
                            d._queueHooks(this, e), e === "fx" && n[0] !== "inprogress" && d.dequeue(this, e)
                        })
                    },
                    dequeue: function(e) {
                        return this.each(function() {
                            d.dequeue(this, e)
                        })
                    },
                    clearQueue: function(e) {
                        return this.queue(e || "fx", [])
                    },
                    promise: function(e, t) {
                        var n, r = 1,
                            i = d.Deferred(),
                            s = this,
                            o = this.length,
                            u = function() {
                                --r || i.resolveWith(s, [s])
                            };
                        typeof e != "string" && (t = e, e = undefined), e = e || "fx";
                        while (o--) n = d._data(s[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(u));
                        return u(), i.promise(t)
                    }
                }),
                function() {
                    var e;
                    h.shrinkWrapBlocks = function() {
                        if (e != null) return e;
                        e = !1;
                        var t, n, r;
                        n = i.getElementsByTagName("body")[0];
                        if (!n || !n.style) return;
                        return t = i.createElement("div"), r = i.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom != "undefined" && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(i.createElement("div")).style.width = "5px", e = t.offsetWidth !== 3), n.removeChild(r), e
                    }
                }();
            var V = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                $ = new RegExp("^(?:([+-])=|)(" + V + ")([a-z%]*)$", "i"),
                J = ["Top", "Right", "Bottom", "Left"],
                K = function(e, t) {
                    return e = t || e, d.css(e, "display") === "none" || !d.contains(e.ownerDocument, e)
                },
                G = function(e, t, n, r, i, s, o) {
                    var u = 0,
                        a = e.length,
                        f = n == null;
                    if (d.type(n) === "object") {
                        i = !0;
                        for (u in n) G(e, t, u, n[u], !0, s, o)
                    } else if (r !== undefined) {
                        i = !0, d.isFunction(r) || (o = !0), f && (o ? (t.call(e, r), t = null) : (f = t, t = function(e, t, n) {
                            return f.call(d(e), n)
                        }));
                        if (t)
                            for (; u < a; u++) t(e[u], n, o ? r : r.call(e[u], u, t(e[u], n)))
                    }
                    return i ? e : f ? t.call(e) : a ? t(e[0], n) : s
                },
                Y = /^(?:checkbox|radio)$/i,
                Z = /<([\w:-]+)/,
                et = /^$|\/(?:java|ecma)script/i,
                tt = /^\s+/,
                nt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
            (function() {
                var e = i.createElement("div"),
                    t = i.createDocumentFragment(),
                    n = i.createElement("input");
                e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", h.leadingWhitespace = e.firstChild.nodeType === 3, h.tbody = !e.getElementsByTagName("tbody").length, h.htmlSerialize = !!e.getElementsByTagName("link").length, h.html5Clone = i.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>", n.type = "checkbox", n.checked = !0, t.appendChild(n), h.appendChecked = n.checked, e.innerHTML = "<textarea>x</textarea>", h.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, t.appendChild(e), n = i.createElement("input"), n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), e.appendChild(n), h.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, h.noCloneEvent = !!e.addEventListener, e[d.expando] = 1, h.attributes = !e.getAttribute(d.expando)
            })();
            var it = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: h.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            };
            it.optgroup = it.option, it.tbody = it.tfoot = it.colgroup = it.caption = it.thead, it.th = it.td;
            var ut = /<|&#?\w+;/,
                at = /<tbody/i;
            (function() {
                var t, n, r = i.createElement("div");
                for (t in {
                        submit: !0,
                        change: !0,
                        focusin: !0
                    }) n = "on" + t, (h[t] = n in e) || (r.setAttribute(n, "t"), h[t] = r.attributes[n].expando === !1);
                r = null
            })();
            var ct = /^(?:input|select|textarea)$/i,
                ht = /^key/,
                pt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                dt = /^(?:focusinfocus|focusoutblur)$/,
                vt = /^([^.]*)(?:\.(.+)|)/;
            d.event = {
                global: {},
                add: function(e, t, n, r, i) {
                    var s, o, u, a, f, l, c, h, p, v, m, g = d._data(e);
                    if (!g) return;
                    n.handler && (a = n, n = a.handler, i = a.selector), n.guid || (n.guid = d.guid++), (o = g.events) || (o = g.events = {}), (l = g.handle) || (l = g.handle = function(e) {
                        return typeof d == "undefined" || !!e && d.event.triggered === e.type ? undefined : d.event.dispatch.apply(l.elem, arguments)
                    }, l.elem = e), t = (t || "").match(D) || [""], u = t.length;
                    while (u--) {
                        s = vt.exec(t[u]) || [], p = m = s[1], v = (s[2] || "").split(".").sort();
                        if (!p) continue;
                        f = d.event.special[p] || {}, p = (i ? f.delegateType : f.bindType) || p, f = d.event.special[p] || {}, c = d.extend({
                            type: p,
                            origType: m,
                            data: r,
                            handler: n,
                            guid: n.guid,
                            selector: i,
                            needsContext: i && d.expr.match.needsContext.test(i),
                            namespace: v.join(".")
                        }, a);
                        if (!(h = o[p])) {
                            h = o[p] = [], h.delegateCount = 0;
                            if (!f.setup || f.setup.call(e, r, v, l) === !1) e.addEventListener ? e.addEventListener(p, l, !1) : e.attachEvent && e.attachEvent("on" + p, l)
                        }
                        f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? h.splice(h.delegateCount++, 0, c) : h.push(c), d.event.global[p] = !0
                    }
                    e = null
                },
                remove: function(e, t, n, r, i) {
                    var s, o, u, a, f, l, c, h, p, v, m, g = d.hasData(e) && d._data(e);
                    if (!g || !(l = g.events)) return;
                    t = (t || "").match(D) || [""], f = t.length;
                    while (f--) {
                        u = vt.exec(t[f]) || [], p = m = u[1], v = (u[2] || "").split(".").sort();
                        if (!p) {
                            for (p in l) d.event.remove(e, p + t[f], n, r, !0);
                            continue
                        }
                        c = d.event.special[p] || {}, p = (r ? c.delegateType : c.bindType) || p, h = l[p] || [], u = u[2] && new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = s = h.length;
                        while (s--) o = h[s], (i || m === o.origType) && (!n || n.guid === o.guid) && (!u || u.test(o.namespace)) && (!r || r === o.selector || r === "**" && o.selector) && (h.splice(s, 1), o.selector && h.delegateCount--, c.remove && c.remove.call(e, o));
                        a && !h.length && ((!c.teardown || c.teardown.call(e, v, g.handle) === !1) && d.removeEvent(e, p, g.handle), delete l[p])
                    }
                    d.isEmptyObject(l) && (delete g.handle, d._removeData(e, "events"))
                },
                trigger: function(t, n, r, s) {
                    var o, u, a, f, l, h, p, v = [r || i],
                        m = c.call(t, "type") ? t.type : t,
                        g = c.call(t, "namespace") ? t.namespace.split(".") : [];
                    a = h = r = r || i;
                    if (r.nodeType === 3 || r.nodeType === 8) return;
                    if (dt.test(m + d.event.triggered)) return;
                    m.indexOf(".") > -1 && (g = m.split("."), m = g.shift(), g.sort()), u = m.indexOf(":") < 0 && "on" + m, t = t[d.expando] ? t : new d.Event(m, typeof t == "object" && t), t.isTrigger = s ? 2 : 3, t.namespace = g.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = undefined, t.target || (t.target = r), n = n == null ? [t] : d.makeArray(n, [t]), l = d.event.special[m] || {};
                    if (!s && l.trigger && l.trigger.apply(r, n) === !1) return;
                    if (!s && !l.noBubble && !d.isWindow(r)) {
                        f = l.delegateType || m, dt.test(f + m) || (a = a.parentNode);
                        for (; a; a = a.parentNode) v.push(a), h = a;
                        h === (r.ownerDocument || i) && v.push(h.defaultView || h.parentWindow || e)
                    }
                    p = 0;
                    while ((a = v[p++]) && !t.isPropagationStopped()) t.type = p > 1 ? f : l.bindType || m, o = (d._data(a, "events") || {})[t.type] && d._data(a, "handle"), o && o.apply(a, n), o = u && a[u], o && o.apply && I(a) && (t.result = o.apply(a, n), t.result === !1 && t.preventDefault());
                    t.type = m;
                    if (!s && !t.isDefaultPrevented() && (!l._default || l._default.apply(v.pop(), n) === !1) && I(r) && u && r[m] && !d.isWindow(r)) {
                        h = r[u], h && (r[u] = null), d.event.triggered = m;
                        try {
                            r[m]()
                        } catch (y) {}
                        d.event.triggered = undefined, h && (r[u] = h)
                    }
                    return t.result
                },
                dispatch: function(e) {
                    e = d.event.fix(e);
                    var t, n, r, i, o, u = [],
                        a = s.call(arguments),
                        f = (d._data(this, "events") || {})[e.type] || [],
                        l = d.event.special[e.type] || {};
                    a[0] = e, e.delegateTarget = this;
                    if (l.preDispatch && l.preDispatch.call(this, e) === !1) return;
                    u = d.event.handlers.call(this, e, f), t = 0;
                    while ((i = u[t++]) && !e.isPropagationStopped()) {
                        e.currentTarget = i.elem, n = 0;
                        while ((o = i.handlers[n++]) && !e.isImmediatePropagationStopped())
                            if (!e.rnamespace || e.rnamespace.test(o.namespace)) e.handleObj = o, e.data = o.data, r = ((d.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, a), r !== undefined && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation())
                    }
                    return l.postDispatch && l.postDispatch.call(this, e), e.result
                },
                handlers: function(e, t) {
                    var n, r, i, s, o = [],
                        u = t.delegateCount,
                        a = e.target;
                    if (u && a.nodeType && (e.type !== "click" || isNaN(e.button) || e.button < 1))
                        for (; a != this; a = a.parentNode || this)
                            if (a.nodeType === 1 && (a.disabled !== !0 || e.type !== "click")) {
                                r = [];
                                for (n = 0; n < u; n++) s = t[n], i = s.selector + " ", r[i] === undefined && (r[i] = s.needsContext ? d(i, this).index(a) > -1 : d.find(i, this, null, [a]).length), r[i] && r.push(s);
                                r.length && o.push({
                                    elem: a,
                                    handlers: r
                                })
                            } return u < t.length && o.push({
                        elem: this,
                        handlers: t.slice(u)
                    }), o
                },
                fix: function(e) {
                    if (e[d.expando]) return e;
                    var t, n, r, s = e.type,
                        o = e,
                        u = this.fixHooks[s];
                    u || (this.fixHooks[s] = u = pt.test(s) ? this.mouseHooks : ht.test(s) ? this.keyHooks : {}), r = u.props ? this.props.concat(u.props) : this.props, e = new d.Event(o), t = r.length;
                    while (t--) n = r[t], e[n] = o[n];
                    return e.target || (e.target = o.srcElement || i), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, u.filter ? u.filter(e, o) : e
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(e, t) {
                        return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(e, t) {
                        var n, r, s, o = t.button,
                            u = t.fromElement;
                        return e.pageX == null && t.clientX != null && (r = e.target.ownerDocument || i, s = r.documentElement, n = r.body, e.pageX = t.clientX + (s && s.scrollLeft || n && n.scrollLeft || 0) - (s && s.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (s && s.scrollTop || n && n.scrollTop || 0) - (s && s.clientTop || n && n.clientTop || 0)), !e.relatedTarget && u && (e.relatedTarget = u === e.target ? t.toElement : u), !e.which && o !== undefined && (e.which = o & 1 ? 1 : o & 2 ? 3 : o & 4 ? 2 : 0), e
                    }
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function() {
                            if (this !== yt() && this.focus) try {
                                return this.focus(), !1
                            } catch (e) {}
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            if (this === yt() && this.blur) return this.blur(), !1
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            if (d.nodeName(this, "input") && this.type === "checkbox" && this.click) return this.click(), !1
                        },
                        _default: function(e) {
                            return d.nodeName(e.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(e) {
                            e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result)
                        }
                    }
                },
                simulate: function(e, t, n) {
                    var r = d.extend(new d.Event, n, {
                        type: e,
                        isSimulated: !0
                    });
                    d.event.trigger(r, null, t), r.isDefaultPrevented() && n.preventDefault()
                }
            }, d.removeEvent = i.removeEventListener ? function(e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n)
            } : function(e, t, n) {
                var r = "on" + t;
                e.detachEvent && (typeof e[r] == "undefined" && (e[r] = null), e.detachEvent(r, n))
            }, d.Event = function(e, t) {
                if (!(this instanceof d.Event)) return new d.Event(e, t);
                e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && e.returnValue === !1 ? mt : gt) : this.type = e, t && d.extend(this, t), this.timeStamp = e && e.timeStamp || d.now(), this[d.expando] = !0
            }, d.Event.prototype = {
                constructor: d.Event,
                isDefaultPrevented: gt,
                isPropagationStopped: gt,
                isImmediatePropagationStopped: gt,
                preventDefault: function() {
                    var e = this.originalEvent;
                    this.isDefaultPrevented = mt;
                    if (!e) return;
                    e.preventDefault ? e.preventDefault() : e.returnValue = !1
                },
                stopPropagation: function() {
                    var e = this.originalEvent;
                    this.isPropagationStopped = mt;
                    if (!e || this.isSimulated) return;
                    e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0
                },
                stopImmediatePropagation: function() {
                    var e = this.originalEvent;
                    this.isImmediatePropagationStopped = mt, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
                }
            }, d.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(e, t) {
                d.event.special[e] = {
                    delegateType: t,
                    bindType: t,
                    handle: function(e) {
                        var n, r = this,
                            i = e.relatedTarget,
                            s = e.handleObj;
                        if (!i || i !== r && !d.contains(r, i)) e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
                        return n
                    }
                }
            }), h.submit || (d.event.special.submit = {
                setup: function() {
                    if (d.nodeName(this, "form")) return !1;
                    d.event.add(this, "click._submit keypress._submit", function(e) {
                        var t = e.target,
                            n = d.nodeName(t, "input") || d.nodeName(t, "button") ? d.prop(t, "form") : undefined;
                        n && !d._data(n, "submit") && (d.event.add(n, "submit._submit", function(e) {
                            e._submitBubble = !0
                        }), d._data(n, "submit", !0))
                    })
                },
                postDispatch: function(e) {
                    e._submitBubble && (delete e._submitBubble, this.parentNode && !e.isTrigger && d.event.simulate("submit", this.parentNode, e))
                },
                teardown: function() {
                    if (d.nodeName(this, "form")) return !1;
                    d.event.remove(this, "._submit")
                }
            }), h.change || (d.event.special.change = {
                setup: function() {
                    if (ct.test(this.nodeName)) {
                        if (this.type === "checkbox" || this.type === "radio") d.event.add(this, "propertychange._change", function(e) {
                            e.originalEvent.propertyName === "checked" && (this._justChanged = !0)
                        }), d.event.add(this, "click._change", function(e) {
                            this._justChanged && !e.isTrigger && (this._justChanged = !1), d.event.simulate("change", this, e)
                        });
                        return !1
                    }
                    d.event.add(this, "beforeactivate._change", function(e) {
                        var t = e.target;
                        ct.test(t.nodeName) && !d._data(t, "change") && (d.event.add(t, "change._change", function(e) {
                            this.parentNode && !e.isSimulated && !e.isTrigger && d.event.simulate("change", this.parentNode, e)
                        }), d._data(t, "change", !0))
                    })
                },
                handle: function(e) {
                    var t = e.target;
                    if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") return e.handleObj.handler.apply(this, arguments)
                },
                teardown: function() {
                    return d.event.remove(this, "._change"), !ct.test(this.nodeName)
                }
            }), h.focusin || d.each({
                focus: "focusin",
                blur: "focusout"
            }, function(e, t) {
                var n = function(e) {
                    d.event.simulate(t, e.target, d.event.fix(e))
                };
                d.event.special[t] = {
                    setup: function() {
                        var r = this.ownerDocument || this,
                            i = d._data(r, t);
                        i || r.addEventListener(e, n, !0), d._data(r, t, (i || 0) + 1)
                    },
                    teardown: function() {
                        var r = this.ownerDocument || this,
                            i = d._data(r, t) - 1;
                        i ? d._data(r, t, i) : (r.removeEventListener(e, n, !0), d._removeData(r, t))
                    }
                }
            }), d.fn.extend({
                on: function(e, t, n, r) {
                    return bt(this, e, t, n, r)
                },
                one: function(e, t, n, r) {
                    return bt(this, e, t, n, r, 1)
                },
                off: function(e, t, n) {
                    var r, i;
                    if (e && e.preventDefault && e.handleObj) return r = e.handleObj, d(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                    if (typeof e == "object") {
                        for (i in e) this.off(i, t, e[i]);
                        return this
                    }
                    if (t === !1 || typeof t == "function") n = t, t = undefined;
                    return n === !1 && (n = gt), this.each(function() {
                        d.event.remove(this, e, n, t)
                    })
                },
                trigger: function(e, t) {
                    return this.each(function() {
                        d.event.trigger(e, t, this)
                    })
                },
                triggerHandler: function(e, t) {
                    var n = this[0];
                    if (n) return d.event.trigger(e, t, n, !0)
                }
            });
            var wt = / jQuery\d+="(?:null|\d+)"/g,
                Et = new RegExp("<(?:" + nt + ")[\\s/>]", "i"),
                St = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
                xt = /<script|<style|<link/i,
                Tt = /checked\s*(?:[^=]|=\s*.checked.)/i,
                Nt = /^true\/(.*)/,
                Ct = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
                kt = rt(i),
                Lt = kt.appendChild(i.createElement("div"));
            d.extend({
                htmlPrefilter: function(e) {
                    return e.replace(St, "<$1></$2>")
                },
                clone: function(e, t, n) {
                    var r, i, s, o, u, a = d.contains(e.ownerDocument, e);
                    h.html5Clone || d.isXMLDoc(e) || !Et.test("<" + e.nodeName + ">") ? s = e.cloneNode(!0) : (Lt.innerHTML = e.outerHTML, Lt.removeChild(s = Lt.firstChild));
                    if ((!h.noCloneEvent || !h.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !d.isXMLDoc(e)) {
                        r = st(s), u = st(e);
                        for (o = 0;
                            (i = u[o]) != null; ++o) r[o] && Dt(i, r[o])
                    }
                    if (t)
                        if (n) {
                            u = u || st(e), r = r || st(s);
                            for (o = 0;
                                (i = u[o]) != null; o++) _t(i, r[o])
                        } else _t(e, s);
                    return r = st(s, "script"), r.length > 0 && ot(r, !a && st(e, "script")), r = u = i = null, s
                },
                cleanData: function(e, t) {
                    var n, i, s, o, u = 0,
                        a = d.expando,
                        f = d.cache,
                        l = h.attributes,
                        c = d.event.special;
                    for (;
                        (n = e[u]) != null; u++)
                        if (t || I(n)) {
                            s = n[a], o = s && f[s];
                            if (o) {
                                if (o.events)
                                    for (i in o.events) c[i] ? d.event.remove(n, i) : d.removeEvent(n, i, o.handle);
                                f[s] && (delete f[s], !l && typeof n.removeAttribute != "undefined" ? n.removeAttribute(a) : n[a] = undefined, r.push(s))
                            }
                        }
                }
            }), d.fn.extend({
                domManip: Pt,
                detach: function(e) {
                    return Ht(this, e, !0)
                },
                remove: function(e) {
                    return Ht(this, e)
                },
                text: function(e) {
                    return G(this, function(e) {
                        return e === undefined ? d.text(this) : this.empty().append((this[0] && this[0].ownerDocument || i).createTextNode(e))
                    }, null, e, arguments.length)
                },
                append: function() {
                    return Pt(this, arguments, function(e) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var t = At(this, e);
                            t.appendChild(e)
                        }
                    })
                },
                prepend: function() {
                    return Pt(this, arguments, function(e) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var t = At(this, e);
                            t.insertBefore(e, t.firstChild)
                        }
                    })
                },
                before: function() {
                    return Pt(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this)
                    })
                },
                after: function() {
                    return Pt(this, arguments, function(e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                    })
                },
                empty: function() {
                    var e, t = 0;
                    for (;
                        (e = this[t]) != null; t++) {
                        e.nodeType === 1 && d.cleanData(st(e, !1));
                        while (e.firstChild) e.removeChild(e.firstChild);
                        e.options && d.nodeName(e, "select") && (e.options.length = 0)
                    }
                    return this
                },
                clone: function(e, t) {
                    return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function() {
                        return d.clone(this, e, t)
                    })
                },
                html: function(e) {
                    return G(this, function(e) {
                        var t = this[0] || {},
                            n = 0,
                            r = this.length;
                        if (e === undefined) return t.nodeType === 1 ? t.innerHTML.replace(wt, "") : undefined;
                        if (typeof e == "string" && !xt.test(e) && (h.htmlSerialize || !Et.test(e)) && (h.leadingWhitespace || !tt.test(e)) && !it[(Z.exec(e) || ["", ""])[1].toLowerCase()]) {
                            e = d.htmlPrefilter(e);
                            try {
                                for (; n < r; n++) t = this[n] || {}, t.nodeType === 1 && (d.cleanData(st(t, !1)), t.innerHTML = e);
                                t = 0
                            } catch (i) {}
                        }
                        t && this.empty().append(e)
                    }, null, e, arguments.length)
                },
                replaceWith: function() {
                    var e = [];
                    return Pt(this, arguments, function(t) {
                        var n = this.parentNode;
                        d.inArray(this, e) < 0 && (d.cleanData(st(this)), n && n.replaceChild(t, this))
                    }, e)
                }
            }), d.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(e, t) {
                d.fn[e] = function(e) {
                    var n, r = 0,
                        i = [],
                        s = d(e),
                        o = s.length - 1;
                    for (; r <= o; r++) n = r === o ? this : this.clone(!0), d(s[r])[t](n), u.apply(i, n.get());
                    return this.pushStack(i)
                }
            });
            var Bt, jt = {
                    HTML: "block",
                    BODY: "block"
                },
                qt = /^margin/,
                Rt = new RegExp("^(" + V + ")(?!px)[a-z%]+$", "i"),
                Ut = function(e, t, n, r) {
                    var i, s, o = {};
                    for (s in t) o[s] = e.style[s], e.style[s] = t[s];
                    i = n.apply(e, r || []);
                    for (s in t) e.style[s] = o[s];
                    return i
                },
                zt = i.documentElement;
            (function() {
                function l() {
                    var l, c, h = i.documentElement;
                    h.appendChild(a), f.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", t = r = u = !1, n = o = !0, e.getComputedStyle && (c = e.getComputedStyle(f), t = (c || {}).top !== "1%", u = (c || {}).marginLeft === "2px", r = (c || {
                        width: "4px"
                    }).width === "4px", f.style.marginRight = "50%", n = (c || {
                        marginRight: "4px"
                    }).marginRight === "4px", l = f.appendChild(i.createElement("div")), l.style.cssText = f.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", l.style.marginRight = l.style.width = "0", f.style.width = "1px", o = !parseFloat((e.getComputedStyle(l) || {}).marginRight), f.removeChild(l)), f.style.display = "none", s = f.getClientRects().length === 0, s && (f.style.display = "", f.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", l = f.getElementsByTagName("td"), l[0].style.cssText = "margin:0;border:0;padding:0;display:none", s = l[0].offsetHeight === 0, s && (l[0].style.display = "", l[1].style.display = "none", s = l[0].offsetHeight === 0)), h.removeChild(a)
                }
                var t, n, r, s, o, u, a = i.createElement("div"),
                    f = i.createElement("div");
                if (!f.style) return;
                f.style.cssText = "float:left;opacity:.5", h.opacity = f.style.opacity === "0.5", h.cssFloat = !!f.style.cssFloat, f.style.backgroundClip = "content-box", f.cloneNode(!0).style.backgroundClip = "", h.clearCloneStyle = f.style.backgroundClip === "content-box", a = i.createElement("div"), a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", f.innerHTML = "", a.appendChild(f), h.boxSizing = f.style.boxSizing === "" || f.style.MozBoxSizing === "" || f.style.WebkitBoxSizing === "", d.extend(h, {
                    reliableHiddenOffsets: function() {
                        return t == null && l(), s
                    },
                    boxSizingReliable: function() {
                        return t == null && l(), r
                    },
                    pixelMarginRight: function() {
                        return t == null && l(), n
                    },
                    pixelPosition: function() {
                        return t == null && l(), t
                    },
                    reliableMarginRight: function() {
                        return t == null && l(), o
                    },
                    reliableMarginLeft: function() {
                        return t == null && l(), u
                    }
                })
            })();
            var Wt, Xt, Vt = /^(top|right|bottom|left)$/;
            e.getComputedStyle ? (Wt = function(t) {
                var n = t.ownerDocument.defaultView;
                if (!n || !n.opener) n = e;
                return n.getComputedStyle(t)
            }, Xt = function(e, t, n) {
                var r, i, s, o, u = e.style;
                return n = n || Wt(e), o = n ? n.getPropertyValue(t) || n[t] : undefined, (o === "" || o === undefined) && !d.contains(e.ownerDocument, e) && (o = d.style(e, t)), n && !h.pixelMarginRight() && Rt.test(o) && qt.test(t) && (r = u.width, i = u.minWidth, s = u.maxWidth, u.minWidth = u.maxWidth = u.width = o, o = n.width, u.width = r, u.minWidth = i, u.maxWidth = s), o === undefined ? o : o + ""
            }) : zt.currentStyle && (Wt = function(e) {
                return e.currentStyle
            }, Xt = function(e, t, n) {
                var r, i, s, o, u = e.style;
                return n = n || Wt(e), o = n ? n[t] : undefined, o == null && u && u[t] && (o = u[t]), Rt.test(o) && !Vt.test(t) && (r = u.left, i = e.runtimeStyle, s = i && i.left, s && (i.left = e.currentStyle.left), u.left = t === "fontSize" ? "1em" : o, o = u.pixelLeft + "px", u.left = r, s && (i.left = s)), o === undefined ? o : o + "" || "auto"
            });
            var Jt = /alpha\([^)]*\)/i,
                Kt = /opacity\s*=\s*([^)]*)/i,
                Qt = /^(none|table(?!-c[ea]).+)/,
                Gt = new RegExp("^(" + V + ")(.*)$", "i"),
                Yt = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                Zt = {
                    letterSpacing: "0",
                    fontWeight: "400"
                },
                en = ["Webkit", "O", "Moz", "ms"],
                tn = i.createElement("div").style;
            d.extend({
                cssHooks: {
                    opacity: {
                        get: function(e, t) {
                            if (t) {
                                var n = Xt(e, "opacity");
                                return n === "" ? "1" : n
                            }
                        }
                    }
                },
                cssNumber: {
                    animationIterationCount: !0,
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    "float": h.cssFloat ? "cssFloat" : "styleFloat"
                },
                style: function(e, t, n, r) {
                    if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
                    var i, s, o, u = d.camelCase(t),
                        a = e.style;
                    t = d.cssProps[u] || (d.cssProps[u] = nn(u) || u), o = d.cssHooks[t] || d.cssHooks[u];
                    if (n === undefined) return o && "get" in o && (i = o.get(e, !1, r)) !== undefined ? i : a[t];
                    s = typeof n, s === "string" && (i = $.exec(n)) && i[1] && (n = Q(e, t, i), s = "number");
                    if (n == null || n !== n) return;
                    s === "number" && (n += i && i[3] || (d.cssNumber[u] ? "" : "px")), !h.clearCloneStyle && n === "" && t.indexOf("background") === 0 && (a[t] = "inherit");
                    if (!o || !("set" in o) || (n = o.set(e, n, r)) !== undefined) try {
                        a[t] = n
                    } catch (f) {}
                },
                css: function(e, t, n, r) {
                    var i, s, o, u = d.camelCase(t);
                    return t = d.cssProps[u] || (d.cssProps[u] = nn(u) || u), o = d.cssHooks[t] || d.cssHooks[u], o && "get" in o && (s = o.get(e, !0, n)), s === undefined && (s = Xt(e, t, r)), s === "normal" && t in Zt && (s = Zt[t]), n === "" || n ? (i = parseFloat(s), n === !0 || isFinite(i) ? i || 0 : s) : s
                }
            }), d.each(["height", "width"], function(e, t) {
                d.cssHooks[t] = {
                    get: function(e, n, r) {
                        if (n) return Qt.test(d.css(e, "display")) && e.offsetWidth === 0 ? Ut(e, Yt, function() {
                            return un(e, t, r)
                        }) : un(e, t, r)
                    },
                    set: function(e, n, r) {
                        var i = r && Wt(e);
                        return sn(e, n, r ? on(e, t, r, h.boxSizing && d.css(e, "boxSizing", !1, i) === "border-box", i) : 0)
                    }
                }
            }), h.opacity || (d.cssHooks.opacity = {
                get: function(e, t) {
                    return Kt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
                },
                set: function(e, t) {
                    var n = e.style,
                        r = e.currentStyle,
                        i = d.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
                        s = r && r.filter || n.filter || "";
                    n.zoom = 1;
                    if ((t >= 1 || t === "") && d.trim(s.replace(Jt, "")) === "" && n.removeAttribute) {
                        n.removeAttribute("filter");
                        if (t === "" || r && !r.filter) return
                    }
                    n.filter = Jt.test(s) ? s.replace(Jt, i) : s + " " + i
                }
            }), d.cssHooks.marginRight = $t(h.reliableMarginRight, function(e, t) {
                if (t) return Ut(e, {
                    display: "inline-block"
                }, Xt, [e, "marginRight"])
            }), d.cssHooks.marginLeft = $t(h.reliableMarginLeft, function(e, t) {
                if (t) return (parseFloat(Xt(e, "marginLeft")) || (d.contains(e.ownerDocument, e) ? e.getBoundingClientRect().left - Ut(e, {
                    marginLeft: 0
                }, function() {
                    return e.getBoundingClientRect().left
                }) : 0)) + "px"
            }), d.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(e, t) {
                d.cssHooks[e + t] = {
                    expand: function(n) {
                        var r = 0,
                            i = {},
                            s = typeof n == "string" ? n.split(" ") : [n];
                        for (; r < 4; r++) i[e + J[r] + t] = s[r] || s[r - 2] || s[0];
                        return i
                    }
                }, qt.test(e) || (d.cssHooks[e + t].set = sn)
            }), d.fn.extend({
                css: function(e, t) {
                    return G(this, function(e, t, n) {
                        var r, i, s = {},
                            o = 0;
                        if (d.isArray(t)) {
                            r = Wt(e), i = t.length;
                            for (; o < i; o++) s[t[o]] = d.css(e, t[o], !1, r);
                            return s
                        }
                        return n !== undefined ? d.style(e, t, n) : d.css(e, t)
                    }, e, t, arguments.length > 1)
                },
                show: function() {
                    return rn(this, !0)
                },
                hide: function() {
                    return rn(this)
                },
                toggle: function(e) {
                    return typeof e == "boolean" ? e ? this.show() : this.hide() : this.each(function() {
                        K(this) ? d(this).show() : d(this).hide()
                    })
                }
            }), d.Tween = an, an.prototype = {
                constructor: an,
                init: function(e, t, n, r, i, s) {
                    this.elem = e, this.prop = n, this.easing = i || d.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (d.cssNumber[n] ? "" : "px")
                },
                cur: function() {
                    var e = an.propHooks[this.prop];
                    return e && e.get ? e.get(this) : an.propHooks._default.get(this)
                },
                run: function(e) {
                    var t, n = an.propHooks[this.prop];
                    return this.options.duration ? this.pos = t = d.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : an.propHooks._default.set(this), this
                }
            }, an.prototype.init.prototype = an.prototype, an.propHooks = {
                _default: {
                    get: function(e) {
                        var t;
                        return e.elem.nodeType !== 1 || e.elem[e.prop] != null && e.elem.style[e.prop] == null ? e.elem[e.prop] : (t = d.css(e.elem, e.prop, ""), !t || t === "auto" ? 0 : t)
                    },
                    set: function(e) {
                        d.fx.step[e.prop] ? d.fx.step[e.prop](e) : e.elem.nodeType !== 1 || e.elem.style[d.cssProps[e.prop]] == null && !d.cssHooks[e.prop] ? e.elem[e.prop] = e.now : d.style(e.elem, e.prop, e.now + e.unit)
                    }
                }
            }, an.propHooks.scrollTop = an.propHooks.scrollLeft = {
                set: function(e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                }
            }, d.easing = {
                linear: function(e) {
                    return e
                },
                swing: function(e) {
                    return .5 - Math.cos(e * Math.PI) / 2
                },
                _default: "swing"
            }, d.fx = an.prototype.init, d.fx.step = {};
            var fn, ln, cn = /^(?:toggle|show|hide)$/,
                hn = /queueHooks$/;
            d.Animation = d.extend(yn, {
                    tweeners: {
                        "*": [function(e, t) {
                            var n = this.createTween(e, t);
                            return Q(n.elem, e, $.exec(t), n), n
                        }]
                    },
                    tweener: function(e, t) {
                        d.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(D);
                        var n, r = 0,
                            i = e.length;
                        for (; r < i; r++) n = e[r], yn.tweeners[n] = yn.tweeners[n] || [], yn.tweeners[n].unshift(t)
                    },
                    prefilters: [mn],
                    prefilter: function(e, t) {
                        t ? yn.prefilters.unshift(e) : yn.prefilters.push(e)
                    }
                }), d.speed = function(e, t, n) {
                    var r = e && typeof e == "object" ? d.extend({}, e) : {
                        complete: n || !n && t || d.isFunction(e) && e,
                        duration: e,
                        easing: n && t || t && !d.isFunction(t) && t
                    };
                    r.duration = d.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in d.fx.speeds ? d.fx.speeds[r.duration] : d.fx.speeds._default;
                    if (r.queue == null || r.queue === !0) r.queue = "fx";
                    return r.old = r.complete, r.complete = function() {
                        d.isFunction(r.old) && r.old.call(this), r.queue && d.dequeue(this, r.queue)
                    }, r
                }, d.fn.extend({
                    fadeTo: function(e, t, n, r) {
                        return this.filter(K).css("opacity", 0).show().end().animate({
                            opacity: t
                        }, e, n, r)
                    },
                    animate: function(e, t, n, r) {
                        var i = d.isEmptyObject(e),
                            s = d.speed(t, n, r),
                            o = function() {
                                var t = yn(this, d.extend({}, e), s);
                                (i || d._data(this, "finish")) && t.stop(!0)
                            };
                        return o.finish = o, i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
                    },
                    stop: function(e, t, n) {
                        var r = function(e) {
                            var t = e.stop;
                            delete e.stop, t(n)
                        };
                        return typeof e != "string" && (n = t, t = e, e = undefined), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                            var t = !0,
                                i = e != null && e + "queueHooks",
                                s = d.timers,
                                o = d._data(this);
                            if (i) o[i] && o[i].stop && r(o[i]);
                            else
                                for (i in o) o[i] && o[i].stop && hn.test(i) && r(o[i]);
                            for (i = s.length; i--;) s[i].elem === this && (e == null || s[i].queue === e) && (s[i].anim.stop(n), t = !1, s.splice(i, 1));
                            (t || !n) && d.dequeue(this, e)
                        })
                    },
                    finish: function(e) {
                        return e !== !1 && (e = e || "fx"), this.each(function() {
                            var t, n = d._data(this),
                                r = n[e + "queue"],
                                i = n[e + "queueHooks"],
                                s = d.timers,
                                o = r ? r.length : 0;
                            n.finish = !0, d.queue(this, e, []), i && i.stop && i.stop.call(this, !0);
                            for (t = s.length; t--;) s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
                            for (t = 0; t < o; t++) r[t] && r[t].finish && r[t].finish.call(this);
                            delete n.finish
                        })
                    }
                }), d.each(["toggle", "show", "hide"], function(e, t) {
                    var n = d.fn[t];
                    d.fn[t] = function(e, r, i) {
                        return e == null || typeof e == "boolean" ? n.apply(this, arguments) : this.animate(dn(t, !0), e, r, i)
                    }
                }), d.each({
                    slideDown: dn("show"),
                    slideUp: dn("hide"),
                    slideToggle: dn("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, function(e, t) {
                    d.fn[e] = function(e, n, r) {
                        return this.animate(t, e, n, r)
                    }
                }), d.timers = [], d.fx.tick = function() {
                    var e, t = d.timers,
                        n = 0;
                    fn = d.now();
                    for (; n < t.length; n++) e = t[n], !e() && t[n] === e && t.splice(n--, 1);
                    t.length || d.fx.stop(), fn = undefined
                }, d.fx.timer = function(e) {
                    d.timers.push(e), e() ? d.fx.start() : d.timers.pop()
                }, d.fx.interval = 13, d.fx.start = function() {
                    ln || (ln = e.setInterval(d.fx.tick, d.fx.interval))
                }, d.fx.stop = function() {
                    e.clearInterval(ln), ln = null
                }, d.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                }, d.fn.delay = function(t, n) {
                    return t = d.fx ? d.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, r) {
                        var i = e.setTimeout(n, t);
                        r.stop = function() {
                            e.clearTimeout(i)
                        }
                    })
                },
                function() {
                    var e, t = i.createElement("input"),
                        n = i.createElement("div"),
                        r = i.createElement("select"),
                        s = r.appendChild(i.createElement("option"));
                    n = i.createElement("div"), n.setAttribute("className", "t"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = n.getElementsByTagName("a")[0], t.setAttribute("type", "checkbox"), n.appendChild(t), e = n.getElementsByTagName("a")[0], e.style.cssText = "top:1px", h.getSetAttribute = n.className !== "t", h.style = /top/.test(e.getAttribute("style")), h.hrefNormalized = e.getAttribute("href") === "/a", h.checkOn = !!t.value, h.optSelected = s.selected, h.enctype = !!i.createElement("form").enctype, r.disabled = !0, h.optDisabled = !s.disabled, t = i.createElement("input"), t.setAttribute("value", ""), h.input = t.getAttribute("value") === "", t.value = "t", t.setAttribute("type", "radio"), h.radioValue = t.value === "t"
                }();
            var bn = /\r/g,
                wn = /[\x20\t\r\n\f]+/g;
            d.fn.extend({
                val: function(e) {
                    var t, n, r, i = this[0];
                    if (!arguments.length) {
                        if (i) return t = d.valHooks[i.type] || d.valHooks[i.nodeName.toLowerCase()], t && "get" in t && (n = t.get(i, "value")) !== undefined ? n : (n = i.value, typeof n == "string" ? n.replace(bn, "") : n == null ? "" : n);
                        return
                    }
                    return r = d.isFunction(e), this.each(function(n) {
                        var i;
                        if (this.nodeType !== 1) return;
                        r ? i = e.call(this, n, d(this).val()) : i = e, i == null ? i = "" : typeof i == "number" ? i += "" : d.isArray(i) && (i = d.map(i, function(e) {
                            return e == null ? "" : e + ""
                        })), t = d.valHooks[this.type] || d.valHooks[this.nodeName.toLowerCase()];
                        if (!t || !("set" in t) || t.set(this, i, "value") === undefined) this.value = i
                    })
                }
            }), d.extend({
                valHooks: {
                    option: {
                        get: function(e) {
                            var t = d.find.attr(e, "value");
                            return t != null ? t : d.trim(d.text(e)).replace(wn, " ")
                        }
                    },
                    select: {
                        get: function(e) {
                            var t, n, r = e.options,
                                i = e.selectedIndex,
                                s = e.type === "select-one" || i < 0,
                                o = s ? null : [],
                                u = s ? i + 1 : r.length,
                                a = i < 0 ? u : s ? i : 0;
                            for (; a < u; a++) {
                                n = r[a];
                                if ((n.selected || a === i) && (h.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !d.nodeName(n.parentNode, "optgroup"))) {
                                    t = d(n).val();
                                    if (s) return t;
                                    o.push(t)
                                }
                            }
                            return o
                        },
                        set: function(e, t) {
                            var n, r, i = e.options,
                                s = d.makeArray(t),
                                o = i.length;
                            while (o--) {
                                r = i[o];
                                if (d.inArray(d.valHooks.option.get(r), s) > -1) try {
                                    r.selected = n = !0
                                } catch (u) {
                                    r.scrollHeight
                                } else r.selected = !1
                            }
                            return n || (e.selectedIndex = -1), i
                        }
                    }
                }
            }), d.each(["radio", "checkbox"], function() {
                d.valHooks[this] = {
                    set: function(e, t) {
                        if (d.isArray(t)) return e.checked = d.inArray(d(e).val(), t) > -1
                    }
                }, h.checkOn || (d.valHooks[this].get = function(e) {
                    return e.getAttribute("value") === null ? "on" : e.value
                })
            });
            var En, Sn, xn = d.expr.attrHandle,
                Tn = /^(?:checked|selected)$/i,
                Nn = h.getSetAttribute,
                Cn = h.input;
            d.fn.extend({
                attr: function(e, t) {
                    return G(this, d.attr, e, t, arguments.length > 1)
                },
                removeAttr: function(e) {
                    return this.each(function() {
                        d.removeAttr(this, e)
                    })
                }
            }), d.extend({
                attr: function(e, t, n) {
                    var r, i, s = e.nodeType;
                    if (s === 3 || s === 8 || s === 2) return;
                    if (typeof e.getAttribute == "undefined") return d.prop(e, t, n);
                    if (s !== 1 || !d.isXMLDoc(e)) t = t.toLowerCase(), i = d.attrHooks[t] || (d.expr.match.bool.test(t) ? Sn : En);
                    if (n !== undefined) {
                        if (n === null) {
                            d.removeAttr(e, t);
                            return
                        }
                        return i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : (e.setAttribute(t, n + ""), n)
                    }
                    return i && "get" in i && (r = i.get(e, t)) !== null ? r : (r = d.find.attr(e, t), r == null ? undefined : r)
                },
                attrHooks: {
                    type: {
                        set: function(e, t) {
                            if (!h.radioValue && t === "radio" && d.nodeName(e, "input")) {
                                var n = e.value;
                                return e.setAttribute("type", t), n && (e.value = n), t
                            }
                        }
                    }
                },
                removeAttr: function(e, t) {
                    var n, r, i = 0,
                        s = t && t.match(D);
                    if (s && e.nodeType === 1)
                        while (n = s[i++]) r = d.propFix[n] || n, d.expr.match.bool.test(n) ? Cn && Nn || !Tn.test(n) ? e[r] = !1 : e[d.camelCase("default-" + n)] = e[r] = !1 : d.attr(e, n, ""), e.removeAttribute(Nn ? n : r)
                }
            }), Sn = {
                set: function(e, t, n) {
                    return t === !1 ? d.removeAttr(e, n) : Cn && Nn || !Tn.test(n) ? e.setAttribute(!Nn && d.propFix[n] || n, n) : e[d.camelCase("default-" + n)] = e[n] = !0, n
                }
            }, d.each(d.expr.match.bool.source.match(/\w+/g), function(e, t) {
                var n = xn[t] || d.find.attr;
                Cn && Nn || !Tn.test(t) ? xn[t] = function(e, t, r) {
                    var i, s;
                    return r || (s = xn[t], xn[t] = i, i = n(e, t, r) != null ? t.toLowerCase() : null, xn[t] = s), i
                } : xn[t] = function(e, t, n) {
                    if (!n) return e[d.camelCase("default-" + t)] ? t.toLowerCase() : null
                }
            });
            if (!Cn || !Nn) d.attrHooks.value = {
                set: function(e, t, n) {
                    if (!d.nodeName(e, "input")) return En && En.set(e, t, n);
                    e.defaultValue = t
                }
            };
            Nn || (En = {
                set: function(e, t, n) {
                    var r = e.getAttributeNode(n);
                    r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)), r.value = t += "";
                    if (n === "value" || t === e.getAttribute(n)) return t
                }
            }, xn.id = xn.name = xn.coords = function(e, t, n) {
                var r;
                if (!n) return (r = e.getAttributeNode(t)) && r.value !== "" ? r.value : null
            }, d.valHooks.button = {
                get: function(e, t) {
                    var n = e.getAttributeNode(t);
                    if (n && n.specified) return n.value
                },
                set: En.set
            }, d.attrHooks.contenteditable = {
                set: function(e, t, n) {
                    En.set(e, t === "" ? !1 : t, n)
                }
            }, d.each(["width", "height"], function(e, t) {
                d.attrHooks[t] = {
                    set: function(e, n) {
                        if (n === "") return e.setAttribute(t, "auto"), n
                    }
                }
            })), h.style || (d.attrHooks.style = {
                get: function(e) {
                    return e.style.cssText || undefined
                },
                set: function(e, t) {
                    return e.style.cssText = t + ""
                }
            });
            var kn = /^(?:input|select|textarea|button|object)$/i,
                Ln = /^(?:a|area)$/i;
            d.fn.extend({
                prop: function(e, t) {
                    return G(this, d.prop, e, t, arguments.length > 1)
                },
                removeProp: function(e) {
                    return e = d.propFix[e] || e, this.each(function() {
                        try {
                            this[e] = undefined, delete this[e]
                        } catch (t) {}
                    })
                }
            }), d.extend({
                prop: function(e, t, n) {
                    var r, i, s = e.nodeType;
                    if (s === 3 || s === 8 || s === 2) return;
                    if (s !== 1 || !d.isXMLDoc(e)) t = d.propFix[t] || t, i = d.propHooks[t];
                    return n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && (r = i.get(e, t)) !== null ? r : e[t]
                },
                propHooks: {
                    tabIndex: {
                        get: function(e) {
                            var t = d.find.attr(e, "tabindex");
                            return t ? parseInt(t, 10) : kn.test(e.nodeName) || Ln.test(e.nodeName) && e.href ? 0 : -1
                        }
                    }
                },
                propFix: {
                    "for": "htmlFor",
                    "class": "className"
                }
            }), h.hrefNormalized || d.each(["href", "src"], function(e, t) {
                d.propHooks[t] = {
                    get: function(e) {
                        return e.getAttribute(t, 4)
                    }
                }
            }), h.optSelected || (d.propHooks.selected = {
                get: function(e) {
                    var t = e.parentNode;
                    return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
                },
                set: function(e) {
                    var t = e.parentNode;
                    t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
                }
            }), d.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                d.propFix[this.toLowerCase()] = this
            }), h.enctype || (d.propFix.enctype = "encoding");
            var An = /[\t\r\n\f]/g;
            d.fn.extend({
                addClass: function(e) {
                    var t, n, r, i, s, o, u, a = 0;
                    if (d.isFunction(e)) return this.each(function(t) {
                        d(this).addClass(e.call(this, t, On(this)))
                    });
                    if (typeof e == "string" && e) {
                        t = e.match(D) || [];
                        while (n = this[a++]) {
                            i = On(n), r = n.nodeType === 1 && (" " + i + " ").replace(An, " ");
                            if (r) {
                                o = 0;
                                while (s = t[o++]) r.indexOf(" " + s + " ") < 0 && (r += s + " ");
                                u = d.trim(r), i !== u && d.attr(n, "class", u)
                            }
                        }
                    }
                    return this
                },
                removeClass: function(e) {
                    var t, n, r, i, s, o, u, a = 0;
                    if (d.isFunction(e)) return this.each(function(t) {
                        d(this).removeClass(e.call(this, t, On(this)))
                    });
                    if (!arguments.length) return this.attr("class", "");
                    if (typeof e == "string" && e) {
                        t = e.match(D) || [];
                        while (n = this[a++]) {
                            i = On(n), r = n.nodeType === 1 && (" " + i + " ").replace(An, " ");
                            if (r) {
                                o = 0;
                                while (s = t[o++])
                                    while (r.indexOf(" " + s + " ") > -1) r = r.replace(" " + s + " ", " ");
                                u = d.trim(r), i !== u && d.attr(n, "class", u)
                            }
                        }
                    }
                    return this
                },
                toggleClass: function(e, t) {
                    var n = typeof e;
                    return typeof t == "boolean" && n === "string" ? t ? this.addClass(e) : this.removeClass(e) : d.isFunction(e) ? this.each(function(n) {
                        d(this).toggleClass(e.call(this, n, On(this), t), t)
                    }) : this.each(function() {
                        var t, r, i, s;
                        if (n === "string") {
                            r = 0, i = d(this), s = e.match(D) || [];
                            while (t = s[r++]) i.hasClass(t) ? i.removeClass(t) : i.addClass(t)
                        } else if (e === undefined || n === "boolean") t = On(this), t && d._data(this, "__className__", t), d.attr(this, "class", t || e === !1 ? "" : d._data(this, "__className__") || "")
                    })
                },
                hasClass: function(e) {
                    var t, n, r = 0;
                    t = " " + e + " ";
                    while (n = this[r++])
                        if (n.nodeType === 1 && (" " + On(n) + " ").replace(An, " ").indexOf(t) > -1) return !0;
                    return !1
                }
            }), d.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
                d.fn[t] = function(e, n) {
                    return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                }
            }), d.fn.extend({
                hover: function(e, t) {
                    return this.mouseenter(e).mouseleave(t || e)
                }
            });
            var Mn = e.location,
                _n = d.now(),
                Dn = /\?/,
                Pn = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
            d.parseJSON = function(t) {
                if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
                var n, r = null,
                    i = d.trim(t + "");
                return i && !d.trim(i.replace(Pn, function(e, t, i, s) {
                    return n && t && (r = 0), r === 0 ? e : (n = i || t, r += !s - !i, "")
                })) ? Function("return " + i)() : d.error("Invalid JSON: " + t)
            }, d.parseXML = function(t) {
                var n, r;
                if (!t || typeof t != "string") return null;
                try {
                    e.DOMParser ? (r = new e.DOMParser, n = r.parseFromString(t, "text/xml")) : (n = new e.ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
                } catch (i) {
                    n = undefined
                }
                return (!n || !n.documentElement || n.getElementsByTagName("parsererror").length) && d.error("Invalid XML: " + t), n
            };
            var Hn = /#.*$/,
                Bn = /([?&])_=[^&]*/,
                jn = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
                Fn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                In = /^(?:GET|HEAD)$/,
                qn = /^\/\//,
                Rn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
                Un = {},
                zn = {},
                Wn = "*/".concat("*"),
                Xn = Mn.href,
                Vn = Rn.exec(Xn.toLowerCase()) || [];
            d.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: Xn,
                    type: "GET",
                    isLocal: Fn.test(Vn[1]),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": Wn,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": d.parseJSON,
                        "text xml": d.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(e, t) {
                    return t ? Kn(Kn(e, d.ajaxSettings), t) : Kn(d.ajaxSettings, e)
                },
                ajaxPrefilter: $n(Un),
                ajaxTransport: $n(zn),
                ajax: function(t, n) {
                    function T(t, n, r, i) {
                        var l, y, b, E, x, T = n;
                        if (w === 2) return;
                        w = 2, u && e.clearTimeout(u), f = undefined, o = i || "", S.readyState = t > 0 ? 4 : 0, l = t >= 200 && t < 300 || t === 304, r && (E = Qn(c, S, r)), E = Gn(c, E, S, l);
                        if (l) c.ifModified && (x = S.getResponseHeader("Last-Modified"), x && (d.lastModified[s] = x), x = S.getResponseHeader("etag"), x && (d.etag[s] = x)), t === 204 || c.type === "HEAD" ? T = "nocontent" : t === 304 ? T = "notmodified" : (T = E.state, y = E.data, b = E.error, l = !b);
                        else {
                            b = T;
                            if (t || !T) T = "error", t < 0 && (t = 0)
                        }
                        S.status = t, S.statusText = (n || T) + "", l ? v.resolveWith(h, [y, T, S]) : v.rejectWith(h, [S, T, b]), S.statusCode(g), g = undefined, a && p.trigger(l ? "ajaxSuccess" : "ajaxError", [S, c, l ? y : b]), m.fireWith(h, [S, T]), a && (p.trigger("ajaxComplete", [S, c]), --d.active || d.event.trigger("ajaxStop"))
                    }
                    typeof t == "object" && (n = t, t = undefined), n = n || {};
                    var r, i, s, o, u, a, f, l, c = d.ajaxSetup({}, n),
                        h = c.context || c,
                        p = c.context && (h.nodeType || h.jquery) ? d(h) : d.event,
                        v = d.Deferred(),
                        m = d.Callbacks("once memory"),
                        g = c.statusCode || {},
                        y = {},
                        b = {},
                        w = 0,
                        E = "canceled",
                        S = {
                            readyState: 0,
                            getResponseHeader: function(e) {
                                var t;
                                if (w === 2) {
                                    if (!l) {
                                        l = {};
                                        while (t = jn.exec(o)) l[t[1].toLowerCase()] = t[2]
                                    }
                                    t = l[e.toLowerCase()]
                                }
                                return t == null ? null : t
                            },
                            getAllResponseHeaders: function() {
                                return w === 2 ? o : null
                            },
                            setRequestHeader: function(e, t) {
                                var n = e.toLowerCase();
                                return w || (e = b[n] = b[n] || e, y[e] = t), this
                            },
                            overrideMimeType: function(e) {
                                return w || (c.mimeType = e), this
                            },
                            statusCode: function(e) {
                                var t;
                                if (e)
                                    if (w < 2)
                                        for (t in e) g[t] = [g[t], e[t]];
                                    else S.always(e[S.status]);
                                return this
                            },
                            abort: function(e) {
                                var t = e || E;
                                return f && f.abort(t), T(0, t), this
                            }
                        };
                    v.promise(S).complete = m.add, S.success = S.done, S.error = S.fail, c.url = ((t || c.url || Xn) + "").replace(Hn, "").replace(qn, Vn[1] + "//"), c.type = n.method || n.type || c.method || c.type, c.dataTypes = d.trim(c.dataType || "*").toLowerCase().match(D) || [""], c.crossDomain == null && (r = Rn.exec(c.url.toLowerCase()), c.crossDomain = !(!r || r[1] === Vn[1] && r[2] === Vn[2] && (r[3] || (r[1] === "http:" ? "80" : "443")) === (Vn[3] || (Vn[1] === "http:" ? "80" : "443")))), c.data && c.processData && typeof c.data != "string" && (c.data = d.param(c.data, c.traditional)), Jn(Un, c, n, S);
                    if (w === 2) return S;
                    a = d.event && c.global, a && d.active++ === 0 && d.event.trigger("ajaxStart"), c.type = c.type.toUpperCase(), c.hasContent = !In.test(c.type), s = c.url, c.hasContent || (c.data && (s = c.url += (Dn.test(s) ? "&" : "?") + c.data, delete c.data), c.cache === !1 && (c.url = Bn.test(s) ? s.replace(Bn, "$1_=" + _n++) : s + (Dn.test(s) ? "&" : "?") + "_=" + _n++)), c.ifModified && (d.lastModified[s] && S.setRequestHeader("If-Modified-Since", d.lastModified[s]), d.etag[s] && S.setRequestHeader("If-None-Match", d.etag[s])), (c.data && c.hasContent && c.contentType !== !1 || n.contentType) && S.setRequestHeader("Content-Type", c.contentType), S.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + (c.dataTypes[0] !== "*" ? ", " + Wn + "; q=0.01" : "") : c.accepts["*"]);
                    for (i in c.headers) S.setRequestHeader(i, c.headers[i]);
                    if (!c.beforeSend || c.beforeSend.call(h, S, c) !== !1 && w !== 2) {
                        E = "abort";
                        for (i in {
                                success: 1,
                                error: 1,
                                complete: 1
                            }) S[i](c[i]);
                        f = Jn(zn, c, n, S);
                        if (!f) T(-1, "No Transport");
                        else {
                            S.readyState = 1, a && p.trigger("ajaxSend", [S, c]);
                            if (w === 2) return S;
                            c.async && c.timeout > 0 && (u = e.setTimeout(function() {
                                S.abort("timeout")
                            }, c.timeout));
                            try {
                                w = 1, f.send(y, T)
                            } catch (x) {
                                if (!(w < 2)) throw x;
                                T(-1, x)
                            }
                        }
                        return S
                    }
                    return S.abort()
                },
                getJSON: function(e, t, n) {
                    return d.get(e, t, n, "json")
                },
                getScript: function(e, t) {
                    return d.get(e, undefined, t, "script")
                }
            }), d.each(["get", "post"], function(e, t) {
                d[t] = function(e, n, r, i) {
                    return d.isFunction(n) && (i = i || r, r = n, n = undefined), d.ajax(d.extend({
                        url: e,
                        type: t,
                        dataType: i,
                        data: n,
                        success: r
                    }, d.isPlainObject(e) && e))
                }
            }), d._evalUrl = function(e) {
                return d.ajax({
                    url: e,
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    async: !1,
                    global: !1,
                    "throws": !0
                })
            }, d.fn.extend({
                wrapAll: function(e) {
                    if (d.isFunction(e)) return this.each(function(t) {
                        d(this).wrapAll(e.call(this, t))
                    });
                    if (this[0]) {
                        var t = d(e, this[0].ownerDocument).eq(0).clone(!0);
                        this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                            var e = this;
                            while (e.firstChild && e.firstChild.nodeType === 1) e = e.firstChild;
                            return e
                        }).append(this)
                    }
                    return this
                },
                wrapInner: function(e) {
                    return d.isFunction(e) ? this.each(function(t) {
                        d(this).wrapInner(e.call(this, t))
                    }) : this.each(function() {
                        var t = d(this),
                            n = t.contents();
                        n.length ? n.wrapAll(e) : t.append(e)
                    })
                },
                wrap: function(e) {
                    var t = d.isFunction(e);
                    return this.each(function(n) {
                        d(this).wrapAll(t ? e.call(this, n) : e)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        d.nodeName(this, "body") || d(this).replaceWith(this.childNodes)
                    }).end()
                }
            }), d.expr.filters.hidden = function(e) {
                return h.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : Zn(e)
            }, d.expr.filters.visible = function(e) {
                return !d.expr.filters.hidden(e)
            };
            var er = /%20/g,
                tr = /\[\]$/,
                nr = /\r?\n/g,
                rr = /^(?:submit|button|image|reset|file)$/i,
                ir = /^(?:input|select|textarea|keygen)/i;
            d.param = function(e, t) {
                var n, r = [],
                    i = function(e, t) {
                        t = d.isFunction(t) ? t() : t == null ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                    };
                t === undefined && (t = d.ajaxSettings && d.ajaxSettings.traditional);
                if (d.isArray(e) || e.jquery && !d.isPlainObject(e)) d.each(e, function() {
                    i(this.name, this.value)
                });
                else
                    for (n in e) sr(n, e[n], t, i);
                return r.join("&").replace(er, "+")
            }, d.fn.extend({
                serialize: function() {
                    return d.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var e = d.prop(this, "elements");
                        return e ? d.makeArray(e) : this
                    }).filter(function() {
                        var e = this.type;
                        return this.name && !d(this).is(":disabled") && ir.test(this.nodeName) && !rr.test(e) && (this.checked || !Y.test(e))
                    }).map(function(e, t) {
                        var n = d(this).val();
                        return n == null ? null : d.isArray(n) ? d.map(n, function(e) {
                            return {
                                name: t.name,
                                value: e.replace(nr, "\r\n")
                            }
                        }) : {
                            name: t.name,
                            value: n.replace(nr, "\r\n")
                        }
                    }).get()
                }
            }), d.ajaxSettings.xhr = e.ActiveXObject !== undefined ? function() {
                return this.isLocal ? lr() : i.documentMode > 8 ? fr() : /^(get|post|head|put|delete|options)$/i.test(this.type) && fr() || lr()
            } : fr;
            var or = 0,
                ur = {},
                ar = d.ajaxSettings.xhr();
            e.attachEvent && e.attachEvent("onunload", function() {
                for (var e in ur) ur[e](undefined, !0)
            }), h.cors = !!ar && "withCredentials" in ar, ar = h.ajax = !!ar, ar && d.ajaxTransport(function(t) {
                if (!t.crossDomain || h.cors) {
                    var n;
                    return {
                        send: function(r, i) {
                            var s, o = t.xhr(),
                                u = ++or;
                            o.open(t.type, t.url, t.async, t.username, t.password);
                            if (t.xhrFields)
                                for (s in t.xhrFields) o[s] = t.xhrFields[s];
                            t.mimeType && o.overrideMimeType && o.overrideMimeType(t.mimeType), !t.crossDomain && !r["X-Requested-With"] && (r["X-Requested-With"] = "XMLHttpRequest");
                            for (s in r) r[s] !== undefined && o.setRequestHeader(s, r[s] + "");
                            o.send(t.hasContent && t.data || null), n = function(e, r) {
                                var s, a, f;
                                if (n && (r || o.readyState === 4)) {
                                    delete ur[u], n = undefined, o.onreadystatechange = d.noop;
                                    if (r) o.readyState !== 4 && o.abort();
                                    else {
                                        f = {}, s = o.status, typeof o.responseText == "string" && (f.text = o.responseText);
                                        try {
                                            a = o.statusText
                                        } catch (l) {
                                            a = ""
                                        }!s && t.isLocal && !t.crossDomain ? s = f.text ? 200 : 404 : s === 1223 && (s = 204)
                                    }
                                }
                                f && i(s, a, f, o.getAllResponseHeaders())
                            }, t.async ? o.readyState === 4 ? e.setTimeout(n) : o.onreadystatechange = ur[u] = n : n()
                        },
                        abort: function() {
                            n && n(undefined, !0)
                        }
                    }
                }
            }), d.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function(e) {
                        return d.globalEval(e), e
                    }
                }
            }), d.ajaxPrefilter("script", function(e) {
                e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
            }), d.ajaxTransport("script", function(e) {
                if (e.crossDomain) {
                    var t, n = i.head || d("head")[0] || i.documentElement;
                    return {
                        send: function(r, s) {
                            t = i.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function(e, n) {
                                if (n || !t.readyState || /loaded|complete/.test(t.readyState)) t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || s(200, "success")
                            }, n.insertBefore(t, n.firstChild)
                        },
                        abort: function() {
                            t && t.onload(undefined, !0)
                        }
                    }
                }
            });
            var cr = [],
                hr = /(=)\?(?=&|$)|\?\?/;
            d.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var e = cr.pop() || d.expando + "_" + _n++;
                    return this[e] = !0, e
                }
            }), d.ajaxPrefilter("json jsonp", function(t, n, r) {
                var i, s, o, u = t.jsonp !== !1 && (hr.test(t.url) ? "url" : typeof t.data == "string" && (t.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && hr.test(t.data) && "data");
                if (u || t.dataTypes[0] === "jsonp") return i = t.jsonpCallback = d.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, u ? t[u] = t[u].replace(hr, "$1" + i) : t.jsonp !== !1 && (t.url += (Dn.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
                    return o || d.error(i + " was not called"), o[0]
                }, t.dataTypes[0] = "json", s = e[i], e[i] = function() {
                    o = arguments
                }, r.always(function() {
                    s === undefined ? d(e).removeProp(i) : e[i] = s, t[i] && (t.jsonpCallback = n.jsonpCallback, cr.push(i)), o && d.isFunction(s) && s(o[0]), o = s = undefined
                }), "script"
            }), d.parseHTML = function(e, t, n) {
                if (!e || typeof e != "string") return null;
                typeof t == "boolean" && (n = t, t = !1), t = t || i;
                var r = T.exec(e),
                    s = !n && [];
                return r ? [t.createElement(r[1])] : (r = lt([e], t, s), s && s.length && d(s).remove(), d.merge([], r.childNodes))
            };
            var pr = d.fn.load;
            d.fn.load = function(e, t, n) {
                if (typeof e != "string" && pr) return pr.apply(this, arguments);
                var r, i, s, o = this,
                    u = e.indexOf(" ");
                return u > -1 && (r = d.trim(e.slice(u, e.length)), e = e.slice(0, u)), d.isFunction(t) ? (n = t, t = undefined) : t && typeof t == "object" && (i = "POST"), o.length > 0 && d.ajax({
                    url: e,
                    type: i || "GET",
                    dataType: "html",
                    data: t
                }).done(function(e) {
                    s = arguments, o.html(r ? d("<div>").append(d.parseHTML(e)).find(r) : e)
                }).always(n && function(e, t) {
                    o.each(function() {
                        n.apply(this, s || [e.responseText, t, e])
                    })
                }), this
            }, d.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
                d.fn[t] = function(e) {
                    return this.on(t, e)
                }
            }), d.expr.filters.animated = function(e) {
                return d.grep(d.timers, function(t) {
                    return e === t.elem
                }).length
            }, d.offset = {
                setOffset: function(e, t, n) {
                    var r, i, s, o, u, a, f, l = d.css(e, "position"),
                        c = d(e),
                        h = {};
                    l === "static" && (e.style.position = "relative"), u = c.offset(), s = d.css(e, "top"), a = d.css(e, "left"), f = (l === "absolute" || l === "fixed") && d.inArray("auto", [s, a]) > -1, f ? (r = c.position(), o = r.top, i = r.left) : (o = parseFloat(s) || 0, i = parseFloat(a) || 0), d.isFunction(t) && (t = t.call(e, n, d.extend({}, u))), t.top != null && (h.top = t.top - u.top + o), t.left != null && (h.left = t.left - u.left + i), "using" in t ? t.using.call(e, h) : c.css(h)
                }
            }, d.fn.extend({
                offset: function(e) {
                    if (arguments.length) return e === undefined ? this : this.each(function(t) {
                        d.offset.setOffset(this, e, t)
                    });
                    var t, n, r = {
                            top: 0,
                            left: 0
                        },
                        i = this[0],
                        s = i && i.ownerDocument;
                    if (!s) return;
                    return t = s.documentElement, d.contains(t, i) ? (typeof i.getBoundingClientRect != "undefined" && (r = i.getBoundingClientRect()), n = dr(s), {
                        top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                        left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
                    }) : r
                },
                position: function() {
                    if (!this[0]) return;
                    var e, t, n = {
                            top: 0,
                            left: 0
                        },
                        r = this[0];
                    return d.css(r, "position") === "fixed" ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), d.nodeName(e[0], "html") || (n = e.offset()), n.top += d.css(e[0], "borderTopWidth", !0), n.left += d.css(e[0], "borderLeftWidth", !0)), {
                        top: t.top - n.top - d.css(r, "marginTop", !0),
                        left: t.left - n.left - d.css(r, "marginLeft", !0)
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        var e = this.offsetParent;
                        while (e && !d.nodeName(e, "html") && d.css(e, "position") === "static") e = e.offsetParent;
                        return e || zt
                    })
                }
            }), d.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(e, t) {
                var n = /Y/.test(t);
                d.fn[e] = function(r) {
                    return G(this, function(e, r, i) {
                        var s = dr(e);
                        if (i === undefined) return s ? t in s ? s[t] : s.document.documentElement[r] : e[r];
                        s ? s.scrollTo(n ? d(s).scrollLeft() : i, n ? i : d(s).scrollTop()) : e[r] = i
                    }, e, r, arguments.length, null)
                }
            }), d.each(["top", "left"], function(e, t) {
                d.cssHooks[t] = $t(h.pixelPosition, function(e, n) {
                    if (n) return n = Xt(e, t), Rt.test(n) ? d(e).position()[t] + "px" : n
                })
            }), d.each({
                Height: "height",
                Width: "width"
            }, function(e, t) {
                d.each({
                    padding: "inner" + e,
                    content: t,
                    "": "outer" + e
                }, function(n, r) {
                    d.fn[r] = function(r, i) {
                        var s = arguments.length && (n || typeof r != "boolean"),
                            o = n || (r === !0 || i === !0 ? "margin" : "border");
                        return G(this, function(t, n, r) {
                            var i;
                            return d.isWindow(t) ? t.document.documentElement["client" + e] : t.nodeType === 9 ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === undefined ? d.css(t, n, o) : d.style(t, n, r, o)
                        }, t, s ? r : undefined, s, null)
                    }
                })
            }), d.fn.extend({
                bind: function(e, t, n) {
                    return this.on(e, null, t, n)
                },
                unbind: function(e, t) {
                    return this.off(e, null, t)
                },
                delegate: function(e, t, n, r) {
                    return this.on(t, e, n, r)
                },
                undelegate: function(e, t, n) {
                    return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
                }
            }), d.fn.size = function() {
                return this.length
            }, d.fn.andSelf = d.fn.addBack, typeof n == "function" && n.amd && n("jquery", [], function() {
                return d
            });
            var vr = e.jQuery,
                mr = e.$;
            return d.noConflict = function(t) {
                return e.$ === d && (e.$ = mr), t && e.jQuery === d && (e.jQuery = vr), d
            }, t || (e.jQuery = e.$ = d), d
        }),
        function(e) {
            typeof n == "function" && n.amd ? n("jquery.cookie", ["jquery"], e) : e(jQuery)
        }(function(e) {
            function n(e) {
                return e
            }

            function r(e) {
                return decodeURIComponent(e.replace(t, " "))
            }

            function i(e) {
                e.indexOf('"') === 0 && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
                try {
                    return s.json ? JSON.parse(e) : e
                } catch (t) {}
            }
            var t = /\+/g,
                s = e.cookie = function(t, o, u) {
                    if (o !== undefined) {
                        u = e.extend({}, s.defaults, u);
                        if (typeof u.expires == "number") {
                            var a = u.expires,
                                f = u.expires = new Date;
                            f.setDate(f.getDate() + a)
                        }
                        return o = s.json ? JSON.stringify(o) : String(o), document.cookie = [s.raw ? t : encodeURIComponent(t), "=", s.raw ? o : encodeURIComponent(o), u.expires ? "; expires=" + u.expires.toUTCString() : "", u.path ? "; path=" + u.path : "", u.domain ? "; domain=" + u.domain : "", u.secure ? "; secure" : ""].join("")
                    }
                    var l = s.raw ? n : r,
                        c = document.cookie.split("; "),
                        h = t ? undefined : {};
                    for (var p = 0, d = c.length; p < d; p++) {
                        var v = c[p].split("="),
                            m = l(v.shift()),
                            g = l(v.join("="));
                        if (t && t === m) {
                            h = i(g);
                            break
                        }
                        t || (h[m] = i(g))
                    }
                    return h
                };
            s.defaults = {}, e.removeCookie = function(t, n) {
                return e.cookie(t) !== undefined ? (e.cookie(t, "", e.extend(n, {
                    expires: -1
                })), !0) : !1
            }
        }), ! function(e) {
            var t = function(t, n) {
                this.options = e.extend({}, e.fn.affix.defaults, n), this.$window = e(window).on("scroll.affix.data-api", e.proxy(this.checkPosition, this)).on("click.affix.data-api", e.proxy(function() {
                    setTimeout(e.proxy(this.checkPosition, this), 1)
                }, this)), this.$element = e(t), this.checkPosition()
            };
            t.prototype.checkPosition = function() {
                if (!this.$element.is(":visible")) return;
                var t = e(document).height(),
                    n = this.$window.scrollTop(),
                    r = this.$element.offset(),
                    i = this.options.offset,
                    s = i.bottom,
                    o = i.top,
                    u = "affix affix-top affix-bottom",
                    a;
                typeof i != "object" && (s = o = i), typeof o == "function" && (o = i.top()), typeof s == "function" && (s = i.bottom()), a = this.unpin != null && n + this.unpin <= r.top ? !1 : s != null && r.top + this.$element.height() >= t - s ? "bottom" : o != null && n <= o ? "top" : !1;
                if (this.affixed === a) return;
                this.affixed = a, this.unpin = a == "bottom" ? r.top - n : null, this.$element.removeClass(u).addClass("affix" + (a ? "-" + a : ""))
            };
            var n = e.fn.affix;
            e.fn.affix = function(n) {
                return this.each(function() {
                    var r = e(this),
                        i = r.data("affix"),
                        s = typeof n == "object" && n;
                    i || r.data("affix", i = new t(this, s)), typeof n == "string" && i[n]()
                })
            }, e.fn.affix.Constructor = t, e.fn.affix.defaults = {
                offset: 0
            }, e.fn.affix.noConflict = function() {
                return e.fn.affix = n, this
            }, e(window).on("load", function() {
                e('[data-spy="affix"]').each(function() {
                    var t = e(this),
                        n = t.data();
                    n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n)
                })
            })
        }(window.jQuery), n("twitter-bootstrap/bootstrap-affix", function() {}), ! function(e) {
            var t = '[data-dismiss="alert"]',
                n = function(n) {
                    e(n).on("click", t, this.close)
                };
            n.prototype.close = function(t) {
                function s() {
                    i.trigger("closed").remove()
                }
                var n = e(this),
                    r = n.attr("data-target"),
                    i;
                r || (r = n.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, "")), i = e(r), t && t.preventDefault(), i.length || (i = n.hasClass("alert") ? n : n.parent()), i.trigger(t = e.Event("close"));
                if (t.isDefaultPrevented()) return;
                i.removeClass("in"), e.support.transition && i.hasClass("fade") ? i.on(e.support.transition.end, s) : s()
            };
            var r = e.fn.alert;
            e.fn.alert = function(t) {
                return this.each(function() {
                    var r = e(this),
                        i = r.data("alert");
                    i || r.data("alert", i = new n(this)), typeof t == "string" && i[t].call(r)
                })
            }, e.fn.alert.Constructor = n, e.fn.alert.noConflict = function() {
                return e.fn.alert = r, this
            }, e(document).on("click.alert.data-api", t, n.prototype.close)
        }(window.jQuery), n("twitter-bootstrap/bootstrap-alert", function() {}), ! function(e) {
            var t = function(t, n) {
                this.$element = e(t), this.options = e.extend({}, e.fn.button.defaults, n)
            };
            t.prototype.setState = function(e) {
                var t = "disabled",
                    n = this.$element,
                    r = n.data(),
                    i = n.is("input") ? "val" : "html";
                e += "Text", r.resetText || n.data("resetText", n[i]()), n[i](r[e] || this.options[e]), setTimeout(function() {
                    e == "loadingText" ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
                }, 0)
            }, t.prototype.toggle = function() {
                var e = this.$element.closest('[data-toggle="buttons-radio"]');
                e && e.find(".active").removeClass("active"), this.$element.toggleClass("active")
            };
            var n = e.fn.button;
            e.fn.button = function(n) {
                return this.each(function() {
                    var r = e(this),
                        i = r.data("button"),
                        s = typeof n == "object" && n;
                    i || r.data("button", i = new t(this, s)), n == "toggle" ? i.toggle() : n && i.setState(n)
                })
            }, e.fn.button.defaults = {
                loadingText: "loading..."
            }, e.fn.button.Constructor = t, e.fn.button.noConflict = function() {
                return e.fn.button = n, this
            }, e(document).on("click.button.data-api", "[data-toggle^=button]", function(t) {
                var n = e(t.target);
                n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
            })
        }(window.jQuery), n("twitter-bootstrap/bootstrap-button", function() {}), ! function(e) {
            var t = function(t, n) {
                this.$element = e(t), this.options = e.extend({}, e.fn.collapse.defaults, n), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
            };
            t.prototype = {
                constructor: t,
                dimension: function() {
                    var e = this.$element.hasClass("width");
                    return e ? "width" : "height"
                },
                show: function() {
                    var t, n, r, i;
                    if (this.transitioning || this.$element.hasClass("in")) return;
                    t = this.dimension(), n = e.camelCase(["scroll", t].join("-")), r = this.$parent && this.$parent.find("> .accordion-group > .in");
                    if (r && r.length) {
                        i = r.data("collapse");
                        if (i && i.transitioning) return;
                        r.collapse("hide"), i || r.data("collapse", null)
                    }
                    this.$element[t](0), this.transition("addClass", e.Event("show"), "shown"), e.support.transition && this.$element[t](this.$element[0][n])
                },
                hide: function() {
                    var t;
                    if (this.transitioning || !this.$element.hasClass("in")) return;
                    t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", e.Event("hide"), "hidden"), this.$element[t](0)
                },
                reset: function(e) {
                    var t = this.dimension();
                    return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth, this.$element[e !== null ? "addClass" : "removeClass"]("collapse"), this
                },
                transition: function(t, n, r) {
                    var i = this,
                        s = function() {
                            n.type == "show" && i.reset(), i.transitioning = 0, i.$element.trigger(r)
                        };
                    this.$element.trigger(n);
                    if (n.isDefaultPrevented()) return;
                    this.transitioning = 1, this.$element[t]("in"), e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, s) : s()
                },
                toggle: function() {
                    this[this.$element.hasClass("in") ? "hide" : "show"]()
                }
            };
            var n = e.fn.collapse;
            e.fn.collapse = function(n) {
                return this.each(function() {
                    var r = e(this),
                        i = r.data("collapse"),
                        s = e.extend({}, e.fn.collapse.defaults, r.data(), typeof n == "object" && n);
                    i || r.data("collapse", i = new t(this, s)), typeof n == "string" && i[n]()
                })
            }, e.fn.collapse.defaults = {
                toggle: !0
            }, e.fn.collapse.Constructor = t, e.fn.collapse.noConflict = function() {
                return e.fn.collapse = n, this
            }, e(document).on("click.collapse.data-api", "[data-toggle=collapse]", function(t) {
                var n = e(this),
                    r, i = n.attr("data-target") || t.preventDefault() || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""),
                    s = e(i).data("collapse") ? "toggle" : n.data();
                n[e(i).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), e(i).collapse(s)
            })
        }(window.jQuery), n("twitter-bootstrap/bootstrap-collapse", function() {}), ! function(e) {
            var t = function(t, n) {
                this.options = n, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
            };
            t.prototype = {
                constructor: t,
                toggle: function() {
                    return this[this.isShown ? "hide" : "show"]()
                },
                show: function() {
                    var t = this,
                        n = e.Event("show");
                    this.$element.trigger(n);
                    if (this.isShown || n.isDefaultPrevented()) return;
                    this.isShown = !0, this.escape(), this.backdrop(function() {
                        var n = e.support.transition && t.$element.hasClass("fade");
                        t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), n && t.$element[0].offsetWidth, t.$element.addClass("in").attr("aria-hidden", !1), t.enforceFocus(), n ? t.$element.one(e.support.transition.end, function() {
                            t.$element.focus().trigger("shown")
                        }) : t.$element.focus().trigger("shown")
                    })
                },
                hide: function(t) {
                    t && t.preventDefault();
                    var n = this;
                    t = e.Event("hide"), this.$element.trigger(t);
                    if (!this.isShown || t.isDefaultPrevented()) return;
                    this.isShown = !1, this.escape(), e(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal()
                },
                enforceFocus: function() {
                    var t = this;
                    e(document).on("focusin.modal", function(e) {
                        t.$element[0] !== e.target && !t.$element.has(e.target).length && t.$element.focus()
                    })
                },
                escape: function() {
                    var e = this;
                    this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function(t) {
                        t.which == 27 && e.hide()
                    }) : this.isShown || this.$element.off("keyup.dismiss.modal")
                },
                hideWithTransition: function() {
                    var t = this,
                        n = setTimeout(function() {
                            t.$element.off(e.support.transition.end), t.hideModal()
                        }, 500);
                    this.$element.one(e.support.transition.end, function() {
                        clearTimeout(n), t.hideModal()
                    })
                },
                hideModal: function() {
                    var e = this;
                    this.$element.hide(), this.backdrop(function() {
                        e.removeBackdrop(), e.$element.trigger("hidden")
                    })
                },
                removeBackdrop: function() {
                    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
                },
                backdrop: function(t) {
                    var n = this,
                        r = this.$element.hasClass("fade") ? "fade" : "";
                    if (this.isShown && this.options.backdrop) {
                        var i = e.support.transition && r;
                        this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').appendTo(document.body), this.$backdrop.click(this.options.backdrop == "static" ? e.proxy(this.$element[0].focus, this.$element[0]) : e.proxy(this.hide, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in");
                        if (!t) return;
                        i ? this.$backdrop.one(e.support.transition.end, t) : t()
                    } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t) : t()) : t && t()
                }
            };
            var n = e.fn.modal;
            e.fn.modal = function(n) {
                return this.each(function() {
                    var r = e(this),
                        i = r.data("modal"),
                        s = e.extend({}, e.fn.modal.defaults, r.data(), typeof n == "object" && n);
                    i || r.data("modal", i = new t(this, s)), typeof n == "string" ? i[n]() : s.show && i.show()
                })
            }, e.fn.modal.defaults = {
                backdrop: !0,
                keyboard: !0,
                show: !0
            }, e.fn.modal.Constructor = t, e.fn.modal.noConflict = function() {
                return e.fn.modal = n, this
            }, e(document).on("click.modal.data-api", '[data-toggle="modal"]', function(t) {
                var n = e(this),
                    r = n.attr("href"),
                    i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
                    s = i.data("modal") ? "toggle" : e.extend({
                        remote: !/#/.test(r) && r
                    }, i.data(), n.data());
                t.preventDefault(), i.modal(s).one("hide", function() {
                    n.focus()
                })
            })
        }(window.jQuery), n("twitter-bootstrap/bootstrap-modal", function() {}), ! function(e) {
            function t(t, n) {
                var r = e.proxy(this.process, this),
                    i = e(t).is("body") ? e(window) : e(t),
                    s;
                this.options = e.extend({}, e.fn.scrollspy.defaults, n), this.$scrollElement = i.on("scroll.scroll-spy.data-api", r), this.selector = (this.options.target || (s = e(t).attr("href")) && s.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = e("body"), this.refresh(), this.process()
            }
            t.prototype = {
                constructor: t,
                refresh: function() {
                    var t = this,
                        n;
                    this.offsets = e([]), this.targets = e([]), n = this.$body.find(this.selector).map(function() {
                        var n = e(this),
                            r = n.data("target") || n.attr("href"),
                            i = /^#\w/.test(r) && e(r);
                        return i && i.length && [
                            [i.position().top + (!e.isWindow(t.$scrollElement.get(0)) && t.$scrollElement.scrollTop()), r]
                        ] || null
                    }).sort(function(e, t) {
                        return e[0] - t[0]
                    }).each(function() {
                        t.offsets.push(this[0]), t.targets.push(this[1])
                    })
                },
                process: function() {
                    var e = this.$scrollElement.scrollTop() + this.options.offset,
                        t = (this.options.wrap || this.$scrollElement[0] || this.$body[0]).scrollHeight,
                        n = t - this.$scrollElement.height(),
                        r = this.offsets,
                        i = this.targets,
                        s = this.activeTarget,
                        o;
                    if (e >= n) return s != (o = i.last()[0]) && this.activate(o);
                    for (o = r.length; o--;) s != i[o] && e >= r[o] && (!r[o + 1] || e <= r[o + 1]) && this.activate(i[o])
                },
                activate: function(t) {
                    var n, r;
                    this.activeTarget = t, e(this.selector).parent(".active").removeClass("active"), r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', n = e(r).parent("li").addClass("active"), n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate")
                }
            };
            var n = e.fn.scrollspy;
            e.fn.scrollspy = function(n) {
                return this.each(function() {
                    var r = e(this),
                        i = r.data("scrollspy"),
                        s = typeof n == "object" && n;
                    i || r.data("scrollspy", i = new t(this, s)), typeof n == "string" && i[n]()
                })
            }, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.defaults = {
                offset: 10
            }, e.fn.scrollspy.noConflict = function() {
                return e.fn.scrollspy = n, this
            }, e(window).on("load", function() {
                e('[data-spy="scroll"]').each(function() {
                    var t = e(this);
                    t.scrollspy(t.data())
                })
            })
        }(window.jQuery), n("twitter-bootstrap/bootstrap-scrollspy", function() {}), ! function(e) {
            var t = function(t, n) {
                this.element = e(t), this.picker = e('<div class="slider"><div class="slider-track"><div class="slider-selection"></div><div class="slider-handle"></div><div class="slider-handle"></div></div><div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div></div>').insertBefore(this.element).append(this.element), this.id = this.element.data("slider-id") || n.id, this.id && (this.picker[0].id = this.id);
                var r = this.element.data("slider-tooltip") || n.tooltip;
                this.tooltip = this.picker.find(".tooltip"), this.tooltipInner = this.tooltip.find("div.tooltip-inner"), this.orientation = this.element.data("slider-orientation") || n.orientation;
                switch (this.orientation) {
                    case "vertical":
                        this.picker.addClass("slider-vertical"), this.stylePos = "top", this.mousePos = "pageY", this.sizePos = "offsetHeight", this.tooltip.addClass("right")[0].style.left = "100%";
                        break;
                    default:
                        this.picker.addClass("slider-horizontal").css("width", this.element.outerWidth()), this.orientation = "horizontal", this.stylePos = "left", this.mousePos = "pageX", this.sizePos = "offsetWidth", this.tooltip.addClass("top")[0].style.top = -this.tooltip.outerHeight() - 14 + "px"
                }
                this.min = this.element.data("slider-min") || n.min, this.max = this.element.data("slider-max") || n.max, this.step = this.element.data("slider-step") || n.step, this.value = this.element.data("slider-value") || n.value, this.value[1] && (this.range = !0), this.selection = this.element.data("slider-selection") || n.selection, this.selectionEl = this.picker.find(".slider-selection"), this.selection === "none" && this.selectionEl.addClass("hide"), this.selectionElStyle = this.selectionEl[0].style, this.handle1 = this.picker.find(".slider-handle:first"), this.handle1Stype = this.handle1[0].style, this.handle2 = this.picker.find(".slider-handle:last"), this.handle2Stype = this.handle2[0].style;
                var i = this.element.data("slider-handle") || n.handle;
                switch (i) {
                    case "round":
                        this.handle1.addClass("round"), this.handle2.addClass("round");
                        break;
                    case "triangle":
                        this.handle1.addClass("triangle"), this.handle2.addClass("triangle")
                }
                this.range ? (this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0])), this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]))) : (this.value = [Math.max(this.min, Math.min(this.max, this.value))], this.handle2.addClass("hide"), this.selection == "after" ? this.value[1] = this.max : this.value[1] = this.min), this.diff = this.max - this.min, this.percentage = [(this.value[0] - this.min) * 100 / this.diff, (this.value[1] - this.min) * 100 / this.diff, this.step * 100 / this.diff], this.offset = this.picker.offset(), this.size = this.picker[0][this.sizePos], this.layout(), this.picker.on({
                    mousedown: e.proxy(this.mousedown, this)
                }), r === "show" ? this.picker.on({
                    mouseenter: e.proxy(this.showTooltip, this),
                    mouseleave: e.proxy(this.hideTooltip, this)
                }) : this.tooltip.addClass("hide")
            };
            t.prototype = {
                constructor: t,
                over: !1,
                inDrag: !1,
                showTooltip: function() {
                    this.tooltip.addClass("in"), this.over = !0
                },
                hideTooltip: function() {
                    this.inDrag === !1 && this.tooltip.removeClass("in"), this.over = !1
                },
                layout: function() {
                    this.handle1Stype[this.stylePos] = this.percentage[0] + "%", this.handle2Stype[this.stylePos] = this.percentage[1] + "%", this.orientation == "vertical" ? (this.selectionElStyle.top = Math.min(this.percentage[0], this.percentage[1]) + "%", this.selectionElStyle.height = Math.abs(this.percentage[0] - this.percentage[1]) + "%") : (this.selectionElStyle.left = Math.min(this.percentage[0], this.percentage[1]) + "%", this.selectionElStyle.width = Math.abs(this.percentage[0] - this.percentage[1]) + "%"), this.range ? (this.tooltipInner.text(this.min + Math.round(this.diff * this.percentage[0] / 100 / this.step) * this.step + " : " + (this.min + Math.round(this.diff * this.percentage[1] / 100 / this.step) * this.step)), this.tooltip[0].style[this.stylePos] = this.size * (this.percentage[0] + (this.percentage[1] - this.percentage[0]) / 2) / 100 - (this.orientation === "vertical" ? this.tooltip.outerHeight() / 2 : this.tooltip.outerWidth() / 2) + "px") : (this.tooltipInner.text(this.min + Math.round(this.diff * this.percentage[0] / 100 / this.step) * this.step), this.tooltip[0].style[this.stylePos] = this.size * this.percentage[0] / 100 - (this.orientation === "vertical" ? this.tooltip.outerHeight() / 2 : this.tooltip.outerWidth() / 2) + "px")
                },
                mousedown: function(t) {
                    this.offset = this.picker.offset(), this.size = this.picker[0][this.sizePos];
                    var n = this.getPercentage(t);
                    if (this.range) {
                        var r = Math.abs(this.percentage[0] - n),
                            i = Math.abs(this.percentage[1] - n);
                        this.dragged = r < i ? 0 : 1
                    } else this.dragged = 0;
                    this.percentage[this.dragged] = n, this.layout(), e(document).on({
                        mousemove: e.proxy(this.mousemove, this),
                        mouseup: e.proxy(this.mouseup, this)
                    }), this.inDrag = !0;
                    var s = this.calculateValue();
                    return this.element.trigger({
                        type: "slideStart",
                        value: s
                    }).trigger({
                        type: "slide",
                        value: s
                    }), !1
                },
                mousemove: function(e) {
                    var t = this.getPercentage(e);
                    this.range && (this.dragged === 0 && this.percentage[1] < t ? (this.percentage[0] = this.percentage[1], this.dragged = 1) : this.dragged === 1 && this.percentage[0] > t && (this.percentage[1] = this.percentage[0], this.dragged = 0)), this.percentage[this.dragged] = t, this.layout();
                    var n = this.calculateValue();
                    return this.element.trigger({
                        type: "slide",
                        value: n
                    }).data("value", n).prop("value", n), !1
                },
                mouseup: function(t) {
                    e(document).off({
                        mousemove: this.mousemove,
                        mouseup: this.mouseup
                    }), this.inDrag = !1, this.over == 0 && this.hideTooltip(), this.element;
                    var n = this.calculateValue();
                    return this.element.trigger({
                        type: "slideStop",
                        value: n
                    }).data("value", n).prop("value", n), !1
                },
                calculateValue: function() {
                    var e;
                    return this.range ? (e = [this.min + Math.round(this.diff * this.percentage[0] / 100 / this.step) * this.step, this.min + Math.round(this.diff * this.percentage[1] / 100 / this.step) * this.step], this.value = e) : (e = this.min + Math.round(this.diff * this.percentage[0] / 100 / this.step) * this.step, this.value = [e, this.value[1]]), e
                },
                getPercentage: function(e) {
                    var t = (e[this.mousePos] - this.offset[this.stylePos]) * 100 / this.size;
                    return t = Math.round(t / this.percentage[2]) * this.percentage[2], Math.max(0, Math.min(100, t))
                },
                getValue: function() {
                    return this.range ? this.value : this.value[0]
                },
                setValue: function(e) {
                    this.value = e, this.range ? (this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0])), this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]))) : (this.value = [Math.max(this.min, Math.min(this.max, this.value))], this.handle2.addClass("hide"), this.selection == "after" ? this.value[1] = this.max : this.value[1] = this.min), this.diff = this.max - this.min, this.percentage = [(this.value[0] - this.min) * 100 / this.diff, (this.value[1] - this.min) * 100 / this.diff, this.step * 100 / this.diff]
                }
            }, e.fn.slider = function(n) {
                return this.each(function() {
                    var r = e(this),
                        i = r.data("slider"),
                        s = typeof n == "object" && n;
                    i || r.data("slider", i = new t(this, e.extend({}, e.fn.slider.defaults, s))), typeof n == "string" && i[n]()
                })
            }, e.fn.slider.defaults = {
                min: 0,
                max: 10,
                step: 1,
                orientation: "horizontal",
                value: 5,
                selection: "before",
                tooltip: "show",
                handle: "round"
            }, e.fn.slider.Constructor = t
        }(window.jQuery), n("twitter-bootstrap/bootstrap-slider", function() {}), ! function(e) {
            var t = function(t) {
                this.element = e(t)
            };
            t.prototype = {
                constructor: t,
                show: function() {
                    var t = this.element,
                        n = t.closest("ul:not(.dropdown-menu)"),
                        r = t.attr("data-target"),
                        i, s, o;
                    r || (r = t.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
                    if (t.parent("li").hasClass("active")) return;
                    i = n.find(".active:last a")[0], o = e.Event("show", {
                        relatedTarget: i
                    }), t.trigger(o);
                    if (o.isDefaultPrevented()) return;
                    s = e(r), this.activate(t.parent("li"), n), this.activate(s, s.parent(), function() {
                        t.trigger({
                            type: "shown",
                            relatedTarget: i
                        })
                    })
                },
                activate: function(t, n, r) {
                    function o() {
                        i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
                    }
                    var i = n.find("> .active"),
                        s = r && e.support.transition && i.hasClass("fade");
                    s ? i.one(e.support.transition.end, o) : o(), i.removeClass("in")
                }
            };
            var n = e.fn.tab;
            e.fn.tab = function(n) {
                return this.each(function() {
                    var r = e(this),
                        i = r.data("tab");
                    i || r.data("tab", i = new t(this)), typeof n == "string" && i[n]()
                })
            }, e.fn.tab.Constructor = t, e.fn.tab.noConflict = function() {
                return e.fn.tab = n, this
            }, e(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(t) {
                t.preventDefault(), e(this).tab("show")
            })
        }(window.jQuery), n("twitter-bootstrap/bootstrap-tab", function() {}), ! function(e) {
            e(function() {
                e.support.transition = function() {
                    var e = function() {
                        var e = document.createElement("bootstrap"),
                            t = {
                                WebkitTransition: "webkitTransitionEnd",
                                MozTransition: "transitionend",
                                OTransition: "oTransitionEnd otransitionend",
                                transition: "transitionend"
                            },
                            n;
                        for (n in t)
                            if (e.style[n] !== undefined) return t[n]
                    }();
                    return e && {
                        end: e
                    }
                }()
            })
        }(window.jQuery), n("twitter-bootstrap/bootstrap-transition", function() {}), ! function(e) {
            var t = function(e, t) {
                this.init("tooltip", e, t)
            };
            t.prototype = {
                constructor: t,
                init: function(t, n, r) {
                    var i, s, o, u, a;
                    this.type = t, this.$element = e(n), this.options = this.getOptions(r), this.enabled = !0, o = this.options.trigger.split(" ");
                    for (a = o.length; a--;) u = o[a], u == "click" ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : u != "manual" && (i = u == "hover" ? "mouseenter" : "focus", s = u == "hover" ? "mouseleave" : "blur", this.$element.on(i + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.leave, this)));
                    this.options.selector ? this._options = e.extend({}, this.options, {
                        trigger: "manual",
                        selector: ""
                    }) : this.fixTitle()
                },
                getOptions: function(t) {
                    return t = e.extend({}, e.fn[this.type].defaults, this.$element.data(), t), t.delay && typeof t.delay == "number" && (t.delay = {
                        show: t.delay,
                        hide: t.delay
                    }), t
                },
                enter: function(t) {
                    var n = e.fn[this.type].defaults,
                        r = {},
                        i;
                    this._options && e.each(this._options, function(e, t) {
                        n[e] != t && (r[e] = t)
                    }, this), i = e(t.currentTarget)[this.type](r).data(this.type);
                    if (!i.options.delay || !i.options.delay.show) return i.show();
                    clearTimeout(this.timeout), i.hoverState = "in", this.timeout = setTimeout(function() {
                        i.hoverState == "in" && i.show()
                    }, i.options.delay.show)
                },
                leave: function(t) {
                    var n = e(t.currentTarget)[this.type](this._options).data(this.type);
                    this.timeout && clearTimeout(this.timeout);
                    if (!n.options.delay || !n.options.delay.hide) return n.hide();
                    n.hoverState = "out", this.timeout = setTimeout(function() {
                        n.hoverState == "out" && n.hide()
                    }, n.options.delay.hide)
                },
                show: function() {
                    var t, n, r, i, s, o, u = e.Event("show");
                    if (this.hasContent() && this.enabled) {
                        this.$element.trigger(u);
                        if (u.isDefaultPrevented()) return;
                        t = this.tip(), this.setContent(), this.options.animation && t.addClass("fade"), s = typeof this.options.placement == "function" ? this.options.placement.call(this, t[0], this.$element[0]) : this.options.placement, t.detach().css({
                            top: 0,
                            left: 0,
                            display: "block"
                        }), this.options.container ? t.appendTo(this.options.container) : t.insertAfter(this.$element), n = this.getPosition(), r = t[0].offsetWidth, i = t[0].offsetHeight;
                        switch (s) {
                            case "bottom":
                                o = {
                                    top: n.top + n.height,
                                    left: n.left + n.width / 2 - r / 2
                                };
                                break;
                            case "top":
                                o = {
                                    top: n.top - i,
                                    left: n.left + n.width / 2 - r / 2
                                };
                                break;
                            case "left":
                                o = {
                                    top: n.top + n.height / 2 - i / 2,
                                    left: n.left - r
                                };
                                break;
                            case "right":
                                o = {
                                    top: n.top + n.height / 2 - i / 2,
                                    left: n.left + n.width
                                }
                        }
                        this.applyPlacement(o, s), this.$element.trigger("shown")
                    }
                },
                applyPlacement: function(e, t) {
                    var n = this.tip(),
                        r = n[0].offsetWidth,
                        i = n[0].offsetHeight,
                        s, o, u, a;
                    n.offset(e).addClass(t).addClass("in"), s = n[0].offsetWidth, o = n[0].offsetHeight, t == "top" && o != i && (e.top = e.top + i - o, a = !0), t == "bottom" || t == "top" ? (u = 0, e.left < 0 && (u = e.left * -2, e.left = 0, n.offset(e), s = n[0].offsetWidth, o = n[0].offsetHeight), this.replaceArrow(u - r + s, s, "left")) : this.replaceArrow(o - i, o, "top"), a && n.offset(e)
                },
                replaceArrow: function(e, t, n) {
                    this.arrow().css(n, e ? 50 * (1 - e / t) + "%" : "")
                },
                setContent: function() {
                    var e = this.tip(),
                        t = this.getTitle();
                    e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
                },
                hide: function() {
                    function i() {
                        var t = setTimeout(function() {
                            n.off(e.support.transition.end).detach()
                        }, 500);
                        n.one(e.support.transition.end, function() {
                            clearTimeout(t), n.detach()
                        })
                    }
                    var t = this,
                        n = this.tip(),
                        r = e.Event("hide");
                    this.$element.trigger(r);
                    if (r.isDefaultPrevented()) return;
                    return n.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? i() : n.detach(), this.$element.trigger("hidden"), this
                },
                fixTitle: function() {
                    var e = this.$element;
                    (e.attr("title") || typeof e.attr("data-original-title") != "string") && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
                },
                hasContent: function() {
                    return this.getTitle()
                },
                getPosition: function() {
                    var t = this.$element[0];
                    return e.extend({}, typeof t.getBoundingClientRect == "function" ? t.getBoundingClientRect() : {
                        width: t.offsetWidth,
                        height: t.offsetHeight
                    }, this.$element.offset())
                },
                getTitle: function() {
                    var e, t = this.$element,
                        n = this.options;
                    return e = t.attr("data-original-title") || (typeof n.title == "function" ? n.title.call(t[0]) : n.title), e
                },
                tip: function() {
                    return this.$tip = this.$tip || e(this.options.template)
                },
                arrow: function() {
                    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
                },
                validate: function() {
                    this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
                },
                enable: function() {
                    this.enabled = !0
                },
                disable: function() {
                    this.enabled = !1
                },
                toggleEnabled: function() {
                    this.enabled = !this.enabled
                },
                toggle: function(t) {
                    var n = t ? e(t.currentTarget)[this.type](this._options).data(this.type) : this;
                    n.tip().hasClass("in") ? n.hide() : n.show()
                },
                destroy: function() {
                    this.hide().$element.off("." + this.type).removeData(this.type)
                }
            };
            var n = e.fn.tooltip;
            e.fn.tooltip = function(n) {
                return this.each(function() {
                    var r = e(this),
                        i = r.data("tooltip"),
                        s = typeof n == "object" && n;
                    i || r.data("tooltip", i = new t(this, s)), typeof n == "string" && i[n]()
                })
            }, e.fn.tooltip.Constructor = t, e.fn.tooltip.defaults = {
                animation: !0,
                placement: "top",
                selector: !1,
                template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                trigger: "hover focus",
                title: "",
                delay: 0,
                html: !1,
                container: !1
            }, e.fn.tooltip.noConflict = function() {
                return e.fn.tooltip = n, this
            }
        }(window.jQuery), n("twitter-bootstrap/bootstrap-tooltip", function() {}), ! function(e) {
            var t = function(e, t) {
                this.init("popover", e, t)
            };
            t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype, {
                constructor: t,
                setContent: function() {
                    var e = this.tip(),
                        t = this.getTitle(),
                        n = this.getContent();
                    e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content")[this.options.html ? "html" : "text"](n), e.removeClass("fade top bottom left right in")
                },
                hasContent: function() {
                    return this.getTitle() || this.getContent()
                },
                getContent: function() {
                    var e, t = this.$element,
                        n = this.options;
                    return e = (typeof n.content == "function" ? n.content.call(t[0]) : n.content) || t.attr("data-content"), e
                },
                tip: function() {
                    return this.$tip || (this.$tip = e(this.options.template)), this.$tip
                },
                destroy: function() {
                    this.hide().$element.off("." + this.type).removeData(this.type)
                }
            });
            var n = e.fn.popover;
            e.fn.popover = function(n) {
                return this.each(function() {
                    var r = e(this),
                        i = r.data("popover"),
                        s = typeof n == "object" && n;
                    i || r.data("popover", i = new t(this, s)), typeof n == "string" && i[n]()
                })
            }, e.fn.popover.Constructor = t, e.fn.popover.defaults = e.extend({}, e.fn.tooltip.defaults, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
            }), e.fn.popover.noConflict = function() {
                return e.fn.popover = n, this
            }
        }(window.jQuery), n("twitter-bootstrap/bootstrap-popover", function() {});
    var r = r || function(e, t) {
        var n = {},
            r = n.lib = {},
            i = r.Base = function() {
                function e() {}
                return {
                    extend: function(t) {
                        e.prototype = this;
                        var n = new e;
                        return t && n.mixIn(t), n.hasOwnProperty("init") || (n.init = function() {
                            n.$super.init.apply(this, arguments)
                        }), n.init.prototype = n, n.$super = this, n
                    },
                    create: function() {
                        var e = this.extend();
                        return e.init.apply(e, arguments), e
                    },
                    init: function() {},
                    mixIn: function(e) {
                        for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                        e.hasOwnProperty("toString") && (this.toString = e.toString)
                    },
                    clone: function() {
                        return this.init.prototype.extend(this)
                    }
                }
            }(),
            s = r.WordArray = i.extend({
                init: function(e, n) {
                    e = this.words = e || [], n != t ? this.sigBytes = n : this.sigBytes = e.length * 4
                },
                toString: function(e) {
                    return (e || u).stringify(this)
                },
                concat: function(e) {
                    var t = this.words,
                        n = e.words,
                        r = this.sigBytes,
                        i = e.sigBytes;
                    this.clamp();
                    if (r % 4)
                        for (var s = 0; s < i; s++) {
                            var o = n[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                            t[r + s >>> 2] |= o << 24 - (r + s) % 4 * 8
                        } else if (n.length > 65535)
                            for (var s = 0; s < i; s += 4) t[r + s >>> 2] = n[s >>> 2];
                        else t.push.apply(t, n);
                    return this.sigBytes += i, this
                },
                clamp: function() {
                    var t = this.words,
                        n = this.sigBytes;
                    t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4)
                },
                clone: function() {
                    var e = i.clone.call(this);
                    return e.words = this.words.slice(0), e
                },
                random: function(t) {
                    var n = [];
                    for (var r = 0; r < t; r += 4) n.push(e.random() * 4294967296 | 0);
                    return new s.init(n, t)
                }
            }),
            o = n.enc = {},
            u = o.Hex = {
                stringify: function(e) {
                    var t = e.words,
                        n = e.sigBytes,
                        r = [];
                    for (var i = 0; i < n; i++) {
                        var s = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                        r.push((s >>> 4).toString(16)), r.push((s & 15).toString(16))
                    }
                    return r.join("")
                },
                parse: function(e) {
                    var t = e.length,
                        n = [];
                    for (var r = 0; r < t; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
                    return new s.init(n, t / 2)
                }
            },
            a = o.Latin1 = {
                stringify: function(e) {
                    var t = e.words,
                        n = e.sigBytes,
                        r = [];
                    for (var i = 0; i < n; i++) {
                        var s = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                        r.push(String.fromCharCode(s))
                    }
                    return r.join("")
                },
                parse: function(e) {
                    var t = e.length,
                        n = [];
                    for (var r = 0; r < t; r++) n[r >>> 2] |= (e.charCodeAt(r) & 255) << 24 - r % 4 * 8;
                    return new s.init(n, t)
                }
            },
            f = o.Utf8 = {
                stringify: function(e) {
                    try {
                        return decodeURIComponent(escape(a.stringify(e)))
                    } catch (t) {
                        throw new Error("Malformed UTF-8 data")
                    }
                },
                parse: function(e) {
                    return a.parse(unescape(encodeURIComponent(e)))
                }
            },
            l = r.BufferedBlockAlgorithm = i.extend({
                reset: function() {
                    this._data = new s.init, this._nDataBytes = 0
                },
                _append: function(e) {
                    typeof e == "string" && (e = f.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
                },
                _process: function(t) {
                    var n = this._data,
                        r = n.words,
                        i = n.sigBytes,
                        o = this.blockSize,
                        u = o * 4,
                        a = i / u;
                    t ? a = e.ceil(a) : a = e.max((a | 0) - this._minBufferSize, 0);
                    var f = a * o,
                        l = e.min(f * 4, i);
                    if (f) {
                        for (var c = 0; c < f; c += o) this._doProcessBlock(r, c);
                        var h = r.splice(0, f);
                        n.sigBytes -= l
                    }
                    return new s.init(h, l)
                },
                clone: function() {
                    var e = i.clone.call(this);
                    return e._data = this._data.clone(), e
                },
                _minBufferSize: 0
            }),
            c = r.Hasher = l.extend({
                cfg: i.extend(),
                init: function(e) {
                    this.cfg = this.cfg.extend(e), this.reset()
                },
                reset: function() {
                    l.reset.call(this), this._doReset()
                },
                update: function(e) {
                    return this._append(e), this._process(), this
                },
                finalize: function(e) {
                    e && this._append(e);
                    var t = this._doFinalize();
                    return t
                },
                blockSize: 16,
                _createHelper: function(e) {
                    return function(t, n) {
                        return (new e.init(n)).finalize(t)
                    }
                },
                _createHmacHelper: function(e) {
                    return function(t, n) {
                        return (new h.HMAC.init(e, n)).finalize(t)
                    }
                }
            }),
            h = n.algo = {};
        return n
    }(Math);
    n("crypto-js/core", function(e) {
            return function() {
                var t, n;
                return n = function() {
                    return r
                }, t = n.apply(e, arguments), t || e.CryptoJS
            }
        }(this)),
        function(e) {
            var t = r,
                n = t.lib,
                i = n.Base,
                s = n.WordArray,
                o = t.x64 = {},
                u = o.Word = i.extend({
                    init: function(e, t) {
                        this.high = e, this.low = t
                    }
                }),
                a = o.WordArray = i.extend({
                    init: function(t, n) {
                        t = this.words = t || [], n != e ? this.sigBytes = n : this.sigBytes = t.length * 8
                    },
                    toX32: function() {
                        var e = this.words,
                            t = e.length,
                            n = [];
                        for (var r = 0; r < t; r++) {
                            var i = e[r];
                            n.push(i.high), n.push(i.low)
                        }
                        return s.create(n, this.sigBytes)
                    },
                    clone: function() {
                        var e = i.clone.call(this),
                            t = e.words = this.words.slice(0),
                            n = t.length;
                        for (var r = 0; r < n; r++) t[r] = t[r].clone();
                        return e
                    }
                })
        }(), n("crypto-js/x64-core", ["crypto-js/core"], function(e) {
            return function() {
                var t, n;
                return n = function() {
                    return r
                }, t = n.apply(e, arguments), t || e.CryptoJS
            }
        }(this)),
        function() {
            var e = r,
                t = e.lib,
                n = t.WordArray,
                i = t.Hasher,
                s = e.algo,
                o = [],
                u = s.SHA1 = i.extend({
                    _doReset: function() {
                        this._hash = new n.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                    },
                    _doProcessBlock: function(e, t) {
                        var n = this._hash.words,
                            r = n[0],
                            i = n[1],
                            s = n[2],
                            u = n[3],
                            a = n[4];
                        for (var f = 0; f < 80; f++) {
                            if (f < 16) o[f] = e[t + f] | 0;
                            else {
                                var l = o[f - 3] ^ o[f - 8] ^ o[f - 14] ^ o[f - 16];
                                o[f] = l << 1 | l >>> 31
                            }
                            var c = (r << 5 | r >>> 27) + a + o[f];
                            f < 20 ? c += (i & s | ~i & u) + 1518500249 : f < 40 ? c += (i ^ s ^ u) + 1859775393 : f < 60 ? c += (i & s | i & u | s & u) - 1894007588 : c += (i ^ s ^ u) - 899497514, a = u, u = s, s = i << 30 | i >>> 2, i = r, r = c
                        }
                        n[0] = n[0] + r | 0, n[1] = n[1] + i | 0, n[2] = n[2] + s | 0, n[3] = n[3] + u | 0, n[4] = n[4] + a | 0
                    },
                    _doFinalize: function() {
                        var e = this._data,
                            t = e.words,
                            n = this._nDataBytes * 8,
                            r = e.sigBytes * 8;
                        return t[r >>> 5] |= 128 << 24 - r % 32, t[(r + 64 >>> 9 << 4) + 14] = Math.floor(n / 4294967296), t[(r + 64 >>> 9 << 4) + 15] = n, e.sigBytes = t.length * 4, this._process(), this._hash
                    },
                    clone: function() {
                        var e = i.clone.call(this);
                        return e._hash = this._hash.clone(), e
                    }
                });
            e.SHA1 = i._createHelper(u), e.HmacSHA1 = i._createHmacHelper(u)
        }(), n("crypto-js/sha1", ["crypto-js/core"], function(e) {
            return function() {
                var t, n;
                return n = function() {
                    return r.SHA1
                }, t = n.apply(e, arguments), t || e.CryptoJS.SHA1
            }
        }(this)),
        function() {
            function a() {
                return s.create.apply(s, arguments)
            }
            var e = r,
                t = e.lib,
                n = t.Hasher,
                i = e.x64,
                s = i.Word,
                o = i.WordArray,
                u = e.algo,
                f = [a(1116352408, 3609767458), a(1899447441, 602891725), a(3049323471, 3964484399), a(3921009573, 2173295548), a(961987163, 4081628472), a(1508970993, 3053834265), a(2453635748, 2937671579), a(2870763221, 3664609560), a(3624381080, 2734883394), a(310598401, 1164996542), a(607225278, 1323610764), a(1426881987, 3590304994), a(1925078388, 4068182383), a(2162078206, 991336113), a(2614888103, 633803317), a(3248222580, 3479774868), a(3835390401, 2666613458), a(4022224774, 944711139), a(264347078, 2341262773), a(604807628, 2007800933), a(770255983, 1495990901), a(1249150122, 1856431235), a(1555081692, 3175218132), a(1996064986, 2198950837), a(2554220882, 3999719339), a(2821834349, 766784016), a(2952996808, 2566594879), a(3210313671, 3203337956), a(3336571891, 1034457026), a(3584528711, 2466948901), a(113926993, 3758326383), a(338241895, 168717936), a(666307205, 1188179964), a(773529912, 1546045734), a(1294757372, 1522805485), a(1396182291, 2643833823), a(1695183700, 2343527390), a(1986661051, 1014477480), a(2177026350, 1206759142), a(2456956037, 344077627), a(2730485921, 1290863460), a(2820302411, 3158454273), a(3259730800, 3505952657), a(3345764771, 106217008), a(3516065817, 3606008344), a(3600352804, 1432725776), a(4094571909, 1467031594), a(275423344, 851169720), a(430227734, 3100823752), a(506948616, 1363258195), a(659060556, 3750685593), a(883997877, 3785050280), a(958139571, 3318307427), a(1322822218, 3812723403), a(1537002063, 2003034995), a(1747873779, 3602036899), a(1955562222, 1575990012), a(2024104815, 1125592928), a(2227730452, 2716904306), a(2361852424, 442776044), a(2428436474, 593698344), a(2756734187, 3733110249), a(3204031479, 2999351573), a(3329325298, 3815920427), a(3391569614, 3928383900), a(3515267271, 566280711), a(3940187606, 3454069534), a(4118630271, 4000239992), a(116418474, 1914138554), a(174292421, 2731055270), a(289380356, 3203993006), a(460393269, 320620315), a(685471733, 587496836), a(852142971, 1086792851), a(1017036298, 365543100), a(1126000580, 2618297676), a(1288033470, 3409855158), a(1501505948, 4234509866), a(1607167915, 987167468), a(1816402316, 1246189591)],
                l = [];
            (function() {
                for (var e = 0; e < 80; e++) l[e] = a()
            })();
            var c = u.SHA512 = n.extend({
                _doReset: function() {
                    this._hash = new o.init([new s.init(1779033703, 4089235720), new s.init(3144134277, 2227873595), new s.init(1013904242, 4271175723), new s.init(2773480762, 1595750129), new s.init(1359893119, 2917565137), new s.init(2600822924, 725511199), new s.init(528734635, 4215389547), new s.init(1541459225, 327033209)])
                },
                _doProcessBlock: function(e, t) {
                    var n = this._hash.words,
                        r = n[0],
                        i = n[1],
                        s = n[2],
                        o = n[3],
                        u = n[4],
                        a = n[5],
                        c = n[6],
                        h = n[7],
                        p = r.high,
                        d = r.low,
                        v = i.high,
                        m = i.low,
                        g = s.high,
                        y = s.low,
                        b = o.high,
                        w = o.low,
                        E = u.high,
                        S = u.low,
                        x = a.high,
                        T = a.low,
                        N = c.high,
                        C = c.low,
                        k = h.high,
                        L = h.low,
                        A = p,
                        O = d,
                        M = v,
                        _ = m,
                        D = g,
                        P = y,
                        H = b,
                        B = w,
                        j = E,
                        F = S,
                        I = x,
                        q = T,
                        R = N,
                        U = C,
                        z = k,
                        X = L;
                    for (var V = 0; V < 80; V++) {
                        var $ = l[V];
                        if (V < 16) var J = $.high = e[t + V * 2] | 0,
                            Q = $.low = e[t + V * 2 + 1] | 0;
                        else {
                            var G = l[V - 15],
                                Y = G.high,
                                Z = G.low,
                                et = (Y >>> 1 | Z << 31) ^ (Y >>> 8 | Z << 24) ^ Y >>> 7,
                                tt = (Z >>> 1 | Y << 31) ^ (Z >>> 8 | Y << 24) ^ (Z >>> 7 | Y << 25),
                                nt = l[V - 2],
                                rt = nt.high,
                                it = nt.low,
                                st = (rt >>> 19 | it << 13) ^ (rt << 3 | it >>> 29) ^ rt >>> 6,
                                ot = (it >>> 19 | rt << 13) ^ (it << 3 | rt >>> 29) ^ (it >>> 6 | rt << 26),
                                ut = l[V - 7],
                                at = ut.high,
                                ft = ut.low,
                                lt = l[V - 16],
                                ct = lt.high,
                                ht = lt.low,
                                Q = tt + ft,
                                J = et + at + (Q >>> 0 < tt >>> 0 ? 1 : 0),
                                Q = Q + ot,
                                J = J + st + (Q >>> 0 < ot >>> 0 ? 1 : 0),
                                Q = Q + ht,
                                J = J + ct + (Q >>> 0 < ht >>> 0 ? 1 : 0);
                            $.high = J, $.low = Q
                        }
                        var pt = j & I ^ ~j & R,
                            dt = F & q ^ ~F & U,
                            vt = A & M ^ A & D ^ M & D,
                            mt = O & _ ^ O & P ^ _ & P,
                            gt = (A >>> 28 | O << 4) ^ (A << 30 | O >>> 2) ^ (A << 25 | O >>> 7),
                            yt = (O >>> 28 | A << 4) ^ (O << 30 | A >>> 2) ^ (O << 25 | A >>> 7),
                            bt = (j >>> 14 | F << 18) ^ (j >>> 18 | F << 14) ^ (j << 23 | F >>> 9),
                            wt = (F >>> 14 | j << 18) ^ (F >>> 18 | j << 14) ^ (F << 23 | j >>> 9),
                            Et = f[V],
                            St = Et.high,
                            xt = Et.low,
                            Tt = X + wt,
                            Nt = z + bt + (Tt >>> 0 < X >>> 0 ? 1 : 0),
                            Tt = Tt + dt,
                            Nt = Nt + pt + (Tt >>> 0 < dt >>> 0 ? 1 : 0),
                            Tt = Tt + xt,
                            Nt = Nt + St + (Tt >>> 0 < xt >>> 0 ? 1 : 0),
                            Tt = Tt + Q,
                            Nt = Nt + J + (Tt >>> 0 < Q >>> 0 ? 1 : 0),
                            Ct = yt + mt,
                            kt = gt + vt + (Ct >>> 0 < yt >>> 0 ? 1 : 0);
                        z = R, X = U, R = I, U = q, I = j, q = F, F = B + Tt | 0, j = H + Nt + (F >>> 0 < B >>> 0 ? 1 : 0) | 0, H = D, B = P, D = M, P = _, M = A, _ = O, O = Tt + Ct | 0, A = Nt + kt + (O >>> 0 < Tt >>> 0 ? 1 : 0) | 0
                    }
                    d = r.low = d + O, r.high = p + A + (d >>> 0 < O >>> 0 ? 1 : 0), m = i.low = m + _, i.high = v + M + (m >>> 0 < _ >>> 0 ? 1 : 0), y = s.low = y + P, s.high = g + D + (y >>> 0 < P >>> 0 ? 1 : 0), w = o.low = w + B, o.high = b + H + (w >>> 0 < B >>> 0 ? 1 : 0), S = u.low = S + F, u.high = E + j + (S >>> 0 < F >>> 0 ? 1 : 0), T = a.low = T + q, a.high = x + I + (T >>> 0 < q >>> 0 ? 1 : 0), C = c.low = C + U, c.high = N + R + (C >>> 0 < U >>> 0 ? 1 : 0), L = h.low = L + X, h.high = k + z + (L >>> 0 < X >>> 0 ? 1 : 0)
                },
                _doFinalize: function() {
                    var e = this._data,
                        t = e.words,
                        n = this._nDataBytes * 8,
                        r = e.sigBytes * 8;
                    t[r >>> 5] |= 128 << 24 - r % 32, t[(r + 128 >>> 10 << 5) + 30] = Math.floor(n / 4294967296), t[(r + 128 >>> 10 << 5) + 31] = n, e.sigBytes = t.length * 4, this._process();
                    var i = this._hash.toX32();
                    return i
                },
                clone: function() {
                    var e = n.clone.call(this);
                    return e._hash = this._hash.clone(), e
                },
                blockSize: 32
            });
            e.SHA512 = n._createHelper(c), e.HmacSHA512 = n._createHmacHelper(c)
        }(), n("crypto-js/sha512", ["crypto-js/core", "crypto-js/x64-core"], function(e) {
            return function() {
                var t, n;
                return n = function() {
                    return r.SHA512
                }, t = n.apply(e, arguments), t || e.CryptoJS.SHA512
            }
        }(this)),
        function(e) {
            var t = r,
                n = t.lib,
                i = n.WordArray,
                s = n.Hasher,
                o = t.x64,
                u = o.Word,
                a = t.algo,
                f = [],
                l = [],
                c = [];
            (function() {
                var e = 1,
                    t = 0;
                for (var n = 0; n < 24; n++) {
                    f[e + 5 * t] = (n + 1) * (n + 2) / 2 % 64;
                    var r = t % 5,
                        i = (2 * e + 3 * t) % 5;
                    e = r, t = i
                }
                for (var e = 0; e < 5; e++)
                    for (var t = 0; t < 5; t++) l[e + 5 * t] = t + (2 * e + 3 * t) % 5 * 5;
                var s = 1;
                for (var o = 0; o < 24; o++) {
                    var a = 0,
                        h = 0;
                    for (var p = 0; p < 7; p++) {
                        if (s & 1) {
                            var d = (1 << p) - 1;
                            d < 32 ? h ^= 1 << d : a ^= 1 << d - 32
                        }
                        s & 128 ? s = s << 1 ^ 113 : s <<= 1
                    }
                    c[o] = u.create(a, h)
                }
            })();
            var h = [];
            (function() {
                for (var e = 0; e < 25; e++) h[e] = u.create()
            })();
            var p = a.SHA3 = s.extend({
                cfg: s.cfg.extend({
                    outputLength: 512
                }),
                _doReset: function() {
                    var e = this._state = [];
                    for (var t = 0; t < 25; t++) e[t] = new u.init;
                    this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
                },
                _doProcessBlock: function(e, t) {
                    var n = this._state,
                        r = this.blockSize / 2;
                    for (var i = 0; i < r; i++) {
                        var s = e[t + 2 * i],
                            o = e[t + 2 * i + 1];
                        s = (s << 8 | s >>> 24) & 16711935 | (s << 24 | s >>> 8) & 4278255360, o = (o << 8 | o >>> 24) & 16711935 | (o << 24 | o >>> 8) & 4278255360;
                        var u = n[i];
                        u.high ^= o, u.low ^= s
                    }
                    for (var a = 0; a < 24; a++) {
                        for (var p = 0; p < 5; p++) {
                            var d = 0,
                                v = 0;
                            for (var m = 0; m < 5; m++) {
                                var u = n[p + 5 * m];
                                d ^= u.high, v ^= u.low
                            }
                            var g = h[p];
                            g.high = d, g.low = v
                        }
                        for (var p = 0; p < 5; p++) {
                            var y = h[(p + 4) % 5],
                                b = h[(p + 1) % 5],
                                w = b.high,
                                E = b.low,
                                d = y.high ^ (w << 1 | E >>> 31),
                                v = y.low ^ (E << 1 | w >>> 31);
                            for (var m = 0; m < 5; m++) {
                                var u = n[p + 5 * m];
                                u.high ^= d, u.low ^= v
                            }
                        }
                        for (var S = 1; S < 25; S++) {
                            var u = n[S],
                                x = u.high,
                                N = u.low,
                                C = f[S];
                            if (C < 32) var d = x << C | N >>> 32 - C,
                                v = N << C | x >>> 32 - C;
                            else var d = N << C - 32 | x >>> 64 - C,
                                v = x << C - 32 | N >>> 64 - C;
                            var k = h[l[S]];
                            k.high = d, k.low = v
                        }
                        var L = h[0],
                            A = n[0];
                        L.high = A.high, L.low = A.low;
                        for (var p = 0; p < 5; p++)
                            for (var m = 0; m < 5; m++) {
                                var S = p + 5 * m,
                                    u = n[S],
                                    O = h[S],
                                    M = h[(p + 1) % 5 + 5 * m],
                                    _ = h[(p + 2) % 5 + 5 * m];
                                u.high = O.high ^ ~M.high & _.high, u.low = O.low ^ ~M.low & _.low
                            }
                        var u = n[0],
                            D = c[a];
                        u.high ^= D.high, u.low ^= D.low
                    }
                },
                _doFinalize: function() {
                    var t = this._data,
                        n = t.words,
                        r = this._nDataBytes * 8,
                        s = t.sigBytes * 8,
                        o = this.blockSize * 32;
                    n[s >>> 5] |= 1 << 24 - s % 32, n[(e.ceil((s + 1) / o) * o >>> 5) - 1] |= 128, t.sigBytes = n.length * 4, this._process();
                    var u = this._state,
                        a = this.cfg.outputLength / 8,
                        f = a / 8,
                        l = [];
                    for (var c = 0; c < f; c++) {
                        var h = u[c],
                            p = h.high,
                            d = h.low;
                        p = (p << 8 | p >>> 24) & 16711935 | (p << 24 | p >>> 8) & 4278255360, d = (d << 8 | d >>> 24) & 16711935 | (d << 24 | d >>> 8) & 4278255360, l.push(d), l.push(p)
                    }
                    return new i.init(l, a)
                },
                clone: function() {
                    var e = s.clone.call(this),
                        t = e._state = this._state.slice(0);
                    for (var n = 0; n < 25; n++) t[n] = t[n].clone();
                    return e
                }
            });
            t.SHA3 = s._createHelper(p), t.HmacSHA3 = s._createHmacHelper(p)
        }(Math), n("crypto-js/sha3", ["crypto-js/core", "crypto-js/x64-core"], function(e) {
            return function() {
                var t, n;
                return n = function() {
                    return r.SHA3
                }, t = n.apply(e, arguments), t || e.CryptoJS.SHA3
            }
        }(this)),
        function(e) {
            function f(e, t, n, r, i, s, o) {
                var u = e + (t & n | ~t & r) + i + o;
                return (u << s | u >>> 32 - s) + t
            }

            function l(e, t, n, r, i, s, o) {
                var u = e + (t & r | n & ~r) + i + o;
                return (u << s | u >>> 32 - s) + t
            }

            function c(e, t, n, r, i, s, o) {
                var u = e + (t ^ n ^ r) + i + o;
                return (u << s | u >>> 32 - s) + t
            }

            function h(e, t, n, r, i, s, o) {
                var u = e + (n ^ (t | ~r)) + i + o;
                return (u << s | u >>> 32 - s) + t
            }
            var t = r,
                n = t.lib,
                i = n.WordArray,
                s = n.Hasher,
                o = t.algo,
                u = [];
            (function() {
                for (var t = 0; t < 64; t++) u[t] = e.abs(e.sin(t + 1)) * 4294967296 | 0
            })();
            var a = o.MD5 = s.extend({
                _doReset: function() {
                    this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878])
                },
                _doProcessBlock: function(e, t) {
                    for (var n = 0; n < 16; n++) {
                        var r = t + n,
                            i = e[r];
                        e[r] = (i << 8 | i >>> 24) & 16711935 | (i << 24 | i >>> 8) & 4278255360
                    }
                    var s = this._hash.words,
                        o = e[t + 0],
                        a = e[t + 1],
                        p = e[t + 2],
                        d = e[t + 3],
                        v = e[t + 4],
                        m = e[t + 5],
                        g = e[t + 6],
                        y = e[t + 7],
                        b = e[t + 8],
                        w = e[t + 9],
                        E = e[t + 10],
                        S = e[t + 11],
                        x = e[t + 12],
                        N = e[t + 13],
                        C = e[t + 14],
                        k = e[t + 15],
                        L = s[0],
                        A = s[1],
                        O = s[2],
                        M = s[3];
                    L = f(L, A, O, M, o, 7, u[0]), M = f(M, L, A, O, a, 12, u[1]), O = f(O, M, L, A, p, 17, u[2]), A = f(A, O, M, L, d, 22, u[3]), L = f(L, A, O, M, v, 7, u[4]), M = f(M, L, A, O, m, 12, u[5]), O = f(O, M, L, A, g, 17, u[6]), A = f(A, O, M, L, y, 22, u[7]), L = f(L, A, O, M, b, 7, u[8]), M = f(M, L, A, O, w, 12, u[9]), O = f(O, M, L, A, E, 17, u[10]), A = f(A, O, M, L, S, 22, u[11]), L = f(L, A, O, M, x, 7, u[12]), M = f(M, L, A, O, N, 12, u[13]), O = f(O, M, L, A, C, 17, u[14]), A = f(A, O, M, L, k, 22, u[15]), L = l(L, A, O, M, a, 5, u[16]), M = l(M, L, A, O, g, 9, u[17]), O = l(O, M, L, A, S, 14, u[18]), A = l(A, O, M, L, o, 20, u[19]), L = l(L, A, O, M, m, 5, u[20]), M = l(M, L, A, O, E, 9, u[21]), O = l(O, M, L, A, k, 14, u[22]), A = l(A, O, M, L, v, 20, u[23]), L = l(L, A, O, M, w, 5, u[24]), M = l(M, L, A, O, C, 9, u[25]), O = l(O, M, L, A, d, 14, u[26]), A = l(A, O, M, L, b, 20, u[27]), L = l(L, A, O, M, N, 5, u[28]), M = l(M, L, A, O, p, 9, u[29]), O = l(O, M, L, A, y, 14, u[30]), A = l(A, O, M, L, x, 20, u[31]), L = c(L, A, O, M, m, 4, u[32]), M = c(M, L, A, O, b, 11, u[33]), O = c(O, M, L, A, S, 16, u[34]), A = c(A, O, M, L, C, 23, u[35]), L = c(L, A, O, M, a, 4, u[36]), M = c(M, L, A, O, v, 11, u[37]), O = c(O, M, L, A, y, 16, u[38]), A = c(A, O, M, L, E, 23, u[39]), L = c(L, A, O, M, N, 4, u[40]), M = c(M, L, A, O, o, 11, u[41]), O = c(O, M, L, A, d, 16, u[42]), A = c(A, O, M, L, g, 23, u[43]), L = c(L, A, O, M, w, 4, u[44]), M = c(M, L, A, O, x, 11, u[45]), O = c(O, M, L, A, k, 16, u[46]), A = c(A, O, M, L, p, 23, u[47]), L = h(L, A, O, M, o, 6, u[48]), M = h(M, L, A, O, y, 10, u[49]), O = h(O, M, L, A, C, 15, u[50]), A = h(A, O, M, L, m, 21, u[51]), L = h(L, A, O, M, x, 6, u[52]), M = h(M, L, A, O, d, 10, u[53]), O = h(O, M, L, A, E, 15, u[54]), A = h(A, O, M, L, a, 21, u[55]), L = h(L, A, O, M, b, 6, u[56]), M = h(M, L, A, O, k, 10, u[57]), O = h(O, M, L, A, g, 15, u[58]), A = h(A, O, M, L, N, 21, u[59]), L = h(L, A, O, M, v, 6, u[60]), M = h(M, L, A, O, S, 10, u[61]), O = h(O, M, L, A, p, 15, u[62]), A = h(A, O, M, L, w, 21, u[63]), s[0] = s[0] + L | 0, s[1] = s[1] + A | 0, s[2] = s[2] + O | 0, s[3] = s[3] + M | 0
                },
                _doFinalize: function() {
                    var t = this._data,
                        n = t.words,
                        r = this._nDataBytes * 8,
                        i = t.sigBytes * 8;
                    n[i >>> 5] |= 128 << 24 - i % 32;
                    var s = e.floor(r / 4294967296),
                        o = r;
                    n[(i + 64 >>> 9 << 4) + 15] = (s << 8 | s >>> 24) & 16711935 | (s << 24 | s >>> 8) & 4278255360, n[(i + 64 >>> 9 << 4) + 14] = (o << 8 | o >>> 24) & 16711935 | (o << 24 | o >>> 8) & 4278255360, t.sigBytes = (n.length + 1) * 4, this._process();
                    var u = this._hash,
                        a = u.words;
                    for (var f = 0; f < 4; f++) {
                        var l = a[f];
                        a[f] = (l << 8 | l >>> 24) & 16711935 | (l << 24 | l >>> 8) & 4278255360
                    }
                    return u
                },
                clone: function() {
                    var e = s.clone.call(this);
                    return e._hash = this._hash.clone(), e
                }
            });
            t.MD5 = s._createHelper(a), t.HmacMD5 = s._createHmacHelper(a)
        }(Math), n("crypto-js/md5", ["crypto-js/core"], function(e) {
            return function() {
                var t, n;
                return n = function() {
                    return r.MD5
                }, t = n.apply(e, arguments), t || e.CryptoJS.MD5
            }
        }(this)),
        function(e) {
            function d(e, t, n) {
                return e ^ t ^ n
            }

            function v(e, t, n) {
                return e & t | ~e & n
            }

            function m(e, t, n) {
                return (e | ~t) ^ n
            }

            function g(e, t, n) {
                return e & n | t & ~n
            }

            function y(e, t, n) {
                return e ^ (t | ~n)
            }

            function b(e, t) {
                return e << t | e >>> 32 - t
            }
            var t = r,
                n = t.lib,
                i = n.WordArray,
                s = n.Hasher,
                o = t.algo,
                u = i.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),
                a = i.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),
                f = i.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),
                l = i.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),
                c = i.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
                h = i.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
                p = o.RIPEMD160 = s.extend({
                    _doReset: function() {
                        this._hash = i.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                    },
                    _doProcessBlock: function(e, t) {
                        for (var n = 0; n < 16; n++) {
                            var r = t + n,
                                i = e[r];
                            e[r] = (i << 8 | i >>> 24) & 16711935 | (i << 24 | i >>> 8) & 4278255360
                        }
                        var s = this._hash.words,
                            o = c.words,
                            p = h.words,
                            w = u.words,
                            E = a.words,
                            S = f.words,
                            x = l.words,
                            T, N, C, k, L, A, O, M, _, D;
                        A = T = s[0], O = N = s[1], M = C = s[2], _ = k = s[3], D = L = s[4];
                        var P;
                        for (var n = 0; n < 80; n += 1) P = T + e[t + w[n]] | 0, n < 16 ? P += d(N, C, k) + o[0] : n < 32 ? P += v(N, C, k) + o[1] : n < 48 ? P += m(N, C, k) + o[2] : n < 64 ? P += g(N, C, k) + o[3] : P += y(N, C, k) + o[4], P |= 0, P = b(P, S[n]), P = P + L | 0, T = L, L = k, k = b(C, 10), C = N, N = P, P = A + e[t + E[n]] | 0, n < 16 ? P += y(O, M, _) + p[0] : n < 32 ? P += g(O, M, _) + p[1] : n < 48 ? P += m(O, M, _) + p[2] : n < 64 ? P += v(O, M, _) + p[3] : P += d(O, M, _) + p[4], P |= 0, P = b(P, x[n]), P = P + D | 0, A = D, D = _, _ = b(M, 10), M = O, O = P;
                        P = s[1] + C + _ | 0, s[1] = s[2] + k + D | 0, s[2] = s[3] + L + A | 0, s[3] = s[4] + T + O | 0, s[4] = s[0] + N + M | 0, s[0] = P
                    },
                    _doFinalize: function() {
                        var e = this._data,
                            t = e.words,
                            n = this._nDataBytes * 8,
                            r = e.sigBytes * 8;
                        t[r >>> 5] |= 128 << 24 - r % 32, t[(r + 64 >>> 9 << 4) + 14] = (n << 8 | n >>> 24) & 16711935 | (n << 24 | n >>> 8) & 4278255360, e.sigBytes = (t.length + 1) * 4, this._process();
                        var i = this._hash,
                            s = i.words;
                        for (var o = 0; o < 5; o++) {
                            var u = s[o];
                            s[o] = (u << 8 | u >>> 24) & 16711935 | (u << 24 | u >>> 8) & 4278255360
                        }
                        return i
                    },
                    clone: function() {
                        var e = s.clone.call(this);
                        return e._hash = this._hash.clone(), e
                    }
                });
            t.RIPEMD160 = s._createHelper(p), t.HmacRIPEMD160 = s._createHmacHelper(p)
        }(Math), n("crypto-js/ripemd160", ["crypto-js/core"], function(e) {
            return function() {
                var t, n;
                return n = function() {
                    return r.RIPEMD160
                }, t = n.apply(e, arguments), t || e.CryptoJS.RIPEMD160
            }
        }(this)),
        function() {
            var e = r,
                t = e.lib,
                n = t.WordArray,
                i = e.enc,
                s = i.Base64 = {
                    stringify: function(e) {
                        var t = e.words,
                            n = e.sigBytes,
                            r = this._map;
                        e.clamp();
                        var i = [];
                        for (var s = 0; s < n; s += 3) {
                            var o = t[s >>> 2] >>> 24 - s % 4 * 8 & 255,
                                u = t[s + 1 >>> 2] >>> 24 - (s + 1) % 4 * 8 & 255,
                                a = t[s + 2 >>> 2] >>> 24 - (s + 2) % 4 * 8 & 255,
                                f = o << 16 | u << 8 | a;
                            for (var l = 0; l < 4 && s + l * .75 < n; l++) i.push(r.charAt(f >>> 6 * (3 - l) & 63))
                        }
                        var c = r.charAt(64);
                        if (c)
                            while (i.length % 4) i.push(c);
                        return i.join("")
                    },
                    parse: function(e) {
                        var t = e.length,
                            r = this._map,
                            i = r.charAt(64);
                        if (i) {
                            var s = e.indexOf(i);
                            s != -1 && (t = s)
                        }
                        var o = [],
                            u = 0;
                        for (var a = 0; a < t; a++)
                            if (a % 4) {
                                var f = r.indexOf(e.charAt(a - 1)) << a % 4 * 2,
                                    l = r.indexOf(e.charAt(a)) >>> 6 - a % 4 * 2;
                                o[u >>> 2] |= (f | l) << 24 - u % 4 * 8, u++
                            } return n.create(o, u)
                    },
                    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
                }
        }(), n("crypto-js/enc-base64", ["crypto-js/core"], function(e) {
            return function() {
                var t, n;
                return n = function() {
                    return r.enc.Base64
                }, t = n.apply(e, arguments), t || e.CryptoJS.enc.Base64
            }
        }(this)),
        function(e, t) {
            typeof n == "function" && n.amd ? n("saltthepass/utils", [], t) : typeof exports == "object" ? module.exports = t() : e.SaltThePassUtils = t()
        }(this, function() {
            var e = {};
            return e.standardizeDomain = function(e) {
                if (typeof e == "undefined") return;
                var t = e.toLowerCase();
                return t.substring(0, "http://".length) === "http://" && (t = t.substring("http://".length)), t.substring(0, "https://".length) === "https://" && (t = t.substring("https://".length)), t.indexOf("/") !== -1 && (t = t.substring(0, t.indexOf("/"))), t
            }, e
        }),
        function(e, r) {
            typeof n == "function" && n.amd ? n("saltthepass/domainnamerule", ["./utils"], r) : typeof exports == "object" ? module.exports = r(t("./utils")) : e.DomainNameRule = r(e.SaltThePassUtils)
        }(this, function(e) {
            function t(e) {
                if (typeof e == "undefined") return;
                this.domain = e.domain, e.aliases instanceof Array ? this.aliases = e.aliases.slice() : this.aliases = [], this.description = e.description, this.min = typeof e.min != "undefined" ? parseInt(e.min, 10) || 0 : 0, this.max = typeof e.max != "undefined" ? parseInt(e.max, 10) || Number.MAX_VALUE : Number.MAX_VALUE, this.invalid = typeof e.invalid != "undefined" ? e.invalid : "", this.required = typeof e.required != "undefined" ? e.required : "", this.regex = e.regex, this.validregex = e.validregex
            }
            return t.prototype.hasMin = function() {
                return this.min !== 0
            }, t.prototype.hasMax = function() {
                return this.max !== Number.MAX_VALUE
            }, t.prototype.hasRequired = function() {
                return this.required.length !== 0
            }, t.prototype.hasInvalid = function() {
                return this.invalid.length !== 0
            }, t.prototype.hasRegex = function() {
                return typeof this.regex != "undefined"
            }, t.prototype.hasValidRegex = function() {
                return typeof this.validregex != "undefined"
            }, t.prototype.matches = function(t) {
                var n = e.standardizeDomain(t);
                if (n === this.domain) return !0;
                for (var r = 0; r < this.aliases.length; r++) {
                    var i = this.aliases[r];
                    if (i === n) return !0
                }
                return !1
            }, t.prototype.isValid = function(e) {
                return this.isValidMin(e) ? this.isValidMax(e) ? this.isValidRequired(e) ? this.isValidInvalid(e) ? this.isValidRegex(e) ? this.isValidValidRegex(e) ? !0 : !1 : !1 : !1 : !1 : !1 : !1
            }, t.prototype.isValidMin = function(e) {
                return e.length >= this.min
            }, t.prototype.isValidMax = function(e) {
                return e.length <= this.max
            }, t.prototype.isValidRequired = function(e) {
                if (this.required.length === 0) return !0;
                var t = !1;
                for (var n = 0; n < this.required.length; n++)
                    if (e.indexOf(this.required[n]) !== -1) {
                        t = !0;
                        break
                    } return this.required.length > 0 && !t ? !1 : !0
            }, t.prototype.isValidInvalid = function(e) {
                if (this.invalid.length === 0) return !0;
                for (var t = 0; t < this.invalid.length; t++)
                    if (e.indexOf(this.invalid[t]) !== -1) return !1;
                return !0
            }, t.prototype.isValidRegex = function(e) {
                if (this.regex) {
                    var t = this.getRegEx();
                    if (!t.test(e)) return !1
                }
                return !0
            }, t.prototype.isValidValidRegex = function(e) {
                if (this.validregex) {
                    var t = this.getValidRegEx();
                    if (!t.test(e)) return !1
                }
                return !0
            }, t.prototype.getRegEx = function() {
                if (!this.regex) return;
                return new RegExp(this.regex)
            }, t.prototype.getValidRegEx = function(e) {
                if (!this.validregex) return;
                return e ? new RegExp("[^" + this.validregex + "]", "g") : new RegExp("^[" + this.validregex + "]+$")
            }, t.prototype.rewrite = function(e) {
                if (this.isValid(e)) return e;
                var t = e;
                for (var n = 0; n < this.invalid.length; n++) {
                    var r = -1,
                        i = this.invalid[n];
                    while ((r = t.indexOf(i)) !== -1) t = t.substr(0, r) + t.substr(r + 1)
                }
                if (this.validregex) {
                    var s = this.getValidRegEx();
                    if (!s.test(t)) {
                        var o = this.getValidRegEx(!0);
                        t = t.replace(o, "")
                    }
                }
                t = this.trimToMax(t), t = this.addRequiredChar(t), t = this.trimToMax(t);
                if (!this.isValid(t)) return;
                return t
            }, t.prototype.trimToMax = function(e) {
                var t = e;
                return t.length > this.max && (t = t.substr(0, this.max)), t
            }, t.prototype.addRequiredChar = function(e) {
                var t = e;
                if (this.required.length === 0) return t;
                var n = !1;
                for (var r = 0; r < this.required.length; r++)
                    if (t.indexOf(this.required[r]) !== -1) {
                        n = !0;
                        break
                    } if (this.required.length > 0 && !n) {
                    var i = this.required[0];
                    t = i + t
                }
                return t
            }, t
        }),
        function(e, r) {
            if (typeof n == "function" && n.amd) n("saltthepass/saltthepass", ["saltthepass/domainnamerule", "saltthepass/utils", "crypto-js/md5", "crypto-js/sha1", "crypto-js/sha512", "crypto-js/sha3", "crypto-js/ripemd160", "crypto-js/enc-base64"], r);
            else if (typeof exports == "object") {
                var i = "";
                try {
                    t("crypto-js/md5")
                } catch (s) {
                    i = "../node_modules/"
                }
                module.exports = r(t("./domainnamerule"), t("./utils"), t(i + "crypto-js/md5"), t(i + "crypto-js/sha1"), t(i + "crypto-js/sha512"), t(i + "crypto-js/sha3"), t(i + "crypto-js/ripemd160"), t(i + "crypto-js/enc-base64"))
            } else e.SaltThePass = r(e.DomainNameRule, e.SaltThePassUtils, e.CryptoJS.MD5, e.CryptoJS.SHA1, e.CryptoJS.SHA512, e.CryptoJS.SHA3, e.CryptoJS.RIPEMD160, e.CryptoJS.enc.Base64)
        }(this, function(e, t, n, r, i, s, o, u) {
            var a = {};
            a.DomainNameRule = e, a.standardizeDomain = t.standardizeDomain;
            var f = {
                md5: {
                    length: 22,
                    fn: n
                },
                sha1: {
                    length: 27,
                    fn: r
                },
                sha2: {
                    length: 86,
                    fn: i
                },
                sha3: {
                    length: 86,
                    fn: s
                },
                ripemd160: {
                    length: 27,
                    fn: o
                }
            };
            return a.getHashes = function() {
                var t = [];
                for (var n in f) f.hasOwnProperty(n) && t.push(n);
                return t
            }, a.getHashFn = function(t) {
                if (t in f) return f[t].fn;
                return
            }, a.getHashLength = function(t) {
                return t in f ? f[t].length : 0
            }, a.hash = function(t, n) {
                if (typeof n == "undefined" || !n.length) return;
                var r = this.getHashFn(t);
                if (typeof r == "undefined") return;
                var i = r(n),
                    s = i.toString(u);
                return s = s.replace(/=+$/, ""), s = s.replace(/\+/g, "-"), s = s.replace(/\//g, "_"), s
            }, a.saltthepass = function(t, n, r, i) {
                return typeof n == "undefined" && (n = ""), typeof r == "undefined" && (r = ""), typeof i == "undefined" && (i = ""), this.hash(t, n + r + i)
            }, a
        }), n("domainnamerulemanager", ["saltthepass/saltthepass", "exports"], function(e, t) {
            function i(t) {
                var r = e.standardizeDomain(t);
                return !r || !n[r[0]] ? !1 : !0
            }

            function s(t, i) {
                var s = e.standardizeDomain(t),
                    o = s[0];
                (!t || n[o]) && i && i();
                if (r[o]) return;
                r[o] = 1, $.ajax({
                    url: "/rules/" + o,
                    success: function(t) {
                        r[o] = 0, n[o] = [];
                        for (var s = 0; s < t.length; s++) {
                            var u = new e.DomainNameRule(t[s]);
                            n[o].push(u)
                        }
                        i && i()
                    },
                    error: function() {
                        r[o] = 0
                    }
                })
            }

            function o(t) {
                var r = e.standardizeDomain(t),
                    i = r[0],
                    s = n[i];
                if (!t || !s) return;
                for (var o = 0; o < s.length; o++)
                    if (s[o].matches(t)) return s[o]
            }
            var n = {},
                r = {};
            t.hasRulesFor = i, t.loadRulesFor = s, t.findMatch = o
        }), n("constants", ["exports"], function(e) {
            e.DOMAIN = "saltthepass.com", e.DEFAULT_PASSWORD_LENGTH = 20, e.DEFAULT_HASHER = "sha3", e.DEFAULT_DOMAIN_NAME_RULES = 0, e.DEFAULT_NORMALIZE_DOMAIN_NAME = 0, e.SETTINGS_COOKIE_NAME = "settings", e.SETTINGS_COOKIE_EXPIRES = 365
        }), n("settings", ["jquery", "jquery.cookie", "constants", "exports"], function(e, t, n, r) {
            function s() {
                return e.cookie(n.SETTINGS_COOKIE_NAME)
            }

            function o(e, t) {
                var r = null;
                return i ? (r = i.getItem(n.SETTINGS_COOKIE_NAME), r && (r = JSON.parse(r))) : r = s(), !r || typeof r[e] == "undefined" ? t : r[e]
            }

            function u() {
                return o("h", n.DEFAULT_HASHER)
            }

            function a() {
                return parseInt(o("r", n.DEFAULT_DOMAIN_NAME_RULES), 10) === 1
            }

            function f() {
                return parseInt(o("n", n.DEFAULT_NORMALIZE_DOMAIN_NAME), 10) === 1
            }

            function l() {
                return parseInt(o("l", n.DEFAULT_PASSWORD_LENGTH), 10) || n.DEFAULT_PASSWORD_LENGTH
            }

            function c(t, r, s, o) {
                var u = {
                    l: t,
                    h: r,
                    r: s ? 1 : 0,
                    n: o ? 1 : 0
                };
                i ? i.setItem(n.SETTINGS_COOKIE_NAME, JSON.stringify(u)) : e.cookie(n.SETTINGS_COOKIE_NAME, u, {
                    expires: n.SETTINGS_COOKIE_EXPIRES,
                    path: "/",
                    domain: n.DOMAIN,
                    secure: !0
                })
            }

            function h() {
                i ? i.removeItem(n.SETTINGS_COOKIE_NAME) : e.removeCookie(n.SETTINGS_COOKIE_NAME, {
                    path: "/",
                    domain: n.DOMAIN,
                    secure: !0
                })
            }

            function p() {
                return i ? i.getItem(n.SETTINGS_COOKIE_NAME) !== null : s() !== undefined
            }
            var i = window.localStorage;
            e.cookie.json = !0, r.getPasswordLength = l, r.getHasher = u, r.getDomainNameRules = a, r.getNormalizeDomainName = f, r.save = c, r.forget = h, r.hasSettings = p
        }),
        function() {
            function N(t) {
                var n, r, s, u = '{"A":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}',
                    a = t == "json";
                if (a || t == "json-stringify" || t == "json-parse") {
                    if (t == "json-stringify" || a) {
                        if (n = typeof o.stringify == "function" && w) {
                            (s = function() {
                                return 1
                            }).toJSON = s;
                            try {
                                n = o.stringify(0) === "0" && o.stringify(new Number) === "0" && o.stringify(new String) == '""' && o.stringify(e) === i && o.stringify(i) === i && o.stringify() === i && o.stringify(s) === "1" && o.stringify([s]) == "[1]" && o.stringify([i]) == "[null]" && o.stringify(null) == "null" && o.stringify([i, e, null]) == "[null,null,null]" && o.stringify({
                                    A: [s, true, false, null, "\0\b\n\f\r	"]
                                }) == u && o.stringify(null, s) === "1" && o.stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" && o.stringify(new Date(-864e13)) == '"-271821-04-20T00:00:00.000Z"' && o.stringify(new Date(864e13)) == '"+275760-09-13T00:00:00.000Z"' && o.stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' && o.stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"'
                            } catch (f) {
                                n = !1
                            }
                        }
                        if (!a) return n
                    }
                    if (t == "json-parse" || a) {
                        if (typeof o.parse == "function") try {
                            if (o.parse("0") === 0 && !o.parse(!1)) {
                                s = o.parse(u);
                                if (r = s.A.length == 5 && s.A[0] == 1) {
                                    try {
                                        r = !o.parse('"	"')
                                    } catch (f) {}
                                    if (r) try {
                                        r = o.parse("01") != 1
                                    } catch (f) {}
                                }
                            }
                        } catch (f) {
                            r = !1
                        }
                        if (!a) return r
                    }
                    return n && r
                }
            }
            var e = {}.toString,
                t, r, i, s = typeof n == "function" && n.amd,
                o = !s && typeof exports == "object" && exports;
            o || s ? typeof JSON == "object" && JSON ? s ? o = JSON : (o.stringify = JSON.stringify, o.parse = JSON.parse) : s && (o = this.JSON = {}) : o = this.JSON || (this.JSON = {});
            var u, a, f, l, c, h, p, d, v, m, g, y, b, w = new Date(-0xc782b5b800cec),
                E, S, x;
            try {
                w = w.getUTCFullYear() == -109252 && w.getUTCMonth() === 0 && w.getUTCDate() == 1 && w.getUTCHours() == 10 && w.getUTCMinutes() == 37 && w.getUTCSeconds() == 6 && w.getUTCMilliseconds() == 708
            } catch (T) {}
            N("json") || (w || (E = Math.floor, S = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], x = function(e, t) {
                return S[t] + 365 * (e - 1970) + E((e - 1969 + (t = +(t > 1))) / 4) - E((e - 1901 + t) / 100) + E((e - 1601 + t) / 400)
            }), (t = {}.hasOwnProperty) || (t = function(n) {
                var r = {},
                    i;
                return (r.__proto__ = null, r.__proto__ = {
                    toString: 1
                }, r).toString != e ? t = function(e) {
                    var t = this.__proto__,
                        n = e in (this.__proto__ = null, this);
                    return this.__proto__ = t, n
                } : (i = r.constructor, t = function(e) {
                    var t = (this.constructor || i).prototype;
                    return e in this && !(e in t && this[e] === t[e])
                }), r = null, t.call(this, n)
            }), r = function(n, r) {
                var i = 0,
                    s, o, u, a;
                (s = function() {
                    this.valueOf = 0
                }).prototype.valueOf = 0, o = new s;
                for (u in o) t.call(o, u) && i++;
                return s = o = null, i ? i == 2 ? a = function(n, r) {
                    var i = {},
                        s = e.call(n) == "[object Function]",
                        o;
                    for (o in n)(!s || o != "prototype") && !t.call(i, o) && (i[o] = 1) && t.call(n, o) && r(o)
                } : a = function(n, r) {
                    var i = e.call(n) == "[object Function]",
                        s, o;
                    for (s in n)(!i || s != "prototype") && t.call(n, s) && !(o = s === "constructor") && r(s);
                    (o || t.call(n, s = "constructor")) && r(s)
                } : (o = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], a = function(n, r) {
                    var i = e.call(n) == "[object Function]",
                        s, u;
                    for (s in n)(!i || s != "prototype") && t.call(n, s) && r(s);
                    for (u = o.length; s = o[--u]; t.call(n, s) && r(s));
                }), a(n, r)
            }, N("json-stringify") || (u = {
                "\\": "\\\\",
                '"': '\\"',
                "\b": "\\b",
                "\f": "\\f",
                "\n": "\\n",
                "\r": "\\r",
                "	": "\\t"
            }, a = function(e, t) {
                return ("000000" + (t || 0)).slice(-e)
            }, f = function(e) {
                var t = '"',
                    n = 0,
                    r;
                for (; r = e.charAt(n); n++) t += '\\"\b\f\n\r	'.indexOf(r) > -1 ? u[r] : u[r] = r < " " ? "\\u00" + a(2, r.charCodeAt(0).toString(16)) : r;
                return t + '"'
            }, l = function(n, s, o, u, c, h, p) {
                var d = s[n],
                    v, m, g, y, b, w, S, T, N, C, k, L, A, O, M, _;
                if (typeof d == "object" && d) {
                    v = e.call(d);
                    if (v == "[object Date]" && !t.call(d, "toJSON"))
                        if (d > -1 / 0 && d < 1 / 0) {
                            if (x) {
                                y = E(d / 864e5);
                                for (m = E(y / 365.2425) + 1970 - 1; x(m + 1, 0) <= y; m++);
                                for (g = E((y - x(m, 0)) / 30.42); x(m, g + 1) <= y; g++);
                                y = 1 + y - x(m, g), b = (d % 864e5 + 864e5) % 864e5, w = E(b / 36e5) % 24, S = E(b / 6e4) % 60, T = E(b / 1e3) % 60, N = b % 1e3
                            } else m = d.getUTCFullYear(), g = d.getUTCMonth(), y = d.getUTCDate(), w = d.getUTCHours(), S = d.getUTCMinutes(), T = d.getUTCSeconds(), N = d.getUTCMilliseconds();
                            d = (m <= 0 || m >= 1e4 ? (m < 0 ? "-" : "+") + a(6, m < 0 ? -m : m) : a(4, m)) + "-" + a(2, g + 1) + "-" + a(2, y) + "T" + a(2, w) + ":" + a(2, S) + ":" + a(2, T) + "." + a(3, N) + "Z"
                        } else d = null;
                    else typeof d.toJSON == "function" && (v != "[object Number]" && v != "[object String]" && v != "[object Array]" || t.call(d, "toJSON")) && (d = d.toJSON(n))
                }
                o && (d = o.call(s, n, d));
                if (d === null) return "null";
                v = e.call(d);
                if (v == "[object Boolean]") return "" + d;
                if (v == "[object Number]") return d > -1 / 0 && d < 1 / 0 ? "" + d : "null";
                if (v == "[object String]") return f(d);
                if (typeof d == "object") {
                    for (A = p.length; A--;)
                        if (p[A] === d) throw TypeError();
                    p.push(d), C = [], O = h, h += c;
                    if (v == "[object Array]") {
                        for (L = 0, A = d.length; L < A; M || (M = !0), L++) k = l(L, d, o, u, c, h, p), C.push(k === i ? "null" : k);
                        _ = M ? c ? "[\n" + h + C.join(",\n" + h) + "\n" + O + "]" : "[" + C.join(",") + "]" : "[]"
                    } else r(u || d, function(e) {
                        var t = l(e, d, o, u, c, h, p);
                        t !== i && C.push(f(e) + ":" + (c ? " " : "") + t), M || (M = !0)
                    }), _ = M ? c ? "{\n" + h + C.join(",\n" + h) + "\n" + O + "}" : "{" + C.join(",") + "}" : "{}";
                    return p.pop(), _
                }
            }, o.stringify = function(t, n, r) {
                var i, s, o, u, a, f;
                if (typeof n == "function" || typeof n == "object" && n)
                    if (e.call(n) == "[object Function]") s = n;
                    else if (e.call(n) == "[object Array]") {
                    o = {};
                    for (u = 0, a = n.length; u < a; f = n[u++], (e.call(f) == "[object String]" || e.call(f) == "[object Number]") && (o[f] = 1));
                }
                if (r)
                    if (e.call(r) == "[object Number]") {
                        if ((r -= r % 1) > 0)
                            for (i = "", r > 10 && (r = 10); i.length < r; i += " ");
                    } else e.call(r) == "[object String]" && (i = r.length <= 10 ? r : r.slice(0, 10));
                return l("", (f = {}, f[""] = t, f), s, o, i, "", [])
            }), N("json-parse") || (c = String.fromCharCode, h = {
                "\\": "\\",
                '"': '"',
                "/": "/",
                b: "\b",
                t: "	",
                n: "\n",
                f: "\f",
                r: "\r"
            }, p = function() {
                throw y = b = null, SyntaxError()
            }, d = function() {
                var e = b,
                    t = e.length,
                    n, r, i, s, o;
                while (y < t) {
                    n = e.charAt(y);
                    if ("	\r\n ".indexOf(n) > -1) y++;
                    else {
                        if ("{}[]:,".indexOf(n) > -1) return y++, n;
                        if (n == '"') {
                            for (r = "@", y++; y < t;) {
                                n = e.charAt(y);
                                if (n < " ") p();
                                else if (n == "\\") {
                                    n = e.charAt(++y);
                                    if ('\\"/btnfr'.indexOf(n) > -1) r += h[n], y++;
                                    else if (n == "u") {
                                        i = ++y;
                                        for (s = y + 4; y < s; y++) n = e.charAt(y), n >= "0" && n <= "9" || n >= "a" && n <= "f" || n >= "A" && n <= "F" || p();
                                        r += c("0x" + e.slice(i, y))
                                    } else p()
                                } else {
                                    if (n == '"') break;
                                    r += n, y++
                                }
                            }
                            if (e.charAt(y) == '"') return y++, r;
                            p()
                        } else {
                            i = y, n == "-" && (o = !0, n = e.charAt(++y));
                            if (n >= "0" && n <= "9") {
                                n == "0" && (n = e.charAt(y + 1), n >= "0" && n <= "9") && p(), o = !1;
                                for (; y < t && (n = e.charAt(y), n >= "0" && n <= "9"); y++);
                                if (e.charAt(y) == ".") {
                                    s = ++y;
                                    for (; s < t && (n = e.charAt(s), n >= "0" && n <= "9"); s++);
                                    s == y && p(), y = s
                                }
                                n = e.charAt(y);
                                if (n == "e" || n == "E") {
                                    n = e.charAt(++y), (n == "+" || n == "-") && y++;
                                    for (s = y; s < t && (n = e.charAt(s), n >= "0" && n <= "9"); s++);
                                    s == y && p(), y = s
                                }
                                return +e.slice(i, y)
                            }
                            o && p();
                            if (e.slice(y, y + 4) == "true") return y += 4, !0;
                            if (e.slice(y, y + 5) == "false") return y += 5, !1;
                            if (e.slice(y, y + 4) == "null") return y += 4, null;
                            p()
                        }
                    }
                }
                return "$"
            }, v = function(e) {
                var t, n, r;
                e == "$" && p();
                if (typeof e == "string") {
                    if (e.charAt(0) == "@") return e.slice(1);
                    if (e == "[") {
                        t = [];
                        for (;; n || (n = !0)) {
                            e = d();
                            if (e == "]") break;
                            n && (e == "," ? (e = d(), e == "]" && p()) : p()), e == "," && p(), t.push(v(e))
                        }
                        return t
                    }
                    if (e == "{") {
                        t = {};
                        for (;; n || (n = !0)) {
                            e = d();
                            if (e == "}") break;
                            n && (e == "," ? (e = d(), e == "}" && p()) : p()), (e == "," || typeof e != "string" || e.charAt(0) != "@" || d() != ":") && p(), t[e.slice(1)] = v(d())
                        }
                        return t
                    }
                    p()
                }
                return e
            }, g = function(e, t, n) {
                var r = m(e, t, n);
                r === i ? delete e[t] : e[t] = r
            }, m = function(t, n, i) {
                var s = t[n],
                    o;
                if (typeof s == "object" && s)
                    if (e.call(s) == "[object Array]")
                        for (o = s.length; o--;) g(s, o, i);
                    else r(s, function(e) {
                        g(s, e, i)
                    });
                return i.call(t, n, s)
            }, o.parse = function(t, n) {
                var r, i;
                return y = 0, b = t, r = v(d()), d() != "$" && p(), y = b = null, n && e.call(n) == "[object Function]" ? m((i = {}, i[""] = r, i), "", n) : r
            })), s && n("json3", [], function() {
                return o
            })
        }.call(this), n("app", ["jquery", "saltthepass/saltthepass", "settings", "domainnamerulemanager", "exports"], function(e, t, n, r, i) {
            function X() {
                var e = ot();
                if (g.val() === "" || y.val() === "") {
                    p.val("");
                    return
                }
                var n = y.val();
                if (E.is(":checked")) {
                    var r = V(n);
                    r !== n ? (n = r, S.show().text("Normalized to: " + r)) : S.hide()
                } else S.hide();
                var i = t.saltthepass(l, g.val(), n, b.val()),
                    s = i.substring(0, d.val());
                if (e) {
                    var o = e.rewrite(s),
                        u = !1,
                        a = !1;
                    o ? o !== "" && o !== s && (s = o, u = !0) : a = !0, J(e, s, u, a)
                }
                p.val(s)
            }

            function V(e) {
                var t = e.toLowerCase().match(/^https?:\/\/([^:/\s]+)/);
                return t && t.length ? t[1] : e
            }

            function $(e, t, n) {
                var r = n ? "text-success" : "text-error",
                    i = '<span class="' + r + '">';
                return i += n ? '<i class="icon-ok"></i>' : '<i class="icon-remove"></i>', i += " " + e + ": " + t + "</span><br />", i
            }

            function J(e, t, n, r) {
                var i = r ? "text-error" : "text-success",
                    s = "";
                n ? s = "Salted Password was rewritten:" : r ? s = "Unable to automatically update the Salted Password for the domain:" : s = "Salted Password is OK:";
                var o = '<span class="' + i + '">' + s + "</span><br />";
                e.hasMin() && (o += $("Min Characters", e.min, e.isValidMin(t))), e.hasMax() && (o += $("Max Characters", e.max, e.isValidMax(t)));
                var u = "",
                    a = 0;
                if (e.hasRequired()) {
                    u = "";
                    for (a = 0; a < e.required.length; a++) a > 0 && (u += ", "), u += e.required[a];
                    o += $("Needs One Of", u, e.isValidRequired(t))
                }
                if (e.hasInvalid()) {
                    u = "";
                    for (a = 0; a < e.invalid.length; a++) a > 0 && (u += ", "), e.invalid[a] === " " ? u += "(space)" : u += e.invalid[a];
                    o += $("Cannot Contain", u, e.isValidInvalid(t))
                }
                e.hasValidRegex() && (o += $("Valid Characters", e.validregex, e.isValidValidRegex(t))), e.hasRegex() && (o += $("Regular Expression", e.regex, e.isValidRegex(t))), C.html(o).show()
            }

            function K(t) {
                var n = t ? t.value : d.val(),
                    r = "";
                n < 8 ? r = "text-error" : n < 16 ? r = "text-warning" : r = "text-success";
                var i = e("<div>");
                i.html('<span class="' + r + '">' + n + " characters</span>"), m.html(i.html()), t && d.val(n), X(), j.show()
            }

            function Q(t) {
                var n = t.target.hash;
                window.location.hash = n, n === "#help" && !c && (I.affix(), e(document.body).scrollspy({
                    wrap: q[0],
                    target: "#help-nav",
                    offset: 40
                }), c = !0), n === "#help" ? (h !== o && ga("send", "pageview", "#help"), ut(), h = o) : n === "#home" ? (R.find("li").removeClass("active"), R.find('a[href="' + n + '"]').parent().addClass("active"), h !== s && ga("send", "pageview", "#home"), h = s) : n === "#mobile" ? (R.find("li").removeClass("active"), R.find('a[href="' + n + '"]').parent().addClass("active"), h !== a && ga("send", "pageview", "#mobile"), h = a) : n === "#cli" ? (R.find("li").removeClass("active"), R.find('a[href="' + n + '"]').parent().addClass("active"), h !== f && ga("send", "pageview", "#cli"), h = f) : n === "#privacy-policy" && (R.find("li").removeClass("active"), ut(), h !== u && ga("send", "pageview", "#privacy-policy"), h = u)
            }

            function G() {
                n.save(d.val(), l, w.is(":checked"), E.is(":checked"))
            }

            function Y(t) {
                j.show(), U.show(), l = e(t.target).data("id"), Z(), X()
            }

            function Z() {
                var r = e("#salted-password-length-content");
                r.html("");
                var i = n.getPasswordLength();
                d && d.val() !== "" && !isNaN(parseInt(d.val(), 10)) && parseInt(d.val(), 10) !== 0 && (i = d.val(), n.getPasswordLength() > i && (i = n.getPasswordLength()));
                var s = t.getHashLength(l);
                i > s && (i = s), d = e("<input>", {
                    id: "salted-password-length",
                    type: "text",
                    "class": "slider input-xlarge hidden",
                    value: i,
                    "data-slider-min": 1,
                    "data-slider-max": s,
                    "data-slider-step": 1,
                    "data-slider-value": i,
                    "data-slider-orientation": "horizontal",
                    "data-slider-selection": "after",
                    "data-slider-tooltip": "hide"
                }), r.append(d), d.on("slide", K), d.slider(), v = d.data("slider").picker, v.css("float", "left"), K()
            }

            function et() {
                return G(), j.hide(), F.show(), U.show(), !1
            }

            function tt() {
                return e("#main-nav-help").tab("show"), !0
            }

            function nt() {
                e.each(z, function(t, n) {
                    var r = e(n),
                        i = e(r.data("target")),
                        s = r.data("more-info"),
                        o = e("<div>", {
                            html: i.html()
                        });
                    o.append(e("<p>", {
                        html: '<a class="help-link" href="' + s + '">More Info &rarr;</a>'
                    })), r.popover({
                        html: !0,
                        content: o.html(),
                        container: "body"
                    })
                })
            }

            function rt() {
                return n.forget(), F.hide(), U.hide(), !1
            }

            function it() {
                j.show(), U.show(), X()
            }

            function st() {
                j.show(), U.show(), X()
            }

            function ot() {
                var n = y.val();
                n = t.standardizeDomain(n);
                if (!w.is(":checked") || n === "") {
                    x.hide();
                    return
                }
                x.show();
                if (!r.hasRulesFor(n)) T.hide(), k.show(), r.loadRulesFor(n, function() {
                    ot(), X()
                });
                else {
                    k.hide(), T.show();
                    var i = r.findMatch(n);
                    if (i) return N.html(""), N.append("Matched: "), N.append(e("<a>", {
                        href: "http://" + i.domain,
                        text: i.domain,
                        target: "_blank"
                    })), L.hide(), i;
                    N.html("No Match"), C.html(""), L.show()
                }
            }

            function ut(t) {
                e.each(z, function(n, r) {
                    var i = e(r);
                    (!t || i.data("target") !== e(t).data("target")) && i.popover("hide")
                })
            }

            function at(e) {
                ut(e.target)
            }

            function ft() {
                window.location.hash === "" || window.location.hash === "#home" ? e("#main-nav-home").tab("show") : window.location.hash.indexOf("#help") === 0 ? e("#main-nav-help").tab("show") : window.location.hash.indexOf("#mobile") === 0 ? e("#main-nav-mobile").tab("show") : window.location.hash.indexOf("#cli") === 0 ? e("#main-nav-cli").tab("show") : window.location.hash.indexOf("#privacy-policy") === 0 && e("#privacy-policy-link").tab("show")
            }

            function lt() {
                return O.val(y.val()), A.modal(), !1
            }

            function ct() {
                A.modal("hide");
                var t = P.find("div");
                t.html('<i class="icon-spinner icon-spin"></i> Submitting...'), P.removeClass("alert-error").addClass("alert-success").show().alert(), e.ajax({
                    type: "POST",
                    url: "/submit/",
                    data: {
                        domain: O.val(),
                        min: _.val(),
                        max: M.val(),
                        other: D.val()
                    },
                    success: function() {
                        t.html("Domain submitted. Thanks for helping out!")
                    },
                    error: function() {
                        t.html("Unable to submit, please try again"), P.removeClass("alert-success").addClass("alert-error").show().alert()
                    }
                })
            }

            function ht() {
                A.modal("hide")
            }

            function pt() {
                g.attr("type") === "password" ? (g.attr("type", "text"), W.attr("title", "Hide password").find("i").removeClass("icon-eye-close").addClass("icon-eye-open")) : (g.attr("type", "password"), W.attr("title", "Reveal password").find("i").removeClass("icon-eye-open").addClass("icon-eye-close"))
            }

            function dt() {
                "serviceWorker" in navigator && navigator.serviceWorker.register("https://saltthepass.com/sw.js")
            }

            function vt() {
                p = e("#salted-password"), d = e("#salted-password-length"), m = e("#salted-password-length-text"), g = e("#master-password"), y = e("#domain-name"), b = e("#domain-phrase"), w = e("#domain-name-rules"), E = e("#normalize-domain-name"), S = e("#normalize-domain-name-output"), x = e("#domain-name-rules-container"), T = e("#domain-name-rules-content"), N = e("#domain-name-rules-content-match"), C = e("#domain-name-rules-content-details"), k = e("#domain-name-rules-loading"), L = e("#domain-name-rules-submit-button"), A = e("#submit-form"), O = e("#submit-domain"), _ = e("#submit-min"), M = e("#submit-max"), D = e("#submit-other"), H = e("#submit-submit"), B = e("#submit-cancel"), P = e("#submit-success"), j = e("#set-as-default"), F = e("#forget-settings"), I = e("#help-nav"), q = e("#help"), R = e("#main-nav"), U = e("#settings-buttons"), z = e(".help-icon"), W = e("#reveal-master-password"), g.val(""), y.val(""), b.val(""), p.val(""), Z(), e('.settings-hashers button[data-id="' + l + '"]').button("toggle");
                var t = n.getPasswordLength();
                d.val(t).data("slider-value", t), w.prop("checked", n.getDomainNameRules()), ot(), E.prop("checked", n.getNormalizeDomainName()), n.hasSettings() ? (F.show(), U.show()) : F.hide(), j.hide();
                var r = e(document);
                r.on("keyup", "#master-password, #domain-name, #domain-phrase", X), r.on("click", ".settings-hashers button", Y), r.on("click", ".help-link", tt), nt(), r.on("click", ".help-icon", at), e('a[data-toggle="tab"]').on("shown", Q), e(window).on("hashchange", ft), w.on("click", it), E.on("click", st), j.on("click", et), F.on("click", rt), L.on("click", lt), H.on("click", ct), B.on("click", ht), W.on("click", pt), ft(), dt()
            }
            var s = 0,
                o = 1,
                u = 2,
                a = 3,
                f = 4,
                l = n.getHasher(),
                c = !1,
                h = s,
                p = null,
                d = null,
                v = null,
                m = null,
                g = null,
                y = null,
                b = null,
                w = null,
                E = null,
                S = null,
                x = null,
                T = null,
                N = null,
                C = null,
                k = null,
                L = null,
                A = null,
                O = null,
                M = null,
                _ = null,
                D = null,
                P = null,
                H = null,
                B = null,
                j = null,
                F = null,
                I = null,
                q = null,
                R = null,
                U = null,
                z = null,
                W = null;
            i.init = vt
        }), e.config({
            baseUrl: "/js",
            shim: {
                app: ["jquery", "jquery.cookie", "twitter-bootstrap/bootstrap-affix", "twitter-bootstrap/bootstrap-alert", "twitter-bootstrap/bootstrap-button", "twitter-bootstrap/bootstrap-collapse", "twitter-bootstrap/bootstrap-modal", "twitter-bootstrap/bootstrap-scrollspy", "twitter-bootstrap/bootstrap-slider", "twitter-bootstrap/bootstrap-tab", "twitter-bootstrap/bootstrap-transition", "twitter-bootstrap/bootstrap-tooltip", "twitter-bootstrap/bootstrap-popover", "saltthepass/saltthepass", "domainnamerulemanager", "settings", "json3"],
                "saltthepass/saltthepass": ["crypto-js/core", "crypto-js/x64-core", "crypto-js/sha1", "crypto-js/sha512", "crypto-js/sha3", "crypto-js/md5", "crypto-js/ripemd160", "crypto-js/enc-base64", "saltthepass/domainnamerule", "saltthepass/utils"],
                "saltthepass/domainnamerule": ["saltthepass/utils"],
                "crypto-js/core": {
                    deps: [],
                    exports: "CryptoJS",
                    init: function() {
                        return r
                    }
                },
                "crypto-js/x64-core": {
                    deps: ["crypto-js/core"],
                    exports: "CryptoJS",
                    init: function() {
                        return r
                    }
                },
                "crypto-js/sha1": {
                    deps: ["crypto-js/core"],
                    exports: "CryptoJS.SHA1",
                    init: function() {
                        return r.SHA1
                    }
                },
                "crypto-js/sha512": {
                    deps: ["crypto-js/core", "crypto-js/x64-core"],
                    exports: "CryptoJS.SHA512",
                    init: function() {
                        return r.SHA512
                    }
                },
                "crypto-js/sha3": {
                    deps: ["crypto-js/core", "crypto-js/x64-core"],
                    exports: "CryptoJS.SHA3",
                    init: function() {
                        return r.SHA3
                    }
                },
                "crypto-js/md5": {
                    deps: ["crypto-js/core"],
                    exports: "CryptoJS.MD5",
                    init: function() {
                        return r.MD5
                    }
                },
                "crypto-js/ripemd160": {
                    deps: ["crypto-js/core"],
                    exports: "CryptoJS.RIPEMD160",
                    init: function() {
                        return r.RIPEMD160
                    }
                },
                "crypto-js/enc-base64": {
                    deps: ["crypto-js/core"],
                    exports: "CryptoJS.enc.Base64",
                    init: function() {
                        return r.enc.Base64
                    }
                },
                "jquery.cookie": ["jquery"],
                "twitter-bootstrap/bootstrap-alert": ["jquery"],
                "twitter-bootstrap/bootstrap-affix": ["jquery"],
                "twitter-bootstrap/bootstrap-button": ["jquery"],
                "twitter-bootstrap/bootstrap-collapse": ["jquery"],
                "twitter-bootstrap/bootstrap-modal": ["jquery"],
                "twitter-bootstrap/bootstrap-scrollspy": ["jquery"],
                "twitter-bootstrap/bootstrap-slider": ["jquery"],
                "twitter-bootstrap/bootstrap-tab": ["jquery"],
                "twitter-bootstrap/bootstrap-transition": ["jquery"],
                "twitter-bootstrap/bootstrap-tooltip": ["jquery"],
                "twitter-bootstrap/bootstrap-popover": ["jquery", "twitter-bootstrap/bootstrap-tooltip"]
            }
        }), t(["app"], function(e) {
            e.init(document)
        }), n("main", function() {}), t(["main"])
})();