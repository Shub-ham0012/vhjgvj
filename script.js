const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.04,rootMargin:'0px 0px -24px'});
document.querySelectorAll('.reveal').forEach(el=>reduced?el.classList.add('visible'):revealObserver.observe(el));

const stats=document.querySelector('.stats');
let counted=false;
new IntersectionObserver(([entry])=>{if(!entry.isIntersecting||counted)return;counted=true;document.querySelectorAll('[data-count]').forEach(el=>{const end=Number(el.dataset.count),suffix=el.dataset.suffix,start=performance.now(),duration=1300;function tick(now){const p=Math.min((now-start)/duration,1),e=1-Math.pow(1-p,3),value=end*e;el.textContent=(Number.isInteger(end)?Math.round(value):value.toFixed(1))+suffix;if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)})},{threshold:.3}).observe(stats);

const comparison=document.querySelector('.comparison');
const range=comparison.querySelector('input');
range.addEventListener('input',()=>{const value=range.value;comparison.style.setProperty('--split',value+'%');comparison.style.setProperty('--split-num',value/100)});

document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{const select=document.querySelector('[name="service"]');select.value=link.dataset.service}));

document.querySelector('#booking-form').addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget);const message=[`Hi MakeoverU, I would like to book an appointment.`,``,`Name: ${data.get('name')}`,`Phone: ${data.get('phone')}`,`Service: ${data.get('service')}`,`Preferred date: ${data.get('date')||'Flexible'}`,`Message: ${data.get('message')||'—'}`].join('\n');window.open(`https://wa.me/916299992857?text=${encodeURIComponent(message)}`,'_blank','noopener')});

const dateInput=document.querySelector('input[type="date"]');dateInput.min=new Date().toISOString().split('T')[0];
