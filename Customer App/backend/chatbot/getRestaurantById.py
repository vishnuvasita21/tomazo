import json
import requests

def fetch_restaurant_details(restaurant_id):
    try:
        url = f"https://0520gbfb3k.execute-api.us-east-2.amazonaws.com/getRestaurantByID/{restaurant_id}"
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching restaurant details: {e}")
        raise

def lambda_handler(event, context):
    try:
        # Extract the restaurantID slot value from the Lex event
        restaurant_id = event['currentIntent']['slots']['restaurantID']

        # Fetch details for the provided restaurant ID
        restaurant_details = fetch_restaurant_details(restaurant_id)

        # Formatting the restaurant details for Lex response
        formatted_message = f"Restaurant Name: {restaurant_details['RestaurantName']}, " \
                            f"Currently Closed: {restaurant_details['CurrentlyClosed']}, " \
                            f"Open Hour: {restaurant_details['OpenHour']}, " \
                            f"Close Hour: {restaurant_details['CloseHour']}"

        return {
            "dialogAction": {
                "type": "Close",
                "fulfillmentState": "Fulfilled",
                "message": {
                    "contentType": "PlainText",
                    "content": formatted_message
                }
            }
        }
    
    except Exception as e:
        print(f"Handler error: {e}")
        return {
            "dialogAction": {
                "type": "Close",
                "fulfillmentState": "Failed",
                "message": {
                    "contentType": "SSML",
                    "content": "<speak>Sorry, I am unable to fetch restaurant data at the moment.</speak>"
                }
            }
        }
