class Complaint {
  final int id;
  final String washroom;
  final String issue;
  final String status;
  final String submittedTime;

  Complaint({
    required this.id,
    required this.washroom,
    required this.issue,
    required this.status,
    required this.submittedTime,
  });

  factory Complaint.fromJson(Map<String, dynamic> json) {
    DateTime dateTime =
        DateTime.parse(json["submitted_time"]).toLocal();

    String formattedTime =
        "${dateTime.day.toString().padLeft(2, '0')}-"
        "${dateTime.month.toString().padLeft(2, '0')}-"
        "${dateTime.year} "
        "${dateTime.hour.toString().padLeft(2, '0')}:"
        "${dateTime.minute.toString().padLeft(2, '0')}";

    return Complaint(
      id: json["id"],
      washroom: json["washroom_number"],
      issue: json["issue_category"],
      status: json["status"],
      submittedTime: formattedTime,
    );
  }
}