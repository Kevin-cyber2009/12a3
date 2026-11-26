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

// Reveal chapter content as it enters the viewport while scrolling.
const revealTargets=document.querySelectorAll(
  '.full-section-head, .overview-layout, .topic-ribbon, .history-timeline article, .history-image, .history-callout, .destination-card, .eco-note, .culture-intro, .culture-tile, .culture-wide-image, .culture-outro, .food-feature, .food-menu-grid article, .food-note, .today-grid article, .today-wide-image, .future-box, .past-present, .story-cards a, .quiz-panel, .memory-strip figure, .contact-card'
);
if(revealTargets.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.body.classList.add('motion-ready');
  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:0.12,rootMargin:'0px 0px -6% 0px'});
  revealTargets.forEach((target,index)=>{
    target.classList.add('scroll-reveal');
    target.style.setProperty('--reveal-delay',`${(index%4)*75}ms`);
    revealObserver.observe(target);
  });
}
