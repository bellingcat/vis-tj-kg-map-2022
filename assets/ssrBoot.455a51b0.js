import{q as i,L as r,V as d,w as f,x as c,aa as u,p as v,A as m,d as p}from"./index.b5105f94.js";function B(e){const n=i("useRender");n.render=e}function g(e){const n=r(),o=r();if(d){const s=new ResizeObserver(t=>{e==null||e(t,s),t.length&&(o.value=t[0].contentRect)});f(()=>{s.disconnect()}),c(n,(t,a)=>{a&&(s.unobserve(a),o.value=void 0),t&&s.observe(t)},{flush:"post"})}return{resizeRef:n,contentRect:u(o)}}const y=v({tag:{type:String,default:"div"}},"tag");function S(){const e=r(!1);return m(()=>{window.requestAnimationFrame(()=>{e.value=!0})}),{ssrBootStyles:p(()=>e.value?void 0:{transition:"none !important"}),isBooted:u(e)}}export{g as a,S as b,y as m,B as u};
