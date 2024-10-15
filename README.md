# schedule03-19-18  

A property schedule app set up using MERN stack.  

Developed with substantial guidance / help for Dave Gray's tutorials:

[Dave Gray MERN Stack tutorials](https://www.youtube.com/playlist?list=PL0Zuz27SZ-6P4dQUsoDatjEGpmBpcOW8V)

# XLSX Dependency Problem

XLSX is no longer maintained on NPM, so you need to manually direct to the CDN to avoid the NPM Dependency 'High' vulnerability.

  "dependencies": {
    "xlsx": "https://cdn.sheetjs.com/xlsx-0.19.3/xlsx-0.19.3.tgz"
  },

# Generate hex keys in Ubuntu WSL terminal:
for a 16 bit number:  

hexdump -vn16 -e'4/4 "%08X" 1 "\n"' /dev/urandom

-v to print all data (by default hexdump replaces repetition by *).
-n16 to consume 16 bytes of input (32 hex digits = 16 bytes).
4/4 "%08X" to iterate four times, consume 4 bytes per iteration and print the corresponding 32 bits value as 8 hex digits, with leading zeros, if needed.
1 "\n" to end with a single newline.

or use:
openssl rand -hex 16