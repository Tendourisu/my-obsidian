---
title: "2025-02-21"
tags:
  - " #日记 "
categories: dairy
date: " 2025-02-21T16:03:15+08:00 "
modify: " 2025-02-21T16:03:15+08:00 "
dir: dairy
share: false
cdate: " 2025-02-21 "
mdate: " 2025-02-21 "
---

# 2025-02-21

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
