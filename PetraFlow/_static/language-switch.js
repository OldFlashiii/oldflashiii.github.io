(function () {
    function targetFor(pathname) {
        if (pathname.indexOf("/zh/") !== -1) {
            return {
                href: pathname.replace("/zh/", "/en/"),
                label: "English",
            };
        }
        if (pathname.indexOf("/en/") !== -1) {
            return {
                href: pathname.replace("/en/", "/zh/"),
                label: "中文",
            };
        }
        return {
            href: pathname.replace(/[^/]*$/, "zh/index.html"),
            label: "中文",
        };
    }

    function addLanguageSwitch() {
        var nav = document.querySelector(".navbar-header-items__end");
        if (!nav) {
            nav = document.querySelector(".bd-header .navbar-nav");
        }
        if (!nav || document.querySelector(".pf-lang-switch")) {
            return;
        }

        var target = targetFor(window.location.pathname);
        var link = document.createElement("a");
        link.className = "pf-lang-switch";
        link.href = target.href + window.location.search + window.location.hash;
        link.textContent = target.label;
        link.setAttribute("aria-label", "Switch documentation language");
        nav.appendChild(link);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", addLanguageSwitch);
    } else {
        addLanguageSwitch();
    }
})();
