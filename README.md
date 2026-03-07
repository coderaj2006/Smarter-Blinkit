# Smarter Blinkit
 # AI-Powered Local Commerce Platform

A web application that connects **buyers with nearby local sellers** while automating product discovery, cart creation, and inventory management.

Instead of relying on traditional keyword-based search, the platform introduces an **AI Shopping Assistant** capable of understanding user intent and automatically preparing shopping carts.

The system also includes a **Barcode-Based Inventory Modification System** that allows sellers to quickly update their product inventory.

---

# Project Vision

The goal of this project is to create an intelligent local commerce platform that:

- Helps users quickly find what they need
- Supports local sellers and nearby stores
- Uses AI to automate shopping decisions
- Optimizes logistics and product recommendations

---

# Development Roadmap

The system is developed in **four progressive stages**, each adding more intelligence and automation.

---

# Stage 1 — Foundation

The goal of this stage is to build the **core marketplace platform**.

## Dual Login System

The platform supports two user roles:

- **Buyer**
- **Seller**

Each role has its own dashboard and permissions.

Features:

- Secure authentication
- Role-based dashboards
- Optional **face recognition login using OpenCV**

---

## Intent-Based Search

Instead of matching simple keywords, the system attempts to **understand the user's intent**.

Example:

User Input:

```
I have a cold
```

System Suggestions:

- Honey
- Ginger Tea
- Lemon

This feature can be implemented using **semantic search techniques**.

---

## Local First Marketplace

The system prioritizes **nearby stores** to ensure:

- Faster delivery
- Lower delivery costs
- Better support for local businesses

User location is detected and orders are routed to the **closest available shops first**.

---

## Barcode-Based Inventory Modification

Sellers can easily update inventory by scanning product barcodes.

Workflow:

```
Scan barcode
      ↓
Identify product
      ↓
Update inventory
```

This reduces manual work and speeds up stock management.

---

## Dummy Payment Integration

Buyers can simulate the checkout process using a **test payment flow**.

Suggested tool:

- Razorpay Test Mode

This allows testing of the entire checkout pipeline without real transactions.

---

# Stage 2 — Automation Layer

The goal of this stage is to introduce **AI-driven automation**.

---

## Recipe Agent (AI Shopping Assistant)

Users can request items using natural language.

Example:

```
Make pizza for 4 people
```

The system automatically:

1. Identifies required ingredients
2. Calculates quantities
3. Finds available products from nearby stores
4. Adds them to the cart automatically

---

## Similar Items Suggestion

When a buyer views a product, the system recommends:

- Alternative brands if the product is unavailable
- Products commonly purchased together

Example:

Viewing **Pasta**

Suggestions:

- Pasta Sauce
- Cheese
- Olive Oil

---

## Graph-Based Recommendation System

Product relationships are stored in a **graph database (Neo4j)**.

Products are represented as **nodes**, connected using relationships such as:

```
SIMILAR_TO
BOUGHT_WITH
```

Example Cypher query:

```cypher
MATCH (p:Product)-[:BOUGHT_WITH]->(related)
RETURN related
```

This enables intelligent recommendation systems.

---

# Stage 3 — Order Orchestration

The goal of this stage is to optimize **logistics and order fulfillment**.

---

## Smart Cart Splitting

If a single store cannot fulfill an order, the system automatically splits the cart.

Example:

```
Shop A → Pasta
Shop B → Cheese
Shop C → Tomato Sauce
```

The system determines the **best combination of shops** to complete the order efficiently.

---

## Live Storeboard

A real-time analytics dashboard for the platform owner.

Displays:

- Fastest selling products
- Top rated stores
- Current demand trends
- Active orders

This helps monitor marketplace activity.

---

# Bonus Stage — Predictive Intelligence

Advanced data-driven features for marketplace growth.

---

## Money Map

A visual dashboard that shows:

- Which neighborhoods buy the most
- What product categories are popular
- Where new stores should open

This helps identify **high-demand locations**.

---

## Smart Product Pairing

The system predicts which products should be displayed together.

Inspired by the **Beer and Diaper retail case study**, which demonstrates how analyzing purchase data can reveal hidden product relationships.

Example predictions:

```
Pasta → Pasta Sauce
Bread → Butter
Chips → Cold Drink
```

This feature can be implemented using **prebuilt models from Hugging Face**.

---

# Tech Stack (Suggested)

## Frontend

- React
- Next.js
- TailwindCSS

## Backend

- Node.js
- Express

## Databases

- PostgreSQL / MongoDB
- Neo4j (Graph Database)

## AI / Machine Learning

- Hugging Face models
- Semantic search embeddings

## Computer Vision

- OpenCV
- Barcode scanning libraries

## Payments

- Razorpay Test Mode

---

# Future Improvements

Possible extensions of the platform include:

- Delivery partner integration
- Real-time inventory synchronization
- Reinforcement learning for product recommendations
- Dynamic pricing systems

---

# License

MIT License
-----Progress Till Now--------
# Smarter Blinkit

Smarter Blinkit is a prototype marketplace platform that connects buyers with nearby sellers and optimizes product routing using local-first logic.

## Features

### Buyer Side
- Browse products in a grid layout
- AI-style intent-based search (e.g., "cold", "breakfast")
- Add products to cart
- Multi-shop cart grouping
- Checkout simulation

### Seller Side
- Add new products
- Manage inventory
- Update stock
- Barcode-based inventory modification

### Marketplace Logic
- Shared inventory system
- Local-first routing (distance-based)
- Product metadata management

## Screenshots

### Buyer Dashboard
![Buyer Dashboard](assets/screenshots/buyer-dashboard.png)

### Seller Dashboard
![Seller Dashboard](assets/screenshots/seller-dashboard.png)

## Tech Stack

- HTML
- CSS
- JavaScript
- LocalStorage for data persistence

## Project Status

Stage 1 Completed:
- Core marketplace functionality implemented
- Buyer and seller dashboards operational
- Inventory and cart systems functional

Next Steps:
- Improve UI
- Add smarter AI assistant logic
- Optimize routing algorithms


