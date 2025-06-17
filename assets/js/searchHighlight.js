document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.querySelector('.single-side-bar button');
    const searchInput = document.querySelector('.single-side-bar input[type="text"]');
    const contentArea = document.querySelector('.searchable-content');

    searchBtn.addEventListener('click', function (e) {
        e.preventDefault();
        removeHighlights(contentArea);

        const keyword = searchInput.value.trim();
        if (keyword.length > 0) {
            highlightAll(contentArea, keyword);
        }
    });

    function highlightAll(element, keyword) {
        if (!keyword) return;
        const regex = new RegExp(`(${escapeRegExp(keyword)})`, 'gi');
        for (const node of element.childNodes) {
            if (node.nodeType === 3 && node.data.trim() !== "") {
                const replaced = node.data.replace(regex, '<span class="highlighted-search">$1</span>');
                if (replaced !== node.data) {
                    const temp = document.createElement('span');
                    temp.innerHTML = replaced;
                    node.parentNode.replaceChild(temp, node);
                }
            } else if (node.nodeType === 1 && !['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA', 'BUTTON'].includes(node.tagName)) {
                highlightAll(node, keyword);
            }
        }
    }

    function removeHighlights(element) {
        if (!element) return;
        const highlights = element.querySelectorAll('.highlighted-search');
        highlights.forEach(function (span) {
            span.replaceWith(document.createTextNode(span.textContent));
        });
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
});

// Tambahkan CSS highlight
const style = document.createElement('style');
style.innerHTML = `.highlighted-search { background: yellow; color: black; transition: background 0.3s; }`;
document.head.appendChild(style);