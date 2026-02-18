const fs = require("fs");

const jenkinsHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i);
        hash += (hash << 10);
        hash ^= (hash >> 6);
    }
    hash += (hash << 3);
    hash ^= (hash >> 11);
    hash += (hash << 15);
    return hash >>> 0;
};

fs.readFile("mpstatssetupui.xml", "utf8", (err, data) => {
    if (err) throw err;

    const regex = /<stat\s+name="([^"]+)"[^>]*>/gi;
    const matches = [...data.matchAll(regex)];

    const output = matches.map(m => {
        const name = m[1].toUpperCase();
        const hash = jenkinsHash(name)
            .toString(16)
            .padStart(8, "0")
            .toUpperCase();

        return `Name: ${name}, Hash: ${hash}`;
    }).join("\n");

    fs.writeFile("mpstats.txt", output, "utf8", (err) => {
        if (err) throw err;
        console.log(`Saved ${matches.length} stats to mpstats.txt`);
    });
});
