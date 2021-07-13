import 'package:http/http.dart' as http;
import 'dart:convert';
import './Model/data_model.dart';

 Future<Contacts> createContact(String firstname, String lastname, List<dynamic> phonenumbers) async {
  Uri url = Uri.http('firstappdeployment.herokuapp.com', '/router/create');
    final res = await http.post(url,
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
     body : jsonEncode(<dynamic, dynamic>{
        'firstname': firstname,
        'lastname': lastname, 
        'phonenumbers': phonenumbers
      }));
    if (res.statusCode == 201) {
      final String resposeString = res.body;
      return Contacts.fromJson(jsonDecode(resposeString));
    } else {
      throw Exception('Failed to create Contact.');
  }
} 

