const fs = require('fs');
const path = require('path');

const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        if (file === 'node_modules') return;
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
};

const replacements = [
    { from: /bg-indigo-600/g, to: 'bg-[#c8102e]' },
    { from: /hover:bg-indigo-700/g, to: 'hover:bg-[#a00c24]' },
    { from: /text-indigo-600/g, to: 'text-[#0b1c2c]' },
    { from: /hover:text-indigo-900/g, to: 'hover:text-[#c8102e]' },
    { from: /focus:border-indigo-500/g, to: 'focus:border-[#c8102e]' },
    { from: /focus:ring-indigo-500/g, to: 'focus:ring-[#c8102e]' },
    { from: /hover:bg-indigo-50/g, to: 'hover:bg-slate-50' },
    { from: /bg-indigo-50/g, to: 'bg-slate-50' },
    { from: /text-indigo-900/g, to: 'text-[#0b1c2c]' },
    { from: /border-indigo-200/g, to: 'border-slate-200' },
    { from: /border-indigo-100/g, to: 'border-slate-200' },
    { from: /border-t-indigo-600/g, to: 'border-t-[#c8102e]' },
    { from: /bg-gray-900/g, to: 'bg-[#0b1c2c]' },
    { from: /bg-gradient-to-r from-indigo-600 to-purple-600/g, to: 'bg-[#c8102e]' },
    { from: /hover:from-indigo-700 hover:to-purple-700/g, to: 'hover:bg-[#a00c24]' },
    { from: /text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600/g, to: 'text-[#0b1c2c]' },
    { from: /bg-gray-800 text-indigo-300/g, to: 'bg-[#c8102e] text-white' },
    { from: /text-indigo-400/g, to: 'text-white' },
    { from: /text-indigo-300/g, to: 'text-white' },
    { from: /text-indigo-500/g, to: 'text-[#c8102e]' }
];

const files = walk('c:/Users/USER/Desktop/Universidad/Semestre 5/bloque 1/ingeniería web 2/ACTIVIDAD APIREST/frontend/src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    replacements.forEach(r => {
        if (content.match(r.from)) {
            content = content.replace(r.from, r.to);
            changed = true;
        }
    });
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
