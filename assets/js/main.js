/* Modal behaviour for project previews
   - Clicking an image/video opens a centered modal
   - Background is blurred and brightened through a backdrop-filter overlay
   - Modal content is filled from the clicked project's first caption and a png-preview (if available)
 */
(function(){
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const closeBtn = modal.querySelector('.project-modal__close');

  let lastFocused = null;

  function findProject(el){
    return el.closest('.project') || el.closest('article') || null;
  }

  function getCaption(project){
    const cap = project.querySelector('.caption');
    return cap ? cap.textContent.trim() : 'Projekt — Platzhalter';
  }

  function getDescription(project){
    // If you want to add longer descriptions, attach a data-modal-desc on the article
    return project.dataset.modalDesc || 'Hier kannst du eine längere Beschreibung, Links und Credits einfügen.';
  }


  function openModal(project){
    if(!project) return;
    modalTitle.textContent = getCaption(project);
    modalDesc.textContent = getDescription(project);

    lastFocused = document.activeElement;
    document.body.classList.add('modal-open');
    modal.setAttribute('aria-hidden','false');
    // focus close button for keyboard users
    closeBtn.focus();
    // Attach focus trap
    document.addEventListener('keydown', trapFocus);
    // hide main content from screen readers while modal is visible
    const main = document.getElementById('top');
    if(main) main.setAttribute('aria-hidden','true');
  }

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    if(lastFocused && lastFocused.focus) lastFocused.focus();
    document.removeEventListener('keydown', trapFocus);
    const main = document.getElementById('top');
    if(main) main.removeAttribute('aria-hidden');
  }

  function trapFocus(e){
    if(e.key !== 'Tab') return;
    const focusable = modal.querySelectorAll('button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if(!focusable.length) { e.preventDefault(); return; }
    const first = focusable[0];
    const last = focusable[focusable.length-1];
    if(e.shiftKey){
      if(document.activeElement === first){ last.focus(); e.preventDefault(); }
    } else {
      if(document.activeElement === last){ first.focus(); e.preventDefault(); }
    }
  }

  // close interactions
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e){
    // close if clicking the overlay outside the modal box
    if(e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

  // Attach handlers only to elements explicitly marked as modal triggers.
  // This avoids images or other elements accidentally opening the modal.
  const triggers = document.querySelectorAll('.project .item .modal-trigger');
  triggers.forEach(t => {
    // keep videos focusable for keyboard users
    t.setAttribute('tabindex','0');
    t.addEventListener('click', function(e){
      const project = findProject(e.currentTarget);
      openModal(project);
    });
    // also support keyboard open
    t.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); const project = findProject(e.currentTarget); openModal(project); } });
  });

  // Note: modal no longer contains an image preview — modal shows only title + description

})();
/* Modal behaviour for project previews
   - Clicking an image/video opens a centered modal
   - Background is blurred and brightened through a backdrop-filter overlay
   - Modal content is filled from the clicked project's first caption and a png-preview (if available)
 */
(function(){
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalImage = document.getElementById('modal-image');
  const closeBtn = modal.querySelector('.project-modal__close');

  let lastFocused = null;

  function findProject(el){
    return el.closest('.project') || el.closest('article') || null;
  }

  function getCaption(project){
    const cap = project.querySelector('.caption');
    return cap ? cap.textContent.trim() : 'Projekt — Platzhalter';
  }

  function getDescription(project){
    // If you want to add longer descriptions, attach a data-modal-desc on the article
    return project.dataset.modalDesc || 'Hier kannst du eine längere Beschreibung, Links und Credits einfügen.';
  }

  function findTransparentPNG(project){
    // Prefer explicit data-modal-img attribute, otherwise look for the first .png image inside the project
    if(project.dataset.modalImg) return project.dataset.modalImg;
    const imgs = Array.from(project.querySelectorAll('img'));
    const png = imgs.find(i => i.src && i.src.toLowerCase().endsWith('.png'));
    return png ? png.src : (imgs[0] ? imgs[0].src : null);
  }

  function openModal(project){
    if(!project) return;
    modalTitle.textContent = getCaption(project);
    modalDesc.textContent = getDescription(project);
    const imgSrc = findTransparentPNG(project);
    if(imgSrc) {
      modalImage.src = imgSrc;
      modalImage.style.display = '';
    } else {
      modalImage.style.display = 'none';
    }

    lastFocused = document.activeElement;
    document.body.classList.add('modal-open');
    // hide main content from screen readers while modal is visible
    const main = document.getElementById('top');
    if(main) main.setAttribute('aria-hidden','true');
    modal.setAttribute('aria-hidden','false');
    // focus close button for keyboard users
    closeBtn.focus();
    // Attach focus trap
    document.addEventListener('keydown', trapFocus);
  }

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    if(lastFocused && lastFocused.focus) lastFocused.focus();
    const main = document.getElementById('top');
    if(main) main.removeAttribute('aria-hidden');
    document.removeEventListener('keydown', trapFocus);
  }

  function trapFocus(e){
    if(e.key !== 'Tab') return;
    const focusable = modal.querySelectorAll('button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if(!focusable.length) { e.preventDefault(); return; }
    const first = focusable[0];
    const last = focusable[focusable.length-1];
    if(e.shiftKey){
      if(document.activeElement === first){ last.focus(); e.preventDefault(); }
    } else {
      if(document.activeElement === last){ first.focus(); e.preventDefault(); }
    }
  }

  // close interactions
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e){
    // close if clicking the overlay outside the modal box
    if(e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

  // Attach handlers to images/videos inside projects
  const triggers = document.querySelectorAll('.project .item img, .project .item video');
  triggers.forEach(t => {
    t.setAttribute('tabindex','0');
    t.addEventListener('click', function(e){
      const project = findProject(e.currentTarget);
      openModal(project);
    });
    // also support keyboard open
    t.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); const project = findProject(e.currentTarget); openModal(project); } });
  });

  // hide image if load fails (e.g. missing file)
  modalImage.addEventListener('error', function(){
    modalImage.style.display = 'none';
  });

})();
/* extracted script from test.html - gallery + overlay logic */
// Overlay toggle
const toggleBtn = document.getElementById('menuToggle');
const overlay = document.getElementById('overlay');

function openOverlay(){
  overlay.classList.add('open');
  document.body.classList.add('overlay-open');
  toggleBtn.textContent = '×';
}

function closeOverlay(){
  overlay.classList.remove('open');
  document.body.classList.remove('overlay-open');
  toggleBtn.textContent = '＋';
}

toggleBtn.addEventListener('click', (e) => {
  // toggle overlay
  if (overlay.classList.contains('open')) closeOverlay();
  else openOverlay();
  e.stopPropagation();
});

// close overlay when user clicks outside the overlay while it is open
document.addEventListener('click', (e) => {
  if (!overlay.classList.contains('open')) return;
  if (e.target.closest('#overlay')) return; // click inside overlay should not close
  if (e.target === toggleBtn) return; // toggle button handled separately
  closeOverlay();
});

/* Horizontal gallery logic */
document.querySelectorAll('.gallery').forEach(gallery => {
  const track = gallery.querySelector('.track');
  const leftBtn = gallery.parentElement.querySelector('.arrow.left');
  const rightBtn = gallery.parentElement.querySelector('.arrow.right');

  let currentX = 0;

  function updateArrows() {
    const galleryW = gallery.offsetWidth;
    const totalW = track.scrollWidth;

    leftBtn.classList.toggle('hidden', currentX === 0);
    rightBtn.classList.toggle('hidden', currentX <= -(totalW - galleryW));
  }

  function scroll(dir) {
    const step = window.innerWidth * 0.5;
    const galleryW = gallery.offsetWidth;
    const totalW = track.scrollWidth;

    if (dir === 'left') currentX = Math.min(0, currentX + step);
    else currentX = Math.max(-(totalW - galleryW), currentX - step);

    track.style.transform = `translateX(${currentX}px)`;
    updateArrows();
  }

  leftBtn.addEventListener('click', () => scroll('left'));
  rightBtn.addEventListener('click', () => scroll('right'));

  updateArrows();
});

// Adjust each tile width so the tile matches the image/video aspect ratio
function adjustTileWidths() {
  const galleries = document.querySelectorAll('.gallery');
  if (!galleries.length) return;

  galleries.forEach(gallery => {
    const items = gallery.querySelectorAll('.item');
    items.forEach(item => {
      const img = item.querySelector('img');
      const vid = item.querySelector('video');

      // helper to set width based on natural ratio
      function setByRatio(nw, nh) {
        if (!nw || !nh) return;
        // use the computed pixel height of the item
        const targetH = item.clientHeight || Math.round(window.innerHeight * 0.7);
        const w = Math.max(40, Math.round((nw / nh) * targetH));
        item.style.width = w + 'px';
      }

      if (img) {
        if (img.naturalWidth && img.naturalHeight) setByRatio(img.naturalWidth, img.naturalHeight);
        else img.addEventListener('load', () => setByRatio(img.naturalWidth, img.naturalHeight));
      } else if (vid) {
        // videos may not have videoWidth until metadata is loaded
        if (vid.videoWidth && vid.videoHeight) setByRatio(vid.videoWidth, vid.videoHeight);
        else {
          // try to use poster image dimensions if available
          const poster = vid.getAttribute('poster');
          if (poster) {
            const p = new Image();
            p.onload = () => setByRatio(p.width, p.height);
            p.src = poster;
          }
          // also update when metadata loads
          vid.addEventListener('loadedmetadata', () => setByRatio(vid.videoWidth, vid.videoHeight));
        }
      }
    });
  });
}

// Run on load and when the window changes size. Will also re-run when an image loads.
window.addEventListener('load', adjustTileWidths);
window.addEventListener('resize', () => {
  // small debounce to avoid thrashing
  clearTimeout(window._tileResizeTimeout);
  window._tileResizeTimeout = setTimeout(adjustTileWidths, 120);
});

// Also observe mutation in case new items are inserted dynamically
const observer = new MutationObserver(() => adjustTileWidths());
observer.observe(document.querySelector('main') || document.documentElement, { childList: true, subtree: true });

// custom circular cursor (inverts whatever is below using mix-blend-mode)
;(function attachCustomCursor(){
  // disable on touch devices
  if ('ontouchstart' in window) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  // enable hiding system cursor
  document.body.classList.add('hide-default-cursor');

  let isDown = false;

  function move(e){
    // e could be a TouchEvent or MouseEvent. We already guard against touch devices.
    const x = e.clientX;
    const y = e.clientY;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
    cursor.style.opacity = '1';
  }

  window.addEventListener('mousemove', move, { passive:true });
  window.addEventListener('mouseenter', move, { passive:true });
  window.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; }, { passive:true });

  window.addEventListener('mousedown', () => { isDown = true; cursor.classList.add('down'); }, true);
  window.addEventListener('mouseup', () => { isDown = false; cursor.classList.remove('down'); }, true);

  // hide cursor when overlay opened (so it does not clash with white overlay)
  const toggleOverlayObserver = new MutationObserver(() => {
    const overlayOpen = document.body.classList.contains('overlay-open');
    cursor.style.display = overlayOpen ? 'none' : '';
  });
  toggleOverlayObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

})();
  // removed fixed overlay arrows fallback to avoid jumping behavior and keep built-in arrows stable
