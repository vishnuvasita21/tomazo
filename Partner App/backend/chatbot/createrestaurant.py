import json
import requests

def lambda_handler(event, context):
    try:
        # API Endpoint
        url = "https://0520gbfb3k.execute-api.us-east-2.amazonaws.com/createRestaurantContact"

        # Extracting data from the event object
        restaurant_id = event["RestaurantID"]
        owner_id = event["OwnerID"]
        address = event["Address"]
        telephone_number = event["TelephoneNumber"]

        # Request Body
        payload = {
            "RestaurantID": restaurant_id,
            "OwnerID": owner_id,
            "Address": address,
            "TelephoneNumber": telephone_number
        }

        # Headers, if required
        headers = {
            "Content-Type": "application/json"
        }

        # Making the POST request
        response = requests.put(url, data=json.dumps(payload), headers=headers)

        # Returning the response as a string
        return {
            "statusCode": response.status_code,
            "body": response.text
        }
    except Exception as e:
        # Log the exception for debugging purposes
        print(f"Error: {str(e)}")

        # Return a custom error message
        return {
            "statusCode": 500,
            "body": "Cannot enter your data right now, please try later"
        }
