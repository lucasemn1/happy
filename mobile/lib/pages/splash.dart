import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobile/pages/map.dart';
import 'package:splashscreen/splashscreen.dart';

class Splash extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(
      SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness: Brightness.light,
      ),
    );

    return Scaffold(
      body: Stack(
        children: <Widget>[
          SplashScreen(
            seconds: 2,
            gradientBackground: LinearGradient(
              begin: Alignment.topRight,
              end: Alignment.bottomLeft,
              colors: [Color(0xff2AB5D1), Color(0xff00C7C7)],
            ),
            navigateAfterSeconds: Map(),
            loaderColor: Colors.transparent,
          ),
          Container(
            width: double.infinity,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(child: Image.asset('assets/imgs/logo.png')),
                Container(
                  margin: EdgeInsets.only(top: 180),
                  child: Column(
                    children: [
                      Text(
                        'Equador',
                        style: TextStyle(
                          fontFamily: 'Nunito',
                          fontWeight: FontWeight.bold,
                          fontSize: 20,
                          color: Colors.white,
                        ),
                      ),
                      Text(
                        'Rio Grande do Norte',
                        style: TextStyle(
                          fontFamily: 'Nunito',
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}
