import json
import requests

def lambda_handler(event, context):
    try:
        # Extracting data from the event object provided by the user
        restaurant_id = event["restaurantID"]
        user_id = event["userID"]
        table_id = event["tableID"]
        booking_date = event["bookingDate"]
        booking_start = event["bookingStart"]
        booking_end = event["bookingEnd"]

        # First API Endpoint
        url_fetch = "https://us-central1-csci5410-14dd5.cloudfunctions.net/getReservationDocumentID"

        # Body for the first API request
        payload_fetch = {
            "restaurantID": restaurant_id,
            "userID": user_id,
            "tableID": table_id,
            "bookingDate": booking_date,
            "bookingStart": booking_start,
            "bookingEnd": booking_end
        }

        # Making the POST request to the first API
        response_fetch = requests.post(url_fetch, json=payload_fetch)

        # Check if the request was successful
        if response_fetch.status_code != 200:
            return {
                "statusCode": response_fetch.status_code,
                "body": "Error fetching document ID: " + response_fetch.text
            }

        # Extracting the documentID from the response
        document_id = response_fetch.json()["documentID"]

        # Second API Endpoint
        url_delete = "https://us-central1-csci5410-14dd5.cloudfunctions.net/deleteReservationRestaurant"

        # Making the POST request to the second API
        response_delete = requests.post(url_delete, json={"documentID": document_id})

        # Check if the delete request was successful
        if response_delete.status_code != 200:
            return {
                "statusCode": response_delete.status_code,
                "body": "Error in deleting reservation: " + response_delete.text
            }

        # Returning the success response
        return {
            "statusCode": 200,
            "body": "Reservation deleted successfully"
        }

    except Exception as e:
        # Log the exception for debugging purposes
        print(f"Error: {str(e)}")

        # Return a custom error message
        return {
            "statusCode": 500,
            "body": "An error occurred: " + str(e)
        }
