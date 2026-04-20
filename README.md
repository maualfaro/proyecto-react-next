# 🏗️ Práctica de Arquitectura en React

## 📚 Información del curso

- **Curso:** React Avanzado

---

## 🚀 Descripción del proyecto

Este proyecto demuestra una arquitectura escalable en React utilizando:

- Estructura basada en features (por funcionalidades)
- Principios de Atomic Design (Átomos y Moléculas)
- Patrón Container / Presentational
- Componentes compuestos (Compound Components)
- TypeScript para tipado seguro

---

## 🧱 Arquitectura

### 📁 Estructura basada en features

Cada funcionalidad está aislada y es autónoma:

src/features/tasks/

- components/
- hooks/
- utils/
- types.ts
- index.ts

---

### 🎨 Atomic Design

#### Átomos

Componentes básicos y reutilizables:

- Button

---

#### Moléculas

Componentes compuestos:

- Card
- Tabs (Componente compuesto)

---

### 🧠 Patrones utilizados

#### Container / Presentational

- `TaskListContainer` → maneja lógica y estado
- `TaskListPresentation` → maneja la UI

---

#### Componentes compuestos

- `Tabs`
  - Tabs.Header
  - Tabs.Tab
  - Tabs.Content

---

## ⚙️ Instrucciones de instalación

```bash
npm install
npm run dev