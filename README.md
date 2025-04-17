# IndexLive – Finanz-Dashboard Webanwendung

Willkommen bei **IndexLive** – einem modernen Finanz-Dashboard zur Verwaltung und Visualisierung von Unternehmensfinanzen. Dieses Projekt wurde im Rahmen des 4. Semesters von Mohammad Taiba eigenständig realisiert.

---

## 📌 Projektüberblick

- **Name**: IndexLive
- **Typ**: Web-Dashboard zur Finanzanalyse
- **Technologien**: MERN-Stack (MongoDB, Express, React, Node.js)
- **APIs**: Eigene REST- und GraphQL-APIs
- **Ziel**: Übersicht und Analyse von Produkten, Transaktionen und KPIs mittels Tabellen und Diagrammen

---

## 🚀 Features

- Benutzerfreundliche Oberfläche mit React & MUI
- Darstellung von KPIs, Produkten & Transaktionen in Tabellen & Diagrammen
- REST-API für Produkte, Transaktionen & KPIs
- GraphQL-API für Transaktionen
- Swagger-Dokumentation für Backend-API
- State-Management via Redux Toolkit
- Datenvisualisierung mit Recharts
- Authentifizierung (in Planung)

---

## ⚙️ Tech Stack

- **Frontend**: React, Redux Toolkit, Vite, MUI, Recharts, Apollo Client
- **Backend**: Express, GraphQL, Apollo Server, Mongoose, Swagger
- **Datenbank**: MongoDB Atlas / Compass
- **Dev-Tools**: Node.js, npm, Docker (optional)

---



## 🔍 API-Endpunkte

### REST

- `GET/POST/PUT/DELETE`  → `/product/products`
- `GET/POST/PUT/DELETE`  → `/transaction/transactions`
- `GET`                  → `/kpi/kpis`

### GraphQL

- Endpoint: `http://localhost:10081/graphql`
- Beispiel Query:

```graphql
query {
  transactions {
    id
    buyer
    amount
    productIds
  }
}
```

---

## 🗃️ Datenmodelle

### Transaction

- `buyer: String`
- `amount: Currency`
- `productIds: [ObjectId]`

### Product

- `price: Currency`
- `expense: Currency`
- `transactions: [ObjectId]`

### KPI

- `totalProfit`, `totalRevenue`, `totalExpenses`
- `expensesByCategory`, `monthlyData`, `dailyData`

---


## 🧠 Reflexion

- **Stärken**: Full-Stack-Umsetzung, saubere API-Struktur, Datenvisualisierung
- **Herausforderungen**: Diagrammdarstellung, Docker-Einbindung, Zeitmanagement
- **Ausblick**: User-Authentifizierung & Datenvorhersage (Predictions)

---

## 👨‍💻 Autor

**Mohammad Taiba**\
Fachhochschule Erfurt – Angewandte Informatik (6. Semester)\
📧 mohammadtaiba55\@gmail.com

---

## 🔒 Lizenz

Dieses Projekt ist zu Demonstrationszwecken veröffentlicht und unterliegt keiner öffentlichen Lizenz. Eine Weiterverwendung ist nur nach Absprache erlaubt.

