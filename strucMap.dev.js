function loadMap(t, e, r) {
    var a = JSON.parse(e),
        n = JSON.parse(r),
        c = ["#1f77b4", "#ff7f0e", "#2ca02c", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"],
        l = t.width,
        i = t.height,
        o = d3.select("#mapRow").append("svg").attr({
            id: "map",
            width: l,
            height: i
        }),
        s = o.append("g"),
        u = d3.layout.force();

    u.on("tick", function () {
        s.selectAll("line.link").each(function (t) {
            var e, r, a, n, c = d3.select(this);
            if ("NEXT" == t.type) {
                var l = t.target.x - t.source.x,
                    i = t.target.y - t.source.y,
                    o = Math.sqrt(l * l + i * i), s = l / o,
                    u = i / o, d = 35, f = 35;
                e = t.source.x + d * s;
                r = t.target.x - f * s;
                a = t.source.y + d * u;
                n = t.target.y - f * u;
                c.attr("marker-end", "url(#arrow)");
            } else e = t.source.x, a = t.source.y, r = t.target.x, n = t.target.y;
            c.attr("x1", e), c.attr("x2", r), c.attr("y1", a), c.attr("y2", n)
        });
        s.selectAll("g.node").selectAll("circle.ring").attr({
            cx: function (t) {
                return t.x
            }, cy: function (t) {
                return t.y
            }
        });
        s.selectAll("g.node").selectAll("circle.outline").attr({
            cx: function (t) {
                return t.x
            }, cy: function (t) {
                return t.y
            }
        });
        s.selectAll("g.node").selectAll("text.nTxt").attr({
            x: function (t) {
                return t.x - 15
            }, y: function (t) {
                return t.y + 6
            }
        });
        s.selectAll("g.node").selectAll("text.propName").attr({
            x: function (t) {
                return t.x - 35
            }, y: function (t) {
                return t.y - 35
            }
        });
        d.attr({
            x: function (t) {
                return (t.source.x + t.target.x) / 2 - 25
            }, y: function (t) {
                return (t.source.y + t.target.y) / 2 + 5
            }, transform: function (t) {
                var e = t.target.x - t.source.x, r = t.target.y - t.source.y, a = 360 * Math.atan(r / e) / (2 * Math.PI), n = (t.target.x + t.source.x) / 2, c = (t.target.y + t.source.y) / 2;
                return "rotate(" + a + "," + n + "," + c + ")"
            }
        })
    }).
    charge(-1300).
    linkDistance(200).
    nodes(a).links(n).
    size([l, i]).alpha(.1);
    
    o.append("svg:defs").
    append("svg:marker").
    attr("id", "arrow").
    attr("viewBox", "0 -5 10 10").
    attr("refX", 6).
    attr("markerWidth", 5).
    attr("markerHeight", 5).
    attr("orient", "auto").
    append("svg:path").
    attr("d", "M0,-5L10,0L0,5").
    attr("fill", "#6ac6ff");

    s.selectAll("line.link").
    data(n).
    enter().
    append("line").
    attr("class", "link");

    var d = s.selectAll("link.desc").data(n).enter().append("text").attr("class", "desc").text(function (t) {
        return t.desc
    });

    var f = (u.drag().on("dragstart", function (t) {
        t.fixed = !0
    }), s.selectAll("g.node").data(a));

    var p = f.enter().append("g").attr("class", function (t, e) {
        return 0 === e ? "node active" : "node"
    }).
    call(u.drag).
    on("click", function (t) {
        d3.event.defaultPrevented || window.open(t.href)
    });

    p.append("circle").attr({r: 29, class: "ring"});
    p.append("circle").attr({r: 25,class: "outline"}).style({
        fill: function (t) {
            return c[t.index]
        }, stroke: "#5CA8DB", "stroke-width": "2px"
    });

    p.append("text").attr("class", "nTxt").text(function (t) {
        return t.prop.nTxt
    }).style({fill: "black"});

    p.append("text").attr("class", "propName").text(function (t) {
        return t.prop.name
    }).style({fill: "black", "font-family": "SimSun"});
    u.start();
    
    for (var x = 0; x < 50; x++)u.tick();
    var g = setInterval(function () {
        u.alpha() < .01 ? clearInterval(g) : u.tick()
    }, 80)
}