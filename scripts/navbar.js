document.addEventListener("DOMContentLoaded", function () {
  const navbarContainer = document.getElementById("navbar-container");

  fetch("./components/navbar.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Não foi possível carregar a navbar.");
      }
      return response.text();
    })
    .then((data) => {
      navbarContainer.innerHTML = data;

      const menuItems = document.querySelectorAll("#navbar-menu li");
      menuItems.forEach((item) => {
        item.addEventListener("click", function () {
          menuItems.forEach((i) => {
            i.classList.remove("selected");
            i.querySelector(".navbar-icon").classList.remove("selected-icon");
          });

          item.classList.add("selected");
          item.querySelector(".navbar-icon").classList.add("selected-icon");
        });
      });

      const menuIcon = document.getElementById("menu-icon");
      const navbar = document.querySelector(".navbar");

      menuIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        navbar.classList.remove("closed");
        navbar.classList.add("open");

        menuIcon.classList.toggle("hidden");
      });

      document.addEventListener("click", function (event) {
        if (
          !navbar.contains(event.target) &&
          !menuIcon.contains(event.target) &&
          window.innerWidth < 768
        ) {
          if (navbar.classList.contains("open")) {
            navbar.classList.remove("open");
            navbar.classList.add("closed");

            menuIcon.classList.add("show");
          }
        }
      });

      window.addEventListener("resize", function () {
        if (window.innerWidth >= 1100) {
          navbar.classList.remove("closed");
          navbar.classList.remove("open");
          menuIcon.classList.add("hidden");
        } else {
          navbar.classList.add("closed");
          menuIcon.classList.remove("hidden");
        }
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar a navbar:", error);
    });
});
