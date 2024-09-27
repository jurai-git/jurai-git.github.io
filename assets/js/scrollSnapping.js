const sections = document.querySelectorAll('section, footer');
const scrollContainer = document.querySelector('.scroll-container');

document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        scrollContainer.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});
