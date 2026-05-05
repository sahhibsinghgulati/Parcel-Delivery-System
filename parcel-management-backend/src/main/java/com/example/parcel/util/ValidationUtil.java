package com.example.parcel.util;
import java.util.regex.Pattern;

public class ValidationUtil {
    private static final String USERNAME_PATTERN = "^[a-zA-Z0-9_]{3,20}$";
    private static final String PASSWORD_PATTERN = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$";
    private static final String EMAIL_PATTERN = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$";
    private static final String PHONE_PATTERN = "^[0-9]{10}$";
    private static final String UPI_PATTERN = "^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$";
    private static final String CARD_NUMBER_PATTERN = "^[0-9]{13,19}$";
    private static final String CVV_PATTERN = "^[0-9]{3,4}$";
    private static final String EXPIRY_PATTERN = "^(0[1-9]|1[0-2])/\\d{2}$";

    public static boolean isValidUsername(String username) {
        return username != null && Pattern.matches(USERNAME_PATTERN, username);
    }

    public static boolean isValidPassword(String password) {
        return password != null && Pattern.matches(PASSWORD_PATTERN, password);
    }

    public static boolean isValidEmail(String email) {
        return email != null && Pattern.matches(EMAIL_PATTERN, email);
    }

    public static boolean isValidPhone(String phone) {
        return phone != null && Pattern.matches(PHONE_PATTERN, phone);
    }

    public static boolean isValidUPI(String upi) {
        return upi != null && Pattern.matches(UPI_PATTERN, upi);
    }

    public static boolean isValidCardNumber(String cardNumber) {
        if (cardNumber == null || !Pattern.matches(CARD_NUMBER_PATTERN, cardNumber)) {
            return false;
        }
        return luhnCheck(cardNumber);
    }

    public static boolean isValidCVV(String cvv) {
        return cvv != null && Pattern.matches(CVV_PATTERN, cvv);
    }

    public static boolean isValidExpiryDate(String expiryDate) {
        return expiryDate != null && Pattern.matches(EXPIRY_PATTERN, expiryDate);
    }

    private static boolean luhnCheck(String cardNumber) {
        int sum = 0;
        boolean isEven = false;
        for (int i = cardNumber.length() - 1; i >= 0; i--) {
            int digit = Character.getNumericValue(cardNumber.charAt(i));
            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            isEven = !isEven;
        }
        return (sum % 10) == 0;
    }
}

