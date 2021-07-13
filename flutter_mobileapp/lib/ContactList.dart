import 'dart:math' as math;
import 'dart:math' ;
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import './Model/data_model.dart';
import './Contact/newContact.dart';
import './Contact/searchList.dart';

class ViewContact extends StatefulWidget {
  @override
  _ViewContactState createState() => _ViewContactState();
}
var keyRefresh = GlobalKey<RefreshIndicatorState>();
Random random = new Random();
int limit = random.nextInt(10);
class _ViewContactState extends State<ViewContact> {
  late Future<Contacts> futureContacts;
  List contacts = [];
  bool isLoading = false;
  

  @override
  void initState() {
    super.initState();
    this.fetchUser();
  }

  fetchUser() async {
    Uri url = Uri.http('firstappdeployment.herokuapp.com', '/router/get');
    http.Response res = await http.get(url);

    if (res.statusCode == 200) {
      var items = json.decode(res.body);
      //print(items);
      setState(() {
        contacts = items;
      });
    } else {
      setState(() {
        contacts =[];
        Center(child: Text("Add List"));
      });
    }
  }


  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 50,
        backgroundColor: Colors.brown.shade400,
        title: Text("Contact List", style: TextStyle(fontSize: 20, color: Colors.white)),
        // actions: [
        //   FlatButton(child: Icon(Icons.search), onPressed: () {
        //     Navigator.push(context, MaterialPageRoute(builder: (context) => SearchList()));
        //   }),
        // ],
        ),
      body: RefreshIndicator( 
        onRefresh: refreshList,
        key: keyRefresh,
        child: getBody(),
      ),
      backgroundColor: Colors.orange.shade50,
      floatingActionButton: new FloatingActionButton(
        child: Icon(Icons.person_add),
        backgroundColor: Colors.brown.shade400,
        onPressed: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => NewContact()),
        );
      }),
    );
  }

  Future<void> refreshList() async{
        keyRefresh.currentState?.show(atTop: true);
        await Future.delayed(Duration(seconds: 0));
        setState(() {
          fetchUser();
        });
      }

  Widget getBody() {
    if (contacts.contains(null) || contacts.length <= 0 || isLoading){
      return Center(child:
      Text("Empty",  style: TextStyle(fontSize: 17, color: Colors.black),));
    } 
    return ListView.builder(
      itemCount: contacts.length,
      itemBuilder: (context, index) {
        return getCard(contacts[index]);
      });
  }
  Widget getCard(item) {
    var str = item["lastname"] + ", " + item["firstname"] + "\n";
    final num = item['phonenumbers'];
    var initalsName = item['firstname'].substring(0,1).toUpperCase() + item['lastname'].substring(0,1).toUpperCase();
    Color color = Color((math.Random().nextDouble() * 0xFFFFFF).toInt()).withOpacity(1.0);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: ListTile(
          leading: CircleAvatar(
            child: Text(initalsName, style: TextStyle(color: Colors.black, fontSize: 20),),
            backgroundColor: color,
            radius: 35.0,
          ),
          title: Row( 
            children: <Widget>[
            SizedBox(width: 20),
            Column(children:<Widget> [
              Container(
                child: Text(str.toString(), style: TextStyle(fontSize: 17, color: Colors.black),),
                width: 200,
                height: 20,
              ),
            Container(
              child: Text("Contact #: \n" + num.toString() + "\n", style: TextStyle(fontSize: 12.5, color: Colors.blueGrey),),
              width: 200,
            ),
          ]),     
        ],
      )),   
    ));  
  }
}
