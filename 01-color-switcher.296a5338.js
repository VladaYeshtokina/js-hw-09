!function(){function t(){return"#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}var e=document.querySelector("body"),n=document.querySelector("button[data-start]"),a=document.querySelector("button[data-stop]");n.addEventListener("click",(function(o){e.style.background=t(),n.disabled=!0;var r=setInterval((function(){e.style.background=t()}),1e3);a.addEventListener("click",(function(t){clearInterval(r),n.disabled=!1}))}))}();
//# sourceMappingURL=01-color-switcher.296a5338.js.map