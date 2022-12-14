# Generated by Django 4.0.4 on 2022-07-30 12:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blogistic_backend', '0004_order_car'),
    ]

    operations = [
        migrations.CreateModel(
            name='Car_order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number_car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blogistic_backend.car')),
                ('number_order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blogistic_backend.order')),
            ],
        ),
        migrations.CreateModel(
            name='additional_service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number_order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blogistic_backend.order')),
                ('number_service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blogistic_backend.service')),
            ],
        ),
    ]
