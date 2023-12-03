import requests
import json

def lambda_handler(event, context):
    # Extract the reservation ID from the event
    reservation_id = event.get('reservationId')

    # Invoke the get_reservation_menu logic
    result = get_reservation_menu(reservation_id)
    
    # Return the result as a JSON
    return {
        'statusCode': 200,
        'body': json.dumps(result)
    }

def get_reservation_menu(reservation_id):
    
    # API call to fetch the reservation menu
    response = requests.get(f'https://us-central1-serverless-401214.cloudfunctions.net/getReservationMenu?reservationId={reservation_id}')
    
    # Check if the response is successful and return the data
    if response.status_code == 200:
        try:
            return response.json()
        except json.JSONDecodeError:
            return {'error': 'Invalid JSON response from the API', 'status_code': response.status_code, 'response': response.text}
    else:
        # Handle unsuccessful response
        return {'error': 'Failed to retrieve reservation menu', 'status_code': response.status_code, 'response': response.text}
