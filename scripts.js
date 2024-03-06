document.addEventListener('DOMContentLoaded', initializePage);

function initializePage() {
    setupPageNavigation();
    langButtonEventListener();
    loadScript();
}

function setupPageNavigation() {
    // This is loding other pages logic
    const ids = [
        'index', 'profile', 'ArtDescriptions', 'DevDescriptions', 'contact'
    ];
    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', event => {
                event.preventDefault();
                sessionStorage.setItem("page", id);
                
                if (id === 'index') {
                    window.location.href = '../index.html';
                } else {
                    const currentPage = window.location.pathname.split('/').pop();
                    if (currentPage === 'detailPage.html') {
                        loadScript();
                    } else {
                        window.location.href = './html/detailPage.html';
                    }
                }
            });
        }
    });

    // need to add change setting header li display setting none to block

    // This is li tag display setting
    const pageId = localStorage.getItem("page");
    if (pageId == null){
        sessionStorage.setItem("page", "index");
    }
}
// Need to add css for each page call

// This is loading JavaScript for each page call
function loadScript(callback) {
    const pageId = sessionStorage.getItem("page");
    const scriptSrc = '../js/' + pageId + '.js';
    const scripts = document.getElementsByTagName('script');

    for (let script of scripts) {
        if (script.getAttribute('src') === scriptSrc) {
            return;
        }
    }

    const newScript = document.createElement('script');
    newScript.src = scriptSrc;

    // callback readAndWrite();
    newScript.onload = function() {
        if (callback && typeof callback === 'function') {
            callback();
        }
    };

    document.body.appendChild(newScript);
}

// This is language button logic
function langButtonEventListener() {
    if (localStorage.getItem("language") == null) {
        localStorage.setItem("language", "ko");
        readAndWrite();
    }

    document.getElementById('korean').addEventListener('click', () => {
        localStorage.setItem("language", "ko");
        readAndWrite();
    });

    document.getElementById('english').addEventListener('click', () => {
        localStorage.setItem("language", "en");
        readAndWrite();
    });
}
