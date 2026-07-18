import 'dart:convert';
import 'package:http/http.dart' as http;

import '../models/complaint.dart';

class ComplaintService {
  static const String baseUrl = "http://10.0.2.2:5000";

  // ==========================
  // GET ALL COMPLAINTS
  // ==========================

  Future<List<Complaint>> getComplaints() async {
    final response = await http.get(
      Uri.parse("$baseUrl/getComplaints"),
    );

    if (response.statusCode == 200) {
      List data = jsonDecode(response.body);

      return data
          .map((e) => Complaint.fromJson(e))
          .toList();
    } else {
      throw Exception("Failed to load complaints");
    }
  }

  // ==========================
  // ACCEPT COMPLAINT
  // ==========================

  Future<bool> acceptComplaint(int id) async {
    final response = await http.put(
      Uri.parse("$baseUrl/acceptComplaint/$id"),
    );

    return response.statusCode == 200;
  }

  // ==========================
  // RESOLVE COMPLAINT
  // ==========================

  Future<bool> resolveComplaint(int id) async {
    final response = await http.put(
      Uri.parse("$baseUrl/resolveComplaint/$id"),
    );

    return response.statusCode == 200;
  }

  // ==========================
  // UPDATE STATUS (Optional)
  // ==========================

  Future<bool> updateStatus(
    int id,
    String status,
  ) async {
    final response = await http.put(
      Uri.parse("$baseUrl/complaints/$id/status"),
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonEncode({
        "status": status,
      }),
    );

    return response.statusCode == 200;
  }
}