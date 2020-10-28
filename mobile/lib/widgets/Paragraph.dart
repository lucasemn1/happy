import 'package:flutter/material.dart';

class Paragraph extends StatelessWidget {
  final String text;

  Paragraph({@required this.text});

  @override
  Widget build(BuildContext context) {
    return Text(
      this.text,
      style: TextStyle(
        color: Color(0xff5C8599),
        fontFamily: 'Nunito',
        fontSize: 15,
      ),
    );
  }
}
