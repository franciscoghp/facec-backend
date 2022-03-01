const nav_links = document.querySelectorAll(".nav__item-link");
const sub_links = document.querySelectorAll(".sub_link");

function collapse_nav(head, toggler, sidenav, main_) {
  const header = document.getElementById(head);
  const nav_toggler = document.getElementById(toggler);
  const nav = document.getElementById(sidenav);
  const main = document.getElementById(main_);
  const overlay = document.getElementById("sidebar-overlay");

  nav_toggler.addEventListener("click", function () {
    this.classList.toggle("fa-times");
    nav.classList.toggle("collapse_");
    header.classList.toggle("collapse-header");

    if (window.innerWidth <= 992) {
      overlay.classList.remove("d-none");
     
    }else {
      main.classList.toggle("collapse-main");
    }
  });

  overlay.addEventListener("click", function () {
    nav.classList.remove("collapse_");
    header.classList.remove("collapse-header");
    main.classList.remove("collapse-main");
    overlay.classList.toggle("d-none");
  });
}

collapse_nav("header", "nav-toggler", "nav", "main");

nav_links.forEach((link) => {
  link.addEventListener("click", function () {
    nav_links.forEach((l) => {
      if (l.classList.contains("active_")) {
        l.classList.remove("active_");
      }
    });

    this.classList.toggle("active_");
    const sub_menu = this.nextElementSibling;
    if (sub_menu) {
      sub_menu.classList.toggle("d-none");
    }
  });
});

sub_links.forEach((link) => {
  link.addEventListener("click", () => {
    sub_links.forEach((l) => l.classList.remove("active-sub-link"));
    link.classList.toggle("active-sub-link");
  });
});

function reportWindowSize(){
  let header = document.getElementById("header");
  let nav = document.getElementById("nav");
  let main = document.getElementById("main");
  if (window.innerWidth <= 992) {
    // overlay.classList.remove("d-none");
    header.classList.remove("collapse-header");
    nav.classList.remove("collapse_");
    main.classList.remove("collapse-main");
  }
}

window.onresize = reportWindowSize;

