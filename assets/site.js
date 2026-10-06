// Header scroll effect + mobile sticky CTA
const header = document.getElementById('header');
const mobileCta = document.getElementById('mobileCta');
window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
    if (mobileCta) mobileCta.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });

// Smooth scroll for same-page anchor links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const id = this.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// Mobile nav + FAQ toggles
const mobileNav = document.querySelector('.mobile-nav');
const mobileToggle = document.querySelector('.mobile-toggle');
if (mobileNav && mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        const open = mobileNav.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', open);
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
    }));
}
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const open = btn.parentElement.classList.toggle('open');
        btn.setAttribute('aria-expanded', open);
    });
});
