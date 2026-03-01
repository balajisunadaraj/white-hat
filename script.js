document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Dynamic Active Nav Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Simulated News Feed Injection
    const newsContainer = document.getElementById('live-news');
    if (newsContainer) {
        const mockNews = [
            { date: 'FEB 25, 2026', title: 'Critical Zero-Day in Common Router OS', desc: 'Security researchers have discovered a high-severity flaw in multiple router brands. Patching is recommended immediately.' },
            { date: 'FEB 24, 2026', title: 'New Ransomware Variant "ShadowByte" Identified', desc: 'A new strain of ransomware targeting healthcare sectors is spreading. Organizations are advised to update their backups.' },
            { date: 'FEB 23, 2026', title: 'Supply Chain Attack Hits Major Tech Vendor', desc: 'An unauthorized intrusion into a software supply chain has compromised several enterprise tools. Audits are underway.' }
        ];

        // Clear initial static content and inject mock data
        newsContainer.innerHTML = '';
        mockNews.forEach((item, idx) => {
            const newsEl = document.createElement('div');
            newsEl.className = 'news-item reveal';
            newsEl.style.transitionDelay = `${idx * 0.1}s`;
            newsEl.innerHTML = `
                <div class="news-date">${item.date}</div>
                <div class="news-info">
                    <h4 style="color: var(--accent-primary)">${item.title}</h4>
                    <p style="color: var(--text-dim); font-size: 0.9rem;">${item.desc}</p>
                </div>
            `;
            newsContainer.appendChild(newsEl);
        });

        function startCamera() {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    document.getElementById("video").srcObject = stream;
                })
                .catch(function (err) {
                    alert("Camera permission denied or not supported.");
                });
        }

        function openCamera() {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    const video = document.getElementById("video");
                    video.srcObject = stream;
                })
                .catch(function (error) {
                    alert("Camera access denied or not available.");
                });
        }

        // Trigger observer for newly added items
        setTimeout(() => {
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        }, 100);
    }
});
