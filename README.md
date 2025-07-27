<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# URL Shortener Service

A RESTful API for shortening URLs with analytics built with NestJS, MongoDB, and Mongoose.

**Junior Backend Engineering Assignment - Markopolo.ai**

## 🚀 Quick Start

**Live Demo**: [https://markopolo-ai.onrender.com](https://markopolo-ai.onrender.com)

**API Documentation**: [https://markopolo-ai.onrender.com/docs](https://markopolo-ai.onrender.com/docs)

**Test the API**:
1. Visit the Swagger docs
2. Register a new user or login
3. Use the "Authorize" button with your JWT token
4. Test the URL shortening endpoints

## Features

- **URL Shortening**: Convert long URLs to short, manageable links
- **Custom Codes**: Option to create custom short codes
- **Analytics**: Track click counts for each shortened URL
- **API Documentation**: Complete Swagger documentation
- **Validation**: Robust input validation and error handling

## Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB
- **ODM**: Mongoose
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator, class-transformer

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

### Method 1: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/url-shortener
   BASE_URL=http://localhost:3000
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Start MongoDB**
   - **Local MongoDB**: Start your local MongoDB instance
   - **Cloud MongoDB**: Use MongoDB Atlas or any cloud MongoDB service

5. **Run the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

### Method 2: Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - **Application**: http://localhost:3000
   - **Swagger Docs**: http://localhost:3000/docs
   - **MongoDB**: localhost:27017

## API Endpoints

### Authentication Endpoints

#### 1. Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2025-07-27T06:35:26.431Z"
  }
}
```

#### 2. Login User
**POST** `/auth/login`

Login with existing credentials.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### URL Management Endpoints

#### 3. Shorten URL (Requires Authentication)
**POST** `/api/shorten`

Shortens a long URL to a short, manageable link.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "url": "https://www.example.com/a-very-long-url-to-shorten",
  "customCode": "my-custom-link"  // Optional
}
```

**Response (201 Created):**
```json
{
  "originalUrl": "https://www.example.com/a-very-long-url-to-shorten",
  "shortUrl": "https://markopolo-ai.onrender.com/r/abc123"
}
```

#### 4. Redirect to Original URL
**GET** `/r/:shortCode`

Redirects to the original URL and increments the click counter.

**Parameters:**
- `shortCode` (string): The short code for the URL

**Response:** 302 Redirect to the original URL

#### 5. Get URL Analytics (Requires Authentication)
**GET** `/api/stats/:shortCode`

Retrieves analytics for a shortened URL.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Parameters:**
- `shortCode` (string): The short code for the URL

**Response (200 OK):**
```json
{
  "originalUrl": "https://www.example.com/a-very-long-url-to-shorten",
  "shortUrl": "https://markopolo-ai.onrender.com/r/abc123",
  "clicks": 15
}
```

## API Documentation

Once the application is running, you can access the interactive Swagger documentation at:

**Local Development**: http://localhost:3000/docs
**Production**: https://markopolo-ai.onrender.com/docs

The documentation includes:
- All available endpoints
- Request/response schemas
- Example requests
- Status codes and error responses

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid URL format or validation errors
- **404 Not Found**: Short code doesn't exist
- **409 Conflict**: Custom code already exists
- **500 Internal Server Error**: Server-side errors

## Database Schema

The URL collection uses the following schema:

```typescript
{
  originalUrl: string,    // Required: The original long URL
  shortCode: string,      // Required, Unique: The short code
  clicks: number,         // Default: 0, Number of clicks
  createdAt: Date,        // Default: Current timestamp
}
```

## Development

### Available Scripts

```bash
# Development
npm run start:dev

# Build
npm run build

# Production
npm run start:prod

# Test
npm run test
npm run test:e2e

# Lint
npm run lint
```

### Project Structure

```
src/
├── urls/
│   ├── dto/
│   │   ├── create-url.dto.ts
│   │   └── url-response.dto.ts
│   ├── schemas/
│   │   └── url.schema.ts
│   ├── urls.controller.ts
│   ├── urls.service.ts
│   └── urls.module.ts
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
```

## Testing the API

### Using cURL

1. **Shorten a URL:**
   ```bash
   curl -X POST http://localhost:3000/api/shorten \
     -H "Content-Type: application/json" \
     -d '{"url": "https://www.example.com/very-long-url"}'
   ```

2. **Get URL stats:**
   ```bash
   curl http://localhost:3000/api/stats/abc123
   ```

### Using Swagger UI

1. Open http://localhost:3000/docs
2. Click on any endpoint
3. Click "Try it out"
4. Fill in the required parameters
5. Click "Execute"

## Deployment

### Environment Variables for Production

```env
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/url-shortener
BASE_URL=https://your-domain.com
```

### Docker (Optional)

If you want to use Docker, you can create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request


## Assignment Submission

This project was completed as part of the Junior Backend Engineering assignment for Markopolo.ai.

### Video Explanation
[Link to video explanation - Add your Loom/Google Drive link here]

**Note**: Please create a short video (2-3 minutes) explaining:
- Project overview and features
- How to use the API
- Authentication flow
- Bonus features implemented

### Deployed URL
**🌐 Live Application**: [https://markopolo-ai.onrender.com](https://markopolo-ai.onrender.com)

**📚 API Documentation**: [https://markopolo-ai.onrender.com/docs](https://markopolo-ai.onrender.com/docs)

**🔐 Test Credentials** (for demo purposes):
- Email: `demo@example.com`
- Password: `password123`

### Bonus Features Completed
- ✅ **Dockerization**: Dockerfile and docker-compose.yml for easy deployment
- ✅ **Authentication & API Token Management**: JWT-based user authentication
  - User registration and login endpoints
  - Protected API endpoints requiring authentication
  - User association with created URLs
  - Secure password hashing with bcrypt

## Support

For support or questions, please open an issue in the repository.
