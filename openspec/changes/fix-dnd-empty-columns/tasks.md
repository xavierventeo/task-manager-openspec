## 1. Layout and hit area

- [x] 1.1 Update `src/styles.css` so each `.column` lays out as a vertical flex container and each `.task-list` grows to fill remaining column space with a modest `min-height` / `min-block-size` and padding, ensuring an empty `<ul>` still has a usable drop box under the heading.

## 2. Verification

- [x] 2.1 Manually drag tasks into each column when the destination list is empty (including moving the last card out of a column then back), confirming `drop` updates status and cards stay put after `render()`; confirm create/edit/delete and button-based moves still behave as before.
