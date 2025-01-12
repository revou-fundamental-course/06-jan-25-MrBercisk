// hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('show');
});

const carousel = document.querySelector('.carousel-images');
const gambar = document.querySelectorAll('.carousel-images img');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const dotsContainer = document.getElementById('dots');
let currentIndex = 0;

// Generate dots
gambar.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.setAttribute('data-index', index);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dots span');
updateDots();

function goToSlide(index) {
    if (index < 0) {
        currentIndex = gambar.length - 1;
    } else if (index >= gambar.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    updateDots();
}

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));
nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));

// Auto-slide
setInterval(() => goToSlide(currentIndex + 1), 5000);


// input form & untuk welcome teks
document.getElementById('contact-form').addEventListener('submit', function(event) {
    // tidak reload halaman
    event.preventDefault(); 
    
    var nama = document.getElementById('nama').value;
    var tglLahir = document.querySelector('input[name="tgl_lahir"]').value;
    var jeniskelamin = document.querySelector('input[name="jeniskelamin"]:checked') ? document.querySelector('input[name="jeniskelamin"]:checked').value : '';
    var pesan = document.getElementById('pesan').value;

    document.getElementById('error-nama').textContent = '';
    document.getElementById('error-tgl-lahir').textContent = '';
    document.getElementById('error-jeniskelamin').textContent = '';
    document.getElementById('error-pesan').textContent = '';

    // Validasi input
    var isValid = true;

    if (nama === "") {
        document.getElementById('error-nama').textContent = 'Nama harus diisi!';
        isValid = false;
    }
    if (tglLahir === "") {
        document.getElementById('error-tgl-lahir').textContent = 'Tanggal lahir harus diisi!';
        isValid = false;
    }
    if (jeniskelamin === "") {
        document.getElementById('error-jeniskelamin').textContent = 'Jenis kelamin harus dipilih!';
        isValid = false;
    }
    if (pesan === "") {
        document.getElementById('error-pesan').textContent = 'Pesan harus diisi!';
        isValid = false;
    }

    // validasi gagal stop submit
    if (!isValid) {
        return;
    }

    // format tanggal
    var tanggalPart = tglLahir.split("-");
    var formatTanggal = `${tanggalPart[2]}/${tanggalPart[1]}/${tanggalPart[0]}`;
    
    var sekarang = new Date();
    var tanggalSaatini = sekarang.getDate(); 
    var bulanSaatini = sekarang.getMonth() + 1; 
    var tahunSaatini = sekarang.getFullYear(); 
    var gmtSaatini = sekarang.toUTCString();

    // gmt formatnya
    // itung menit
    var timezoneOffset = sekarang.getTimezoneOffset(); 
     // itung jam
    var formatGmt = -(timezoneOffset / 60);
    var gmtString = formatGmt >= 0 ? `+${formatGmt}` : `+${formatGmt}`;
      
    // inputan hidden buat gmt
    document.getElementById('tanggal-saatini').value = tanggalSaatini;
    document.getElementById('bulan-saatini').value = bulanSaatini;
    document.getElementById('tahun-saatini').value = tahunSaatini;
    document.getElementById('gmt-saatini').value = gmtSaatini;
    document.getElementById('gmtformat-saatini').value = gmtString;

    // hasil input form
    document.getElementById('output-message').innerHTML = 
    '<b>Current Time</b> : ' + gmtSaatini + gmtString + '<br><br>' +
    '<b>Nama</b> : ' + nama + '<br>' +
    '<b>Tanggal Lahir</b> : ' + formatTanggal + '<br>' +
    '<b>Jenis Kelamin</b> : ' + (jeniskelamin === 'lakilaki' ? 'Laki-Laki' : 'Perempuan') + '<br>' +
    '<b>Pesan</b> : ' + pesan + '<br>';


    var welcomeText = document.getElementById('welcome-text');
    welcomeText.textContent = `Hi ${nama}, Welcome To Website`

    Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Pesan Anda telah dikirim!',
    });
});
// animasi aos
document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        // jalan pas web dibuka
        startEvent: 'DOMContentLoaded', 
        duration: 1000,              
        once: false,    
        mirror: true  
    });
});
