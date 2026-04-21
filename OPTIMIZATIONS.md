# ⚡ Optimizations Report — TaskFlow

## 📌 Overview

En esta práctica se aplicaron diferentes técnicas de optimización en React y Next.js para mejorar el rendimiento, evitar re-renders innecesarios y optimizar la experiencia del usuario.

---

# 🚀 Optimizaciones Implementadas

## 1. React.memo

Se aplicó `React.memo` a los siguientes componentes:

- `TaskListPresentation`
- `TaskItem`

### 🎯 Objetivo
Evitar re-renderizados innecesarios cuando las props no cambian.

### 🧠 Resultado
Antes:
- Todos los items se re-renderizaban al escribir en el input.

Después:
- Solo se renderiza el componente afectado.

---

## 2. useMemo

Se utilizó `useMemo` para optimizar el filtrado de tareas.

