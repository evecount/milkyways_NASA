/* Presentation layer: original IDs, scientific script and model stay unchanged. */
(() => {
  const assets = JSON.parse(document.getElementById('workspace-asset-map').textContent);
  const moosticker = document.getElementById('mooSticker');
  new MutationObserver(() => {
    for (const img of moosticker.querySelectorAll('img')) {
      const name = img.getAttribute('src')?.split('/').pop();
      if (name && assets[name] && img.getAttribute('src') !== assets[name]) img.src = assets[name];
    }
  }).observe(moosticker, {childList:true, subtree:true});
  const panels = [...document.querySelectorAll('.workspace-panel')];
  function openPanel(key) {
    const target = document.getElementById('panel-'+key);
    if (!target) return;
    const close = !target.hidden;
    panels.forEach(p => { if (p.classList.contains('panel-right') === target.classList.contains('panel-right')) p.hidden = true; });
    target.hidden = close;
    document.querySelectorAll('[data-panel]').forEach(b => b.setAttribute('aria-expanded', String(!document.getElementById('panel-'+b.dataset.panel)?.hidden)));
  }
  function collapse(key, force) {
    const anchor = document.getElementById('anchor-'+key);
    if (!anchor) return;
    anchor.classList.toggle('collapsed',force);
    const expanded = !anchor.classList.contains('collapsed');
    const button = anchor.querySelector('[data-collapse]');
    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded ? '−' : '+';
    button.setAttribute('aria-label',(expanded?'Collapse ':'Expand ')+(key==='farm'?'farm location':'farm & municipal priorities'));
  }
  document.addEventListener('click',event => {
    const target=event.target.closest('button');
    if(!target)return;
    if(target.dataset.panel)openPanel(target.dataset.panel);
    if(target.dataset.close){document.getElementById('panel-'+target.dataset.close).hidden=true;document.querySelector('[data-panel="'+target.dataset.close+'"]')?.setAttribute('aria-expanded','false');}
    if(target.dataset.collapse)collapse(target.dataset.collapse);
    if(target.dataset.expand){const strip=document.querySelector('.edge-'+target.dataset.expand);strip.classList.toggle('expanded');target.setAttribute('aria-expanded',String(strip.classList.contains('expanded')));document.querySelectorAll('.panel-'+target.dataset.expand).forEach(p=>p.classList.toggle('strip-open',strip.classList.contains('expanded')));}
    if(target.dataset.action==='farm')collapse('farm');
    if(target.dataset.action==='priorities')collapse('priorities');
    if(target.dataset.action==='world')document.getElementById('worldViewBtn').click();
    if(target.dataset.action==='layers')document.querySelector('.leaflet-control-layers')?.classList.toggle('leaflet-control-layers-expanded');
    if(target.id==='openDiagBtn'){const p=document.getElementById('logGroundTruthPanel');p.open=true;}
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){panels.forEach(p=>p.hidden=true);document.querySelectorAll('[data-panel]').forEach(b=>b.setAttribute('aria-expanded','false'));}});
  // Open a containing drawer whenever an existing sticker/diagnostic link focuses its content.
  window.focusFeature = targetId => {
    const target=document.getElementById(targetId);
    const panel=target?.closest('.workspace-panel');
    if(panel?.hidden)openPanel(panel.id.replace('panel-',''));
    if(target?.closest('details'))target.closest('details').open=true;
    const anchor=target?.closest('.anchor-card');
    if(anchor)collapse(anchor.id.replace('anchor-',''),false);
    target?.scrollIntoView({block:'nearest',behavior:'smooth'});
  };
  function syncReadouts(){
    const preset=document.getElementById('preset');
    const current=preset.selectedOptions[0]?.textContent?.replace(/\s*\([^)]*\)\s*$/,'');
    document.getElementById('workspaceFarmName').textContent=current || 'Custom farm parcel';
    document.getElementById('workspaceDataStatus').textContent=document.getElementById('apiStatus').textContent;
    const failed=document.querySelectorAll('#checksGrid .fail').length;
    const checks=document.querySelectorAll('#checksGrid > div').length;
    const safe=document.getElementById('workspaceSafety');
    safe.textContent=checks ? (failed ? failed+' / 4 domain checks failed' : '4 / 4 domain checks passed') : 'Checking domain guardrails…';
    safe.parentElement.classList.toggle('failed',Boolean(failed));
    const cropChip=document.getElementById('hudTopCropChip');
    const firstRot=document.querySelector('#rotationsList .rot-item strong, #rotationsList > div strong');
    if(cropChip && firstRot){
      const cleanRot=firstRot.textContent.replace(/^#\d+\s*/,'').trim();
      cropChip.textContent='Top Crop: '+cleanRot;
    }
  }
  ['apiStatus','checksGrid','hudLockReadout','rotationsList'].forEach(id=>{const elNode=document.getElementById(id);if(elNode)new MutationObserver(syncReadouts).observe(elNode,{childList:true,subtree:true,characterData:true});});
  document.getElementById('preset').addEventListener('change',syncReadouts);
  syncReadouts();
  // Recalculate map dimensions after moving the existing map into its full-screen stage.
  if(typeof mcdaMap!=='undefined' && mcdaMap)mcdaMap.invalidateSize();
})();
