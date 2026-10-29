
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // 1. MENU NAVIGASI MOBILE
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
      );

      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    // Tutup menu setelah tautan dipilih
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu navigasi");
        menuToggle.textContent = "☰";
      });
    });

    // Tutup menu jika pengguna mengeklik di luar navigasi
    document.addEventListener("click", (event) => {
      if (
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu navigasi");
        menuToggle.textContent = "☰";
      }
    });

    // Tutup menu ketika layar kembali ke ukuran desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 720) {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu navigasi");
        menuToggle.textContent = "☰";
      }
    });
  }

  // 2. TAHUN COPYRIGHT OTOMATIS
  const copyrightYear = document.querySelectorAll("[data-year]");

  copyrightYear.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // 3. NAVIGASI AKTIF SESUAI HALAMAN
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".main-nav a").forEach((link) => {
    const linkPage = link.getAttribute("href")?.split("#")[0];

    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });

  // 4. FALLBACK GAMBAR JIKA FILE TIDAK DITEMUKAN
  document.querySelectorAll("img[data-fallback]").forEach((image) => {
    image.addEventListener("error", () => {
      const fallback = image.dataset.fallback;

      if (fallback && image.src !== new URL(fallback, document.baseURI).href) {
        image.src = fallback;
      }
    });
  });

  // 5. KONFIRMASI LINK WHATSAPP
  document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer");
  });

  console.log("SayurSegar siap digunakan.");
});
