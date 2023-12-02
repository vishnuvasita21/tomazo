import json
import requests

def lambda_handler(event, context):
    try:
        # API Endpoint
        url = "https://0520gbfb3k.execute-api.us-east-2.amazonaws.com/setClose"

        # Extracting data from the Lambda event
        restaurant_id = event.get("RestaurantID")
        close_hour = event.get("CloseHour")

        # Ensuring required data is present
        if restaurant_id is None or close_hour is None:
            return {
                "statusCode": 400,
                "body": "Missing required fields: RestaurantID or CloseHour"
            }

        # Request Body
        payload = {
            "RestaurantID": restaurant_id,
            "CloseHour": close_hour
        }

        # Headers, if required
        headers = {
            "Content-Type": "application/json"
        }

        # Making the POST request
        response = requests.put(url, data=json.dumps(payload), headers=headers)

        # Check if the request was successful
        if response.status_code != 200:
            return {
                "statusCode": response.status_code,
                "body": "Error setting close hour: " + response.text
            }

        # Returning the successful response
        return {
            "statusCode": 200,
            "body": "Close hour updated successfully"
        }

    except Exception as e:
        # Log the exception for debugging purposes
        print(f"Error: {str(e)}")

        # Return a custom error message
        return {
            "statusCode": 500,
            "body": "An error occurred: " + str(e)
        }
