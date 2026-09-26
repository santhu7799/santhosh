const phone='919742626460';
const starter='Hi Santhosh Events, I am planning an event and would like to know about your services and pricing.';
const wa=(message=starter)=>`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
document.querySelectorAll('[data-wa]').forEach(a=>{a.href=wa();a.target='_blank';a.rel='noopener noreferrer'});
document.getElementById('year').textContent=new Date().getFullYear();
const menu=document.getElementById('menu'),links=document.getElementById('links');
menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu')});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const services=[['✿','Flower & Stage Decoration','Wedding stages, floral entrances, mandaps, birthday themes, lighting and venue decoration.'],['♨','Catering & Food','Food arrangements for weddings, receptions, birthdays, housewarmings and more.'],['◉','Photography & Videography','Candid and traditional photography, cinematic video and full event coverage.'],['✧','Wedding Management','Planning and coordination from decoration to catering and photography.'],['❋','Engagement & Reception','Elegant décor, food, photography and complete celebration coordination.'],['✳','Birthday Parties','Theme decoration, cakes, food, photography and entertainment coordination.'],['⌂','Housewarming Events','Decoration, catering, photography and complete housewarming arrangements.'],['◇','Corporate Events','Meetings, celebrations, launches and company events.']];
document.getElementById('service-grid').innerHTML=services.map(([icon,title,desc])=>`<article class="service"><span class="icon" aria-hidden="true">${icon}</span><h3>${title}</h3><p>${desc}</p><a href="#enquiry" data-service="${title}">Enquire now ↗</a></article>`).join('');
const reasons=[['✦','One Team, Complete Event','Bring your key arrangements together through one point of contact.'],['◇','Customized Packages','Choose services suited to your occasion and requirements.'],['✿','Beautiful Decorations','Thoughtful settings for meaningful moments.'],['♨','Quality Catering','Food arrangements tailored to your event.'],['◉','Professional Photography','Capture the moments you want to remember.'],['♡','Friendly Event Support','Clear, convenient communication as you plan.']];
document.getElementById('why-grid').innerHTML=reasons.map(([icon,title,desc])=>`<article><b aria-hidden="true">${icon}</b><h3>${title}</h3><p>${desc}</p></article>`).join('');
const stock=id=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=850`;
const photos=[
  {category:'Wedding',name:'Floral wedding setting',src:'https://images.pexels.com/photos/34079355/pexels-photo-34079355.jpeg?auto=compress&cs=tinysrgb&w=1600'},
  {category:'Decoration',name:'Traditional wedding stage',src:stock(12432503)},
  {category:'Catering',name:'Celebration dining inspiration',src:stock(5779787)},
  {category:'Birthday',name:'Birthday celebration inspiration',src:stock(587741)},
  {category:'Photography',name:'Wedding photography inspiration',src:stock(12603609)},
  {category:'Corporate',name:'Corporate event inspiration',src:stock(1181406)},
  {category:'Wedding',name:'Floral mandap inspiration',src:stock(34079355)},
  {category:'Decoration',name:'Mandap decoration inspiration',src:stock(33417236)}
];
const categories=['All','Wedding','Decoration','Catering','Birthday','Photography','Corporate'];
const filters=document.getElementById('filters'),grid=document.getElementById('gallery-grid'),lightbox=document.getElementById('lightbox');
function renderGallery(category='All'){
  filters.innerHTML=categories.map(c=>`<button type="button" class="${c===category?'active':''}" aria-pressed="${c===category}" data-category="${c}">${c}</button>`).join('');
  grid.innerHTML=photos.map((p,i)=>({...p,i})).filter(p=>category==='All'||p.category===category).map(p=>`<button type="button" data-photo="${p.i}" aria-label="View ${p.name}"><img src="${p.src}" alt="${p.name}, illustrative stock imagery" loading="lazy" onerror="this.onerror=null;this.src='https://images.pexels.com/photos/34079355/pexels-photo-34079355.jpeg?auto=compress&cs=tinysrgb&w=1600'"><span>${p.name}<small>Illustrative imagery · view photo</small></span></button>`).join('');
}
renderGallery();filters.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b)renderGallery(b.dataset.category)});
grid.addEventListener('click',e=>{const b=e.target.closest('[data-photo]');if(!b)return;const p=photos[Number(b.dataset.photo)];document.getElementById('lightbox-img').src=p.src;document.getElementById('lightbox-img').alt=p.name;document.getElementById('caption').textContent=p.name+' · Illustrative imagery';lightbox.showModal()});
document.getElementById('close').addEventListener('click',()=>lightbox.close());lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});
document.querySelectorAll('[data-package]').forEach(a=>a.addEventListener('click',()=>{document.querySelector('[name="package"]').value=a.dataset.package}));
document.querySelectorAll('[data-event]').forEach(a=>a.addEventListener('click',()=>{document.querySelector('[name="event"]').value=a.dataset.event}));
document.addEventListener('click',e=>{const a=e.target.closest('[data-service]');if(!a)return;const service=a.dataset.service;const name=service.includes('Catering')?'Catering':service.includes('Photography')?'Photography':service.includes('Decoration')?'Decoration':service.includes('Wedding')||service.includes('Event')?'Complete Event Management':'';if(name)document.querySelector(`[name="services"][value="${name}"]`).checked=true});
document.querySelectorAll('#prev,#next').forEach(button=>button.addEventListener('click',()=>{document.getElementById('reviews').querySelector('.review-card p').textContent='We’ll share genuine customer experiences here as they become available.'}));
const form=document.getElementById('enquiry-form');form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form),lines=[starter,'','Name: '+d.get('name'),'Mobile: '+d.get('mobile')];for(const [field,label] of [['whatsapp','WhatsApp'],['event','Event'],['date','Event date'],['location','Location'],['guests','Guests'],['budget','Budget'],['package','Package']]){if(d.get(field))lines.push(label+': '+d.get(field))}const selected=d.getAll('services');if(selected.length)lines.push('Services: '+selected.join(', '));if(d.get('message'))lines.push('Requirements: '+d.get('message'));const url=wa(lines.join('\n'));document.getElementById('form-feedback').hidden=false;const opened=window.open(url,'_blank','noopener,noreferrer');if(!opened)window.location.href=url});
