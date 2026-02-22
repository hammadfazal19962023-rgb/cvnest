# Edit Step UI Components Guide

## Overview of Edit Interface

The EditStep component provides a comprehensive editing interface with the following structure:

```
┌─────────────────────────────────────────────────────────────┐
│                    Edit Your CV                             │
│        Make any changes you'd like...                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─ Personal Information ────────────────────────────┐      │
│  │ [Collapse/Expand Button]                         │      │
│  │                                                    │      │
│  │ Full Name: [________________]                     │      │
│  │ Professional Title: [________________]            │      │
│  │ Email: [________________]                         │      │
│  │ Phone: [________________]                         │      │
│  │ Location: [________________]                      │      │
│  │ Professional Summary:                             │      │
│  │ [___________________________________]             │      │
│  │ [___________________________________]             │      │
│  └────────────────────────────────────────────────────┘      │
│                                                              │
│  ┌─ Experience ───────────────────────────────────────┐     │
│  │ [Collapse/Expand Button]                          │     │
│  │                                                    │     │
│  │ ┌─ Experience 1 ────────────────────────┐ [DEL]   │     │
│  │ │ Job Title: [________________]          │         │     │
│  │ │ Company Name: [________________]       │         │     │
│  │ │ Period: [________________]             │         │     │
│  │ │ Responsibilities:                      │         │     │
│  │ │ [___________________________________]  │         │     │
│  │ └────────────────────────────────────────┘         │     │
│  │                                                    │     │
│  │ [+ Add Experience]                                │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  ┌─ Education ────────────────────────────────────────┐     │
│  │ [Collapse/Expand Button]                          │     │
│  │                                                    │     │
│  │ ┌─ Education 1 ──────────────────────────┐ [DEL]  │     │
│  │ │ Degree: [________________]              │         │     │
│  │ │ Institution Name: [________________]    │         │     │
│  │ │ Year: [________________]                │         │     │
│  │ └────────────────────────────────────────┘         │     │
│  │                                                    │     │
│  │ [+ Add Education]                                 │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  ┌─ Skills ───────────────────────────────────────┐        │
│  │ [Collapse/Expand Button]                       │        │
│  │                                                 │        │
│  │ Enter skills separated by commas:              │        │
│  │ [React, TypeScript, Node.js...]                │        │
│  │ Tip: Separate skills with commas               │        │
│  └─────────────────────────────────────────────────┘        │
│                                                              │
│  ┌─ Certifications ──────────────────────────────────┐      │
│  │ [Collapse/Expand Button]                         │      │
│  │                                                   │      │
│  │ ┌─ Certification 1 ──────────────────┐ [DEL]    │      │
│  │ │ Title: [________________]           │          │      │
│  │ │ Issuer Org: [________________]      │          │      │
│  │ │ Date: [________________]            │          │      │
│  │ └────────────────────────────────────┘          │      │
│  │                                                   │      │
│  │ [+ Add Certification]                            │      │
│  └───────────────────────────────────────────────────┘      │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  [Cancel]                                    [Save Changes]  │
└─────────────────────────────────────────────────────────────┘
```

## Component Structure

### 1. Personal Information Section
**Status:** Expandable
**Fields:**
- Full Name (required)
- Professional Title (required)
- Email (required)
- Phone (optional - new field)
- Location (required)
- Professional Summary (text area)

**Behavior:**
- Expanded by default
- All fields update in real-time
- Direct mapping to CVData object

### 2. Experience Section
**Status:** Expandable
**Features:**
- Multiple entries support
- Each entry has:
  - Job Title (role)
  - Company Name
  - Period (e.g., "Jan 2020 - Dec 2021")
  - Responsibilities (one per line in textarea)
  - Delete button

**Actions:**
- Click + Add Experience to add new entry
- Click [DEL] trash icon to remove entry
- Edit any field directly

**Data Structure:**
```typescript
experience: [
  {
    role: "Senior Developer",
    company: "Company XYZ",
    period: "Jan 2020 - Dec 2021",
    bullets: [
      "Responsibility 1",
      "Responsibility 2",
      "Responsibility 3"
    ]
  }
]
```

### 3. Education Section
**Status:** Expandable
**Features:**
- Multiple entries support
- Each entry has:
  - Degree (e.g., "Bachelor of Science")
  - Institution Name
  - Year (or graduation year)
  - Delete button

**Actions:**
- Click + Add Education to add new entry
- Click [DEL] trash icon to remove entry

**Data Structure:**
```typescript
education: [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University Name",
    year: "2020"
  }
]
```

### 4. Skills Section
**Status:** Expandable
**Features:**
- Simple textarea input
- Comma-separated values
- Auto-converted to array
- Real-time parsing

**Input Example:**
```
React, TypeScript, Node.js, MongoDB, AWS, Docker
```

**Data Output:**
```typescript
skills: [
  "React",
  "TypeScript", 
  "Node.js",
  "MongoDB",
  "AWS",
  "Docker"
]
```

### 5. Certifications Section
**Status:** Expandable
**Features:**
- Multiple entries support
- Each entry has:
  - Title (e.g., "AWS Solutions Architect")
  - Issuer/Organization (e.g., "Amazon")
  - Date (optional, e.g., "Jan 2023")
  - Delete button

**Actions:**
- Click + Add Certification to add new entry
- Click [DEL] trash icon to remove entry

**Data Structure:**
```typescript
certifications: [
  {
    title: "AWS Solutions Architect Certification",
    issuer: "Amazon Web Services",
    date: "Jan 2023"
  }
]
```

## Interaction Patterns

### Expanding/Collapsing Sections
```
Click section header → Toggles expanded state
├── Expanded: Shows all fields and buttons
└── Collapsed: Shows header only
```

### Adding Entries
```
Click [+ Add Section]
├── Creates new empty entry
├── Appends to existing entries array
└── Entry immediately fills with form fields
```

### Removing Entries
```
Click [trash icon] on entry
├── Shows confirmation toast "Entry removed"
├── Removes from array
└── UI updates immediately
```

### Editing Fields
```
Type in input/textarea
├── onChange handler captures value
├── Updates CVData state
├── Changes available immediately
└── No save needed (auto-saved to state)
```

### Saving Changes
```
Click [Save Changes]
├── Validates all required fields
├── Closes edit mode
├── Returns to Preview with updated content
└── Shows success toast
```

### Canceling Changes
```
Click [Cancel]
├── Discards all edits
├── Returns to preview
└── Previous CV data unchanged
```

## Form Input Types

### Text Input Fields
```tsx
<Input
  placeholder="Enter value..."
  value={value}
  onChange={(e) => handleChange(e.target.value)}
/>
```
Used for: Name, Title, Email, Phone, Location, Job Title, Company, etc.

### Textarea Fields
```tsx
<Textarea
  placeholder="Enter text..."
  value={value}
  onChange={(e) => handleChange(e.target.value)}
  className="min-h-24"
/>
```
Used for: Professional Summary, Responsibilities, Certifications description

### Comma-Separated Input
```tsx
<Textarea
  placeholder="Skill1, Skill2, Skill3..."
  value={arrayValue.join(", ")}
  onChange={(e) => handleChange(e.target.value.split(","))}
/>
```
Used for: Skills (converted to/from array)

## Icons Used

- **ChevronUp/Down** - Section expand/collapse indicators
- **Trash2** - Delete entry button
- **Plus** - Add new entry button

## Styling Classes

### Cards
```tsx
<Card className="p-6">
  {/* Content */}
</Card>
```

### Section Headers
```tsx
<button className="flex items-center justify-between w-full font-heading font-bold text-lg">
  <span>{sectionName}</span>
  {expandedSections[section] ? <ChevronUp /> : <ChevronDown />}
</button>
```

### Entry Container
```tsx
<div className="p-4 border border-border rounded-lg bg-muted/30">
  {/* Entry fields */}
</div>
```

### Buttons
```tsx
// Add button
<Button variant="outline" onClick={addEntry} className="w-full">
  <Plus className="w-4 h-4 mr-2" />
  Add Section
</Button>

// Delete button
<Button variant="ghost" size="sm" onClick={removeEntry} 
  className="text-destructive hover:text-destructive hover:bg-destructive/10">
  <Trash2 className="w-4 h-4" />
</Button>

// Action buttons
<Button variant="ghost" onClick={onCancel}>Cancel</Button>
<Button variant="hero" size="lg" onClick={onSave}>Save Changes</Button>
```

## Responsive Design

The EditStep component is fully responsive:
- **Mobile:** Single column, stacked sections
- **Tablet:** Optimized spacing
- **Desktop:** Full-width form with proper margins

```tsx
// Example from Personal Info
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Two-column layout on desktop, single on mobile */}
</div>
```

## Accessibility Features

- Form labels for all inputs
- Semantic HTML structure
- Keyboard navigation support
- Clear button labels
- Toast notifications for actions
- Error prevention and clear messaging

## Integration with CVData

The EditStep component maintains a two-way binding with CVData:

```
EditStep ← → Builder.tsx ← → CVData state
    ↓
  onChange handlers
    ↓
  onCvDataChange(updatedData)
    ↓
  setCvData(updatedData)
    ↓
  All templates re-render with new data
```

---

This documentation provides a complete overview of the editing interface and how users interact with it.
