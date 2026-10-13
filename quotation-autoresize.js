function autoResize(el){
 el.style.height='auto';
 el.style.height=el.scrollHeight+'px';
}
document.querySelectorAll('textarea').forEach(e=>{
 e.addEventListener('input',()=>autoResize(e));
});
