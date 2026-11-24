const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.bright-nav, .nav-links');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
}

const quiz=document.querySelector('#dongnai-quiz');
if(quiz){
  quiz.addEventListener('submit',event=>{
    event.preventDefault();
    const answer=quiz.querySelector('input[name="quiz"]:checked');
    const result=document.querySelector('#quiz-result');
    if(!answer){result.textContent='Bạn chọn một đáp án trước nhé.';return;}
    result.textContent=answer.value==='correct'?'Chính xác! Hồ Trị An là hồ nước lớn trên sông Đồng Nai.':'Chưa đúng rồi — thử lại nhé!';
  });
}

const contribution=document.querySelector('#contribution-form');
if(contribution){
  contribution.addEventListener('submit',async event=>{
    event.preventDefault();
    const data=new FormData(contribution);
    const message=`ĐÓNG GÓP CHO WEBSITE ĐỒNG NAI – 12A3\nTên: ${data.get('name')}\nChủ đề: ${data.get('kind')}\nNội dung:\n${data.get('content')}`;
    const status=document.querySelector('#contribution-result');
    try{
      await navigator.clipboard.writeText(message);
      status.textContent='Đã sao chép nội dung. Bạn có thể gửi cho nhóm 12A3 qua kênh liên hệ của lớp.';
    }catch{
      status.textContent=message;
    }
  });
}
