module.exports = api => {
    // Add dependencies
    api.extendPackage({
        dependencies: {
            // Icons
            '@fortawesome/fontawesome-svg-core': '^1.2',
            '@fortawesome/free-brands-svg-icons': '^5.7',
            '@fortawesome/free-solid-svg-icons': '^5.7',
            '@fortawesome/vue-fontawesome': '^0.1',
            // AJAX
            'axios': '^0.18',
            // Error handling
            'vue-snotify': '^3.2',
            // @TODO once this is not a pre-release bring version up to date
            'bootstrap-vue': '^2.0.0-rc.11'
        }
    });

    // New templates

    // Update main.js
    // api.injectImports(api.entryFile, `import { library } from "@fortawesome/fontawesome-svg-core";`);
    // api.injectImports(api.entryFile, `import { faCoffee } from "@fortawesome/free-solid-svg-icons";`);
    // api.injectImports(api.entryFile, `import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";`);
    // api.injectImports(api.entryFile, `import Snotify from "vue-snotify";`);
    // api.injectImports(api.entryFile, `import BootstrapVue from "bootstrap-vue";`);
    // api.injectImports(api.entryFile, `import "./assets/scss/app.scss";`);

    api.onCreateComplete(() => {
        // https://cli.vuejs.org/dev-guide/plugin-dev.html#changing-main-file
        const fs = require('fs');
        const contentMain = fs.readFileSync(api.entryFile, { encoding: 'utf-8' });
        const lines = contentMain.split(/\r?\n/g);

        const lastImportIndex = lines.findIndex(line => line.match(/^import/));

        lines[lastImportIndex] += `
        library.add([faCoffee]);
        Vue.component("font-awesome-icon", FontAwesomeIcon);
        Vue.use(Snotify);
        Vue.use(BootstrapVue);
        `;

        fs.writeFileSync(api.entryFile, contentMain, { encoding: 'utf-8' });
    });
}