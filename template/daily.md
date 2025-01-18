---
title: "{{date}}"
tags:
  - " #日记 "
categories: dairy
date: " {{ date:YYYY-MM-DDTHH:mm:ss+08:00 }} "
modify: " {{ date:YYYY-MM-DDTHH:mm:ss+08:00 }} "
dir: dairy
share: false
cdate: " {{ date:YYYY-MM-DD }} "
mdate: " {{ date:YYYY-MM-DD }} "
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
``

## LINKS

## TODOs

```dataview
TASK FROM "dairy"
WHERE !completed
  AND mdate >= (this.mdate - dur(7 days))
  AND mdate <= this.mdate
SORT file.cday DESC
``

## THOUGHTS