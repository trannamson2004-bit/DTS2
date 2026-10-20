/* ====== Đèn kéo quân - Javascript ====== */
(function () {
    'use strict';

    var carousel = document.querySelector('.carousel');
    if (!carousel) return; // trang khác không có đèn kéo quân
    var faces = document.querySelectorAll('.face');
    var statusEl = document.querySelector('.status');
    var n = faces.length; // 6 mặt
    var angleStep = 360 / n; // 60 độ mỗi mặt

    // Bán kính tròn (căn cứ vào chiều rộng mặt)
    var faceWidth = 220;
    var radius = Math.round(faceWidth / (2 * Math.tan(Math.PI / n))); // ~190px

    // Sắp xếp 6 mặt thành vòng tròn 3D
    faces.forEach(function (face, i) {
        face.style.transform = 'rotateY(' + (i * angleStep) + 'deg) translateZ(' + radius + 'px)';
    });

    // Trạng thái điều khiển
    var currentAngle = 0;
    var speed = 0.3;        // độ / khung hình
    var direction = 1;      // 1 = thuận, -1 = ngược
    var isPaused = false;
    var rafId = null;

    function updateStatus() {
        if (isPaused) {
            statusEl.textContent = 'DANG DUNG - (Rê chuột ra để đèn quay tiếp)';
            statusEl.style.color = '#ff6b6b';
        } else {
            statusEl.textContent = 'Dang quay - (Đưa chuột vào 1 ảnh để dừng)';
            statusEl.style.color = '#87ceeb';
        }
    }

    // Vòng lặp xoay bằng requestAnimationFrame
    function spin() {
        if (!isPaused) {
            currentAngle += speed * direction;
            carousel.style.transform = 'rotateY(' + currentAngle + 'deg)';
        }
        rafId = requestAnimationFrame(spin);
    }

    // ====== Yêu cầu chính: đưa chuột vào ảnh => dừng; rê ra => quay tiếp ======
    faces.forEach(function (face) {
        face.addEventListener('mouseenter', function () {
            isPaused = true;
            updateStatus();
        });
        face.addEventListener('mouseleave', function () {
            isPaused = false;
            updateStatus();
        });
    });

    // ====== Các nút điều khiển bổ trợ ======
    var btnFaster = document.getElementById('btnFaster');
    var btnSlower = document.getElementById('btnSlower');
    var btnReverse = document.getElementById('btnReverse');
    var btnToggle = document.getElementById('btnToggle');

    if (btnFaster) btnFaster.addEventListener('click', function () {
        speed = Math.min(speed + 0.15, 2);
    });
    if (btnSlower) btnSlower.addEventListener('click', function () {
        speed = Math.max(speed - 0.15, 0.1);
    });
    if (btnReverse) btnReverse.addEventListener('click', function () {
        direction *= -1;
        this.textContent = direction === 1 ? 'Chieu thuan' : 'Chieu nguoc';
    });
    if (btnToggle) btnToggle.addEventListener('click', function () {
        isPaused = !isPaused;
        this.textContent = isPaused ? 'Cho quay' : 'Dung lai';
        this.classList.toggle('active', isPaused);
        updateStatus();
    });

    updateStatus();
    spin(); // Bắt đầu quay
})();


/* ====== Menu: tự tô sáng mục của trang đang xem ====== */
(function () {
    var cur = location.pathname.split('/').pop() || 'menu.html';
    if (cur === 'index.html') cur = 'menu.html';
    document.querySelectorAll('.site-nav a').forEach(function (a) {
        if (a.getAttribute('href') === cur) a.classList.add('active');
    });
})();
