import 'package:flutter/material.dart';

import '../../models/complaint.dart';
import '../../services/complaint_service.dart';
import '../../services/kannada_voice_service.dart';
import 'complaint_details.dart';

class ViewComplaints extends StatefulWidget {
  const ViewComplaints({super.key});

  @override
  State<ViewComplaints> createState() => _ViewComplaintsState();
}

class _ViewComplaintsState extends State<ViewComplaints> {
  final ComplaintService service = ComplaintService();
  final KannadaVoiceService voiceService = KannadaVoiceService();

  late Future<List<Complaint>> complaints;

  @override
  void initState() {
    super.initState();
    complaints = service.getComplaints();
  }

  void refreshComplaints() {
    setState(() {
      complaints = service.getComplaints();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("View Complaints"),
      ),
      body: FutureBuilder<List<Complaint>>(
        future: complaints,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }

          if (snapshot.hasError) {
            return Center(
              child: Text(snapshot.error.toString()),
            );
          }

          final data = snapshot.data ?? [];

          if (data.isEmpty) {
            return const Center(
              child: Text("No Complaints"),
            );
          }

          return ListView.builder(
            itemCount: data.length,
            itemBuilder: (context, index) {
              final c = data[index];

              return Card(
                margin: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 8,
                ),
                elevation: 3,
                child: InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => ComplaintDetails(
                          complaint: c,
                        ),
                      ),
                    );
                  },
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment:
                          CrossAxisAlignment.start,
                      children: [

                        Row(
                          children: [
                            const Icon(
                              Icons.report_problem,
                              color: Colors.red,
                            ),
                            const SizedBox(width: 10),
                            Expanded(
                              child: Text(
                                c.washroom,
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight:
                                      FontWeight.bold,
                                ),
                              ),
                            ),
                          ],
                        ),

                        const SizedBox(height: 10),

                        Text(
                          "Issue : ${c.issue}",
                        ),

                        const SizedBox(height: 5),

                        Text(
                          "Submitted : ${c.submittedTime}",
                        ),

                        const SizedBox(height: 5),

                        Text(
                          "Status : ${c.status}",
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                          ),
                        ),

                        const SizedBox(height: 15),

                        Row(
                          children: [

                            IconButton(
                              onPressed: () {
                                voiceService.speakComplaint(
                                  c.washroom,
                                  c.issue,
                                  c.status,
                                );
                              },
                              icon: const Icon(
                                Icons.volume_up,
                              ),
                            ),

                            const Spacer(),

                            if (c.status == "Pending")
                              ElevatedButton(
                                onPressed: () async {

                                  bool success =
                                      await service.acceptComplaint(
                                    c.id,
                                  );

                                  if (success) {

                                    ScaffoldMessenger.of(context)
                                        .showSnackBar(
                                      const SnackBar(
                                        content: Text(
                                          "Complaint Accepted Successfully",
                                        ),
                                        backgroundColor:
                                            Colors.green,
                                      ),
                                    );

                                    refreshComplaints();
                                  }
                                },
                                child: const Text(
                                  "Accept",
                                ),
                              ),

                            if (c.status == "In Progress")
                              ElevatedButton(
                                onPressed: () async {

                                  bool success =
                                      await service.resolveComplaint(
                                    c.id,
                                  );

                                  if (success) {

                                    ScaffoldMessenger.of(context)
                                        .showSnackBar(
                                      const SnackBar(
                                        content: Text(
                                          "Complaint Resolved Successfully",
                                        ),
                                        backgroundColor:
                                            Colors.green,
                                      ),
                                    );

                                    refreshComplaints();
                                  }
                                },
                                child: const Text(
                                  "Resolve",
                                ),
                              ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}