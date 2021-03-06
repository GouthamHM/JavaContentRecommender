import requests
url= "http://localhost:3000/documents"
from pathlib import Path
import os
import json

curr_path = os.getcwd()
dir = Path(curr_path+"/data")
path, dirs, files = next(os.walk(str(dir)))
requests.request('DELETE','http://localhost:9200/_all/_settings',
data='{"index.blocks.read_only_allow_delete": null}', headers={'Content-Type': "application/json"})
requests.request('DELETE','http://localhost:3000/documents')
for file_name in files:
    with open(str(dir)+"/"+file_name) as file:
        s = file.readline()
        payload = "{\n\t\"stemmed\":\"produc result :\",\n\t\"content\":\"produces this result:\"\n}"
        headers = {
    'Content-Type': "application/json",
    'Cache-Control': "no-cache",
    'Postman-Token': "ebf71c03-aceb-4421-8b48-f89df3d95347"
    }

        response = requests.request("POST", url, data=s, headers=headers)