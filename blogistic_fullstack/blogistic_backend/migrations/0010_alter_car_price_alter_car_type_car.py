# Generated by Django 4.0.4 on 2022-09-04 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogistic_backend', '0009_car_car_number_alter_car_type_car'),
    ]

    operations = [
        migrations.AlterField(
            model_name='car',
            name='price',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='car',
            name='type_car',
            field=models.CharField(choices=[('Tent low 3 meters', 'Тент низкий 3 метра'), ('Van 3 meters', 'Фургон 3 метра'), ('Van high 3 meters', 'Фургон высокий 3 метра'), ('Tent low 4 meters', 'Тент низкий 4 метра'), ('Van 4 meters', 'Фургон 4 метра'), ('Van high 4 meters', 'Фургон высокий 4 метра'), ('Heel', 'Каблук'), ('Tent 3 tons', 'Тент 3 тонны'), ('Van 3 tons', 'Фургон 3 тонны  '), ('Board 3 tons', 'Борт 3 тонны'), ('Refrigerator 3 tons', 'Рефрижератор 3 тонны'), ('Board 5 meters 5 tons', 'Борт 5 метров 5 тонн'), ('Van 5 meters 5 tons', 'Фургон 5 метров 5тонн'), ('Tent 5 meters 5 tons', 'Тент 5 метров 5 тонн'), ('Refrigerator 5 meters 5 tons', 'Рефрижератор 5 метров 5 тонн'), ('Tent 6 meters 10 tons', 'Тент 6 метров 10 тонн'), ('Van 6 meters 10 tons', 'Фургон 6 метров 10 тонн'), ('Board 6 meters 10 tons', 'Борт 6 метров 10 тонн'), ('Refrigerator 6 meters 10 tons', 'Рефрижератор 6 метров 10 тонн'), ('Tent 20 tons', 'Тент 20 тонн'), ('Van 20 tons', 'Фургон 20 тонн'), ('Board 20 tons', 'Борт 20 тонн'), ('Refrigerator 20 tons', 'Рефрижератор 20 тонн')], max_length=100),
        ),
    ]
