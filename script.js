<script>
  // Menu burger (version avec id)
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('show');
    });

    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('show');
      });
    });
  }

  // Lightbox
  const openBtn = document.getElementById("open-gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const galleryImages = document.querySelectorAll("#lightbox-gallery img");

  let currentIndex = 0;

  // Ouvrir la grille
  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    lightbox.style.display = "block";
    lightbox.classList.remove("show-image"); // mode grille
    lightboxImg.style.display = "none";
    caption.innerHTML = "";
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  });

  // Cliquer sur une image
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      lightbox.classList.add("show-image"); // mode image
      lightboxImg.style.display = "block";
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
      lightboxImg.src = img.src;
      caption.innerHTML = img.alt;
    });
  });

  // Navigation
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
    caption.innerHTML = galleryImages[currentIndex].alt;
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
    caption.innerHTML = galleryImages[currentIndex].alt;
  });

  // Fermer
  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("show-image");
    lightboxImg.style.display = "none";
    caption.innerHTML = "";
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  });

  // Fermer si clic en dehors
  window.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      lightbox.classList.remove("show-image");
    }
  });

  // Clavier
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lightbox.classList.remove("show-image");
      lightboxImg.style.display = "none";
      caption.innerHTML = "";
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    }
    if (e.key === "ArrowLeft" && lightbox.classList.contains("show-image")) {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      lightboxImg.src = galleryImages[currentIndex].src;
      caption.innerHTML = galleryImages[currentIndex].alt;
    }
    if (e.key === "ArrowRight" && lightbox.classList.contains("show-image")) {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      lightboxImg.src = galleryImages[currentIndex].src;
      caption.innerHTML = galleryImages[currentIndex].alt;
    }
  });

  // Zoom et téléchargement
  const zoomInBtn = document.getElementById("zoom-in-btn");
  const zoomOutBtn = document.getElementById("zoom-out-btn");
  const downloadBtn = document.getElementById("download-btn");

  let zoomLevel = 1;

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      lightbox.style.display = "block";
      lightboxImg.src = img.src;
      caption.innerHTML = img.alt;
      downloadBtn.href = img.src;
      zoomLevel = 1;
      lightboxImg.style.transform = "scale(1)";
    });
  });

  zoomInBtn.addEventListener("click", () => {
    zoomLevel += 0.2;
    lightboxImg.style.transform = `scale(${zoomLevel})`;
  });

  zoomOutBtn.addEventListener("click", () => {
    if (zoomLevel > 0.4) {
      zoomLevel -= 0.2;
      lightboxImg.style.transform = `scale(${zoomLevel})`;
    }
  });

  // ✅ Menu mobile plein écran
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    // Fermer le menu quand on clique sur un lien
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }
</script>
.nav-links {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #004080;
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 3000;
}

.nav-links.show {
  transform: translateY(0);
}
