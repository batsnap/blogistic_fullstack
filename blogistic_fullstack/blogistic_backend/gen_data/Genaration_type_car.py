a=['1000','1500','3000','5000','10000','20000']

b=['household_goods',
'perishable_food',
'food',
'Bulky_building_materials',
'office_furniture',
'furniture',
'building_materials',
'clothes',]

price={
    '1000':['Heel'],
    '1500':['Tent low 3 meters','Van 3 meters','Van high 3 meters','Tent low 4 meters','Van 4 meters','Van high 4 meters'],
    '3000':['Tent 3 tons','Van 3 tons','Board 3 tons','Refrigerator 3 tons'],
    '5000':['Board 5 meters 5 tons','Van 5 meters 5 tons','Tent 5 meters 5 tons','Refrigerator 5 meters 5 tons'],
    '10000':['Tent 6 meters 10 tons','Van 6 meters 10 tons','Board 6 meters 10 tons','Refrigerator 6 meters 10 tons'],
    '20000':['Tent 20 tons','Van 20 tons','Board 20 tons','Refrigerator 20 tons']
}
l=open('type_order.txt','w')
l.write('{')
for k in b:
    f=''
    for i in a:
        for c in price[i]:
            f+="'"+c+"'"+","
        
        l.write("'"+k+"/"+i+"':["+f+'],\n')
        f=''    
l.write('}')