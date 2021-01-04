import sys
import json

import boto3
s3 = boto3.client('s3')
from AviaNZ_batch import AviaNZ_batchProcess

def handler(event, context):
    event = json.loads(event);

    bucket = event.uri.replace('s3://', '').split('/')[0]
    obj = event.uri.replace('s3://', '').split('/', 1)[1]

    print([event.uri, event.species, bucket, object])

    return 'Hello from AWS Lambda using Python' + sys.version + ' (w/ Avianz)!'
