---
title: "{{date}}"
tags:
  - "#日记"
categories: dairy
date: " {{date:YYYY-MM-DDTHH:mm:ss+08:00}} "
modify: " {{date:YYYY-MM-DDTHH:mm:ss+08:00}} "
dir: dairy
share: false
cdate: " {{date:YYYY-MM-DD}} "
mdate: " {{date:YYYY-MM-DD}} "
math: "true"
---

# {{date}}

## Daily Plan

### Morning

#### Plan

### Afternoon

#### Plan

### Night

#### Plan

## NOTES

```dataview
LIST FROM "" 
WHERE cdate = this.cdate
  Or mdate = this.mdate
```

## LINKS

## TODOs

```dataview
TASK FROM "dairy" 
WHERE !completed 
	AND date(replace(mdate, " ", "")) >= date(replace(this.mdate, " ", "")) - dur(7 days) 
	AND date(replace(mdate, " ", "")) <= date(replace(this.mdate, " ", ""))
SORT file.cday DESC
```

## THOUGHTS
