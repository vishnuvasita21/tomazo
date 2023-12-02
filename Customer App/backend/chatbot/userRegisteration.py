import boto3

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')


def lambda_handler(event, context):
    table_name = "UserRegistration"
    try:
        # Define the table name

        # Define the table's schema
        table_schema = {
            'TableName': table_name,
            'KeySchema': [
                {'AttributeName': 'userId', 'KeyType': 'HASH'}  # Partition key
            ],
            'AttributeDefinitions': [
                {'AttributeName': 'userId', 'AttributeType': 'S'},
                # Add other attribute definitions if needed
            ],
            'ProvisionedThroughput': {
                'ReadCapacityUnits': 10,
                'WriteCapacityUnits': 10
            }
        }

        # Create the table if it does not exist
        try:
            table = dynamodb.create_table(**table_schema)
            # Wait until the table exists.
            table.meta.client.get_waiter('table_exists').wait(TableName=table_name)
        except dynamodb.meta.client.exceptions.ResourceInUseException:
            # The table already exists
            table = dynamodb.Table(table_name)

        # Extract user data from event body
        event_body = event.get('body', {})

        # Convert userId to string if it's not already
        event_body['userId'] = str(event_body.get('userId', ''))

        # Check if all required attributes are present
        required_attributes = ["userId", "username", "password", "email", "contact"]
        for attr in required_attributes:
            if attr not in event_body:
                return {
                    'statusCode': 400,
                    'body': f'Missing required attribute: {attr}'
                }

        # Define the item (data) to be added to the table
        item = {
            'userId': event_body['userId'],
            'username': event_body['username'],
            'password': event_body['password'],
            'email': event_body['email'],
            'contact': event_body['contact']
        }

        # Use the put_item operation to add the item to the table
        table.put_item(Item=item)

        # Return success response
        return {
            'statusCode': 200,
            'body': f'Item added to table "{table_name}" successfully'
        }
    except Exception as e:
        # Handle errors and return an error response
        return {
            'statusCode': 500,
            'body': f'Error: {str(e)}'
        }
