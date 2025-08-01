// Toggle tema
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
  
  if (body.classList.contains('dark-mode')) {
    toggleBtn.textContent = '☀️ Light Mode';
    stars.forEach(s => s.color = 'white');
  } else {
    toggleBtn.textContent = '🌙 Dark Mode';
    stars.forEach(s => s.color = 'gold');
  }
});

// Animasi bintang jatuh
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.size = Math.random() * 2;
    this.speedY = Math.random() * 2 + 1;
    this.color = body.classList.contains('light-mode') ? 'gold' : 'white';
  }

  update() {
    this.y += this.speedY;
    if (this.y > canvas.height) this.reset();
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

const stars = Array.from({ length: 150 }, () => new Star());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}

animate();
document.getElementById('curhatForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const data = {
    nama: document.getElementById('nama').value,
    curhat: document.getElementById('curhat').value
  };

  fetch("https://script.google.com/macros/s/AKfycbwE2MuGVpvru6p8QGbfjle8MSh_tkVyGaCnqacrjLfRJdOeKLOo7P1SrmK91Lkie_Oc/exec", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.text())
  .then(response => {
    document.getElementById('responseMsg').textContent = response;
    document.getElementById('curhatForm').reset();
  })
  .catch(error => {
    document.getElementById('responseMsg').textContent = "Gagal mengirim curhat. Coba lagi ya.";
  });
});