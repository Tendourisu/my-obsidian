---
title: "{{date}}"
tags:
  - "#周记"
categories: dairy
date: " {{date:YYYY-MM-DDTHH:mm:ss+08:00}} "
modify: " {{date:YYYY-MM-DDTHH:mm:ss+08:00}} "
dir: dairy
share: false
cdate: " {{date:YYYY-MM-DD}} "
mdate: " {{date:YYYY-MM-DD}} "
math: "true"
---

# {{date:YYYY}} -W {{date:WW}} - {{date:MM}}

## Review

## Next Week Plan

## Time Line

## THOUGHTS

## ## NOTE

```dataview
LIST
FROM ""
WHERE file.cday.weekyear = this.file.cday.weekyear OR file.mday.weekyear = this.mile.cday.weekyear
```

```dataviewjs
// Configuration for collecting LINKS sections from daily notes
const tars = {
  'LINKS': 2,  // Collect second-level LINKS headings
}

await dv.view('zob_config/js/show', {
  // Get only daily notes from dairy folder
  files: dv.pages('"dairy"')
    .where(p => {
      // Extract the week number from the current file name (weekly note)
      const weekMatch = dv.current().file.name.match(/(\d{4})-W(\d{1,2})/);
      if (!weekMatch) return false;

      const [_, weekYear, weekNum] = weekMatch;

      // Extract date components from daily note name (2024-49-12-08-7 format)
      const dateMatch = p.file.name.match(/(\d{4})-(\d{1,2})-(\d{2})-(\d{2})-(\d{1})/);
      if (!dateMatch) return false;

      const [__, year, week, month, day] = dateMatch;

      // Check if the daily note belongs to the same week and year
      return year === weekYear && week === weekNum;
    })
    .sort(p => {
      // Create sortable date string from daily note format
      const [_, year, week, month, day] = p.file.name.match(/^(\d{4})-(\d{1,2})-(\d{2})-(\d{2})-(\d{1})$/);
      // Sort by YYYYMMDD format (descending)
      return -1 * parseInt(`${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`);
    }),

  kwd: false,      // Don't filter by keywords
  showHead: false, // Don't include heading in output
  tars,           // Target sections to collect (LINKS)
  obsidian,       // Pass obsidian object
  scale: 0.8,     // Scale of rendered content

  // List item configuration
  li: ([p, li]) => {
    const [_, year, week, month, day] = p.file.name.match(/^(\d{4})-(\d{1,2})-(\d{2})-(\d{2})-(\d{1})$/);
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    // Create a header with date and file link, followed by the content
    return dv.paragraph(`### ${formattedDate} [[${p.file.path}|${p.file.name}]]\n${li}`);
  },
});
```
