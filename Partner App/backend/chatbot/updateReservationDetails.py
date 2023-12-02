import json
import requests

def lambda_handler(event, context):
    try:
        # First API Endpoint
        url_get_document_id = "https://us-central1-csci5410-14dd5.cloudfunctions.net/getReservationDocumentID"

        # Making the POST request to the first API with user-provided data
        response_get_document_id = requests.post(url_get_document_id, json=event)

        # Check if the request was successful
        if response_get_document_id.status_code != 200:
            return {
                "statusCode": response_get_document_id.status_code,
                "body": "Error fetching document ID: " + response_get_document_id.text
            }

        # Extracting the documentID from the response
        document_id = response_get_document_id.json()["documentID"]

        # Second API Endpoint with documentID, bookingStart, and bookingEnd as query parameters
        url_update_reservation = f"https://us-central1-csci5410-14dd5.cloudfunctions.net/updateReservationDetailsRestaurant?documentID={document_id}&bookingStart={event['bookingStart']}&bookingEnd={event['bookingEnd']}"

        # Making the GET request to the second API
        response_update_reservation = requests.get(url_update_reservation)

        # Check if the update request was successful
        if response_update_reservation.status_code != 200:
            return {
                "statusCode": response_update_reservation.status_code,
                "body": "Error in updating reservation details: " + response_update_reservation.text
            }

        # Returning the success response
        return {
            "statusCode": 200,
            "body": "Reservation details updated successfully"
        }

    except Exception as e:
        # Log the exception for debugging purposes
        print(f"Error: {str(e)}")

        # Return a custom error message
        return {
            "statusCode": 500,
            "body": "An error occurred: " + str(e)
        }
