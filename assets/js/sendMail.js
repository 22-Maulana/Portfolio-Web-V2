document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const subject = encodeURIComponent('Pesan dari Website Portfolio');
            const body = encodeURIComponent(
                `Nama: ${name}\nEmail: ${email}\nPesan:\n${message}`
            );

            window.location.href = `mailto:maulanaardhiansyah86@gmail.com?subject=${subject}&body=${body}`;
        });
    }
});