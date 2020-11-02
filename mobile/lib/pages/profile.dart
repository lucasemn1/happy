import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_icons/flutter_icons.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:latlong/latlong.dart';
import 'package:mobile/models/Orphanage.dart';
// import 'package:http/http.dart' as http;
import 'package:mobile/util/constant.dart';
import 'package:mobile/widgets/InfoCard.dart';
import 'package:mobile/widgets/HorizontalLine.dart';
import 'package:mobile/widgets/Title.dart' as CustomTitle;
import 'package:mobile/widgets/Paragraph.dart';

class Profile extends StatefulWidget {
  final Orphanage orphanage;

  const Profile({@required this.orphanage}) : super();

  @override
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  String _token = new DotEnv().env['MAPBOX_KEY'];
  Orphanage orphanage = new Orphanage();

  @override
  initState() {
    super.initState();

    this.orphanage = widget.orphanage;

    // fetchOrphanage().then(
    //   (orphanage) {
    //     setState(() {
    //       this.orphanage = orphanage;
    //     });
    //   },
    // );
  }

  // Future<Orphanage> fetchOrphanage() async {
  //   http.Response response = await http.get('$BACKEND_URL/orphanage/1');

  //   return Orphanage.getFromResponse(response);
  // }

  void openWhatsappChat() {}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color(0xffF9FAFC),
        elevation: 3,
        shadowColor: Color.fromRGBO(0, 0, 0, 0.2),
        centerTitle: true,
        leading: FlatButton(
          onPressed: () {
            Navigator.pop(context);
          },
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          highlightColor: Colors.transparent,
          child: Icon(
            Feather.arrow_left,
            size: 25,
            color: Color(0xff15B6D6),
          ),
        ),
        title: Text(
          'Orfanato',
          style: TextStyle(
            fontFamily: 'Nunito',
            fontSize: 15,
            color: Color(0xff8FA7B3),
          ),
        ),
      ),
      body: ListView(
        children: [
          Container(
            height: 260,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: orphanage.images.map((image) {
                return Image.network(
                  '$BACKEND_URL/uploads/${image.name}',
                  scale: 2,
                );
              }).toList(),
            ),
          ),
          Container(
            padding: EdgeInsets.only(
              left: 24,
              right: 24,
              top: 35,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                CustomTitle.Title(text: this.orphanage.name),
                Container(
                  margin: EdgeInsets.only(
                    top: 15,
                  ),
                  child: Paragraph(
                    text: this.orphanage.about,
                  ),
                ),
                Container(
                  height: 196,
                  margin: EdgeInsets.only(top: 23),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20.0),
                    color: Color(0xffE6F7FB),
                    border: Border.all(
                      color: Color(0xffB3DAE2),
                    ),
                  ),
                  clipBehavior: Clip.antiAlias,
                  child: Column(
                    children: [
                      Container(
                        height: 147,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(20.0),
                        ),
                        clipBehavior: Clip.antiAlias,
                        child: FlutterMap(
                          options: new MapOptions(
                            center: new LatLng(
                              this.orphanage.latitude.toDouble(),
                              this.orphanage.longitude.toDouble(),
                            ),
                            zoom: 6,
                          ),
                          layers: [
                            TileLayerOptions(
                              urlTemplate:
                                  'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=$_token',
                            ),
                            MarkerLayerOptions(
                              markers: [
                                Marker(
                                  width: 80.0,
                                  height: 80.0,
                                  point: new LatLng(
                                    orphanage.latitude.toDouble(),
                                    orphanage.longitude.toDouble(),
                                  ),
                                  builder: (ctx) => new GestureDetector(
                                    onTap: () {
                                      print("Hello");
                                    },
                                    child: new Container(
                                      child: SvgPicture.asset(
                                        'assets/icons/local.svg',
                                        width: 48,
                                        height: 54,
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      Container(
                        margin: EdgeInsets.only(top: 13),
                        child: Text(
                          'Ver rotas no Google Maps',
                          style: TextStyle(
                            color: Color(0xff0089A5),
                            fontSize: 15,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                HorizontalLine(),
                CustomTitle.Title(
                  text: 'Instruções para visita',
                ),
                Container(
                  margin: EdgeInsets.only(
                    top: 25,
                    bottom: 24,
                  ),
                  child: Paragraph(
                    text:
                        'Venha como se sentir a vontade e traga muito amor e paciência para dar.',
                  ),
                ),
                Container(
                  height: 160,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      InfoCard(
                        text: this.orphanage.openingHours,
                        iconPath: 'assets/icons/clock.png',
                        color: Color(0xffE6F7FB),
                        borderColor: Color(0xffB3DAE2),
                        textColor: Color(0xff5C8599),
                      ),
                      InfoCard(
                        text: 'Atendemos fim de semana',
                        iconPath: 'assets/icons/alert.png',
                        color: Color(0xffEDFFF6),
                        borderColor: Color(0xffA1E9C5),
                        textColor: Color(0xff37C77F),
                      ),
                    ],
                  ),
                ),
                Container(
                  margin: EdgeInsets.only(
                    top: 20,
                    bottom: 30,
                  ),
                  child: FlatButton(
                    onPressed: () {},
                    color: Color(0xff3CDC8C),
                    height: 56,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          margin: EdgeInsets.only(
                            right: 16,
                          ),
                          child: Image.asset('assets/icons/whatsapp.png'),
                        ),
                        Text(
                          'Entrar em contato',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                            fontSize: 16,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
