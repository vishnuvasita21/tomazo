import json
import requests

def lambda_handler(event, context):
    try:
        # API Endpoint
        url = "https://0520gbfb3k.execute-api.us-east-2.amazonaws.com/setTableStatus"

        # Extracting data from the Lambda event
        restaurant_id = event.get("RestaurantID")
        table_id = event.get("TableID")
        table_status = event.get("TableStatus")

        # Ensuring required data is present
        if any(v is None for v in [restaurant_id, table_id, table_status]):
            return {
                "statusCode": 400,
                "body": "Missing one or more required fields"
            }

        # Request Body
        payload = {
            "RestaurantID": restaurant_id,
            "TableID": table_id,
            "TableStatus": table_status
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
                "body": "Error setting table status: " + response.text
            }

        # Returning the successful response
        return {
            "statusCode": 200,
            "body": "Table status updated successfully"
        }

    except Exception as e:
        # Log the exception for debugging purposes
        print(f"Error: {str(e)}")

        # Return a custom error message
        return {
            "statusCode": 500,
            "body": "An error occurred: " + str(e)
        }
