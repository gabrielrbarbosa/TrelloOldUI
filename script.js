// ==UserScript==
// @name         Trello Card Layout Restorer
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Restore previous Trello card design layout, rollback trello beta redesign to old UI
// @author       gabrielrbarbosa
// @match        https://trello.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // CSS to override the grid layout and move aside into main
    const customCSS = `
        /* Reset the grid layout to previous design */
        main[data-auto-scrollable="true"] {
            display: block !important;
            grid-template-columns: unset !important;
            grid-template-rows: unset !important;
            flex: 1 1 auto !important;
            width: 100% !important;
            overflow-y: auto !important;
        }

        /* Move aside content into main flow */
        aside {
            position: static !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            float: none !important;
        }

        /* Make the inner content div 100% width */
        main[data-auto-scrollable="true"] > div,
        [data-testid="card-back-panel"] {
            box-sizing: border-box !important;
            grid-column: unset !important;
            grid-row: unset !important;
            width: 100% !important;
            min-width: unset !important;
            max-width: unset !important;
            padding: 16px 20px !important;
        }

        /* Reset margins for all divs inside layer-manager-card-back */
        #layer-manager-card-back div {
            margin: 0 !important;
        }

        /* Set card-back-redesign max-height */
        .card-back-redesign {
            max-height: calc(100dvh - 60px) !important;
        }

        /* Set min-height for header inside card-back-redesign */
        .card-back-redesign header {
            min-height: 40px !important;
        }

        /* Reset margin-bottom for sections inside card-back-redesign */
        .card-back-redesign section {
            margin-bottom: 10px !important;
        }

        .card-back-redesign nav {
            margin-top: 10px !important;
        }

        .card-back-redesign nav div {
            padding: 0 !important;
        }

        /* Hide sticky header */
        [data-testid="card-back-sticky-header"] {
            display: none !important;
        }

        /* Add padding to card-back-header */
        [data-testid="card-back-header"] {
            padding: 10px 0 0 0 !important;
            max-width: 95% !important;
            margin-left: 20px;
        }

        [data-testid="card-back-title-input"] {
            font-size: 1.5rem !important;
            padding-top: 0 !important;
        }

        [data-testid="card-back-name"] {
            max-width: 800px;
        }

        /* Set max-height for hgroup inside card-back-header */
        [data-testid="card-back-header"] hgroup {
            max-height: 25px !important;
        }

        /* Ensure proper content flow */
        main[data-auto-scrollable="true"] > * {
            width: 100% !important;
        }

        /* Fix any potential layout issues */
        .card-detail-window {
            display: block !important;
        }

        /* Additional override for any nested divs that might have grid properties */
        main[data-auto-scrollable="true"] div[style*="grid-column"],
        main[data-auto-scrollable="true"] div[style*="grid-row"],
        [data-testid="card-back-panel"][style*="grid-column"],
        [data-testid="card-back-panel"][style*="grid-row"] {
            grid-column: unset !important;
            grid-row: unset !important;
            width: 100% !important;
            max-width: unset !important;
            min-width: unset !important;
        }
    `;

    // Function to inject CSS
    function injectCSS() {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.textContent = customCSS;
        document.head.appendChild(style);
    }

    // Function to move aside content into main and fix layout
    function moveAsideToMain() {
        const main = document.querySelector('main[data-auto-scrollable="true"]');
        const aside = document.querySelector('aside');

        if (main && aside && !aside.dataset.moved) {
            // Mark as moved to prevent duplicate operations
            aside.dataset.moved = 'true';

            // Move aside content to main
            main.appendChild(aside);

            console.log('Trello layout restored: aside moved to main');
        }

        // Fix inner div width
        const innerDiv = main?.querySelector('div');
        const cardBackPanel = document.querySelector('[data-testid="card-back-panel"]');

        [innerDiv, cardBackPanel].forEach(element => {
            if (element) {
                element.style.width = '100%';
                element.style.maxWidth = 'unset';
                element.style.minWidth = 'unset';
                element.style.gridColumn = 'unset';
                element.style.gridRow = 'unset';
            }
        });

        // Reset margins for all divs inside layer-manager-card-back
        const layerManager = document.querySelector('#layer-manager-card-back');
        if (layerManager) {
            const allDivs = layerManager.querySelectorAll('div');
            allDivs.forEach(div => {
                div.style.margin = '0';
            });
        }

        // Set card-back-redesign max-height
        const cardBackRedesign = document.querySelector('.card-back-redesign');
        if (cardBackRedesign) {
            cardBackRedesign.style.maxHeight = 'calc(100dvh - 60px)';
        }

        // Set min-height for header inside card-back-redesign
        const cardBackRedesignHeader = document.querySelector('.card-back-redesign header');
        if (cardBackRedesignHeader) {
            cardBackRedesignHeader.style.minHeight = '40px';
        }

        // Reset margin-bottom for sections inside card-back-redesign
        const cardBackRedesignSections = document.querySelectorAll('.card-back-redesign section');
        cardBackRedesignSections.forEach(section => {
            section.style.marginBottom = '10px';
        });

        // Hide sticky header
        const stickyHeader = document.querySelector('[data-testid="card-back-sticky-header"]');
        if (stickyHeader) {
            stickyHeader.style.display = 'none';
        }

        // Add padding to card-back-header
        const cardBackHeader = document.querySelector('[data-testid="card-back-header"]');
        if (cardBackHeader) {
            cardBackHeader.style.padding = '10px 0 0 0';
        }

        // Set max-height for hgroup inside card-back-header
        const cardBackHeaderHgroup = document.querySelector('[data-testid="card-back-header"] hgroup');
        if (cardBackHeaderHgroup) {
            cardBackHeaderHgroup.style.maxHeight = '25px';
        }
    }

    // Function to observe DOM changes and apply fixes
    function observeChanges() {
        const observer = new MutationObserver((mutations) => {
            let shouldCheck = false;

            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            if (node.tagName === 'MAIN' ||
                                node.tagName === 'ASIDE' ||
                                node.querySelector('main, aside') ||
                                node.dataset?.testid === 'card-back-panel' ||
                                node.querySelector('[data-testid="card-back-panel"]') ||
                                node.id === 'layer-manager-card-back' ||
                                node.querySelector('#layer-manager-card-back') ||
                                node.classList?.contains('card-back-redesign') ||
                                node.querySelector('.card-back-redesign') ||
                                node.dataset?.testid === 'card-back-sticky-header' ||
                                node.querySelector('[data-testid="card-back-sticky-header"]') ||
                                node.dataset?.testid === 'card-back-header' ||
                                node.querySelector('[data-testid="card-back-header"]')) {
                                shouldCheck = true;
                            }
                        }
                    });
                }
            });

            if (shouldCheck) {
                setTimeout(moveAsideToMain, 100);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Initialize when DOM is ready
    function init() {
        injectCSS();

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                moveAsideToMain();
                observeChanges();
            });
        } else {
            moveAsideToMain();
            observeChanges();
        }

        // Also try after a short delay for dynamic content
        setTimeout(() => {
            moveAsideToMain();
        }, 1000);
    }

    // Start the script
    init();

    // Handle navigation changes in SPA
    let currentUrl = location.href;
    new MutationObserver(() => {
        if (location.href !== currentUrl) {
            currentUrl = location.href;
            setTimeout(() => {
                moveAsideToMain();
            }, 500);
        }
    }).observe(document, { subtree: true, childList: true });

})();
