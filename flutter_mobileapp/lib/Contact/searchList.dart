// import 'package:flutter/material.dart';
// import 'package:http/http.dart' as http;
// import 'dart:convert';


// class SearchList extends StatefulWidget {
//   const SearchList({ Key? key }) : super(key: key);

//   @override
//   _SearchListState createState() => _SearchListState();
// }

// class _SearchListState extends State<SearchList> {




//   fetchUser() async {
//     Uri url = Uri.http('10.0.2.2:3000', '/router/update/:id');
//     http.Response res = await http.get(url);

//     if (res.statusCode == 200) {
//       var items = json.decode(res.body);
//       //print(items);
//       setState(() {
//         contacts = items;
//       });
//     } else {
//       setState(() {
//         contacts =[];
//         Center(child: Text("Add List"));
//       });
//     }
//   }






//   @override
//   Widget build(BuildContext context) {
//     return Container(
      
//     );
//   }
// }