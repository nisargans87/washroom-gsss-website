import 'package:flutter/material.dart';

import 'constants/app_strings.dart';
import 'constants/app_theme.dart';
import 'screens/cleaner/view_complaint.dart';
import 'screens/auth/login_screen.dart';
import 'screens/cleaner/cleaner_dashboard.dart';
import 'screens/splash/splash_screen.dart';

void main() {
  runApp(const WashroomApp());
}

class WashroomApp extends StatelessWidget {
  const WashroomApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: AppStrings.appName,
      theme: AppTheme.lightTheme,
      initialRoute: "/",
      routes: {
        "/": (context) => const SplashScreen(),
        "/login": (context) => const LoginScreen(),
        "/dashboard": (context) => const CleanerDashboard(),
        "/view-complaints": (context) => const ViewComplaints(),
      },
    );
  }
}