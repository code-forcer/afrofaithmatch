const fs = require('fs');
const files = [
  'src/app/login/page.jsx',
  'src/app/register/page.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\{\{\s*base:\s*"([^"]+)",\s*_dark:\s*"[^"]+"\s*\}\}/g, '"$1"');
  fs.writeFileSync(file, content);
  console.log('Fixed', file);
});
