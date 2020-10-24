class Image {
  int id;
  String name;

  Image(int id, String name) {
    this.id = id;
    this.name = name;
  }

  @override
  String toString() {
    return '''
      ${super.toString()},
      id: $id,
      name: $name
    ''';
  }
}
