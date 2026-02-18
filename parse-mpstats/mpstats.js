const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "mpstats.txt");    
const outputFile = path.join(__dirname, "mpstats.json"); 

function parseLine(line) {
    line = line.trim();

    if (!line.startsWith("Name:")) return null;

    const parts = line.split(",");
    if (parts.length < 2) return null;

    const hashPart = parts[1].split("Hash:")[1];
    if (!hashPart) return null;

    let hash = hashPart.trim().toUpperCase();

    if (hash.startsWith("0X")) {
        hash = hash.substring(2);
    }

    hash = hash.padStart(8, "0");

    return {
        HashKey: hash,
        Type: "int32",
        Value: 0
    };
}

function convert() {
    if (!fs.existsSync(inputFile)) {
        console.error("Input file not found.");
        process.exit(1);
    }

    const lines = fs.readFileSync(inputFile, "utf8").split("\n");

    const stats = [];

    for (const line of lines) {
        const stat = parseLine(line);
        if (stat) {
            stats.push(stat);
        }
    }

    fs.writeFileSync(outputFile, JSON.stringify(stats, null, 4), "utf8");

    console.log(`Converted ${stats.length} stats.`);
    console.log(`Output written to ${outputFile}`);
}

convert();
