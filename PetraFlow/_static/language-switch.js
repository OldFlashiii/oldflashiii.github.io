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

    function filterLanguageSidebar() {
        var pathname = window.location.pathname;
        var lang = pathname.indexOf("/zh/") !== -1 ? "zh" : pathname.indexOf("/en/") !== -1 ? "en" : null;
        if (!lang) {
            return;
        }

        document.querySelectorAll("nav.bd-docs-nav").forEach(function (nav) {
            var caption = nav.querySelector(".caption-text");
            if (caption && caption.textContent.trim() === "文档入口") {
                caption.textContent = lang === "zh" ? "中文文档" : "Documentation";
            }

            nav.querySelectorAll("li.toctree-l1").forEach(function (item) {
                var anchor = item.querySelector(":scope > a");
                if (!anchor) {
                    return;
                }
                var href = anchor.getAttribute("href") || "";
                var targetPath;
                try {
                    targetPath = new URL(href, window.location.href).pathname;
                } catch (error) {
                    targetPath = href;
                }
                var isZh = targetPath.indexOf("/zh/") !== -1;
                var isEn = targetPath.indexOf("/en/") !== -1;
                if ((lang === "zh" && isEn) || (lang === "en" && isZh)) {
                    item.hidden = true;
                    item.style.display = "none";
                }
            });
        });
    }

    function initializePetraFlowDocs() {
        addLanguageSwitch();
        filterLanguageSidebar();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializePetraFlowDocs);
    } else {
        initializePetraFlowDocs();
    }
})();
