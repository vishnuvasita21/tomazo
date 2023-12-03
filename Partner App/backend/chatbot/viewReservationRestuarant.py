import json
import requests

def lambda_handler(event, context):
    try:
        # Extracting data from the Lambda event
        user_id = event.get("userID")
        restaurant_id = event.get("restaurantID")
        booking_start = event.get("bookingStart")
        booking_end = event.get("bookingEnd")
        booking_date = event.get("bookingDate")
        table_id = event.get("tableID")

        # Ensuring required data is present
        if not all([user_id, restaurant_id, booking_start, booking_end, booking_date, table_id]):
            return {
                "statusCode": 400,
                "body": "Missing one or more required query parameters"
            }

        # Constructing the URL with query parameters
        url = f"https://us-central1-csci5410-14dd5.cloudfunctions.net/bookReservation?userID={user_id}&restaurantID={restaurant_id}&bookingStart={booking_start}&bookingEnd={booking_end}&bookingDate={booking_date}&tableID={table_id}"

        # Headers
        headers = {
            "userID": user_id,
            "restaurantID": restaurant_id,
            "bookingStart": booking_start,
            "bookingEnd": booking_end,
            "bookingDate": booking_date,
            "tableID": table_id
        }

        # Making the GET request
        response = requests.get(url, headers=headers)

        # Check if the request was successful
        if response.status_code != 200:
            return {
                "statusCode": response.status_code,
                "body": "Error booking reservation: " + response.text
            }

        # Returning the successful response
        return {
            "statusCode": 200,
            "body": response.text
        }

    except Exception as e:
        # Log the exception for debugging purposes
        print(f"Error: {str(e)}")

        # Return a custom error message
        return {
            "statusCode": 500,
            "body": "An error occurred: " + str(e)
        }
