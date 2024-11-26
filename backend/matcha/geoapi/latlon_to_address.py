from xmltodict import parse
from requests import get


def _remove_first_line(text: str) -> str:
    return text.split("\n", 1)[1]


def latlon_to_address(lat: float, lon: float) -> dict:
    api_url = "https://nominatim.openstreetmap.org"
    path = "/reverse"
    data = {"lat": lat, "lon": lon}

    # response = get(api_url + path, data=data)
    # print(response.content)

    api_response = """<?xml version="1.0" encoding="UTF-8" ?>
    <reversegeocode timestamp="Mon, 25 Nov 2024 18:57:17 +00:00" attribution="Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright" querystring="lat=46.532327&amp;lon=6.591987&amp;format=xml"><result place_id="84050034" osm_type="node" osm_id="10565205589" ref="42 Lausanne" lat="46.5323286" lon="6.5920061" boundingbox="46.5322786,46.5323786,6.5919561,6.5920561" place_rank="30" address_rank="30">42 Lausanne, 64, Rue de Lausanne, Renens-Village, Renens, District de l'Ouest lausannois, Vaud, 1020, Schweiz/Suisse/Svizzera/Svizra</result><addressparts><amenity>42 Lausanne</amenity><house_number>64</house_number><road>Rue de Lausanne</road><neighbourhood>Renens-Village</neighbourhood><town>Renens</town><county>District de l'Ouest lausannois</county><state>Vaud</state><ISO3166-2-lvl4>CH-VD</ISO3166-2-lvl4><postcode>1020</postcode><country>Schweiz/Suisse/Svizzera/Svizra</country><country_code>ch</country_code></addressparts></reversegeocode>
    """

    api_response = _remove_first_line(api_response)
    api_address = parse(api_response)
    address = {
        "road": api_address["reversegeocode"]["addressparts"]["road"],
        "house_number": api_address["reversegeocode"]["addressparts"]["house_number"],
        "postcode": api_address["reversegeocode"]["addressparts"]["postcode"],
        "town": api_address["reversegeocode"]["addressparts"]["town"],
        "country": api_address["reversegeocode"]["addressparts"]["country"],
    }

    return address


def main():
    address = latlon_to_address(46.532327, 6.591987)

    print("postcode: " + address["postcode"])
    print("town: " + address["town"])
    print("country: " + address["country"])
    print("road: " + address["road"])
    print("house_number: " + address["house_number"])


if __name__ == "__main__":
    main()
