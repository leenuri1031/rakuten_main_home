export const button =(target)=> {
  target.addEventListener('click', ()=>{
    target.classList.toggle('toggle');
  });
}

button();