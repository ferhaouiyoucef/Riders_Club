const fs = require('fs');
const https = require('https');
const path = require('path');

const vendor = path.join(__dirname, '..', 'vendor');
if (!fs.existsSync(vendor)) fs.mkdirSync(vendor);

const files = [
  {
    url: 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
    dest: path.join(vendor, 'tailwind.min.css')
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js',
    dest: path.join(vendor, 'feather.min.js')
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js',
    dest: path.join(vendor, 'xlsx.full.min.js')
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error('Failed to get ' + url + ' (status ' + res.statusCode + ')'));
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

(async () => {
  try {
    for (const f of files) {
      console.log('Downloading', f.url);
      await download(f.url, f.dest);
      console.log('Saved to', f.dest);
    }
    console.log('All vendor files downloaded. You can now run `npm run pack` to create platform builds (requires electron-packager).');
  } catch (err) {
    console.error('Error:', err);
  }
})();