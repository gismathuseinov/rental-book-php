/*!
  * BsMultiSelect v1.1.18 (https://dashboardcode.github.io/BsMultiSelect/)
  * Copyright 2017-2021 Roman Pokrovskij (github user rpokrovskij)
  * Licensed under Apache 2 (https://github.com/DashboardCode/BsMultiSelect/blob/master/LICENSE)
  */
!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("@popperjs/core")) : "function" == typeof define && define.amd ? define(["@popperjs/core"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dashboardcode = t(e.Popper)
}(this, (function (e) {
    "use strict";

    function t(e) {
        return e && "object" == typeof e && "default" in e ? e : {default: e}
    }

    var n = t(e);

    function i(e) {
        return !0 === e || !1 === e
    }

    function o(e) {
        return e instanceof String || "string" == typeof e
    }

    function c(e, t) {
        for (var n in t) void 0 === e[n] && (e[n] = t[n])
    }

    function r(e) {
        var t = {};
        for (var n in e) {
            var i = e[n];
            null != i && (t[n] = i)
        }
        for (var o = arguments.length, c = new Array(o > 1 ? o - 1 : 0), r = 1; r < o; r++) c[r - 1] = arguments[r];
        return c && c.forEach((function (e) {
            for (var n in e) {
                var i = e[n];
                null != i ? t[n] = i : t.hasOwnProperty(n) && delete t[n]
            }
        })), t
    }

    function a(e, t) {
        t && (!1 !== e(t.value) && a(e, t.prev))
    }

    function u(e, t) {
        if (!t.prev) return e;
        u(++e, t.prev)
    }

    function s() {
        var e = null, t = 0;
        return {
            add: function (n) {
                e ? (e.next = {value: n, prev: e, next: null}, e = e.next) : e = {
                    value: n,
                    prev: null,
                    next: null
                }, t++;
                var i = e;
                return {
                    remove: function () {
                        i.prev && (i.prev.next = i.next), i.next && (i.next.prev = i.prev), e == i && (e = i.prev), t--
                    }, index: function () {
                        return u(0, i)
                    }
                }
            }, forEach: function (t) {
                a(t, e)
            }, getTail: function () {
                return e ? e.value : null
            }, getCount: function () {
                return t
            }, isEmpty: function () {
                return 0 == t
            }, reset: function () {
                e = null, t = 0
            }
        }
    }

    function l(e, t, n, i) {
        var o = null, c = null, r = 0;
        return {
            add: function (n, a) {
                if (c) if (a) {
                    a === o && (o = n);
                    var u = e(a);
                    i(n, a), t(a, n), u ? (t(n, u), i(u, n)) : t(n, null)
                } else t(n, c), i(n, null), i(c, n), c = n; else o = c = n, t(n, null), i(n, null);
                r++
            }, remove: function (a) {
                var u = n(a), s = e(a);
                s && i(s, u), u && t(u, s), c == a && (c = s), o == a && (o = u), r--
            }, getHead: function () {
                return o
            }, getTail: function () {
                return c
            }, getCount: function () {
                return r
            }, isEmpty: function () {
                return 0 == r
            }, reset: function () {
                c = o = null, r = 0
            }
        }
    }

    function d() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return function () {
            return t.forEach((function (e) {
                e && e()
            }))
        }
    }

    function p() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        for (var i = 0, o = t; i < o.length; i++) {
            var c = o[i];
            if (c) {
                if (!(c instanceof Function)) return c;
                var r = c();
                if (r) return r
            }
        }
    }

    function f(e) {
        var t = s(), n = e();
        return {
            getValue: function () {
                return n
            }, call: function () {
                n = e(), t.forEach((function (e) {
                    return e(n)
                }))
            }, attach: function (e) {
                return t.add(e)
            }, detachAll: function () {
                t.reset()
            }
        }
    }

    function h(e, t) {
        for (var n = null, i = 0; i < e.children.length; i++) {
            var o = e.children[i];
            if (o.tagName == t) {
                n = o;
                break
            }
        }
        return n
    }

    function g(e, t) {
        return C(e, (function (e) {
            return e.tagName === t
        }))
    }

    function v(e, t) {
        return C(e, (function (e) {
            return e.classList.contains(t)
        }))
    }

    function m(e, t) {
        return e === t || e.contains(t)
    }

    function b(e, t, n) {
        var i = e.getAttribute("data-" + t + "-" + n);
        if (i) return i;
        var o = e.getAttribute("data-" + n);
        return o || null
    }

    function C(e, t) {
        return e && e instanceof Element ? t(e) ? e : C(e.parentNode, t) : null
    }

    function A(e) {
        var t = !1;
        return function (e, t, n) {
            return C(e, (function (e) {
                return e.getAttribute(t) === n
            }))
        }(e, "dir", "rtl") && (t = !0), t
    }

    function D() {
        var e = [];
        return {
            bind: function (t, n, i) {
                t.addEventListener(n, i), e.push({element: t, eventName: n, handler: i})
            }, unbind: function () {
                e.forEach((function (e) {
                    var t = e.element, n = e.eventName, i = e.handler;
                    t.removeEventListener(n, i)
                }))
            }
        }
    }

    function y(e, t) {
        var n = {classes: [], styles: {}};
        if (t) {
            var i = t.classes, o = t.styles;
            for (var c in i.forEach((function (t) {
                return e.classList.add(t)
            })), n.classes = i.slice(), o) n.styles[c] = e.style[c], e.style[c] = o[c]
        }
        return n
    }

    function k(e, t) {
        if (t) {
            var n = t.classes, i = t.styles;
            for (var o in n.forEach((function (t) {
                return e.classList.remove(t)
            })), i) e.style[o] = i[o]
        }
    }

    function E(e, t) {
        var n = {classes: [], styles: {}}, i = !1, o = t instanceof Function;
        return function (c, r) {
            c ? !1 === i ? (n = y(e, o ? t() : t), i = !0) : r && (k(e, n), n = y(e, o ? t() : t)) : !0 !== i && !0 !== r || (k(e, n), i = !1)
        }
    }

    function P(e, t, n, i, c) {
        if (o(t)) {
            if ("" === t) c && (e.classes = []); else {
                var r = t.split(" ");
                e.classes = n(r)
            }
            return !0
        }
        return t instanceof Array && (0 == t.length ? c && (e.classes = []) : e.classes = i(t), !0)
    }

    function S(e, t, n, i, o, c) {
        if (!1 === P(e, t, n, i, c) && t instanceof Object) {
            var r = t.classes, a = t.styles;
            P(e, r, n, i, c), a ? e.styles = o(a) : r || (e.styles = o(t))
        }
    }

    function L(e) {
        var t = {classes: [], styles: {}};
        return e && S(t, e, (function (e) {
            return e
        }), (function (e) {
            return e.slice()
        }), (function (e) {
            return r(e)
        }), !0), Object.freeze(t)
    }

    function I(e, t) {
        var n = {classes: [], styles: {}};
        if (t) {
            S(n, t, (function (e) {
                return e
            }), (function (e) {
                return e.slice()
            }), (function (e) {
                return r(e)
            }), !0);
            for (var i = arguments.length, o = new Array(i > 2 ? i - 2 : 0), c = 2; c < i; c++) o[c - 2] = arguments[c];
            if (o) {
                var a = n.classes, u = n.styles, s = e ? function (e) {
                    return S(n, e, (function (e) {
                        return e
                    }), (function (e) {
                        return e.slice()
                    }), (function (e) {
                        return r(u, e)
                    }), !0)
                } : function (e) {
                    return S(n, e, (function (e) {
                        return a.concat(e)
                    }), (function (e) {
                        return a.concat(e)
                    }), (function (e) {
                        return r(u, e)
                    }), !1)
                };
                o.forEach((function (e) {
                    return s(e)
                }))
            }
        }
        return L(n)
    }

    function H(e, t) {
        var n = {};
        for (var i in e) {
            var o = e[i], c = t ? t[i] : void 0;
            n[i] = void 0 === c ? L(o) : I(!0, o, c)
        }
        if (t) for (var r in t) e[r] || (n[r] = L(t[r]));
        return n
    }

    function w(e, t, n) {
        return {
            navigate: function (i, o) {
                return i ? o ? n(o) : e.getHead() : o ? t(o) : e.getTail()
            }, getCount: function () {
                return e.getCount()
            }, getHead: function () {
                return e.getHead()
            }
        }
    }

    function O(e, t, n, i) {
        return {
            push: function (t) {
                return M(t, e, i)
            }, insert: function (t, n) {
                return function (e, t, n, i) {
                    e >= n.getCount() ? M(t, n, i) : (n.add(t, e), i(t, e))
                }(t, n, e, i)
            }, remove: function (t) {
                var i = e.remove(t);
                return n(i), i
            }, clear: function () {
                e.reset(), t()
            }, dispose: function () {
                return e.forLoop((function (e) {
                    return e.dispose()
                }))
            }
        }
    }

    function M(e, t, n) {
        t.push(e), n(e)
    }

    function F(e) {
        var t = e.environment, n = e.filterDom, i = e.picksDom, o = e.choicesDom, c = e.choicesVisibilityAspect,
            r = e.hoveredChoiceAspect, a = e.navigateAspect, u = e.filterManagerAspect, s = e.focusInAspect,
            l = e.optionToggleAspect, p = e.createPickHandlersAspect, f = e.picksList, h = e.inputAspect,
            g = e.specialPicksEventsAspect, v = e.buildChoiceAspect, b = e.disableComponentAspect,
            C = e.resetLayoutAspect, A = e.placeholderStopInputAspect, y = e.warningAspect, k = e.configuration,
            E = e.createPopperAspect, P = e.rtlAspect, S = e.staticManager, L = i.picksElement, I = o.choicesElement,
            H = n.filterInputElement, w = E.createPopper(I, H, !0);
        S.appendToContainer = d(S.appendToContainer, w.init);
        var O = g.backSpace;
        if (g.backSpace = function (e) {
            O(e), w.update()
        }, P) {
            var M = P.updateRtl;
            P.updateRtl = function (e) {
                M(e), w.setRtl(e)
            }
        }
        if (c.updatePopupLocation = d(c.updatePopupLocation, (function () {
            w.update()
        })), y) {
            var F = E.createPopper(y.warningElement, H, !1);
            if (S.appendToContainer = d(S.appendToContainer, F.init), P) {
                var x = P.updateRtl;
                P.updateRtl = function (e) {
                    x(e), F.setRtl(e)
                }
            }
            var _ = y.show;
            y.show = function (e) {
                F.update(), _(e)
            }, w.dispose = d(w.dispose, F.dispose)
        }
        var V = t.window, B = V.document, T = function (e) {
            var t = !1, n = null;
            return {
                get: function () {
                    return t
                }, set: function (i) {
                    t && n && e.clearTimeout(n), t = !0, n = e.setTimeout((function () {
                        t = !1, n = null
                    }), i || 0)
                }
            }
        }(V), N = !1;

        function R() {
            N = !1
        }

        var W = function () {
            N = !0
        }, q = function (e) {
            I == e.target ? n.setFocus() : m(I, e.target) || m(L, e.target) || (C.resetLayout(), s.setFocusIn(!1))
        };

        function U() {
            c.isChoicesVisible() || (c.updatePopupLocation(), T.set(), c.setChoicesVisible(!0), I.scrollTop = 0, I.addEventListener("mousedown", W), B.addEventListener("mouseup", q))
        }

        function z() {
            X(), r.resetHoveredChoice(), c.isChoicesVisible() && (c.setChoicesVisible(!1), I.removeEventListener("mousedown", W), B.removeEventListener("mouseup", q))
        }

        var j = null, G = D();

        function K() {
            W(), V.setTimeout((function () {
                return R()
            }))
        }

        function Q(e) {
            n.setFocusIfNotTarget(e.target), j != e && (c.isChoicesVisible() ? z() : u.getNavigateManager().getCount() > 0 && U()), j = null
        }

        function $(e) {
            return function (t) {
                !function (e, t) {
                    V.setTimeout((function () {
                        return e()
                    })), j = t
                }(e, t), C.resetLayout()
            }
        }

        L.addEventListener("mousedown", K);
        var J = D(), X = function () {
            J.unbind()
        }, Y = function (e) {
            e.choice.isHoverIn || a.hoverIn(e), X()
        };

        function Z(e) {
            var t = a.navigate(e);
            t && (T.set(400), a.hoverIn(t), U())
        }

        function ee() {
            var e = r.getHoveredChoice();
            e && (l.toggle(e) && C.resetLayout())
        }

        n.onFocusIn((function () {
            return s.setFocusIn(!0)
        })), n.onFocusOut((function () {
            N || (C.resetLayout(), s.setFocusIn(!1)), R()
        })), n.onInput((function () {
            if (A && A.get()) A.reset(); else {
                var e = h.processInput(), t = e.filterInputValue;
                e.isEmpty ? u.processEmptyInput() : n.setWidth(t), T.set(), function () {
                    var e = u.getNavigateManager().getCount();
                    if (e > 0) {
                        y && y.hide();
                        var t = c.isChoicesVisible();
                        t || U(), 1 == e ? a.hoverIn(u.getNavigateManager().getHead()) : t && r.resetHoveredChoice()
                    } else c.isChoicesVisible() && z(), y && (u.getFilter() ? y.show(k.noResultsWarning) : y.hide())
                }()
            }
        }));
        if (n.onKeyDown((function (e) {
            var t = e.which, i = n.isEmpty();
            if (([13, 27].indexOf(t) >= 0 || 9 == t && !i) && e.preventDefault(), [38, 40].indexOf(t) >= 0 && e.preventDefault(), 8 == t) {
                if (i) {
                    var o = f.getTail();
                    o && g.backSpace(o)
                }
            } else 9 == t ? i && z() : 27 == t ? i && !c.isChoicesVisible() || e.stopPropagation() : 38 == t ? Z(!1) : 40 == t && Z(!0)
        })), n.onKeyUp((function (e) {
            var t = e.which;
            9 == t ? c.isChoicesVisible() && ee() : 13 == t ? c.isChoicesVisible() ? ee() : u.getNavigateManager().getCount() > 0 && U() : 27 == t && C.resetLayout()
        })), b) {
            var te = b.disableComponent;
            b.disableComponent = function (e) {
                te(e), e ? G.unbind() : G.bind(L, "click", Q)
            }
        }
        C.resetLayout = d(z, (function () {
            y && y.hide()
        }), C.resetLayout);
        var ne = p.createPickHandlers;
        p.createPickHandlers = function (e) {
            var t = ne(e);
            return t.removeOnButton = $(t.removeOnButton), t
        };
        var ie = v.buildChoice;
        return v.buildChoice = function (e) {
            ie(e);
            var t = p.createPickHandlers(e);
            e.choice.remove = d(e.choice.remove, (function () {
                t.removeAndDispose && (t.removeAndDispose(), t.removeAndDispose = null)
            }));
            var n = function (e) {
                var t = e.choice.choiceElement, n = D();
                return n.bind(t, "mouseover", (function () {
                    T.get() ? (X(), J.bind(t, "mousemove", (function () {
                        return Y(e)
                    })), J.bind(t, "mousedown", (function () {
                        return Y(e)
                    }))) : e.choice.isHoverIn || a.hoverIn(e)
                })), n.bind(t, "mouseleave", (function () {
                    T.get() || r.resetHoveredChoice()
                })), n.unbind
            }(e);
            e.choice.dispose = d(n, e.choice.dispose)
        }, {
            dispose: function () {
                X(), L.removeEventListener("mousedown", K), G.unbind(), w.dispose()
            }
        }
    }

    function x(e, t, n, i, o) {
        var r, a = t.window;
        t.isIE11 = !!a.MSInputMethodContext && !!document.documentMode;
        var u, p, f = i.containerClass, g = i.css, m = i.getDisabled, b = i.options, C = i.getText, A = {
            dispose: function () {
            }
        }, k = function (e, t) {
            return {
                trigger: function (n) {
                    t(e, n)
                }
            }
        }(e, t.trigger), P = function (e, t) {
            return {
                onChange: function () {
                    e.trigger(t)
                }
            }
        }(k, "dashboardcode.multiselect:change"), S = function (e) {
            return {getDisabled: e}
        }(null != m ? m : function () {
            return !1
        }), L = function (e) {
            return {
                getOptions: function () {
                    return e
                }
            }
        }(b), I = function (e) {
            return e || (e = function (e) {
                return e.text
            }), {getText: e}
        }(C), H = {
            isSelectable: function (e) {
                return !0
            }
        }, M = {
            createWrap: function (e) {
                return {option: e}
            }
        }, x = function (e) {
            return {
                createChoiceBase: function (t) {
                    return {
                        filteredPrev: null,
                        filteredNext: null,
                        searchText: e.getText(t).toLowerCase().trim(),
                        isHoverIn: !1,
                        isFilteredIn: !1,
                        setVisible: null,
                        setHoverIn: null,
                        isChoiceElementAttached: !1,
                        choiceElement: null,
                        choiceDom: null,
                        choiceElementAttach: null,
                        itemPrev: null,
                        itemNext: null,
                        remove: null,
                        dispose: null
                    }
                }
            }
        }(I), _ = {
            addPick: function (e, t) {
                return t.producePick()
            }
        }, V = {
            removePick: function (e, t) {
                t.dispose()
            }
        }, B = {
            createElement: function (e) {
                return a.document.createElement(e)
            }
        }, T = function (e) {
            return {
                create: function (t) {
                    var n = e.createElement("DIV"), i = e.createElement("UL");
                    return n.appendChild(i), n.style.display = "none", y(n, t.choices), y(i, t.choicesList), {
                        choicesElement: n,
                        choicesListElement: i,
                        createChoiceElement: function () {
                            var n = e.createElement("LI");
                            return y(n, t.choice), {
                                choiceElement: n, setVisible: function (e) {
                                    return n.style.display = e ? "block" : "none"
                                }, attach: function (e) {
                                    return i.insertBefore(n, e)
                                }, detach: function () {
                                    return i.removeChild(n)
                                }
                            }
                        }
                    }
                }
            }
        }(B), N = function (e, t) {
            return {
                create: function (n) {
                    var i = e.create(n);
                    return {
                        choicesDom: i, createStaticDom: function (e, n) {
                            function o(t) {
                                throw e.style.backgroundColor = "red", e.style.color = "white", new Error(t)
                            }

                            var c, r, a = !1;
                            "DIV" == e.tagName ? ((c = e).classList.contains(n) || (c.classList.add(n), a = !0), r = h(c, "UL")) : "UL" == e.tagName ? (r = e, (c = v(e, n)) || o("BsMultiSelect: defined on UL but precedentant DIV for container not found; class=" + n)) : "INPUT" == e.tagName && o("BsMultiSelect: INPUT element is not supported");
                            var u = !1;
                            return r || (r = t.createElement("UL"), u = !0), {
                                choicesDom: i,
                                staticDom: {
                                    initialElement: e,
                                    containerElement: c,
                                    picksElement: r,
                                    isDisposablePicksElement: u
                                },
                                staticManager: {
                                    appendToContainer: function () {
                                        c.appendChild(i.choicesElement), u && c.appendChild(r)
                                    }, dispose: function () {
                                        c.removeChild(i.choicesElement), a && c.classList.remove(n), u && c.removeChild(r)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }(T, B), R = (u = [], {
            push: function (e) {
                u.push(e)
            }, add: function (e, t) {
                u.splice(t, 0, e)
            }, get: function (e) {
                return u[e]
            }, getNext: function (e, t) {
                var n = u.length, i = e + 1;
                if (e < n) {
                    if (!t) return u[i];
                    for (var o = i; o < n; o++) {
                        var c = u[o];
                        if (t(c)) return c
                    }
                }
            }, remove: function (e) {
                var t = u[e];
                return u.splice(e, 1), t
            }, forLoop: function (e) {
                for (var t = 0; t < u.length; t++) e(u[t], t)
            }, getHead: function () {
                return u[0]
            }, getCount: function () {
                return u.length
            }, isEmpty: function () {
                return 0 == u.length
            }, reset: function () {
                u = []
            }
        }), W = l((function (e) {
            return e.choice.itemPrev
        }), (function (e, t) {
            return e.choice.itemPrev = t
        }), (function (e) {
            return e.choice.itemNext
        }), (function (e, t) {
            return e.choice.itemNext = t
        })), q = function (e, t) {
            return {
                countableChoicesListInsert: function (n, i) {
                    var o = t.getNext(i);
                    e.add(n, o)
                }
            }
        }(W, R), U = function (e, t) {
            return {
                forEach: function (n) {
                    for (var i = e.getHead(); i;) n(i), i = t(i)
                }
            }
        }(W, (function (e) {
            return e.choice.itemNext
        })), z = l((function (e) {
            return e.choice.filteredPrev
        }), (function (e, t) {
            return e.choice.filteredPrev = t
        }), (function (e) {
            return e.choice.filteredNext
        }), (function (e, t) {
            return e.choice.filteredNext = t
        })), j = {
            filterPredicate: function (e, t) {
                return e.choice.searchText.indexOf(t) >= 0
            }
        }, G = function (e, t, n, i, o) {
            var c = !0, r = "";
            return {
                getNavigateManager: function () {
                    return c ? e : t
                }, processEmptyInput: function () {
                    c = !0, r = "", i.forEach((function (e) {
                        e.choice.setVisible(!0)
                    }))
                }, getFilter: function () {
                    return r
                }, setFilter: function (e) {
                    c = !1, r = e, n.reset(), i.forEach((function (t) {
                        t.choice.filteredPrev = t.choice.filteredNext = null;
                        var i = o.filterPredicate(t, e);
                        i && n.add(t), t.choice.setVisible(i)
                    }))
                }
            }
        }(w(W, (function (e) {
            return e.choice.itemPrev
        }), (function (e) {
            return e.choice.itemNext
        })), w(z, (function (e) {
            return e.choice.filteredPrev
        }), (function (e) {
            return e.choice.filteredNext
        })), z, U, j), K = (p = null, {
            getHoveredChoice: function () {
                return p
            }, setHoveredChoice: function (e) {
                p = e
            }, resetHoveredChoice: function () {
                p && (p.choice.setHoverIn(!1), p = null)
            }
        }), Q = function (e, t) {
            return {
                hoverIn: function (t) {
                    e.resetHoveredChoice(), e.setHoveredChoice(t), t.choice.setHoverIn(!0)
                }, navigate: function (n) {
                    return t(n, e.getHoveredChoice())
                }
            }
        }(K, (function (e, t) {
            return G.getNavigateManager().navigate(e, t)
        })), $ = s(), J = O(R, (function () {
            return W.reset()
        }), (function (e) {
            return W.remove(e)
        }), (function (e, t) {
            return q.countableChoicesListInsert(e, t)
        })), X = {
            environment: t,
            configuration: i,
            triggerAspect: k,
            onChangeAspect: P,
            componentPropertiesAspect: S,
            disposeAspect: A,
            countableChoicesList: W,
            countableChoicesListInsertAspect: q,
            optionsAspect: L,
            optionPropertiesAspect: I,
            createWrapAspect: M,
            createChoiceBaseAspect: x,
            isChoiceSelectableAspect: H,
            createElementAspect: B,
            choicesDomFactory: T,
            staticDomFactory: N,
            filterPredicateAspect: j,
            wrapsCollection: R,
            choicesEnumerableAspect: U,
            filteredChoicesList: z,
            filterManagerAspect: G,
            hoveredChoiceAspect: K,
            navigateAspect: Q,
            picksList: $,
            wraps: J,
            addPickAspect: _,
            removePickAspect: V
        };
        !function (e, t) {
            for (var n = 0; n < e.length; n++) {
                var i, o;
                null == (i = (o = e[n]).plugStaticDom) || i.call(o, t)
            }
        }(n, X);
        var Y, Z, ee = N.create(g), te = ee.choicesDom, ne = (0, ee.createStaticDom)(e, f), ie = ne.staticDom,
            oe = ne.staticManager, ce = function (e, t, n) {
                var i = t.createElement("INPUT");
                y(i, n.filterInput), i.setAttribute("type", "search"), i.setAttribute("autocomplete", "off");
                var o = D();
                return {
                    filterInputElement: i, isEmpty: function () {
                        return !i.value
                    }, setEmpty: function () {
                        i.value = ""
                    }, getValue: function () {
                        return i.value
                    }, setFocus: function () {
                        i.focus()
                    }, setWidth: function (e) {
                        i.style.width = 1.3 * e.length + 2 + "ch"
                    }, setFocusIfNotTarget: function (e) {
                        e != i && i.focus()
                    }, onInput: function (e) {
                        o.bind(i, "input", e)
                    }, onFocusIn: function (e) {
                        o.bind(i, "focusin", e)
                    }, onFocusOut: function (e) {
                        o.bind(i, "focusout", e)
                    }, onKeyDown: function (e) {
                        o.bind(i, "keydown", e)
                    }, onKeyUp: function (e) {
                        o.bind(i, "keyup", e)
                    }, dispose: function () {
                        o.unbind(), e || i.parentNode && i.parentNode.removeChild(i)
                    }
                }
            }(ie.isDisposablePicksElement, B, g), re = function (e, t, n, i) {
                var o = n.createElement("LI");
                y(e, i.picks), y(o, i.pickFilter);
                var c = E(e, i.picks_disabled), r = E(e, i.picks_focus), a = !1;
                return {
                    picksElement: e, pickFilterElement: o, createPickElement: function () {
                        var t = n.createElement("LI");
                        return y(t, i.pick), {
                            pickElement: t, attach: function (n) {
                                return e.insertBefore(t, null != n ? n : o)
                            }, detach: function () {
                                return e.removeChild(t)
                            }
                        }
                    }, disable: function (e) {
                        c(e)
                    }, toggleFocusStyling: function () {
                        r(a)
                    }, getIsFocusIn: function () {
                        return a
                    }, setIsFocusIn: function (e) {
                        a = e
                    }, dispose: function () {
                        t || (c(!1), r(!1), o.parentNode && o.parentNode.removeChild(o))
                    }
                }
            }(ie.picksElement, ie.isDisposablePicksElement, B, g), ae = {
                backSpace: function (e) {
                    e.setSelectedFalse()
                }
            }, ue = (Y = te.choicesElement, {
                isChoicesVisible: function () {
                    return "none" != Y.style.display
                }, setChoicesVisible: function (e) {
                    Y.style.display = e ? "block" : "none"
                }, updatePopupLocation: function () {
                }
            }), se = function (e, t) {
                return {
                    forceResetFilter: function () {
                        e.setEmpty(), t.processEmptyInput()
                    }
                }
            }(ce, G), le = function (e, t) {
                return {
                    resetFilter: function () {
                        e.isEmpty() || t.forceResetFilter()
                    }
                }
            }(ce, se), de = function (e) {
                return {
                    setFocusIn: function (t) {
                        e.setIsFocusIn(t), e.toggleFocusStyling()
                    }
                }
            }(re), pe = function (e, t, n, i) {
                return {
                    create: function (o, c, r) {
                        var a = D(), u = i.getButtonHTML();
                        o.innerHTML = "<span></span>" + u;
                        var s = o.querySelector("SPAN"), l = o.querySelector("BUTTON");
                        a.bind(l, "click", r), y(s, e.pickContent), y(l, e.pickButton);
                        var d = E(s, e.pickContent_disabled);
                        return {
                            pickDom: {pickContentElement: s, pickButtonElement: l},
                            pickDomManagerHandlers: {
                                updateData: function () {
                                    s.textContent = n.getText(c.option)
                                }, updateDisabled: function () {
                                    d(c.isOptionDisabled)
                                }, updateComponentDisabled: function () {
                                    l.disabled = t.getDisabled()
                                }
                            },
                            dispose: function () {
                                a.unbind()
                            }
                        }
                    }
                }
            }(g, S, I, (Z = i.pickButtonHTML, {
                getButtonHTML: function () {
                    return Z
                }
            })), fe = function (e, t) {
                return {
                    buildPick: function (n, i) {
                        var o = e.createPickElement(), c = o.pickElement, r = o.attach, a = o.detach, u = t.create(c, n, i),
                            s = u.dispose, l = u.pickDom, d = u.pickDomManagerHandlers;
                        d.updateData(), d.updateDisabled && d.updateDisabled(), d.updateComponentDisabled && d.updateComponentDisabled();
                        var p = {
                            pickDom: l, pickDomManagerHandlers: d, pickElementAttach: r, dispose: function () {
                                a(), s(), p.pickDomManagerHandlers = null, p.pickDom = l, p.pickElementAttach = null, p.dispose = null
                            }
                        };
                        return p
                    }
                }
            }(re, pe), he = function (e, t, n) {
                return {
                    producePick: function (i, o) {
                        var c = n.buildPick(i, (function (e) {
                            return o.removeOnButton(e)
                        })), r = function () {
                            return t.removePick(i, c)
                        };
                        o.removeOnButton = r, c.pickElementAttach();
                        var a = e.add(c).remove;
                        return c.setSelectedFalse = r, c.wrap = i, c.dispose = d(a, (function () {
                            c.setSelectedFalse = null, c.wrap = null
                        }), c.dispose), o.removeAndDispose = function () {
                            return c.dispose()
                        }, c
                    }
                }
            }($, V, fe), ge = function (e) {
                return {
                    createPickHandlers: function (t) {
                        var n = {producePick: null, removeAndDispose: null, removeOnButton: null};
                        return n.producePick = function () {
                            return e.producePick(t, n)
                        }, n
                    }
                }
            }(he), ve = function (e, t) {
                return {
                    toggle: function (n) {
                        var i = e.createPickHandlers(n);
                        return t.addPick(n, i), !0
                    }
                }
            }(ge, _), me = function (e, t) {
                return {
                    fullMatch: function (n) {
                        var i = e.createPickHandlers(n);
                        return t.addPick(n, i), !0
                    }
                }
            }(ge, _), be = function (e, t, n) {
                return {
                    processInput: function () {
                        var i = e.getValue(), o = i.trim(), c = !1;
                        if ("" == o ? c = !0 : t.setFilter(o.toLowerCase()), !c && 1 == t.getNavigateManager().getCount()) {
                            var r = t.getNavigateManager().getHead(), a = t.getFilter();
                            r.choice.searchText == a && n.fullMatch(r) && (e.setEmpty(), c = !0)
                        }
                        return {filterInputValue: i, isEmpty: c}
                    }
                }
            }(ce, G, me), Ce = function (e, t) {
                return {
                    choiceClick: function (n) {
                        e.toggle(n), t.setFocus()
                    }
                }
            }(ve, ce), Ae = function (e, t, n) {
                var i = function (e, i, o) {
                    var c = t.getText(e.option), r = n.getHighlighter();
                    r ? r(o, i, c) : o.textContent = c
                }, o = function (e, n) {
                    n.textContent = t.getText(e.option)
                };
                return {
                    create: function (t, n, c) {
                        var r = null, a = null, u = D();
                        if (u.bind(t, "click", c), n.hasOwnProperty("isOptionSelected")) {
                            t.innerHTML = '<div><input formnovalidate type="checkbox"><label></label></div>';
                            var s = t.querySelector("DIV"), l = s.querySelector("INPUT"), d = s.querySelector("LABEL");
                            y(s, e.choiceContent), y(l, e.choiceCheckBox), y(d, e.choiceLabel), r = {
                                choiceElement: t,
                                choiceContentElement: s,
                                choiceCheckBoxElement: l,
                                choiceLabelElement: d
                            };
                            var p = E(t, e.choice_selected), f = E(t, e.choice_disabled),
                                h = E(l, e.choiceCheckBox_disabled), g = E(d, e.choiceLabel_disabled),
                                v = E(t, {classes: [], styles: {cursor: "default"}}), m = E(t, (function () {
                                    return e.choice_disabled_hover && !0 === n.isOptionDisabled && !1 === n.isOptionSelected ? e.choice_disabled_hover : e.choice_hover
                                }));
                            a = {
                                updateData: function () {
                                    return o(n, d)
                                }, updateHighlighted: function () {
                                    return i(n, r, d)
                                }, updateHoverIn: function () {
                                    m(n.choice.isHoverIn)
                                }, updateDisabled: function () {
                                    f(n.isOptionDisabled), h(n.isOptionDisabled), g(n.isOptionDisabled);
                                    var e = n.isOptionDisabled && !n.isOptionSelected;
                                    l.disabled = e, v(e)
                                }, updateSelected: function () {
                                    p(n.isOptionSelected), l.checked = n.isOptionSelected, (n.isOptionDisabled || n.choice.isHoverIn) && m(n.choice.isHoverIn, !0)
                                }
                            }
                        } else {
                            var b = E(t, (function () {
                                return n.isOptionDisabled && e.choice_disabled_hover ? e.choice_disabled_hover : e.choice_hover
                            }));
                            t.innerHTML = "<span></span>";
                            var C = t.querySelector("SPAN");
                            r = {choiceElement: t, choiceContentElement: C}, a = {
                                updateData: function () {
                                    return o(n, C)
                                }, updateHighlighted: function () {
                                    return i(n, r, t)
                                }, updateHoverIn: function () {
                                    b(n.choice.isHoverIn)
                                }
                            }
                        }
                        return {
                            choiceDom: r, choiceDomManagerHandlers: a, dispose: function () {
                                u.unbind()
                            }
                        }
                    }
                }
            }(g, I, X.highlightAspect), De = function (e, t, n) {
                return {
                    buildChoice: function (i) {
                        var o = e.createChoiceElement(), c = o.choiceElement, r = o.setVisible, a = o.attach, u = o.detach;
                        i.choice.choiceElement = c, i.choice.choiceElementAttach = a, i.choice.isChoiceElementAttached = !0;
                        var s = t.create(c, i, (function () {
                            return n.choiceClick(i)
                        })), l = s.dispose, d = s.choiceDom, p = s.choiceDomManagerHandlers;
                        i.choice.choiceDom = d, p.updateData(), p.updateSelected && p.updateSelected(), p.updateDisabled && p.updateDisabled(), i.choice.choiceDomManagerHandlers = p, i.choice.remove = function () {
                            u()
                        }, i.choice.isFilteredIn = !0, i.choice.setHoverIn = function (e) {
                            i.choice.isHoverIn = e, p.updateHoverIn()
                        }, i.choice.setVisible = function (e) {
                            i.choice.isFilteredIn = e, r(i.choice.isFilteredIn)
                        }, i.choice.dispose = function () {
                            i.choice.choiceDomManagerHandlers = null, l(), i.choice.choiceElement = null, i.choice.choiceDom = null, i.choice.choiceElementAttach = null, i.choice.isChoiceElementAttached = !1, i.choice.remove = null, i.choice.setVisible = null, i.choice.setHoverIn = null, i.choice.dispose = null
                        }, i.dispose = function () {
                            i.choice.dispose(), i.dispose = null
                        }
                    }
                }
            }(te, Ae, Ce), ye = function (e) {
                return {
                    buildAndAttachChoice: function (t, n) {
                        e.buildChoice(t), t.choice.choiceElementAttach(null == n ? void 0 : n())
                    }
                }
            }(De), ke = {
                resetLayout: function () {
                    return le.resetFilter()
                }
            }, Ee = function (e, t, n, i) {
                return {
                    attach: function (o) {
                        var c = e.createWrap(o);
                        c.choice = t.createChoiceBase(o), i.push(c), n.buildAndAttachChoice(c)
                    }
                }
            }(M, x, ye, J), Pe = function (e, t) {
                return {
                    loop: function () {
                        for (var n = e.getOptions(), i = 0; i < n.length; i++) {
                            var o = n[i];
                            t.attach(o)
                        }
                    }
                }
            }(L, Ee), Se = function (e, t, n, i, o) {
                return {
                    updateData: function () {
                        o.resetLayout(), e.choicesListElement.innerHTML = "", t.clear(), n.forEach((function (e) {
                            return e.dispose()
                        })), n.reset(), i.loop()
                    }
                }
            }(te, J, $, Pe, ke), Le = function (e) {
                return {
                    update: function () {
                        e.updateData()
                    }
                }
            }(Se), Ie = function (e) {
                return {
                    load: function () {
                        e.loop()
                    }
                }
            }(Pe);
        c(X, ((r = {
            staticDom: ie,
            picksDom: re,
            choicesDom: te,
            filterDom: ce,
            resetLayoutAspect: ke,
            pickDomFactory: pe,
            choiceDomFactory: Ae,
            choicesVisibilityAspect: ue,
            staticManager: oe,
            buildChoiceAspect: De,
            optionToggleAspect: ve,
            choiceClickAspect: Ce,
            buildAndAttachChoiceAspect: ye,
            optionsLoopAspect: Pe,
            optionAttachAspect: Ee,
            buildPickAspect: fe,
            producePickAspect: he,
            createPickHandlersAspect: ge,
            inputAspect: be,
            resetFilterListAspect: se,
            resetFilterAspect: le,
            specialPicksEventsAspect: ae
        }).resetLayoutAspect = ke, r.focusInAspect = de, r.loadAspect = Ie, r.updateDataAspect = Se, r.updateAspect = Le, r.fullMatchAspect = me, r));
        var He = function (e, t) {
            var n = [];
            if (e) for (var i = 0; i < e.length; i++) {
                var o = e[i](t);
                o && n.push(o)
            }
            var c = [];
            return {
                buildApi: function (e) {
                    for (var t = 0; t < n.length; t++) {
                        var i, o, r = null == (i = (o = n[t]).buildApi) ? void 0 : i.call(o, e);
                        r && c.push(r)
                    }
                }, dispose: function () {
                    for (var e = 0; e < c.length; e++) c[e]();
                    c = null;
                    for (var t = 0; t < n.length; t++) {
                        var i, o;
                        null == (i = (o = n[t]).dispose) || i.call(o)
                    }
                    n = null
                }
            }
        }(n, X), we = F(X), Oe = {component: "BsMultiSelect.api"};
        return He.buildApi(Oe), Oe.dispose = d(ke.resetLayout, (function () {
            A.dispose()
        }), He.dispose, (function () {
            $.forEach((function (e) {
                return e.dispose()
            }))
        }), we.dispose, J.dispose, oe.dispose, re.dispose, ce.dispose), Oe.updateData = function () {
            Se.updateData()
        }, Oe.update = function () {
            Le.update()
        }, null == o || o(Oe, X), re.pickFilterElement.appendChild(ce.filterInputElement), re.picksElement.appendChild(re.pickFilterElement), oe.appendToContainer(), Ie.load(), Oe
    }

    var _ = [{
            old: "selectedPanelDisabledBackgroundColor",
            opt: "picks_disabled",
            style: "backgroundColor"
        }, {
            old: "selectedPanelFocusValidBoxShadow",
            opt: "picks_focus_valid",
            style: "boxShadow"
        }, {
            old: "selectedPanelFocusInvalidBoxShadow",
            opt: "picks_focus_invalid",
            style: "boxShadow"
        }, {old: "selectedPanelDefMinHeight", opt: "picks_def", style: "minHeight"}, {
            old: "selectedPanelLgMinHeight",
            opt: "picks_lg",
            style: "minHeight"
        }, {
            old: "selectedPanelSmMinHeight",
            opt: "picks_sm",
            style: "minHeight"
        }, {old: "selectedItemContentDisabledOpacity", opt: "choiceLabel_disabled", style: "opacity"}],
        V = [{old: "dropDownMenuClass", opt: "choices"}, {
            old: "dropDownItemClass",
            opt: "choice"
        }, {old: "dropDownItemHoverClass", opt: "choice_hover"}, {
            old: "selectedPanelClass",
            opt: "picks"
        }, {old: "selectedItemClass", opt: "pick"}, {
            old: "removeSelectedItemButtonClass",
            opt: "pickButton"
        }, {old: "filterInputItemClass", opt: "pickFilter"}, {
            old: "filterInputClass",
            opt: "filterInput"
        }, {old: "selectedPanelFocusClass", opt: "picks_focus"}, {
            old: "selectedPanelDisabledClass",
            opt: "picks_disabled"
        }, {old: "selectedItemContentDisabledClass", opt: "pick_disabled"}];

    function B(e, t) {
        var n = {containerClass: "dashboardcode-bsmultiselect"};
        return function (e, t) {
            for (var n = 0; n < e.length; n++) {
                var i, o;
                null == (i = (o = e[n]).plugDefaultConfig) || i.call(o, t)
            }
        }(t, n), {
            create: function (i, o) {
                var r;
                o && o.plugins && console.log("DashboarCode.BsMultiSelect: 'options.plugins' is depricated, use - MultiSelectBuilder(environment, plugins) instead");
                var a, u, s = {};
                o instanceof Function ? (a = o, o = null) : a = null == (u = o) ? void 0 : u.buildConfiguration;
                o && function (e) {
                    e.css || (e.css = {});
                    var t = e.css;
                    e.cssPatch || (e.cssPatch = {});
                    var n = e.cssPatch;
                    if ((e.selectedPanelFocusBorderColor || e.selectedPanelFocusBoxShadow) && (console.log("DashboarCode.BsMultiSelect: selectedPanelFocusBorderColor and selectedPanelFocusBoxShadow are depricated, use - cssPatch:{picks_focus:{borderColor:'myValue', boxShadow:'myValue'}}"), n.picks_focus || (n.picks_focus = {
                        boxShadow: e.selectedPanelFocusBoxShadow,
                        borderColor: e.selectedPanelFocusBorderColor
                    }), delete e.selectedPanelFocusBorderColor, delete e.selectedPanelFocusBoxShadow), _.forEach((function (t) {
                        if (e[t.old]) {
                            if (console.log("DashboarCode.BsMultiSelect: " + t.old + " is depricated, use - cssPatch:{" + t.opt + ":{" + t.style + ":'myValue'}}"), !e[t.opt]) {
                                var n = {};
                                n[t.style] = e[t.old], e.cssPatch[t.opt] = n
                            }
                            delete e[t.old]
                        }
                    })), V.forEach((function (n) {
                        e[n.old] && (console.log("DashboarCode.BsMultiSelect: " + n.old + " is depricated, use - css:{" + n.opt + ":'myValue'}"), t[n.opt] || (t[n.opt] = e[n.old]), delete e[n.old])
                    })), e.inputColor && (console.log("DashboarCode.BsMultiSelect: inputColor is depricated, remove parameter"), delete e.inputColor), e.useCss && (console.log("DashboarCode.BsMultiSelect: useCss(=true) is depricated, use - 'useCssPatch: false'"), t.pick_disabled || (e.useCssPatch = !e.useCss), delete e.useCss), e.getIsValid || e.getIsInValid) throw"DashboarCode.BsMultiSelect: parameters getIsValid and getIsInValid are depricated and removed, use - getValidity that should return (true|false|null) "
                }(o), s.css = H(n.css, null == (r = o) ? void 0 : r.css), function (e, t, n, i) {
                    for (var o = 0; o < e.length; o++) {
                        var c, r;
                        null == (c = (r = e[o]).plugMergeSettings) || c.call(r, t, n, i)
                    }
                }(t, s, n, o), c(s, o), c(s, n);
                var l = null == a ? void 0 : a(i, s);
                return x(i, e, t, s, l)
            }, defaultSettings: n
        }
    }

    function T(e, t, n, i, c, a) {
        var u = null, s = t && !e.document.body.hasAttribute("data-bs-no-jquery");
        u = s ? function (e, n) {
            return t(e).trigger(n)
        } : function (e) {
            return "function" == typeof e.Event ? function (t, n) {
                var i = new e.Event(n);
                t.dispatchEvent(i)
            } : function (t, n) {
                var i = e.document.createEvent("CustomEvent");
                i.initCustomEvent(n, !1, !1, void 0), t.dispatchEvent(i)
            }
        }(e);
        var l = r({stylePlugin: a}, c), p = B({trigger: u, window: e, globalPopper: n}, function (e) {
            var t = [];
            for (var n in e) t.push(e[n]);
            return t
        }(l)), f = p.create, h = p.defaultSettings, g = function (t, n) {
            return o(t) && (t = e.document.querySelector(t)), f(t, n)
        };
        if (g.Default = h, s) {
            (function (e, t, n) {
                var i = e.charAt(0), o = i.toLowerCase();
                if (o == i) throw new Error("Plugin name '" + e + "' should be started from upper case char");
                var c = o + e.slice(1), r = n.fn[c], a = n.fn[e], u = "DashboardCode." + e;

                function s(e, n, i) {
                    var o = t(n, "object" == typeof e || e instanceof Function ? e : null, (function () {
                        i.removeData(u)
                    }));
                    return i.data(u, o), o
                }

                function l(e) {
                    var t = [];
                    return this.each((function (i, o) {
                        var c = n(o), r = c.data(u), a = "string" == typeof e;
                        if (!r) {
                            if (a && /Dispose/.test(e)) return;
                            r = s(e, o, c)
                        }
                        if (a) {
                            var l = e;
                            if ("undefined" == typeof r[l]) {
                                var d = l.charAt(0).toLowerCase() + l.slice(1);
                                if ("undefined" == typeof r[d]) throw new Error("No method named '" + l + "'");
                                l = d
                            }
                            var p = r[l]();
                            void 0 !== p && t.push(p)
                        }
                    })), 0 == t.length ? this : 1 == t.length ? t[0] : t
                }

                function d(e) {
                    var t = this.data(u);
                    if (t) return t;
                    if (1 === this.length) return s(e, this.get(0), this);
                    if (this.length > 1) {
                        var i = [];
                        return this.each((function (t, o) {
                            i.push(s(e, o, n(o)))
                        })), i
                    }
                }

                return n.fn[c] = l, n.fn[c].noConflict = function () {
                    return n.fn[c] = r, l
                }, n.fn[e] = d, n.fn[e].noConflict = function () {
                    return n.fn[e] = a, d
                }, l
            }(i, (function (e, t, n) {
                var i = f(e, t);
                return i.dispose = d(i.dispose, n), i
            }), t)).defaults = h
        }
        return g
    }

    function N(e) {
        var t = e.staticDom, n = e.filterDom, i = e.getLabelElementAspect, o = e.configuration, c = e.loadAspect,
            r = e.disposeAspect, a = function (e, t, n, i, o) {
                return {
                    update: function () {
                        var c = null, r = e.selectElement, a = e.containerElement, u = t.filterInputElement;
                        c = r ? function () {
                            return n + "-generated-input-" + (r.id ? r.id : r.name).toLowerCase() + "-id"
                        } : function () {
                            return n + "-generated-filter-" + a.id
                        };
                        var s = i.getLabelElement();
                        if (s) {
                            var l = s.getAttribute("for"), p = c();
                            u.setAttribute("id", p), s.setAttribute("for", p), l && (o.dispose = d(o.dispose, (function () {
                                return s.setAttribute("for", l)
                            })))
                        }
                    }
                }
            }(t, n, o.containerClass, i, r);
        e.labelForAttributeAspect = a, c.load = d(c.load, (function () {
            return a.update()
        }))
    }

    function R(e) {
        var t = e.configuration, n = e.rtlAspect, o = e.staticDom, c = t.isRtl, r = !1;
        i(c) ? r = !0 : c = A(o.initialElement);
        var a, u = (a = [], {
            set: function (e, t, n) {
                var i = e.getAttribute(t);
                a.push({element: e, currentAtribute: i, attribute: n}), e.setAttribute(t, n)
            }, restore: function () {
                a.forEach((function (e) {
                    var t = e.element, n = e.attributeName, i = e.attribute;
                    n ? t.setAttribute(n, i) : t.removeAttribute(n)
                }))
            }
        });
        if (r) u.set(o.containerElement, "dir", "rtl"); else if (o.selectElement) {
            var s = o.selectElement.getAttribute("dir");
            s && u.set(o.containerElement, "dir", s)
        }
        return {
            buildApi: function (e) {
                n.updateRtl(c)
            }, dispose: function () {
                u.restore()
            }
        }
    }

    function W(e, t, n, i, o) {
        var c = "", r = "", a = null;

        function u(t, o) {
            a = function (e, t) {
                return Object.freeze({valueMissing: e, customError: t, valid: !(e || t)})
            }(t, o), r = o ? c : t ? n : "", e.setCustomValidity(r), i(a.valid)
        }

        u(t.getValue(), !1), t.attach((function (e) {
            u(e, a.customError)
        }));
        var s = function () {
            return a.valid || o("dashboardcode.multiselect:invalid"), a.valid
        };
        return {
            validationMessage: r, willValidate: !0, validity: a, setCustomValidity: function (e) {
                c = e, u(a.valueMissing, !!c)
            }, checkValidity: s, reportValidity: function () {
                return e.reportValidity(), s()
            }
        }
    }

    N.plugDefaultConfig = function (e) {
        e.label = null
    }, N.plugStaticDom = function (e) {
        var t;
        e.getLabelElementAspect = (t = e.configuration.label, {
            getLabelElement: function () {
                p(t)
            }
        })
    }, R.plugStaticDom = function (e) {
        e.rtlAspect = {
            updateRtl: function () {
            }
        }
    };

    function q(e) {
        var t = e.configuration, n = e.triggerAspect, o = e.onChangeAspect, c = e.optionsAspect, r = e.staticDom,
            a = e.filterDom, u = e.updateDataAspect, l = t.getIsValueMissing, h = t.valueMissingMessage, g = t.required,
            v = t.getValueRequired;
        i(g) || (g = v()), h = p(h, (function () {
            return b(r.initialElement, "bsmultiselect", "value-missing-message")
        }), "Please select an item in the list"), l || (l = function () {
            for (var e = 0, t = c.getOptions(), n = 0; n < t.length; n++) t[n].selected && e++;
            return 0 === e
        });
        var m, C, A = f((function () {
            return g && l()
        })), D = (m = !A.getValue(), C = s(), {
            getValue: function () {
                return m
            }, setValue: function (e) {
                m = e, C.forEach((function (t) {
                    return t(e)
                }))
            }, attach: function (e) {
                return C.add(e)
            }, detachAll: function () {
                C.reset()
            }
        });
        o.onChange = d(A.call, o.onChange), u.updateData = d(A.call, u.updateData), e.validationApiPluginData = {validationApiObservable: D};
        var y = W(a.filterInputElement, A, h, (function (e) {
            return D.setValue(e)
        }), n.trigger);
        return {
            buildApi: function (e) {
                e.validationApi = y
            }, dispose: function () {
                A.detachAll(), D.detachAll()
            }
        }
    }

    function U(e) {
        var t, n = e.configuration, i = e.validationApiPluginData, o = e.picksDom, c = e.staticDom,
            r = e.getLabelElementAspect, a = e.updateAppearanceAspect, u = e.componentPropertiesAspect,
            s = e.floatingLabelAspect, l = n.getValidity, p = n.getSize, h = n.useCssPatch, g = n.css,
            m = n.composeGetSize, b = n.getDefaultLabel, C = c.selectElement, A = c.initialElement, D = !1;
        if (s && (D = v(A, "form-floating"), s.isFloatingLabel = function () {
            return D
        }), r) {
            var k = r.getLabelElement;
            r.getLabelElement = function () {
                var e = k();
                return e || (C ? b(C) : void 0)
            }
        }
        if (c.selectElement ? (l || (l = function (e) {
            return function () {
                return !e.classList.contains("is-invalid") && (!!e.classList.contains("is-valid") || null)
            }
        }(C)), p || (p = m(C))) : (l || (l = function () {
            return null
        }), p || (p = function () {
            return null
        })), u.getSize = p, u.getValidity = l, h) {
            var E = g.picks_lg, P = g.picks_sm, S = g.picks_def, L = g.picks_floating_def;
            D && (E = P = S = L), t = function () {
                return function (e, t, n, i, o) {
                    !function (e, t, n, i, o) {
                        z(e, o), function (e, t, n, i, o) {
                            y(e, "lg" == o ? t : "sm" == o ? n : i)
                        }(e, t, n, i, o)
                    }(e, t, n, i, o())
                }(o.picksElement, E, P, S, p)
            }
        } else t = function () {
            return function (e, t) {
                z(e, t())
            }(o.picksElement, p)
        };
        if (h) {
            var I = o.toggleFocusStyling;
            o.toggleFocusStyling = function () {
                var e = M.getValue(), t = o.getIsFocusIn();
                I(t), t && (!1 === e ? (o.setIsFocusIn(t), y(o.picksElement, g.picks_focus_invalid)) : !0 === e && (o.setIsFocusIn(t), y(o.picksElement, g.picks_focus_valid)))
            }
        }
        var H = f((function () {
            return !!v(c.initialElement, "was-validated")
        })), w = f((function () {
            return l()
        })), O = null == i ? void 0 : i.validationApiObservable, M = f((function () {
            return H.getValue() ? O.getValue() : w.getValue()
        }));
        return M.attach((function (e) {
            var t = function (e) {
                var t = function (e) {
                    var t = [];
                    if (e.parentNode) {
                        var n = e.parentNode.children, i = e.parentNode.children.length;
                        if (n.length > 1) for (var o = 0; o < i; ++o) {
                            var c = n[o];
                            c != e && t.push(c)
                        }
                    }
                    return t
                }(e), n = t.filter((function (e) {
                    return e.classList.contains("invalid-feedback") || e.classList.contains("invalid-tooltip")
                }));
                return {
                    validMessages: t.filter((function (e) {
                        return e.classList.contains("valid-feedback") || e.classList.contains("valid-tooltip")
                    })), invalidMessages: n
                }
            }(c.containerElement), n = t.validMessages, i = t.invalidMessages;
            !function (e, t, n, i) {
                !1 === i ? (e.classList.add("is-invalid"), e.classList.remove("is-valid"), n.map((function (e) {
                    return e.style.display = "block"
                })), t.map((function (e) {
                    return e.style.display = "none"
                }))) : !0 === i ? (e.classList.remove("is-invalid"), e.classList.add("is-valid"), n.map((function (e) {
                    return e.style.display = "none"
                })), t.map((function (e) {
                    return e.style.display = "block"
                }))) : (e.classList.remove("is-invalid"), e.classList.remove("is-valid"), n.map((function (e) {
                    return e.style.display = ""
                })), t.map((function (e) {
                    return e.style.display = ""
                })))
            }(o.picksElement, n, i, e), o.toggleFocusStyling()
        })), H.attach((function () {
            return M.call()
        })), O && O.attach((function () {
            return M.call()
        })), w.attach((function () {
            return M.call()
        })), a.updateAppearance = d(a.updateAppearance, t, M.call, w.call), {
            buildApi: function (e) {
                e.updateSize = t, e.updateValidity = function () {
                    return w.call()
                }, e.updateWasValidated = function () {
                    return H.call()
                }
            }, dispose: function () {
                H.detachAll(), M.detachAll(), w.detachAll()
            }
        }
    }

    function z(e, t) {
        "lg" == t ? (e.classList.add("form-control-lg"), e.classList.remove("form-control-sm")) : "sm" == t ? (e.classList.remove("form-control-lg"), e.classList.add("form-control-sm")) : (e.classList.remove("form-control-lg"), e.classList.remove("form-control-sm"))
    }

    function j(e) {
        e.updateSelected = function () {
        }, e.choice.isChoiceElementAttached = !1, e.choice.choiceElement = null, e.choice.choiceElementAttach = null, e.choice.setVisible = null, e.choice.setHoverIn = null, e.choice.remove = null, e.choice.dispose = function () {
            e.choice.dispose = null
        }, e.dispose = function () {
            e.choice.dispose(), e.dispose = null
        }
    }

    function G(e, t, n, i, o, c) {
        var r = o(e.option);
        if (r != e.isOptionHidden) if (e.isOptionHidden = r, e.isOptionHidden) i.remove(e), e.choice.remove(), j(e); else {
            var a = n(t);
            i.add(e, a), c.buildChoice(e), e.choice.choiceElementAttach(null == a ? void 0 : a.choice.choiceElement)
        }
    }

    function K() {
    }

    function Q(e) {
        var t, n, i = e.configuration, o = e.staticManager, c = e.picksList, r = e.picksDom, a = e.filterDom,
            u = e.staticDom, s = e.updateDataAspect, l = e.resetFilterListAspect, p = e.filterManagerAspect,
            f = e.environment.isIE11, h = i.placeholder, g = i.css, v = r.picksElement, m = a.filterInputElement;

        function C(e) {
            m.placeholder = e
        }

        if (f) {
            var A = (n = !1, {
                get: function () {
                    return n
                }, set: function () {
                    n = !0
                }, reset: function () {
                    n = !1
                }
            }), D = (t = A, {
                get: function () {
                    return t.get()
                }, reset: function () {
                    return t.reset()
                }
            }), y = C;
            C = function (e) {
                A.set(), y(e)
            }, e.placeholderStopInputAspect = D
        }

        function k(e) {
            m.style.width = e ? "100%" : "2ch"
        }

        h || (h = b(u.initialElement, "bsmultiselect", "placeholder"));
        var P = E(m, g.filterInput_empty);

        function S(e) {
            e ? (C(h || ""), v.style.display = "block") : (C(""), v.style.display = "flex"), P(e), k(e)
        }

        S(!0);
        var L = function () {
            return c.isEmpty() && a.isEmpty()
        };

        function I() {
            S(L())
        }

        function H() {
            k(L())
        }

        var w = r.disable;
        r.disable = function (e) {
            !function (e) {
                m.disabled = e
            }(e), w(e)
        }, o.appendToContainer = d(o.appendToContainer, H), p.processEmptyInput = d(H, p.processEmptyInput), l.forceResetFilter = d(l.forceResetFilter, I);
        var O = c.add;
        c.add = function (e) {
            var t = O(e);
            return 1 == c.getCount() && (a.isEmpty() ? (C(""), v.style.display = "flex", P(!1), m.style.width = "2ch") : v.style.display = "flex"), e.dispose = d(e.dispose, (function () {
                L() && S(!0)
            })), t
        }, s.updateData = d(s.updateData, I)
    }

    function $(e) {
        var t = e.staticDom, n = e.choicesDom, i = e.filterDom, o = e.picksList, c = e.picksDom;
        return {
            buildApi: function (e) {
                e.getContainer = function () {
                    return t.containerElement
                }, e.getChoices = function () {
                    return n.choicesElement
                }, e.getChoicesList = function () {
                    return n.choicesListElement
                }, e.getFilterInput = function () {
                    return i.filterInputElement
                }, e.getPicks = function () {
                    return c.picksElement
                }, e.picksCount = function () {
                    return o.getCount()
                }
            }
        }
    }

    function J(e) {
        var t = e.buildAndAttachChoiceAspect, n = e.wraps, i = e.wrapsCollection, o = e.createWrapAspect,
            c = e.createChoiceBaseAspect, r = e.optionsAspect, a = e.resetLayoutAspect;
        return {
            buildApi: function (e) {
                e.updateOptionAdded = function (e) {
                    var a = r.getOptions()[e], u = o.createWrap(a);
                    u.choice = c.createChoiceBase(a), n.insert(e, u);
                    t.buildAndAttachChoice(u, (function () {
                        var t;
                        return null == (t = i.getNext(e, (function (e) {
                            return e.choice.choiceElement
                        }))) ? void 0 : t.choice.choiceElement
                    }))
                }, e.updateOptionRemoved = function (e) {
                    a.resetLayout();
                    var t = n.remove(e);
                    null == t.choice.remove || t.choice.remove(), null == t.dispose || t.dispose()
                }
            }
        }
    }

    function X(e) {
        var t = e.loadAspect, n = e.environment, i = t.loop, o = n.window.document;
        t.loop = function () {
            if ("loading" != o.readyState) i(); else {
                o.addEventListener("DOMContentLoaded", (function e() {
                    i(), o.removeEventListener("DOMContentLoaded", e)
                }))
            }
        }
    }

    function Y(e) {
        var t = e.configuration, n = e.wrapsCollection, i = e.updateOptionsSelectedAspect, o = e.createWrapAspect,
            c = e.buildChoiceAspect, r = e.removePickAspect, a = e.resetLayoutAspect, u = e.picksList,
            s = e.isChoiceSelectableAspect, l = e.optionToggleAspect, p = e.createPickHandlersAspect,
            f = e.addPickAspect, h = e.fullMatchAspect, g = e.onChangeAspect, v = e.filterPredicateAspect,
            m = t.getSelected, b = t.setSelected, C = v.filterPredicate;
        v.filterPredicate = function (e, t) {
            return !e.isOptionSelected && C(e, t)
        };
        var A = c.buildChoice;

        function D(e, t) {
            return function () {
                e.isOptionSelected = t, e.updateSelected()
            }
        }

        function y(e, t, n) {
            var i = !1;
            return !1 !== b(e, n) && (t(), i = !0), i
        }

        c.buildChoice = function (e) {
            A(e), e.updateSelected = function () {
                e.choice.choiceDomManagerHandlers.updateSelected(), g.onChange()
            }, e.dispose = d((function () {
                e.updateSelected = null
            }), e.dispose)
        };
        var k = o.createWrap;
        o.createWrap = function (e) {
            var t = k(e);
            return t.isOptionSelected = m(e), t.updateSelected = null, t
        }, l.toggle, l.toggle = function (e) {
            return y(e.option, D(e, !e.isOptionSelected), !e.isOptionSelected)
        }, h.fullMatch, h.fullMatch = function (e) {
            return y(e.option, D(e, !0), !0)
        }, r.removePick, r.removePick = function (e, t) {
            return y(e.option, D(e, !1), !1)
        };
        var E = p.createPickHandlers;
        p.createPickHandlers = function (e) {
            var t = E(e);
            return e.updateSelected = d((function () {
                if (e.isOptionSelected) {
                    var n = t.producePick();
                    e.pick = n, n.dispose = d(n.dispose, (function () {
                        e.pick = null
                    }))
                } else t.removeAndDispose(), t.removeAndDispose = null
            }), e.updateSelected), f.addPick(e, t), t
        };
        var P = f.addPick;
        return f.addPick = function (e, t) {
            if (e.isOptionSelected) {
                var n = P(e, t);
                return e.pick = n, n.dispose = d(n.dispose, (function () {
                    e.pick = null
                })), n
            }
        }, {
            buildApi: function (e) {
                e.selectAll = function () {
                    a.resetLayout(), n.forLoop((function (e) {
                        s.isSelectable(e) && !e.isOptionSelected && y(e.option, D(e, !0), !0)
                    }))
                }, e.deselectAll = function () {
                    a.resetLayout(), u.forEach((function (e) {
                        return e.setSelectedFalse()
                    }))
                }, e.setOptionSelected = function (e, t) {
                    var i = n.get(e);
                    return y(i.option, D(i, t), t)
                }, e.updateOptionsSelected = function () {
                    return i.updateOptionsSelected()
                }, e.updateOptionSelected = function (e) {
                    return Z(n.get(e), m)
                }
            }
        }
    }

    function Z(e, t) {
        var n = t(e.option);
        n != e.isOptionSelected && (e.isOptionSelected = n, null == e.updateSelected || e.updateSelected())
    }

    function ee(e, t) {
        var n = t(e.option);
        n != e.isOptionDisabled && (e.isOptionDisabled = n, null == e.updateDisabled || e.updateDisabled())
    }

    function te(e) {
        var t = e.picksList, n = e.createWrapAspect, i = e.createPickHandlersAspect, o = e.addPickAspect;
        return {
            buildApi: function (e) {
                e.forEachPeak = function (e) {
                    return t.forEach((function (t) {
                        return e(t.option)
                    }))
                }, e.getTailPeak = function () {
                    var e;
                    return null == (e = t.getTail()) ? void 0 : e.option
                }, e.countPeaks = function () {
                    return t.getCount()
                }, e.isEmptyPeaks = function () {
                    return t.isEmpty()
                }, e.addPick = function (e) {
                    var t = n.createWrap(e);
                    t.updateDisabled = function () {
                    }, t.updateHidden = function () {
                    };
                    var c = i.createPickHandlers(t);
                    o.addPick(t, c)
                }
            }
        }
    }

    function ne(e) {
        var t = e.configuration;
        e.inputAspect, e.filterDom, e.filterManagerAspect, t.picks, t.addOptionPicked
    }

    function ie(e) {
        var t, n = e.environment, i = n.createPopper, o = n.Popper, c = n.globalPopper, r = null, a = null;
        if (o) t = o, a = i = function (e, n, i) {
            return new t(e, n, i)
        }, r = oe; else if (i) a = i, r = ce; else {
            if (!c) throw new Error("BsMultiSelect: Popper component (https://popper.js.org) is required");
            c.createPopper ? (a = c.createPopper, r = ce) : (a = i = function (e) {
                return function (t, n, i) {
                    return new e(t, n, i)
                }
            }(c), r = oe)
        }
        e.createPopperAspect = function (e, t) {
            return {
                createPopper: function (n, i, o) {
                    var c = {placement: "bottom-start", modifiers: t(o)}, r = null;
                    return {
                        init: function () {
                            r = e(i, n, c)
                        }, update: function () {
                            r.update()
                        }, setRtl: function (e) {
                            e && (c.placement = "bottom-end")
                        }, dispose: function () {
                            r.destroy()
                        }
                    }
                }
            }
        }(a, r)
    }

    function oe(e) {
        return {preventOverflow: {enabled: e}, hide: {enabled: !1}, flip: {enabled: !1}}
    }

    function ce(e) {
        var t = [{name: "flip", options: {fallbackPlacements: ["bottom"]}}];
        return e && t.push({name: "preventOverflow"}), t
    }

    function re(e) {
        var t = e.configuration, n = e.picksList, i = e.picksDom, o = e.filterDom, c = e.staticDom,
            r = e.updateDataAspect, a = e.resetFilterListAspect, u = e.floatingLabelAspect, s = t.css,
            l = t.getDefaultLabel, p = c.initialElement;
        if (u.isFloatingLabel()) {
            var f = function () {
                    !function (e) {
                        v(e), m(e)
                    }(!b())
                }, h = l(p), g = i.picksElement, v = E(h, s.label_floating_lifted), m = E(g, s.picks_floating_lifted),
                b = function () {
                    return n.isEmpty() && o.isEmpty() && !i.getIsFocusIn()
                };
            f(), a.forceResetFilter = d(a.forceResetFilter, f);
            var C = n.add;
            n.add = function (e) {
                var t = C(e);
                return 1 == n.getCount() && f(), e.dispose = d(e.dispose, (function () {
                    0 == n.getCount() && f()
                })), t
            };
            var A = i.toggleFocusStyling;
            i.toggleFocusStyling = function () {
                var e = i.getIsFocusIn();
                A(e), f()
            }, r.updateData = d(r.updateData, f)
        }
    }

    function ae(e) {
        if (e.configuration.useChoicesDynamicStyling) {
            var t = e.choicesVisibilityAspect, n = e.specialPicksEventsAspect, i = t.setChoicesVisible;
            e.choicesVisibilityAspect.setChoicesVisible = function (t) {
                t && ue(e), i(t)
            };
            var o = n.backSpace;
            n.backSpace = function (t) {
                o(t), ue(e)
            }
        }
    }

    function ue(e) {
        var t = e.configuration, n = e.environment, i = e.choicesDom, o = e.navigateAspect, c = n.window,
            r = i.choicesElement, a = t.minimalChoicesDynamicStylingMaxHeight,
            u = c.document.getElementsByTagName("body")[0], s = c.document.documentElement,
            l = (c.innerHeight || s.clientHeight || u.clientHeight) - r.parentNode.getBoundingClientRect().top,
            d = Math.max(a, Math.round(.85 * l));
        if (r.style.setProperty("max-height", d + "px"), r.style.setProperty("overflow-y", "auto"), !i.ChoicesDynamicStylingPlugin_scrollHandle) {
            i.ChoicesDynamicStylingPlugin_scrollHandle = !0;
            var p = o.navigate;
            o.navigate = function (e) {
                var t = p(e);
                return null != t && null != t.choice && null != t.choice.choiceElement && t.choice.choiceElement.scrollIntoView(!1), t
            }
        }
    }

    q.plugDefaultConfig = function (e) {
        e.getValueRequired = function () {
            return !1
        }, e.valueMissingMessage = ""
    }, K.plugMergeSettings = function (e, t, n) {
        var o = null == n ? void 0 : n.cssPatch;
        if (i(o)) throw new Error("BsMultiSelect: 'cssPatch' was used instead of 'useCssPatch'");
        e.cssPatch = H(t.cssPatch, o)
    }, K.plugStaticDom = function (e) {
        var t = e.configuration;
        t.useCssPatch && function (e, t) {
            for (var n in t) {
                var i = t[n], o = e[n];
                e[n] = void 0 === o ? L(i) : I(!1, o, i)
            }
        }(t.css, t.cssPatch)
    }, X.plugStaticDom = function (e) {
        var t = e.configuration, n = e.staticDomFactory, i = e.createElementAspect, o = e.componentPropertiesAspect,
            c = e.onChangeAspect, r = e.triggerAspect, a = e.optionsAspect, u = e.optGroupAspect, s = e.disposeAspect,
            l = n.create;
        n.create = function (e) {
            var n = l(e), p = n.choicesDom, f = n.createStaticDom, m = p.choicesElement;
            return {
                choicesDom: p, createStaticDom: function (e, n) {
                    var l = null, p = null, b = null;
                    if ("SELECT" == e.tagName) l = e, n && (p = v(l, n)) && (b = h(p, "UL")); else if ("DIV" == e.tagName) {
                        if (!(l = h(e, "SELECT"))) return f(e, n);
                        n && (p = v(e, n)) && (b = h(p, "UL"))
                    }
                    var C = !1;
                    p || ((p = i.createElement("DIV")).classList.add(n), C = !0);
                    var A = !1;
                    if (b || (b = i.createElement("UL"), A = !0), l) {
                        var D = l.style.display;
                        l.style.display = "none";
                        var y = l.required;
                        if (t.getValueRequired = function () {
                            return y
                        }, !0 === l.required && (l.required = !1), !t.getDisabled) {
                            var k = g(l, "FIELDSET");
                            o.getDisabled = k ? function () {
                                return l.disabled || k.disabled
                            } : function () {
                                return l.disabled
                            }
                        }
                        c.onChange = d((function () {
                            return r.trigger("change")
                        }), c.onChange), a.getOptions = function () {
                            return l.options
                        }, u && (u.getOptionOptGroup = function (e) {
                            return e.parentNode
                        }, u.getOptGroupText = function (e) {
                            return e.label
                        }, u.getOptGroupId = function (e) {
                            return e.id
                        }), s.dispose = d(s.dispose, (function () {
                            l.required = y, l.style.display = D
                        }))
                    }
                    return {
                        staticDom: {
                            initialElement: e,
                            containerElement: p,
                            picksElement: b,
                            isDisposablePicksElement: A,
                            selectElement: l
                        }, staticManager: {
                            appendToContainer: function () {
                                C ? (l.parentNode.insertBefore(p, l.nextSibling), p.appendChild(m)) : l.parentNode.insertBefore(m, l.nextSibling), A && p.appendChild(b)
                            }, dispose: function () {
                                m.parentNode.removeChild(m), C && l.parentNode.removeChild(p), A && p.removeChild(b)
                            }
                        }
                    }
                }
            }
        }
    }, Y.plugStaticDom = function (e) {
        var t = e.configuration, n = e.wrapsCollection, i = t.getSelected, o = t.setSelected;
        t.options ? (o || (o = function (e, t) {
            e.selected = t
        }), i || (i = function (e) {
            return e.selected
        })) : (i || (i = function (e) {
            return e.selected
        }), o || (o = function (e, t) {
            e.selected = t
        })), t.getSelected = i, t.setSelected = o, e.updateOptionsSelectedAspect = function (e, t) {
            return {
                updateOptionsSelected: function () {
                    e.forLoop((function (e) {
                        return Z(e, t)
                    }))
                }
            }
        }(n, i)
    }, ne.plugStaticDom = function (e) {
        var t = e.configuration, n = e.picksList, i = t.picks;
        if (i) {
            var o = n.add, c = n.reset;
            n.add = function (e) {
                var t = o(e), n = t.remove, c = t.index;
                return i.push(e), {
                    remove: d(n, (function () {
                        i.splice(c(), 1)
                    })), index: c
                }
            }, n.reset = function () {
                c(), i.length = 0
            }
        }
    }, re.plugStaticDom = function (e) {
        e.floatingLabelAspect = {
            isFloatingLabel: function () {
            }
        }
    }, ae.plugDefaultConfig = function (e) {
        e.useChoicesDynamicStyling = !1, e.choicesDynamicStyling = ue, e.minimalChoicesDynamicStylingMaxHeight = 20
    };

    function se(e) {
        var t = e.configuration, n = e.choicesDom, i = e.createElementAspect, o = e.staticManager, c = t.css;
        t.isNoResultsWarningEnabled && (e.warningAspect = function (e, t, n, i) {
            var o = e.choicesElement, c = t.createElement("DIV"), r = n.appendToContainer;
            return n.appendToContainer = function () {
                r(), o.parentNode.insertBefore(c, o.nextSibling)
            }, c.style.display = "none", y(c, i.warning), {
                warningElement: c, show: function (e) {
                    c.style.display = "block", c.innerHTML = e
                }, hide: function () {
                    c.style.display = "none", c.innerHTML = ""
                }
            }
        }(n, i, o, c))
    }

    function le(e) {
        var t = e.highlightAspect, n = e.filterManagerAspect, i = e.buildChoiceAspect;
        if (t) {
            var o = n.processEmptyInput;
            n.processEmptyInput = function () {
                t.reset(), o()
            };
            var c = n.setFilter;
            n.setFilter = function (e) {
                t.set(e), c(e)
            };
            var r = i.buildChoice;
            i.buildChoice = function (e) {
                r(e);
                var t = e.choice.setVisible;
                e.choice.setVisible = function (n) {
                    t(n), e.choice.choiceDomManagerHandlers.updateHighlighted()
                }
            }
        }
    }

    function de(e) {
        var t, n = e.configuration, i = e.choiceDomFactory, o = (t = n.customChoiceStylings, {
            customize: function (e, n, i) {
                if (t) {
                    var o = t(n, e.option);
                    if (o) {
                        var c = function (t) {
                            return function () {
                                t({
                                    isOptionSelected: e.isOptionSelected,
                                    isOptionDisabled: e.isOptionDisabled,
                                    isHoverIn: e.choice.isHoverIn
                                })
                            }
                        };
                        i.updateHoverIn && o.updateHoverIn && (i.updateHoverIn = d(i.updateHoverIn, c(o.updateHoverIn))), i.updateSelected && o.updateSelected && (i.updateSelected = d(i.updateSelected, c(o.updateSelected))), i.updateDisabled && o.updateDisabled && (i.updateDisabled = d(i.updateDisabled, c(o.updateDisabled))), i.updateHighlighted && o.updateHighlighted && (i.updateHighlighted = d(i.updateHighlighted, c(o.updateHighlighted)))
                    }
                }
            }
        }), c = i.create;
        i.create = function (e, t, n) {
            var i = c(e, t, n);
            return o.customize(t, i.choiceDom, i.choiceDomManagerHandlers), i
        }
    }

    function pe(e) {
        var t = e.componentPropertiesAspect, n = e.configuration, i = e.pickDomFactory, o = function (e, t) {
            return {
                customize: function (n, i, o) {
                    if (t) {
                        var c = t(i, n.option);
                        if (c) {
                            var r = function (t) {
                                return function () {
                                    t({isOptionDisabled: n.isOptionDisabled, isComponentDisabled: e.getDisabled()})
                                }
                            };
                            o.updateDisabled && c.updateDisabled && (o.updateDisabled = d(o.updateDisabled, r(c.updateDisabled))), o.updateComponentDisabled && c.updateComponentDisabled && (o.updateComponentDisabled = d(o.updateComponentDisabled, r(c.updateComponentDisabled)))
                        }
                    }
                }
            }
        }(t, n.customPickStylings), c = i.create;
        i.create = function (e, t, n) {
            var i = c(e, t, n);
            return o.customize(t, i.pickDom, i.pickDomManagerHandlers), i
        }
    }

    function fe(e) {
        var t = e.updateAppearanceAspect, n = e.updateAspect, i = e.loadAspect;
        return n.update = d(n.update, (function () {
            return t.updateAppearance()
        })), i.load = d(i.load, (function () {
            return t.updateAppearance()
        })), {
            buildApi: function (e) {
                e.updateAppearance = function () {
                    return t.updateAppearance()
                }
            }
        }
    }

    function he(e) {
        var t, n = e.updateAppearanceAspect, i = e.picksList, o = e.picksDom, c = e.componentPropertiesAspect,
            r = function (e, t) {
                return {
                    disableComponent: function (n) {
                        e.forEach((function (e) {
                            return e.pickDomManagerHandlers.updateComponentDisabled()
                        })), t.disable(n)
                    }
                }
            }(i, o);

        function a() {
            var e = c.getDisabled();
            t !== e && (t = e, r.disableComponent(e))
        }

        return e.disableComponentAspect = r, n.updateAppearance = d(n.updateAppearance, a), {
            buildApi: function (e) {
                e.updateDisabled = a
            }
        }
    }

    se.plugDefaultConfig = function (e) {
        e.noResultsWarning = "No results found", e.isNoResultsWarningEnabled = !1
    }, le.plugStaticDom = function (e) {
        var t;
        e.configuration.useHighlighting && (e.highlightAspect = (t = null, {
            getHighlighter: function () {
                return t
            }, set: function (e) {
                var n = e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), i = new RegExp("(" + n + ")", "gi");
                t = function (e, t, n) {
                    e.innerHTML = n.replace(i, "<u>$1</u>")
                }
            }, reset: function () {
                t = null
            }
        }))
    }, le.plugDefaultConfig = function (e) {
        e.useHighlighting = !1
    }, de.plugDefaultConfig = function (e) {
        e.customChoiceStylings = null
    }, pe.plugDefaultConfig = function (e) {
        e.customPickStylings = null
    }, fe.plugStaticDom = function (e) {
        e.updateAppearanceAspect = {
            updateAppearance: function () {
            }
        }
    };
    var ge = {
        CssPatchPlugin: K,
        SelectElementPlugin: X,
        LabelForAttributePlugin: N,
        HiddenOptionPlugin: function (e) {
            var t = e.configuration, n = e.createWrapAspect, i = e.isChoiceSelectableAspect, o = e.wrapsCollection,
                c = e.buildChoiceAspect, r = e.buildAndAttachChoiceAspect, a = e.countableChoicesListInsertAspect,
                u = e.countableChoicesList;
            a.countableChoicesListInsert = function (e, t) {
                if (!e.isOptionHidden) {
                    var n = o.getNext(t, (function (e) {
                        return !e.isOptionHidden
                    }));
                    u.add(e, n)
                }
            };
            var s = r.buildAndAttachChoice;
            r.buildAndAttachChoice = function (e, t) {
                e.isOptionHidden ? j(e) : s(e, t)
            };
            var l = i.isSelectable;
            i.isSelectable = function (e) {
                return l(e) && !e.isOptionHidden
            };
            var d = t.getIsOptionHidden;
            t.options ? d || (d = function (e) {
                return void 0 !== e.hidden && e.hidden
            }) : d || (d = function (e) {
                return e.hidden
            });
            var p = n.createWrap;
            return n.createWrap = function (e) {
                var t = p(e);
                return t.isOptionHidden = d(e), t
            }, {
                buildApi: function (e) {
                    var t = function (e) {
                        return o.getNext(e, (function (e) {
                            return !e.isOptionHidden
                        }))
                    };
                    e.updateOptionsHidden = function () {
                        return o.forLoop((function (e, n) {
                            return G(e, n, t, u, d, c)
                        }))
                    }, e.updateOptionHidden = function (e) {
                        return G(o.get(e), e, t, u, d, c)
                    }
                }
            }
        },
        ValidationApiPlugin: q,
        UpdateAppearancePlugin: fe,
        BsAppearancePlugin: U,
        DisableComponentPlugin: he,
        FormResetPlugin: function (e) {
            var t = e.staticDom, n = e.updateDataAspect, i = e.environment, o = D();
            if (t.selectElement) {
                var c = g(t.selectElement, "FORM");
                c && o.bind(c, "reset", (function () {
                    return i.window.setTimeout((function () {
                        return n.updateData()
                    }))
                }))
            }
            return {
                dispose: function () {
                    o.unbind()
                }
            }
        },
        CreatePopperPlugin: ie,
        WarningPlugin: se,
        RtlPlugin: R,
        PlaceholderPlugin: Q,
        FloatingLabelPlugin: re,
        OptionsApiPlugin: J,
        JQueryMethodsPlugin: $,
        SelectedOptionPlugin: Y,
        FormRestoreOnBackwardPlugin: function (e) {
            var t = e.staticDom, n = e.environment, i = e.loadAspect, o = e.updateOptionsSelectedAspect, c = n.window;
            t.selectElement && o && (i.load = d(i.load, (function () {
                "complete" != c.document.readyState && c.setTimeout((function () {
                    o.updateOptionsSelected()
                }))
            })))
        },
        DisabledOptionPlugin: function (e) {
            var t = e.configuration, n = e.isChoiceSelectableAspect, i = e.createWrapAspect, o = e.buildChoiceAspect,
                c = e.filterPredicateAspect, r = e.wrapsCollection, a = e.optionToggleAspect, u = e.buildPickAspect,
                s = t.getIsOptionDisabled;
            t.options ? s || (s = function (e) {
                return void 0 !== e.disabled && e.disabled
            }) : s || (s = function (e) {
                return e.disabled
            });
            var l = i.createWrap;
            i.createWrap = function (e) {
                var t = l(e);
                return t.isOptionDisabled = s(e), t.updateDisabled = null, t
            };
            var p = a.toggle;
            a.toggle = function (e) {
                var t = !1;
                return void 0 !== e.isOptionSelected ? !e.isOptionSelected && e.isOptionDisabled || (t = p(e)) : e.isOptionDisabled || (t = p(e)), t
            };
            var f = n.isSelectable;
            n.isSelectable = function (e) {
                return f(e) && !e.isOptionDisabled
            };
            var h = c.filterPredicate;
            c.filterPredicate = function (e, t) {
                return !e.isOptionDisabled && h(e, t)
            };
            var g = o.buildChoice;
            o.buildChoice = function (e) {
                g(e), e.updateDisabled = e.choice.choiceDomManagerHandlers.updateDisabled, e.choice.dispose = d((function () {
                    e.updateDisabled = null
                }), e.choice.dispose)
            };
            var v = u.buildPick;
            return u.buildPick = function (e, t) {
                var n = v(e, t);
                n.updateDisabled = function () {
                    return n.pickDomManagerHandlers.updateDisabled()
                }, n.dispose = d(n.dispose, (function () {
                    n.updateDisabled = null
                }));
                var i = e.updateDisabled;
                return e.updateDisabled = d(i, n.updateDisabled), n.dispose = d(n.dispose, (function () {
                    e.updateDisabled = i, e.updateDisabled()
                })), n
            }, {
                buildApi: function (e) {
                    e.updateOptionsDisabled = function () {
                        return r.forLoop((function (e) {
                            return ee(e, s)
                        }))
                    }, e.updateOptionDisabled = function (e) {
                        return ee(r.get(e), s)
                    }
                }
            }
        },
        PicksApiPlugin: te,
        HighlightPlugin: le,
        ChoicesDynamicStylingPlugin: ae,
        CustomPickStylingsPlugin: pe,
        CustomChoiceStylingsPlugin: de
    }, ve = {
        CssPatchPlugin: K,
        PicksPlugin: ne,
        LabelForAttributePlugin: N,
        ValidationApiPlugin: q,
        UpdateAppearancePlugin: fe,
        BsAppearancePlugin: U,
        DisableComponentPlugin: he,
        CreatePopperPlugin: ie,
        WarningPlugin: se,
        RtlPlugin: R,
        PlaceholderPlugin: Q,
        FloatingLabelPlugin: re,
        OptionsApiPlugin: J,
        JQueryMethodsPlugin: $,
        PicksApiPlugin: te,
        HighlightPlugin: le,
        ChoicesDynamicStylingPlugin: ae,
        CustomPickStylingsPlugin: pe,
        CustomChoiceStylingsPlugin: de
    }, me = r(ge, {PicksPlugin: ne});

    function be() {
    }

    function Ce(e) {
        var t = v(e, "input-group");
        return t ? function () {
            var e = null;
            return t.classList.contains("input-group-lg") ? e = "lg" : t.classList.contains("input-group-sm") && (e = "sm"), e
        } : function () {
            var t = null;
            return e.classList.contains("form-select-lg") || e.classList.contains("form-control-lg") ? t = "lg" : (e.classList.contains("form-select-sm") || e.classList.contains("form-control-sm")) && (t = "sm"), t
        }
    }

    function Ae(e) {
        var t = null, n = 'label[for="' + e.id + '"]', i = e.parentElement;
        (t = i.querySelector(n)) || (t = i.parentElement.querySelector(n));
        return t
    }

    be.plugDefaultConfig = function (e) {
        e.css = De, function (e) {
            e.useCssPatch = !0, e.cssPatch = ye, e.pickButtonHTML = '<button aria-label="Remove" tabIndex="-1" type="button"></button>', e.composeGetSize = Ce, e.getDefaultLabel = Ae
        }(e)
    };
    var De = {
        choices: "dropdown-menu",
        choicesList: "",
        choice_hover: "hover",
        choice_selected: "selected",
        choice_disabled: "disabled",
        picks: "form-control",
        picks_focus: "focus",
        picks_disabled: "disabled",
        pick_disabled: "",
        pickFilter: "",
        filterInput: "",
        pick: {classes: "badge"},
        pickContent: "",
        pickContent_disabled: "disabled",
        pickButton: "btn-close",
        choiceCheckBox_disabled: "disabled",
        choiceContent: "form-check",
        choiceCheckBox: "form-check-input",
        choiceLabel: "form-check-label",
        choiceLabel_disabled: "",
        label_floating_lifted: "floating-lifted",
        picks_floating_lifted: "floating-lifted",
        warning: "alert-warning"
    }, ye = {
        choicesList: {listStyleType: "none", paddingLeft: "0", paddingRight: "0", marginBottom: "0"},
        picks: {
            listStyleType: "none",
            display: "flex",
            flexWrap: "wrap",
            height: "auto",
            marginBottom: "0",
            cursor: "text"
        },
        choice: {classes: "px-md-2 px-1", styles: {cursor: "pointer"}},
        choice_hover: "text-primary bg-light",
        choice_disabled_hover: "bg-light",
        filterInput: {
            border: "0px",
            height: "auto",
            boxShadow: "none",
            padding: "0",
            margin: "0",
            outline: "none",
            backgroundColor: "transparent",
            backgroundImage: "none"
        },
        filterInput_empty: "form-control",
        picks_disabled: {backgroundColor: "#e9ecef"},
        picks_focus: {borderColor: "#80bdff", boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)"},
        picks_focus_valid: {borderColor: "", boxShadow: "0 0 0 0.2rem rgba(40, 167, 69, 0.25)"},
        picks_focus_invalid: {borderColor: "", boxShadow: "0 0 0 0.2rem rgba(220, 53, 69, 0.25)"},
        picks_def: {minHeight: "calc(2.25rem + 2px)"},
        picks_lg: {minHeight: "calc(2.875rem + 2px)"},
        picks_sm: {minHeight: "calc(1.8125rem + 2px)"},
        picks_floating_def: {minHeight: "calc(3.5rem + 2px)"},
        pick: {
            paddingLeft: "0",
            paddingRight: ".5rem",
            paddingInlineStart: "0",
            paddingInlineEnd: "0.5rem",
            color: "var(--bs-dark)"
        },
        pickButton: {fontSize: "0.8em", float: "none", verticalAlign: "text-top"},
        pickContent_disabled: {opacity: ".65"},
        choiceContent: {justifyContent: "flex-start", cursor: "inherit"},
        choiceLabel: {color: "inherit", cursor: "inherit"},
        choiceCheckBox: {color: "inherit", cursor: "inherit"},
        choiceLabel_disabled: {opacity: ".65"},
        label_floating_lifted: {opacity: ".65", transform: "scale(.85) translateY(-.5rem) translateX(.15rem)"},
        picks_floating_lifted: {paddingTop: "1.625rem", paddingLeft: "0.8rem", paddingBottom: "0"},
        warning: {
            paddingLeft: ".25rem",
            paddingRight: ".25rem",
            zIndex: 4,
            fontSize: "small",
            backgroundColor: "var(--bs-warning)"
        }
    }, ke = {composeSync: d, EventBinder: D, addStyling: y, toggleStyling: E};
    return {
        BsMultiSelect: function (e, t, n) {
            return T(e, t, n, "BsMultiSelect", ge, be)
        }(window, window.jQuery, n.default),
        BsPicks: function (e, t, n) {
            return T(e, t, n, "BsPicks", ve, be)
        }(window, window.jQuery, n.default),
        MultiSelectTools: {MultiSelectBuilder: B, plugins: r({Bs5Plugin: be}, me), utilities: ke}
    }
}));
//# sourceMappingURL=BsMultiSelect.min.js.map
