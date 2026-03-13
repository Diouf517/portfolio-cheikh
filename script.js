<script>
  // Menu burger
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
    lightbox.classList.remove("show-image"); // enlève le mode image
    lightboxImg.style.display = "none";      // cache l’image agrandie
    caption.innerHTML = "";                  // vide la légende
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    // ⚠️ On ne ferme pas la lightbox ici, la grille reste visible
  });

  // Fermer si clic en dehors de l’image
  window.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";       // ferme complètement la lightbox
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
      // ⚠️ Ici aussi, on ne ferme pas la grille, juste l’image
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
</script>
const zoomInBtn = document.getElementById("zoom-in-btn");
const zoomOutBtn = document.getElementById("zoom-out-btn");
const downloadBtn = document.getElementById("download-btn");

let zoomLevel = 1;

// Quand on clique sur une image
galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
    caption.innerHTML = img.alt;
    downloadBtn.href = img.src; // lien direct vers l’image
    zoomLevel = 1;
    lightboxImg.style.transform = "scale(1)";
  });
});

// Zoom +
zoomInBtn.addEventListener("click", () => {
  zoomLevel += 0.2;
  lightboxImg.style.transform = `scale(${zoomLevel})`;
});

// Zoom -
zoomOutBtn.addEventListener("click", () => {
  if (zoomLevel > 0.4) {
    zoomLevel -= 0.2;
    lightboxImg.style.transform = `scale(${zoomLevel})`;
  }
});
