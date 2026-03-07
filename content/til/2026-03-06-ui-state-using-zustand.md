---
title: Managing desktop UI state with Zustand
date: 2026-03-06
category: React
---

## 🧠 What I learned

Today I practiced using **Zustand** to manage global state for a **desktop-style UI**.

Instead of passing props through many components, Zustand allows the window system state to live in a single store, which keeps the component tree much cleaner.

---

## ⚙️ What I used Zustand for

- 🪟 **Active window focus**
- 📂 **Start menu open / close state**
- 🗕 **Window minimize / restore**
- 🎯 **Tracking the currently selected window**

---

## 💡 Why this helped

Managing UI state from a central store made the logic **much simpler and easier to scale** as more windows are added to the interface.

This approach works especially well for **desktop-like interfaces** where multiple UI elements interact with each other.
