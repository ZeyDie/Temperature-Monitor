import {invoke} from "@tauri-apps/api/core";

import {getCurrentWindow} from '@tauri-apps/api/window';

const appWindow = getCurrentWindow();

docReady(loadTitlebar());

function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 100);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function loadTitlebar() {
    invoke("plugin:theme|get_theme")
        .then(
            value => {
                console.log("Actual theme " + value);

                if (value === 'auto') {
                    console.log("Set default theme Dark");

                    invoke(
                        "plugin:theme|set_theme",
                        {theme: "dark"}
                    );
                }
            }
        );

    document
        .getElementById('titlebar-theme')
        ?.addEventListener(
            'click',
            () => {
                invoke("plugin:theme|get_theme")
                    .then(
                        value => {
                            console.log("Change theme from " + value);

                            invoke(
                                "plugin:theme|set_theme",
                                {theme: value === 'light' ? "dark" : "light"}
                            );
                        }
                    );
            }
        );
    document
        .getElementById('titlebar-close')
        ?.addEventListener(
            'click',
            () => appWindow.minimize()
        );
}