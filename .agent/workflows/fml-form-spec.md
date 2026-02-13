---
description: Guide for gathering FML Form Specification
---

# FML Form Specification Guide

## Objective
Establish the blueprint for the new math application by gathering Form Level, Syllabus Type, and Chapter details.

## Specification Format (YAML)

The AI agent should construct a YAML object matching this structure during the interview:

```yaml
# fml-spec.yaml
project_name: "mathf{N}-{S}" # e.g., mathf3-n
form_level: 3
syllabus: "new" # 'old' or 'new'
description: "Form 3 Mathematics (New Syllabus) - 2026 Edition"

chapters:
  - id: "ch1"
    title: "Relations"
    subtitle: "Understanding domain and range"
    topics:
      - "Types of relations"
      - "Function mappings"
  
  - id: "ch2"
    title: "Functions"
    subtitle: "Linear and Quadratic behavior"
    topics:
      - "Inverse functions"
      - "Composite functions"

# Metadata for AI Context
target_audience: "Secondary School Students"
tone: "Educational, Encouraging, Precise"
```

## User Interview Protocol

1. **Ask for Form Level & Syllabus**:
   - "Which Form level is this for? (1-4)"
   - "Is this for the Old or New syllabus?"

2. **Ask for Chapter List**:
   - "Please provide the list of chapters. For each chapter, I need a Title and a list of key Topics."
   - *Tip: If the user provides a raw syllabus PDF text, parse it to extract this list.*

3. **Confirm Details**:
   - "I have identified X chapters. Shall we proceed to formula ingestion?"
