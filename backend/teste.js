const bcrypt = require('bcrypt');

async function main() {
    const hash = await bcrypt.hash("123", 1);
    const result = await bcrypt.compare("123", hash);

    console.log(hash);
    console.log(result);
}

main();
