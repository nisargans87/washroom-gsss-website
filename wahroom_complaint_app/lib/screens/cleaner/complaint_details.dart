import 'package:flutter/material.dart';
import '../../models/complaint.dart';

class ComplaintDetails extends StatelessWidget {
  final Complaint complaint;

  const ComplaintDetails({
    super.key,
    required this.complaint,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Complaint Details"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Card(
              child: ListTile(
                title: const Text("Washroom"),
                subtitle: Text(complaint.washroom),
              ),
            ),
            Card(
              child: ListTile(
                title: const Text("Issue"),
                subtitle: Text(complaint.issue),
              ),
            ),
            Card(
              child: ListTile(
                title: const Text("Status"),
                subtitle: Text(complaint.status),
              ),
            ),
            Card(
              child: ListTile(
                title: const Text("Submitted Time"),
                subtitle: Text(complaint.submittedTime),
              ),
            ),
          ],
        ),
      ),
    );
  }
}