import 'package:http/http.dart';
import 'package:mobile/models/Image.dart';
import 'dart:convert';

class Orphanage {
  int id;
  String name;
  num latitude;
  num longitude;
  String about;
  String instructions;
  String openingHours;
  bool openOnWeekends;
  List<Image> images;

  Orphanage() {
    this.images = new List<Image>();
  }

  static getListFromResponse(Response response) {
    List jsonResponse = json.decode(response.body) as List;

    List<Orphanage> orphanages = List<Orphanage>();

    jsonResponse.forEach((element) {
      Orphanage orphanage = new Orphanage();

      orphanage.id = element['id'];
      orphanage.about = element['about'];
      orphanage.instructions = element['instructions'];
      orphanage.latitude = element['latitude'];
      orphanage.longitude = element['longitude'];
      orphanage.name = element['name'];
      orphanage.openOnWeekends = element['open_on_weekends'];
      orphanage.openingHours = element['opening_hours'];

      orphanages.add(orphanage);
    });

    return orphanages;
  }

  @override
  String toString() {
    return '''
      SUPER: ${super.toString()},
      name: $name,
      latitude: $latitude,
      longitude: $longitude,
      about: $about,
      instructions: $instructions,
      openingHours: $openingHours,
      openOnWeekends: $openOnWeekends,
    ''';
  }
}
