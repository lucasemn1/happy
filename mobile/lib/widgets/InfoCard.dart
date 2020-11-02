import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class InfoCard extends StatelessWidget {
  final String iconPath;
  final String text;
  final Color color;
  final Color borderColor;
  final Color textColor;

  InfoCard({
    this.color,
    @required this.text,
    @required this.iconPath,
    @required this.borderColor,
    @required this.textColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 150,
      // height: 150,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Image.asset(this.iconPath),
          Container(
            margin: EdgeInsets.only(
              top: 16,
            ),
            child: Text(
              this.text,
              style: TextStyle(
                fontFamily: 'Nunito',
                fontSize: 15,
                color: this.textColor,
              ),
            ),
          ),
        ],
      ),
      padding: EdgeInsets.only(
        top: 25,
        left: 16,
        right: 16,
        bottom: 29,
      ),
      decoration: BoxDecoration(
        border: Border.all(color: this.borderColor),
        borderRadius: BorderRadius.circular(20.0),
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          tileMode: TileMode.repeated,
          colors: [
            this.color,
            Colors.white,
          ],
        ),
      ),
      // color: Colors.red),
    );
  }
}
