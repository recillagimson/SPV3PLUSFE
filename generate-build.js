var fs = require('fs');
console.log('Incrementing build number...');
fs.readFile('src/build.json', function (err, content) {
  if (err) throw err;
  var metadata = JSON.parse(content);
  metadata.build_no = metadata.build_no + 1;
  fs.writeFile('src/build.json', JSON.stringify(metadata), function (err) {
    if (err) throw err;
    console.log(`Current build number: ${metadata.build_no}`);
  });
});
