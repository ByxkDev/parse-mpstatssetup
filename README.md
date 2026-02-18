# GTA MP Stats Toolkit (JOAAT + JSON Converter)

A simple Node.js toolkit for parsing GTA multiplayer stat XML files, generating Jenkins One-At-A-Time (JOAAT) hashes, and converting them into structured JSON format.

---

# What This Toolkit Does

This toolkit includes two scripts:

1. XML → Hash Generator  
2. Hash List → JSON Converter  

---

# GTA Stats (Jenkins One-At-A-Time)

This tool reads an XML file containing:

```xml
<stat name="STAT_NAME" ... />
```

It extracts each stat name, converts it to uppercase, and generates a Jenkins One-At-A-Time (JOAAT) hash.

All processed results are saved to:

```
mpstats.txt
```

---

# Features

- Reads and parses `mpstatssetupui.xml`
- Extracts all `name="..."` values inside `<stat>` tags
- Converts names to uppercase
- Generates a Jenkins One-At-A-Time (JOAAT) hash
- Outputs formatted results:

```
Name: MPPLY_GLOBALXP, Hash: 91C8C2A5
```

- Saves results to `mpstats.txt`
- Displays total number of processed stats

---

# Usage

Place your XML file in the same directory:

```
mpstatssetupui.xml
```

Run:

```bash
node index
```

Example output:

```
✓ Saved 200+ stats to mpstats.txt
```

---

# GTA Stats JSON Converter

This tool reads the generated:

```
mpstats.txt
```

And converts each hash entry into structured JSON format.

Output file:

```
mpstats.json
```

---

# Features

- Reads and parses `mpstats.txt`
- Extracts all `Hash:` values
- Removes optional `0x` prefix
- Ensures 8-character uppercase hex formatting
- Converts entries into:

```json
{
    "HashKey": "XXXXXXXX",
    "Type": "int32",
    "Value": 0
}
```

- Saves formatted JSON to `mpstats.json`
- Displays total number of converted stats

---

# Usage

After generating `mpstats.txt`, run:

```bash
node mpstats
```

Example output:

```
Converted 200 stats.
Output written to mpstats.json
```

---

# Project Structure

```
/parse-mpstatssetup
│
├── mpstatssetupui.xml   # Input XML
├── mpstats.txt          # Generated hash list
├── mpstats.json         # Generated JSON output
├── index.js             # XML → JOAAT hash generator
└── mpstats.js           # TXT → JSON converter
```

---

# Requirements

- Node.js v14+

---

# How It Works

The toolkit uses the Jenkins One-At-A-Time hash algorithm (JOAAT), the same hashing method used internally by GTA for stat names.

Each stat name is:

1. Converted to uppercase  
2. Passed through the JOAAT hashing function  
3. Converted to an 8-character uppercase hexadecimal value  

---

# Typical Workflow

1. Extract `mpstatssetupui.xml` from your game files (update.rpf)
2. Run:

```
node index
```

3. Then run:

```
node mpstats
```

# Customization

You can easily modify:

- Default stat type (`int32`)
- Default value (`0`)
- Output structure
- Input filenames

Both scripts are intentionally simple and easy to edit.

---

# Credits

Original concept and base script by Safauri. 

link -> (https://github.com/safauri)

Json Converter by SkyDreamMoDz. 

link -> (https://discord.com/users/371352379083456513) 

# 📜 License

Provided for educational and research purposes.  
Not affiliated with Rockstar Games.

