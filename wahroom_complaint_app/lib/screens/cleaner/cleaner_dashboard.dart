import 'package:flutter/material.dart';

class CleanerDashboard extends StatelessWidget {
  const CleanerDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Cleaner Dashboard"),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Navigator.pushReplacementNamed(context, "/login");
            },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Card(
              child: ListTile(
                leading: const Icon(Icons.pending_actions),
                title: const Text("Pending Complaints"),
                subtitle: const Text("0"),
              ),
            ),
            const SizedBox(height: 15),
            Card(
              child: ListTile(
                leading: const Icon(Icons.check_circle),
                title: const Text("Resolved Complaints"),
                subtitle: const Text("0"),
              ),
            ),
            const SizedBox(height: 15),
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton.icon(
                onPressed: () {
                  Navigator.pushNamed(context, "/view-complaints");
                },
                icon: const Icon(Icons.list),
                label: const Text("View Complaints"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}