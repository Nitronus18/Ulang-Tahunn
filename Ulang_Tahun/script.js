function checkPassword() {
  console.log("Fungsi checkPassword terpanggil");
  const pass = document.getElementById('password').value;
  console.log("Password yang dimasukkan:", pass);

  if (pass === "18042003") {
    console.log("Password benar, akan pindah ke layer opening");
    const layerPassword = document.getElementById('layer-password');
    const layerOpening = document.getElementById('layer-opening');

    if (layerPassword) {
      layerPassword.classList.add('hidden');
      console.log("Layer password disembunyikan");
    } else {
      console.error("Element dengan ID 'layer-password' tidak ditemukan");
    }

    if (layerOpening) {
      layerOpening.classList.remove('hidden');
      console.log("Layer opening ditampilkan");
    } else {
      console.error("Element dengan ID 'layer-opening' tidak ditemukan");
    }
  } else {
    console.log("Password salah");
    alert("Coba lagi ya sayang 🥺");
  }
}

function nextLayer(currentId, nextId) {
  document.getElementById(currentId).classList.add('hidden');
  document.getElementById(nextId).classList.remove('hidden');

  // Panggil balon pas masuk ke layer-balloons
  if (nextId === 'layer-balloons') {
    createBalloons();
  }
}



// Custom cursor movement
const customCursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", (e) => {
  customCursor.style.left = e.pageX + 'px';
  customCursor.style.top = e.pageY + 'px';
});

// Floating hearts
setInterval(() => {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * window.innerWidth + 'px';
  document.getElementById('hearts-container').appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}, 500);

// Music autoplay on click anywhere
window.addEventListener('click', () => {
  const audio = document.getElementById("bg-music");
  if (audio && audio.paused) {
    audio.play();
  }
});

// Music For You player
function toggleMusic() {
  const audio = document.getElementById("music-player");
  const playBtn = document.getElementById("play-btn");
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸️ Pause";
  } else {
    audio.pause();
    playBtn.innerText = "▶️ Play";
  }
}

function openLetter() {
  const envelope = document.querySelector(".envelope");
  const hearts = document.querySelector(".hearts");
  
  envelope.classList.toggle("open");

  if (envelope.classList.contains("open")) {
    hearts.style.display = "block";
    setTimeout(() => {
      hearts.style.opacity = 1;
    }, 300);
  } else {
    hearts.style.opacity = 0;
    setTimeout(() => {
      hearts.style.display = "none";
    }, 500);
  }
}

let poppedCount = 0; // Menghitung balon yang sudah pecah
let currentNumber = 15; // Mulai dari angka 15

// Fungsi untuk membuat balon
function createBalloons() {
  const container = document.getElementById('balloon-container');
  container.innerHTML = ''; // Bersihkan kontainer balon sebelumnya
  const containerWidth = container.offsetWidth; // Ambil lebar kontainer
  const containerHeight = container.offsetHeight; // Ambil tinggi kontainer
  
  for (let i = 15; i <= 22; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.dataset.number = i; // Simpan angka di data-number
    balloon.style.backgroundImage = 'url(img/balloon.svg)'; // Gambar balon
    balloon.style.backgroundSize = 'cover'; // Menyesuaikan ukuran gambar
    balloon.style.backgroundPosition = 'center'; // Gambar rata tengah
    balloon.style.width = '100px'; // Tentukan ukuran balon
    balloon.style.height = '150px'; // Tentukan tinggi balon
    balloon.style.position = 'absolute'; // Agar balon bisa bergerak

    // Posisi acak balon di dalam container
    balloon.style.left = Math.random() * (containerWidth - 120) + 'px'; // Posisi acak di dalam kontainer
    balloon.style.top = Math.random() * (containerHeight - 150) + 'px'; // Posisi acak di dalam kontainer

    balloon.addEventListener('click', popBalloon); // Tambahkan event click
    container.appendChild(balloon); // Masukkan balon ke dalam kontainer
  }
  poppedCount = 0; // Reset hitungan balon yang pecah
  currentNumber = 15; // Reset angka ke 15
}

// Fungsi untuk meletuskan balon
function popBalloon(event) {
  const balloon = event.target;
  if (!balloon.classList.contains('popped')) {
    balloon.classList.add('popped'); // Tandai balon sudah pecah
    balloon.textContent = '💥'; // Efek meledak

    // Tambahkan delay untuk menampilkan angka setelah meletus
    setTimeout(() => {
      displayNumber(currentNumber); // Tampilkan angka yang pecah di tengah layar
      currentNumber++; // Meningkatkan angka setiap balon pecah

      poppedCount++; // Tambah jumlah balon yang pecah

      const sound = new Audio('pop.mp3');
      sound.play(); // Efek suara meletus

      if (poppedCount >= 8) { // Kalau sudah pecah 8 balon
        setTimeout(() => {
          displayYay(); // Tampilkan teks "YEEAAAY" setelah semua balon pecah
          setTimeout(() => {
            nextLayer('layer-balloons', 'layer-beautiful'); // Pindah ke layer selanjutnya
          }, 1500);
        }, 500);
      }
    }, 500); // Delay meletuskan balon dan menampilkan angka
  }
}

// Fungsi untuk menampilkan angka setelah balon pecah
function displayNumber(number) {
  const numberDisplay = document.createElement('div');
  numberDisplay.className = 'number-display';
  numberDisplay.textContent = number;
  document.body.appendChild(numberDisplay);
  numberDisplay.style.display = 'block'; // Tampilkan angka

  setTimeout(() => {
    numberDisplay.style.display = 'none'; // Sembunyikan angka setelah beberapa detik
  }, 1000);
}

// Fungsi untuk menampilkan teks "YEEAAAY" setelah semua balon pecah
function displayYay() {
  const yayText = document.createElement('div');
  yayText.className = 'yay-text';
  yayText.textContent = 'YEEAAAY!!! KAMU DAH TUAAAAAAAAAAAA';
  document.body.appendChild(yayText);
  yayText.style.display = 'block'; // Tampilkan teks

  setTimeout(() => {
    yayText.style.display = 'none'; // Sembunyikan teks setelah beberapa detik
  }, 2000);
}

// Memanggil fungsi createBalloons setelah halaman dimuat
document.addEventListener('DOMContentLoaded', createBalloons);


// Petunjuk dan jawaban untuk teka-teki silang
const crossword = [
  { word: 'LOVE', position: [0, 0] },  // Kata pertama di baris pertama
  { word: 'HAPPY', position: [1, 0] }  // Kata kedua di baris kedua
];

// Fungsi untuk memeriksa jawaban teka-teki silang
function checkCrossword() {
  let correct = true;
  crossword.forEach(wordObj => {
    const word = wordObj.word;
    const startRow = wordObj.position[0];
    const startCol = wordObj.position[1];
    let index = 0;

    // Periksa setiap huruf dalam teka-teki
    for (let i = startRow; i < startRow + word.length; i++) {
      const input = document.querySelector(`input[data-row='${i}'][data-col='${startCol + index}']`);
      if (input && input.value.toUpperCase() !== word[index]) {
        correct = false;
        input.style.backgroundColor = 'red'; // Tandai kesalahan dengan warna merah
      }
      index++;
    }
  });

  if (correct) {
    alert("Teka-teki silang berhasil dipecahkan! 💖");
    document.getElementById("next-crossword").classList.remove('hidden'); // Tampilkan tombol "Lanjut ke Hadiah"
  } else {
    alert("Ups, ada yang salah. Coba lagi ya sayang! 🥺");
  }
}

document.getElementById("next-crossword").classList.remove("hidden"); // Memunculkan tombol

function showLayer(id) {
  const layers = document.querySelectorAll('section[id^="layer-"], div[id^="layer-"]');
  layers.forEach(layer => layer.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

window.onload = function () {
  showLayer('layer-opening'); // ganti ini sesuai layer pertamamu
};
