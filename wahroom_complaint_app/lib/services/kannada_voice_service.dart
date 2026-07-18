import 'package:flutter_tts/flutter_tts.dart';


class KannadaVoiceService {

  final FlutterTts flutterTts = FlutterTts();



  String convertIssueToKannada(String issue) {

    switch(issue) {

      case "No Water":
        return "ನೀರು ಲಭ್ಯವಿಲ್ಲ";

      case "Dirty Floor":
        return "ನೆಲ ಸ್ವಚ್ಛವಾಗಿಲ್ಲ";

      case "Bad Smell":
        return "ಕೆಟ್ಟ ವಾಸನೆ ಇದೆ";

      case "Dustbin Full":
        return "ಕಸದ ಬುಟ್ಟಿ ತುಂಬಿದೆ";

      default:
        return issue;

    }

  }




  String convertStatusToKannada(String status) {

    switch(status) {

      case "Pending":
        return "ಬಾಕಿಯಿದೆ";

      case "In Progress":
        return "ಕೆಲಸ ಪ್ರಗತಿಯಲ್ಲಿದೆ";

      case "Resolved":
        return "ಪರಿಹರಿಸಲಾಗಿದೆ";

      default:
        return status;

    }

  }





  Future<void> speakComplaint(
      String washroom,
      String issue,
      String status,
  ) async {



    String kannadaIssue =
        convertIssueToKannada(issue);


    String kannadaStatus =
        convertStatusToKannada(status);



    String message =
        "$washroom ರಿಂದ ದೂರು ಸ್ವೀಕರಿಸಲಾಗಿದೆ. "
        "ದೂರಿನ ಸಮಸ್ಯೆ $kannadaIssue. "
        "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ $kannadaStatus.";



    await flutterTts.setLanguage(
      "kn-IN",
    );


    await flutterTts.setSpeechRate(
      0.45,
    );


    await flutterTts.speak(
      message,
    );


  }


}