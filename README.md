# schedule03-19-18  

A property schedule app set up using MERN stack.  

Developed with substantial guidance / help for Dave Gray's tutorials:

[Dave Gray MERN Stack tutorials](https://www.youtube.com/playlist?list=PL0Zuz27SZ-6P4dQUsoDatjEGpmBpcOW8V)

# XLSX Dependency Problem

XLSX is no longer maintained on NPM, so you need to manually direct to the CDN to avoid the NPM Dependency 'High' vulnerability.

  "dependencies": {
    "xlsx": "https://cdn.sheetjs.com/xlsx-0.19.3/xlsx-0.19.3.tgz"
  },