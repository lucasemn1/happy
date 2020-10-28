import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class InfoCard extends StatelessWidget {
  final SvgPicture icon;
  final String text;
  final Color color;

  InfoCard({@required this.text, @required this.icon, this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 300,
      height: 160,
      decoration: BoxDecoration(
        border: Border.all(color: this.color),
        borderRadius: BorderRadius.circular(20.0),
        gradient: LinearGradient(
          colors: [
            this.color,
            Colors.white,
          ],
        ),
      ),
    );
  }
}
