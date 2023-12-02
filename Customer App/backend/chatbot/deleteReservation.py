import requests
import json

def lambda_handler(event, context):
    # Extract parameters from the event
    restaurant_name = event.get('restaurant_name')
    user_id = event.get('user_id')
    table_id = event.get('table_id')
    booking_date = event.get('booking_date')
    booking_start = event.get('booking_start')
    booking_end = event.get('booking_end')

    # Invoke the delete_reservation logic
    result = delete_reservation(restaurant_name, user_id, table_id, booking_date, booking_start, booking_end)
    
    # Return the result as a JSON
    return {
        'statusCode': 200,
        'body': json.dumps(result)
    }

def delete_reservation(restaurant_name, user_id, table_id, booking_date, booking_start, booking_end):
    # First API - Get Reservation Document ID
    params1 = {
        'restaurantName': restaurant_name,
        'userID': user_id,
        'tableID': table_id,
        'bookingDate': booking_date,
        'bookingStart': booking_start,
        'bookingEnd': booking_end
    }
    response1 = requests.get('https://us-central1-csci5410-14dd5.cloudfunctions.net/getReservationDocumentID', params=params1)
    
    if response1.status_code == 200:
        document_id = response1.json().get('DocumentID')

        # Second API - Delete Reservation
        params2 = {'documentID': document_id}
        response2 = requests.get('https://deletereservation-ez3fpdepla-uc.a.run.app/deleteReservation', params=params2)

        # Handle non-JSON responses from the second API
        if response2.headers.get('Content-Type') == 'application/json':
            try:
                return response2.json()
            except json.JSONDecodeError:
                return {'error': 'Invalid JSON response from the delete API', 'status_code': response2.status_code, 'response': response2.text}
        else:
            return {'error': 'Non-JSON response from the delete API', 'status_code': response2.status_code, 'response': response2.text}
    else:
        return {'error': 'Failed to retrieve DocumentID', 'status_code': response1.status_code, 'response': response1.text}
