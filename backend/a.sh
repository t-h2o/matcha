# curl https://nominatim.openstreetmap.org/search?street=lausanne&city=renens
# <head><title>302 Found</title></head>
# <body>
# <center><h1>302 Found</h1></center>
# <hr><center>nginx</center>
# </body>
# </html>

curl -H 'User-Agent: My-app' https://nominatim.openstreetmap.org/search?street=lausanne+64&city=renens
