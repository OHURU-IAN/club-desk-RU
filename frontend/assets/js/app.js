async function loadClubs(){
  const res = await fetch('./data/clubs.json');
  if(!res.ok) throw new Error('Could not load clubs.json');
  return await res.json();
}

function getQueryParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function byId(items){
  const map = {};
  items.forEach(x => map[x.id] = x);
  return map;
}

function el(tag, attrs={}, children=[]){
  const n = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v])=>{
    if(k === 'class') n.className = v;
    else if(k === 'html') n.innerHTML = v;
    else n.setAttribute(k, v);
  });
  children.forEach(c => n.appendChild(c));
  return n;
}

function metaLine(icon, text){
  const row = document.createElement('div');
  row.className = 'meta-line';
  const iconEl = document.createElement('span');
  iconEl.className = 'meta-icon';
  iconEl.setAttribute('aria-hidden', 'true');
  iconEl.textContent = icon;
  const textEl = document.createElement('span');
  textEl.textContent = text || '';
  row.append(iconEl, textEl);
  return row;
}
