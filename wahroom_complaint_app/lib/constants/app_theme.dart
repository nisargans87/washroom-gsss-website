import 'package:flutter/material.dart';
import 'app_colors.dart';

class AppTheme {

  static ThemeData lightTheme = ThemeData(

    primaryColor: AppColors.primary,

    scaffoldBackgroundColor:
        AppColors.background,

    colorScheme: ColorScheme.light(
      primary: AppColors.primary,
      secondary: AppColors.secondary,
    ),

    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.primary,
      foregroundColor: Colors.white,
      elevation: 0,
    ),

    inputDecorationTheme: InputDecorationTheme(

      filled: true,

      fillColor: AppColors.surface,

      border: OutlineInputBorder(
        borderRadius: BorderRadius.all(
          Radius.circular(12),
        ),

        borderSide: BorderSide(
          color: AppColors.border,
        ),
      ),

    ),

    elevatedButtonTheme:
        ElevatedButtonThemeData(

      style:
          ElevatedButton.styleFrom(

        backgroundColor:
            AppColors.primary,

        foregroundColor:
            Colors.white,

        shape:
            RoundedRectangleBorder(

          borderRadius:
              BorderRadius.circular(12),

        ),

      ),

    ),

  );

}