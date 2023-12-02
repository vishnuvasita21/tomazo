import json
import requests

def lambda_handler(event, context):
    # Retrieve userId from the event object
    user_id = int(event.get('userId'))

    # Validate if userId is provided
    if not user_id:
        return {
            'statusCode': 400,
            'body': 'No userId provided'
        }

    # Define the API endpoint with the user_id
    url = f"https://us-central1-csci5410-14dd5.cloudfunctions.net/viewReservations?userID={user_id}"

    # Make a GET request to the API
    try:
        response = requests.get(url)
        
        if not user_id:
            return {
                'statusCode': 400,
                'body': 'No userId provided'
            }
        
        # Check if the request was successful
        if response.status_code == 200:
            # Convert the response to JSON
            data = json.loads(response.text)
            
            # Format the response data into a user-friendly string
            formatted_response = format_response(data)
            
            return {
                'statusCode': 200,
                'body': formatted_response
            }
        else:
            return {
                'statusCode': response.status_code,
                'body': f'Error occurred while calling the API: Status Code {response.status_code}'
            }
    except requests.RequestException as e:
        # Handle any exceptions that occur during the request
        return {
            'statusCode': 500,
            'body': f'An error occurred: {str(e)}'
        }

def format_response(data):
    # Start building the response string
    response_str = "Your Reservation Details:\n\n"

    # Loop through each reservation in the data
    for reservation_id, reservation_details in data.items():
        response_str += f"Reservation ID: {reservation_id}\n"
        response_str += f"Restaurant Name: {reservation_details['RestaurantName']}\n"
        response_str += f"Date: {reservation_details['BookingDate']}\n"
        response_str += f"Time: {reservation_details['BookingStart']} to {reservation_details['BookingEnd']}\n"
        response_str += f"Table ID: {reservation_details['TableID']}\n"
        response_str += f"Booking Status: {reservation_details['BookingStatus']}\n"
        response_str += "---------------------------------\n"

    return response_str
