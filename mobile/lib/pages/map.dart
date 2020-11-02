import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_icons/flutter_icons.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:latlong/latlong.dart';
import 'package:mobile/models/Orphanage.dart';
import 'package:mobile/util/constant.dart';
import 'package:http/http.dart' as http;
import 'package:geolocator/geolocator.dart';
import 'package:mobile/pages/profile.dart';

class Map extends StatefulWidget {
  @override
  _MapState createState() => _MapState();
}

class _MapState extends State<Map> {
  String _token = new DotEnv().env['MAPBOX_KEY'];
  LatLng latLng;
  List<Orphanage> orphanages;

  @override
  initState() {
    super.initState();
    requestPermission();

    this.orphanages = new List<Orphanage>();

    fetchOrphanages().then(
      (orphanages) => {
        setState(() {
          this.orphanages = orphanages;
        }),
      },
    );

    this.latLng = new LatLng(0, 0);

    fetchLocation().then(
      (latLng) => {
        setState(() {
          this.latLng.latitude = latLng.latitude;
          this.latLng.longitude = latLng.longitude;
        }),
      },
    );
  }

  Future<List<Orphanage>> fetchOrphanages() async {
    http.Response response = await http.get('$BACKEND_URL/orphanages');

    return Orphanage.getListFromResponse(response);
  }

  Future<void> requestPermission() async {
    if (!await Geolocator.isLocationServiceEnabled()) {
      await Geolocator.requestPermission();
    }
  }

  Future<LatLng> fetchLocation() async {
    Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high);

    return new LatLng(position.latitude, position.longitude);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Stack(
          children: [
            Container(
              child: FlutterMap(
                options: new MapOptions(
                  center: this.latLng,
                  zoom: 8,
                ),
                layers: [
                  TileLayerOptions(
                    urlTemplate:
                        'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=$_token',
                  ),
                  new MarkerLayerOptions(
                    markers: this.orphanages.map(
                      (orphanage) {
                        return new Marker(
                          width: 80.0,
                          height: 80.0,
                          point: new LatLng(
                            orphanage.latitude.toDouble(),
                            orphanage.longitude.toDouble(),
                          ),
                          builder: (ctx) => new GestureDetector(
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => Profile(
                                    orphanage: orphanage,
                                  ),
                                ),
                              );
                            },
                            child: new Container(
                              child: SvgPicture.asset(
                                'assets/icons/local.svg',
                                width: 48,
                                height: 54,
                              ),
                            ),
                          ),
                        );
                      },
                    ).toList(),
                  ),
                ],
              ),
            ),
            Positioned(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [NewOrphanageButton(this.orphanages.length)],
              ),
              width: MediaQuery.of(context).size.width * 1,
              bottom: 32,
            ),
          ],
        ),
      ),
    );
  }
}

class NewOrphanageButton extends StatefulWidget {
  final int totalOrphanages;
  const NewOrphanageButton(this.totalOrphanages);

  @override
  NewOrphanageButtonState createState() => NewOrphanageButtonState();
}

class NewOrphanageButtonState extends State<NewOrphanageButton> {
  @override
  Widget build(BuildContext context) {
    int totalOrphanages = widget.totalOrphanages;

    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.all(Radius.circular(24)),
        color: Color(0xFFffffff),
      ),
      width: MediaQuery.of(context).size.width * 0.9,
      height: 54.0,
      padding: EdgeInsets.only(left: 24),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            '$totalOrphanages orfanatos encontrados',
            style: TextStyle(
              color: Color(0xFF8FA7B3),
              fontFamily: 'Nunito',
              fontWeight: FontWeight.bold,
              fontSize: 15,
            ),
          ),
          FlatButton(
            onPressed: () {},
            child: Icon(Feather.plus, color: Colors.white),
            height: 54.0,
            minWidth: 54,
            color: Color(0xff15C3D6),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
            ),
          )
        ],
      ),
    );
  }
}
