
// ===========================
// REVEAL ANIMATION
// ===========================

const reveals = document.querySelectorAll('.reveal');

const ro = new IntersectionObserver((entries) => {

    entries.forEach((e, i) => {

        if (e.isIntersecting) {

            setTimeout(() => {
                e.target.classList.add('visible');
            }, i * 60);

            ro.unobserve(e.target);
        }

    });

}, {
    threshold: 0.08
});

reveals.forEach(r => ro.observe(r));


// ===========================
// STAGGER DELAY
// ===========================

document.querySelectorAll(
'.flip-grid .flip-card, .rel-grid .rel-card, .traits-grid .trait-card, .info-list .info-item, .counter-grid .cbox'
).forEach((el, i) => {

    el.style.transitionDelay = `${i * 0.07}s`;

});


// ===========================
// ACTIVE MENU
// ===========================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {

    let cur = '';

    sections.forEach(section => {

        if (window.scrollY >= section.offsetTop - 100) {
            cur = section.id;
        }

    });

    document.querySelectorAll('.nav-links a').forEach(link => {

        link.style.color =
            link.getAttribute('href') === `#${cur}`
                ? '#f5c842'
                : '';

    });

});


// ===========================
// FLIP CARDS
// ===========================

document.querySelectorAll('.flip-card').forEach(card => {

    card.addEventListener('click', () => {

        const inner = card.querySelector('.flip-inner');

        inner.style.transform =
            inner.style.transform === 'rotateY(180deg)'
                ? ''
                : 'rotateY(180deg)';

    });

});


// ===========================
// COUNTER ANIMATION
// ===========================

const counterSection = document.querySelector('.counter-section');

if (counterSection) {

    let counterStarted = false;

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting && !counterStarted) {

                counterStarted = true;

                const counters = document.querySelectorAll('.cbox-num');

                counters.forEach(counter => {

                    const target = parseInt(counter.dataset.target);

                    let count = 0;

                    const increment = target / 100;

                    const updateCounter = () => {

                        count += increment;

                        if (count < target) {

                            counter.innerHTML =
                                target > 2
                                    ? Math.floor(count) + "+"
                                    : Math.floor(count);

                            requestAnimationFrame(updateCounter);

                        } else {

                            counter.innerHTML =
                                target > 2
                                    ? target + "+"
                                    : target;

                        }

                    };

                    updateCounter();

                });

                counterObserver.unobserve(counterSection);

            }

        });

    }, {
        threshold: 0.3
    });

    counterObserver.observe(counterSection);

}
