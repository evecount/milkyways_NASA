/* Spatial presentation only: no changes to the scientific application. */
import * as THREE from './vendor/three.module.js';
import { OrbitControls } from './vendor/OrbitControls.js';

const stage = document.querySelector('.map-stage');
const host = document.createElement('div');
host.className = 'globe-stage';
host.innerHTML = '<div class="globe-canvas" role="img" aria-label="Earth from space with selectable dairy regions"></div><div class="globe-controls"><button class="mw-control" id="rotationToggle" aria-label="Pause Earth rotation" title="Pause Earth rotation">Ⅱ</button><button class="mw-control" id="globeZoomIn" aria-label="Zoom into Earth" title="Zoom into Earth">+</button><button class="mw-control" id="globeZoomOut" aria-label="Zoom out from Earth" title="Zoom out from Earth">−</button><button class="mw-control" id="globeReset" aria-label="Reset Earth view" title="Reset Earth view">↺</button></div><span class="globe-credit">EARTH SURFACE · NASA / THREE.JS</span><div class="globe-label" hidden></div>';
stage.append(host);
const mapButton = document.createElement('button');
mapButton.className = 'mw-control world-view';
mapButton.textContent = 'Farm map';
mapButton.title = 'Open detailed satellite farm map';
document.querySelector('.map-tools').prepend(mapButton);

try {
  const canvasHost = host.querySelector('.globe-canvas');
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  canvasHost.append(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 0.6, 4.4);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 2.5;
  controls.maxDistance = 7;
  controls.autoRotateSpeed = 0.18;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  controls.autoRotate = !motion.matches;
  // Three.js doesn't parse OKLCH; resolve semantic colors through the browser.
  function resolvedColor(token) {
    const c = document.createElement('canvas').getContext('2d');
    c.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
    c.fillRect(0, 0, 1, 1);
    const rgb = c.getImageData(0, 0, 1, 1).data;
    return new THREE.Color().setRGB(rgb[0]/255, rgb[1]/255, rgb[2]/255, THREE.SRGBColorSpace);
  }
  const planet = new THREE.Group();
  scene.add(planet);
  const texture = await new THREE.TextureLoader().loadAsync('./earth-surface.jpg');
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), new THREE.MeshPhongMaterial({map:texture, shininess:8}));
  planet.add(earth);
  scene.add(new THREE.AmbientLight(resolvedColor('--foreground'), 1.5));
  const sunlight = new THREE.DirectionalLight(resolvedColor('--foreground'), 2.2);
  sunlight.position.set(-3, 4, 5);
  scene.add(sunlight);
  // Thin, physical limb rather than decorative glowing blobs.
  const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(1.012,96,64),new THREE.MeshBasicMaterial({color:resolvedColor('--cool'),transparent:true,opacity:.12,side:THREE.BackSide}));
  planet.add(atmosphere);
  const points=[];
  let seed=42;
  function random(){seed=(seed*16807)%2147483647;return seed/2147483647;}
  for(let i=0;i<650;i++){const theta=random()*Math.PI*2,phi=Math.acos(2*random()-1),r=20;points.push(r*Math.sin(phi)*Math.cos(theta),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(theta));}
  const starGeometry=new THREE.BufferGeometry();starGeometry.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
  scene.add(new THREE.Points(starGeometry,new THREE.PointsMaterial({color:resolvedColor('--muted'),size:.027,transparent:true,opacity:.6,sizeAttenuation:true})));
  function position(lat,lon,r=1.017){const phi=THREE.MathUtils.degToRad(90-lat),theta=THREE.MathUtils.degToRad(lon+180);return new THREE.Vector3(-r*Math.sin(phi)*Math.cos(theta),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(theta));}
  const preset=document.getElementById('preset');
  const pins=[...preset.options].map(option=>{
    const [lat,lon]=option.value.split(',').map(Number);
    const pin=new THREE.Mesh(new THREE.SphereGeometry(.013,12,8),new THREE.MeshBasicMaterial({color:resolvedColor('--primary')}));
    pin.position.copy(position(lat,lon));pin.userData={key:option.value,name:option.textContent.replace(/\s*\([^)]*\)\s*$/,'')};planet.add(pin);return pin;
  });
  function selection(){pins.forEach(pin=>{const selected=pin.userData.key===preset.value;pin.scale.setScalar(selected?1.5:1);pin.material.color.copy(resolvedColor(selected?'--accent':'--primary'));});}
  selection();preset.addEventListener('change',selection);
  new MutationObserver(selection).observe(document.getElementById('hudLockReadout'),{childList:true,subtree:true});
  function resize(){const {width,height}=canvasHost.getBoundingClientRect();if(!width||!height)return;camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height);}
  new ResizeObserver(resize).observe(canvasHost);resize();
  function showGlobe(){stage.classList.add('space-view');host.hidden=false;resize();}
  function showMap(){stage.classList.remove('space-view');host.hidden=true;if(typeof mcdaMap!=='undefined')mcdaMap.invalidateSize();}
  mapButton.addEventListener('click',showMap);
  document.getElementById('worldViewBtn').addEventListener('click',showGlobe);
  document.querySelector('[data-action="layers"]').addEventListener('click',showMap);
  const toggle=document.getElementById('rotationToggle');
  function rotationUI(){toggle.textContent=controls.autoRotate?'Ⅱ':'▶';toggle.setAttribute('aria-label',controls.autoRotate?'Pause Earth rotation':'Resume Earth rotation');toggle.title=toggle.getAttribute('aria-label');}
  toggle.addEventListener('click',()=>{controls.autoRotate=!controls.autoRotate;rotationUI();});
  motion.addEventListener('change',()=>{controls.autoRotate=!motion.matches;rotationUI();});rotationUI();
  function zoom(factor){camera.position.multiplyScalar(factor);const d=camera.position.length();camera.position.setLength(THREE.MathUtils.clamp(d,controls.minDistance,controls.maxDistance));}
  document.getElementById('globeZoomIn').addEventListener('click',()=>zoom(.85));
  document.getElementById('globeZoomOut').addEventListener('click',()=>zoom(1.18));
  document.getElementById('globeReset').addEventListener('click',()=>{camera.position.set(0,.6,4.4);controls.target.set(0,0,0);});
  const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
  let down;
  const label=host.querySelector('.globe-label');
  function hit(event){const r=renderer.domElement.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects([earth,...pins]);return hits[0]?.object.userData.key?hits[0].object:null;}
  renderer.domElement.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY];});
  renderer.domElement.addEventListener('pointermove',e=>{const pin=hit(e);label.hidden=!pin;renderer.domElement.style.cursor=pin?'pointer':'grab';if(pin){label.textContent=pin.userData.name;const r=host.getBoundingClientRect();label.style.left=Math.min(e.clientX-r.left+12,r.width-220)+'px';label.style.top=e.clientY-r.top+12+'px';}});
  renderer.domElement.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>6)return;const pin=hit(e);if(pin){preset.value=pin.userData.key;preset.dispatchEvent(new Event('change',{bubbles:true}));showMap();}});
  renderer.domElement.addEventListener('webglcontextlost',showMap);
  showGlobe();
  let previous=performance.now();
  renderer.setAnimationLoop(()=>{const now=performance.now(),delta=Math.min((now-previous)/1000,.1);previous=now;if(host.hidden||document.hidden)return;controls.update(delta);renderer.render(scene,camera);host.setAttribute('data-scene-ready','true');});
} catch(error) {
  host.remove();mapButton.remove();console.warn('Earth view unavailable; satellite map remains available.',error);
}
