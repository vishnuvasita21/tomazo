# Tomazo - A Table Reservation App (SDP6)

Welcome to the Tomazo, a table reservation app, an innovative solution simplifying the process of reserving tables at various restaurants in Halifax, Nova Scotia. Developed with React, Node.js, and leveraging the serverless offerings of Google Cloud Platform (GCP) and Amazon Web Services (AWS), this application promises scalability, enhanced security, and efficient cost-management.

## Overview

Tomazo enriches the customer's dining experience, offering features such as real-time availability, seamless reservations, personalized notifications, and in-depth analytics, ultimately contributing to superior customer service and operational excellence.


## Live Application

The application is deployed using Netlify, Amazon Web Services, and Google Cloud Services. visit: [Tomazo](https://tomazo.netlify.app/)


## Authors
 
- Pratik Mukund Parmar (pratikparmar@dal.ca) - _(Author)_
- Vishnu Vasita (vs369825@dal.ca) - _(Author)_
- Jasmeet Singh  (js893478@dal.ca) - _(Author)_
- Jonathan Harris (jonathan.harris@dal.ca) - _(Author)_
- Deepti Tuteja (dp408543@dal.ca) - _(Author)_

### App Components

- **Customer App:** Enables customers to handle their restaurant bookings.

### Technical Stack

- **Frontend:** React (JavaScript library).
- **Backend Services:** Node.js with serverless computing (AWS Lambda, Google Cloud Functions).
- **Database:** Firestore for dynamic content and AWS DynamoDB for static content.
- **Authentication:** Firebase Authentication.
- **APIs:** RESTful APIs via Amazon API Gateway.
- **Storage:** Restaurant & menu images in Amazon S3 buckets.

## Development Setup

### Prerequisites

- Node.js installed.
- An AWS account with access to Lambda, DynamoDB, S3, and API Gateway.
- A Google Cloud account for Firebase and other GCP services.
- Basic understanding of React and serverless architecture.

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install dependencies.
3. Set up your AWS credentials and configure the AWS CLI.
4. Set up your Google Cloud credentials and configure the Google Cloud CLI.
5. Deploy your serverless functions to AWS Lambda and Google Cloud Functions as needed.
6. Ensure environment variables are set for Firebase Authentication.
7. Run the application in the development mode using `npm start` or build it for production with `npm run build`.

## Features

### Customer App

#### Core Capabilities

1. **Sign Up & Login Module**
   - Standard authentication via email/password.
   - Support for Google Single Sign-On.

2. **List Restaurants**
   - Comprehensive details of restaurants, including hours and menus.

3. **Reservation Management**
   - Functionality to book, view, edit, or cancel reservations (with constraints).

4. **Interactive Menu Selection**
   - Real-time menu availability with reservation integration.

5. **Notifications**
   - Timely alerts for offers, reservation reminders, and urgent updates from restaurants.






