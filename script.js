// En-tête réactive au scroll : se rétracte et devient opaque avec un léger halo cuivré
const header = document.getElementById('header');
if (header) {
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
}
// Menu mobile
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    burger.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.textContent = '☰';
  }));
}
// Galerie des réalisations (lightbox léger, sans dépendance)
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCount = document.getElementById('lightboxCount');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  let currentGroup = [];
  let currentIndex = 0;
  function render() {
    lightboxImg.src = currentGroup[currentIndex];
    if (lightboxCount) lightboxCount.textContent = (currentIndex + 1) + ' / ' + currentGroup.length;
  }
  function openLightbox(group, index) {
    currentGroup = group;
    currentIndex = index;
    render();
    lightbox.classList.add('open');
  }
  function move(delta) {
    currentIndex = (currentIndex + delta + currentGroup.length) % currentGroup.length;
    render();
  }
  document.querySelectorAll('.realisation-gallery').forEach((gallery) => {
    const thumbs = Array.from(gallery.querySelectorAll('.gallery-thumb'));
    const group = thumbs.map((t) => t.dataset.full);
    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => openLightbox(group, i));
    });
  });
  if (closeBtn) closeBtn.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  if (prevBtn) prevBtn.addEventListener('click', () => move(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => move(1));
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') lightbox.classList.remove('open');
    if (e.key === 'ArrowLeft') move(-1);
    if (e.key === 'ArrowRight') move(1);
  });
}
// Formulaire de contact (présent uniquement sur contact.html) — envoi réel via Formspree
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (form && formSuccess) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Envoi en cours...'; }
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' },
      });
      if (response.ok) {
        form.style.display = 'none';
        formSuccess.style.display = 'flex';
      } else {
        alert("Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous appeler directement.");
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Envoyer ma demande'; }
      }
    } catch (err) {
      alert("Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous appeler directement.");
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Envoyer ma demande'; }
    }
  });
}
