from requests import get

api_url = "https://nominatim.openstreetmap.org"
path = "/search"
data = {"street": 'rue de lausanne 64', "city": 'renens'} 

response = get(api_url + path, data=data)
print(response.content)
print(response)
print(response.status)

