if (!self.define) {
  let e,
    s = {}
  const a = (a, c) => (
    (a = new URL(a + ".js", c).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script")
          ;((e.src = a), (e.onload = s), document.head.appendChild(e))
        } else ((e = a), importScripts(a), s())
      }).then(() => {
        let e = s[a]
        if (!e) throw new Error(`Module ${a} didn’t register its module`)
        return e
      })
  )
  self.define = (c, n) => {
    const t =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href
    if (s[t]) return
    let i = {}
    const r = (e) => a(e, t),
      o = { module: { uri: t }, exports: i, require: r }
    s[t] = Promise.all(c.map((e) => o[e] || r(e))).then((e) => (n(...e), i))
  }
}
