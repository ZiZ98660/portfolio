#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# API Base URL
API_URL="http://localhost:5001/api"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Testing Portfolio API Endpoints${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Test 1: Health Check
echo -e "${YELLOW}Test 1: Health Check${NC}"
echo -e "GET ${API_URL}/health"
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" "${API_URL}/health")
http_code=$(echo "$response" | grep "HTTP_STATUS" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS/d')

if [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✅ PASSED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
else
    echo -e "${RED}❌ FAILED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
fi

# Test 2: Subscribe - New Subscription
echo -e "${YELLOW}Test 2: Subscribe - New Subscription${NC}"
echo -e "POST ${API_URL}/subscribe"
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "email": "test.subscriber@example.com",
        "name": "Test Subscriber",
        "source": "test-script"
    }' \
    "${API_URL}/subscribe")
http_code=$(echo "$response" | grep "HTTP_STATUS" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS/d')

if [ "$http_code" -eq 201 ] || [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✅ PASSED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
else
    echo -e "${RED}❌ FAILED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
fi

# Test 3: Subscribe - Duplicate Email (Should return 200 with message)
echo -e "${YELLOW}Test 3: Subscribe - Duplicate Email${NC}"
echo -e "POST ${API_URL}/subscribe (duplicate)"
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "email": "test.subscriber@example.com",
        "name": "Test Subscriber",
        "source": "test-script"
    }' \
    "${API_URL}/subscribe")
http_code=$(echo "$response" | grep "HTTP_STATUS" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS/d')

if [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✅ PASSED${NC} (Status: $http_code - Already subscribed)"
    echo -e "Response: $body\n"
else
    echo -e "${RED}❌ FAILED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
fi

# Test 4: Subscribe - Invalid Email
echo -e "${YELLOW}Test 4: Subscribe - Invalid Email${NC}"
echo -e "POST ${API_URL}/subscribe (invalid email)"
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "email": "invalid-email",
        "source": "test-script"
    }' \
    "${API_URL}/subscribe")
http_code=$(echo "$response" | grep "HTTP_STATUS" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS/d')

if [ "$http_code" -eq 400 ]; then
    echo -e "${GREEN}✅ PASSED${NC} (Status: $http_code - Validation working)"
    echo -e "Response: $body\n"
else
    echo -e "${RED}❌ FAILED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
fi

# Test 5: Subscribe - Missing Email
echo -e "${YELLOW}Test 5: Subscribe - Missing Email${NC}"
echo -e "POST ${API_URL}/subscribe (no email)"
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "source": "test-script"
    }' \
    "${API_URL}/subscribe")
http_code=$(echo "$response" | grep "HTTP_STATUS" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS/d')

if [ "$http_code" -eq 400 ]; then
    echo -e "${GREEN}✅ PASSED${NC} (Status: $http_code - Validation working)"
    echo -e "Response: $body\n"
else
    echo -e "${RED}❌ FAILED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
fi

# Test 6: Contact Form - Valid Submission
echo -e "${YELLOW}Test 6: Contact Form - Valid Submission${NC}"
echo -e "POST ${API_URL}/contact"
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Test User",
        "email": "test.contact@example.com",
        "subject": "Test Contact Form",
        "message": "This is a test message from the API test script.",
        "subscribe_to_newsletter": true
    }' \
    "${API_URL}/contact")
http_code=$(echo "$response" | grep "HTTP_STATUS" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS/d')

if [ "$http_code" -eq 201 ]; then
    echo -e "${GREEN}✅ PASSED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
else
    echo -e "${RED}❌ FAILED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
fi

# Test 7: Contact Form - Missing Required Fields
echo -e "${YELLOW}Test 7: Contact Form - Missing Required Fields${NC}"
echo -e "POST ${API_URL}/contact (missing fields)"
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Test User"
    }' \
    "${API_URL}/contact")
http_code=$(echo "$response" | grep "HTTP_STATUS" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS/d')

if [ "$http_code" -eq 400 ]; then
    echo -e "${GREEN}✅ PASSED${NC} (Status: $http_code - Validation working)"
    echo -e "Response: $body\n"
else
    echo -e "${RED}❌ FAILED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
fi

# Test 8: Unsubscribe
echo -e "${YELLOW}Test 8: Unsubscribe${NC}"
echo -e "POST ${API_URL}/unsubscribe"
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "email": "test.subscriber@example.com"
    }' \
    "${API_URL}/unsubscribe")
http_code=$(echo "$response" | grep "HTTP_STATUS" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS/d')

if [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✅ PASSED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
else
    echo -e "${RED}❌ FAILED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
fi

# Test 9: Unsubscribe - Email Not Found
echo -e "${YELLOW}Test 9: Unsubscribe - Email Not Found${NC}"
echo -e "POST ${API_URL}/unsubscribe (non-existent email)"
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "email": "nonexistent@example.com"
    }' \
    "${API_URL}/unsubscribe")
http_code=$(echo "$response" | grep "HTTP_STATUS" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS/d')

if [ "$http_code" -eq 404 ]; then
    echo -e "${GREEN}✅ PASSED${NC} (Status: $http_code - Not found handling)"
    echo -e "Response: $body\n"
else
    echo -e "${RED}❌ FAILED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
fi

# Test 10: Subscribe from Footer
echo -e "${YELLOW}Test 10: Subscribe from Footer${NC}"
echo -e "POST ${API_URL}/subscribe (footer source)"
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "email": "footer.subscriber@example.com",
        "source": "footer"
    }' \
    "${API_URL}/subscribe")
http_code=$(echo "$response" | grep "HTTP_STATUS" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS/d')

if [ "$http_code" -eq 201 ] || [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✅ PASSED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
else
    echo -e "${RED}❌ FAILED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
fi

# Test 11: Subscribe from Projects Bento
echo -e "${YELLOW}Test 11: Subscribe from Projects Bento${NC}"
echo -e "POST ${API_URL}/subscribe (projects-bento source)"
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "email": "projects.bento@example.com",
        "source": "projects-bento"
    }' \
    "${API_URL}/subscribe")
http_code=$(echo "$response" | grep "HTTP_STATUS" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS/d')

if [ "$http_code" -eq 201 ] || [ "$http_code" -eq 200 ]; then
    echo -e "${GREEN}✅ PASSED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
else
    echo -e "${RED}❌ FAILED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
fi

# Test 12: Contact Form without Newsletter Subscription
echo -e "${YELLOW}Test 12: Contact Form without Newsletter Subscription${NC}"
echo -e "POST ${API_URL}/contact (no subscription)"
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Test User 2",
        "email": "test.contact2@example.com",
        "subject": "Test Contact Form 2",
        "message": "This is another test message.",
        "subscribe_to_newsletter": false
    }' \
    "${API_URL}/contact")
http_code=$(echo "$response" | grep "HTTP_STATUS" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS/d')

if [ "$http_code" -eq 201 ]; then
    echo -e "${GREEN}✅ PASSED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
else
    echo -e "${RED}❌ FAILED${NC} (Status: $http_code)"
    echo -e "Response: $body\n"
fi

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Testing Complete!${NC}"
echo -e "${BLUE}========================================${NC}\n"

echo -e "${YELLOW}Note:${NC} Check your email inbox and the portfolio owner email for:"
echo -e "  - Welcome emails (for subscriptions)"
echo -e "  - Contact message notifications (for contact form)"
echo -e "  - Confirmation emails (for contact form submissions)\n"

echo -e "${YELLOW}Email Configuration Check:${NC}"
echo -e "  Make sure these are set in your .env file:"
echo -e "  - MAIL_SERVER"
echo -e "  - MAIL_PORT"
echo -e "  - MAIL_USERNAME"
echo -e "  - MAIL_PASSWORD"
echo -e "  - PORTFOLIO_OWNER_EMAIL"
echo -e "  - PORTFOLIO_OWNER_NAME\n"

