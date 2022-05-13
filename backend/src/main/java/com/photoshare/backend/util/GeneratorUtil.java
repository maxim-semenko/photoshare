package com.photoshare.backend.util;

import java.security.SecureRandom;

/**
 * Util Generator class, that has one static method for generating number.
 *
 * @author Maxim Semenko
 * @version 1.0
 */
public class GeneratorUtil {

    /**
     * The private constructor, therefore
     * it's util class with only one static method.
     */
    private GeneratorUtil() {
    }

    /**
     * Method that return random number from min to max.
     *
     * @param min min number
     * @param max max number
     * @return random number
     */
    public static Integer generateCode(int min, int max) {
        SecureRandom random = new SecureRandom();
        return random.nextInt(max - min + 1) + min;
    }

}
