import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_mobileapp/Model/data_model.dart';
import '../API.dart';


class NewContact extends StatefulWidget {
  const NewContact ({ Key? key }) : super(key: key);


  @override
  _NewContactState createState() => _NewContactState();
}

class _NewContactState extends State<NewContact> {
  
  Future<Contacts>? _futureContacts;
  final _firstname = TextEditingController();
  final _lastname = TextEditingController();
  List<TextEditingController> _phonenumbers = <TextEditingController>[TextEditingController()];
  final List<Todo> _list = <Todo>[];
  
  int _num = 0;

  void addContact() {
    List<String> phonenum = <String>[];
 
    for (int i = 0; i < _num; i++){
      phonenum.add(_phonenumbers[i].text);
    }
    setState(() {
      final fname = _firstname.text;
      final lname = _lastname.text;
      final pnum = _phonenumbers.length > 11;
      _list.insert(0, Todo(_lastname.text, _firstname.text, phonenum));
      _futureContacts = createContact(_lastname.text, _firstname.text, phonenum);
      
  });
    
    final toast = SnackBar(content: Text("Succesfuly added", style: TextStyle(fontSize: 20, color: Colors.white)), backgroundColor: Colors.blue,);
    ScaffoldMessenger.of(context).showSnackBar(toast);
  }

  void add() {
    setState(() {
      _num++;
      _phonenumbers.insert(0, TextEditingController());
    });
  }
bool _validate = false;

  void submit() {
    
    setState(() {
        final fname = _firstname.text.isEmpty;
        final lname = _lastname.text.isEmpty;
        final pnum = _phonenumbers.isEmpty;
        if (fname && lname && pnum) {
          _validate = false;
        } else if (!fname && !lname && !pnum ){
          addContact();
       }
    });
    final toast = SnackBar(content: Text("Enter empty fields", style: TextStyle(fontSize: 20, color: Colors.red) ), backgroundColor: Colors.black87,);
    ScaffoldMessenger.of(context).showSnackBar(toast);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title:const Text("Create new Contact"), backgroundColor: Colors.brown.shade400
      ),
      backgroundColor: Colors.orange.shade50,
      floatingActionButton: new FloatingActionButton(onPressed: submit, child: Icon(Icons.check), backgroundColor: Colors.brown.shade400,),
      body: Column(
        children: [
          Flexible(
              child: ListView.builder(shrinkWrap: true,
              itemBuilder: (context, i) {
                return ListTile(
                  title: TextField(
                    controller: _lastname,
                    decoration: InputDecoration(
                      icon: Icon(Icons.person),
                      border: OutlineInputBorder(),
                      labelText: "Firstname"),
                      keyboardType: TextInputType.name,
                    ),
                  );
                },
                itemCount: 1,
              )),
             Flexible(
              child: ListView.builder(shrinkWrap: true,
              itemBuilder: (context, i) {
                return ListTile(
                  title: TextField(
                    controller: _firstname,
                    decoration: InputDecoration(
                      icon: Icon(Icons.person),
                      border: OutlineInputBorder(),
                      labelText: "Lastname"),
                      keyboardType: TextInputType.name,
                    ),
                  );
                },
                itemCount: 1,
              )),
            Flexible(
              child: ListView.builder(shrinkWrap: true,
              itemBuilder: (context, i) {
                return ListTile(
                  title: TextField(
                    controller: _phonenumbers[i],
                    decoration: InputDecoration(
                      icon: Icon(Icons.phone),
                      border: OutlineInputBorder(),
                      labelText: "Phone number"),    
                      maxLength: 11,
                      keyboardType: TextInputType.number,
                    ),
                  );
                }, 
                itemCount: _num,
              )),
            SizedBox(height: 30),
            Text("Add phone number", style: TextStyle(fontSize: 15),),
            FloatingActionButton(
              onPressed: add,
              child: Icon(Icons.add), hoverColor: Colors.blue,
              backgroundColor: Colors.grey,
          ),   
      ]),
    );
  }
}
class Todo {
  final String last_name;
  final String first_name;
  final List<String> phone_numbers;

  Todo(this.last_name, this.first_name, this.phone_numbers);
}