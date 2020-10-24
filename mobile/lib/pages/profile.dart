import 'package:flutter/material.dart';
import 'package:flutter_icons/flutter_icons.dart';
import 'package:mobile/models/Orphanage.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/util/constant.dart';
import 'package:mobile/widgets/Title.dart' as widgets;

class Profile extends StatefulWidget {
  final Orphanage orphanage;

  const Profile({@required this.orphanage}) : super();

  @override
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  Orphanage orphanage = new Orphanage();

  @override
  initState() {
    super.initState();

    fetchOrphanage().then(
      (orphanage) {
        setState(() {
          this.orphanage = orphanage;
        });
      },
    );
  }

  Future<Orphanage> fetchOrphanage() async {
    http.Response response = await http.get('$BACKEND_URL/orphanage/1');

    return Orphanage.getFromResponse(response);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color(0xffF9FAFC),
        elevation: 3,
        shadowColor: Color.fromRGBO(0, 0, 0, 0.2),
        centerTitle: true,
        leading: Icon(
          Feather.arrow_left,
          size: 25,
          color: Color(0xff15B6D6),
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
      body: Column(
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
          Expanded(
            child: Container(
              padding: EdgeInsets.only(
                left: 24,
                right: 24,
                top: 35,
              ),
              width: double.infinity,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  widgets.Title(text: this.orphanage.name),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
