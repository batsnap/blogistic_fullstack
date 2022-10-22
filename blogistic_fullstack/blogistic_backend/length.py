from requests import get
from time import sleep
import json
def length_all(adressTo,adressFrom):
    start='Подольск, проспект юных ленинцев 14/2'
    a=get('https://maps.googleapis.com/maps/api/directions/json',
    params=dict(
        origin=start,
        destination=adressFrom,
        mode='driving',
        language='ru',
        unit='metric',
        key='AIzaSyC83j312u1ggzKteW3OyEF9sz_5UMDT-pU',
    ))
    length_to_client=float(json.loads(a.text)['routes'][0]['legs'][0]['distance']['text'].replace(' км','').replace(',','.').replace('\xa0',''))
    
    a=get('https://maps.googleapis.com/maps/api/directions/json',
    params=dict(
        origin=adressFrom,
        destination=adressTo,
        mode='driving',
        language='ru',
        unit='metric',
        key='AIzaSyC83j312u1ggzKteW3OyEF9sz_5UMDT-pU',
    ))
    length_from_client_to_dest=float(json.loads(a.text)['routes'][0]['legs'][0]['distance']['text'].replace(' км','').replace(',','.').replace('\xa0',''))
    
    a=get('https://maps.googleapis.com/maps/api/directions/json',
    params=dict(
        origin=adressTo,
        destination=start,
        mode='driving',
        language='ru',
        unit='metric',
        key='AIzaSyC83j312u1ggzKteW3OyEF9sz_5UMDT-pU',
    ))
    length_from_dest=float(json.loads(a.text)['routes'][0]['legs'][0]['distance']['text'].replace(' км','').replace(',','.').replace('\xa0',''))

    return round(length_to_client+length_from_client_to_dest+length_from_dest)