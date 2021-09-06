import "./style.scss";

let myNum = 0;

const plus = () => {
  const num = document.querySelector(".num");
  myNum += 1;
  num.innerHTML = myNum;
};
const btn = document.querySelector(".btn");
btn.addEventListener("click", plus);
