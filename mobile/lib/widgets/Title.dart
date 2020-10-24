import 'package:flutter/material.dart';

class Title extends StatelessWidget {
  final String text;

  const Title({@required this.text}) : super();

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: TextStyle(
        fontFamily: 'Nunito',
        fontWeight: FontWeight.bold,
        fontSize: 30,
        color: Color(0xff4D6F80),
      ),
    );
  }
}
